import { createStore } from "vuex";
import createPersistedState from 'vuex-persistedstate' // 引入数据持久化插件

import { refresh_token_api } from '@/api/user.ts'

export default createStore({
	state: {
		setting: uni.getStorageSync('setting') || {
			is_login: false,
			token: '',
			refresh_token: '',
			last_fresh_time: ''
		}
	},
	mutations: {
		set_login(state, login : boolean) {
			state.setting.is_login = login;
		},
		set_token(state, token : string) {
			state.setting.token = token;
		},
		set_refresh_token(state, refresh_token : string) {
			state.setting.refresh_token = refresh_token;
		}
	},
	actions: {
		// 刷新refreshToken
		async refresh_token(context) {
			// 上次刷新的时间
			let last_fresh_time = context.state.setting.last_fresh_time
			if (context.state.setting.is_login && last_fresh_time != null && last_fresh_time != '') {
				let last_fresh_time_int = parseInt(last_fresh_time)
				let now_time = new Date().getTime()
				// 两次刷新时间间隔小于1天则返回
				if (now_time - last_fresh_time_int < 86400000) {
					return
				}
			}


			refresh_token_api(context.state.setting.refresh_token).then(value => {
				if (value.code === 200) {
					context.commit('set_token', value.data.token)
					context.commit('set_refresh_token', value.data.refreshToken)
				} else {
					context.commit('set_login', false)
					uni.reLaunch({ url: '/pages/login/login' })
				}
			})
		},
	},
	getters: {

	},
	modules: {},
	plugins: [
		createPersistedState({
			paths: ['setting'],
			storage: { // 存储方式定义  
				getItem: (key : string) => uni.getStorageSync(key), // 获取  
				setItem: (key : string, value : any) => uni.setStorageSync(key, value), // 存储  
				removeItem: (key : string) => uni.removeStorageSync(key) // 删除  
			}
		})
	],
	strict: true
});