import store from '@/store'
import Request from 'luch-request'
import { HttpRequestConfig, HttpTask, HttpError, HttpResponse } from 'luch-request'

// 请求实例
const http = new Request(
	{
		baseURL: 'http://localhost:8080',
		timeout: 15000
	}
)

// 请求前拦截
http.interceptors.request.use(async (config : HttpRequestConfig<HttpTask>) => {
	if (store.state.setting.token) {
		config.header.token = store.state.setting.token
	}
	return config
})

// 刷新token标识
let isRefreshing = false
// token队列
let requestList = []

// 请求后拦截
http.interceptors.response.use(
	async (response : HttpResponse<any, HttpTask>) => {
		let { config } = response
		let code = response.data.code

		//如果是400 说明token过期
		if (response.statusCode == 200 && code == 400) {
			//如果没有更新标识
			if (!isRefreshing) {
				// 开启更新标识
				isRefreshing = true
				//带上refresh_token拿到token 并替换现有token
				const isSuccess = await store.dispatch('refresh_token').then((res) => {
					if (res.code == 401 || res.code == 402 || res.code == 403) {
						// 重试完了清空这个队列
						requestList = []
						//还原标识
						isRefreshing = false
						store.commit('set_login', false)
						uni.showToast({ title: '登录失效，请重新登录！', icon: 'none' })

						// 延迟一秒跳转
						setTimeout(() => {
							uni.reLaunch({ url: '/pages/login/login' })
						}, 2000)
						return false
					}

					return true
				})

				if (!isSuccess) {
					return Promise.reject(response)
				}

				//执行请求列表
				requestList.forEach((cb) => cb())
				// 重试完了清空这个队列
				requestList = []
				//还原标识
				isRefreshing = false
				//重新执行本次请求
				return http.request(config);
			} else {
				return new Promise((resolve) => {
					// 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
					requestList.push(() => {
						resolve(http.request(config))
					})
				})
			}
		}

		return Promise.resolve(response)
	},
	async (error : HttpError<any, HttpTask>) => {
		// console.log(error)
		// 请求错误做点什么。可以使用async await 做异步操作
		return Promise.reject(error)
	}
)

export default http