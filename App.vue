<script setup lang="ts">
	import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
	import { useStore } from 'vuex'

	const store = useStore()

	onLaunch(() => {
		console.log('App Launch')
		// 是否登录
		const is_login = store.state.setting.is_login
		if (!is_login) {
			//不存在则跳转至登录页
			uni.reLaunch({ url: "/pages/login/login" })
		}
	})
	onShow(() => {
		// console.log('App Show')
	})
	onHide(() => {
		// console.log('App Hide')
	})
</script>

<style>
</style>