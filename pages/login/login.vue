<template>
	<view>
		<!-- 背景设计 -->
		<view class="bg_circle"></view>
		<view class="bg_blur_circle_right_corn"></view>
		<view class="bg_blur_circle_left_corn"></view>

		<!-- 登录标题 -->
		<view class="login_title">{{title}}</view>

		<!-- 登陆tab切换 -->
		<v-tabs class="tabs" v-model="current_method_index" :tabs="login_tabs" @change="change_login_method"
			line-color="rgba(255, 143, 169, 1)" bg-color="transparent" color="#959899"
			active-color="rgba(227, 16, 65, 1)" font-size="31rpx">
		</v-tabs>

		<!-- 登陆表单 -->
		<view class="login_form" v-if="current_method_index === 0">
			<input class="input_tab" @input="username_input_change" placeholder="请输入账号"
				placeholder-style="text-align: center;"></input>
			<view style="height: 35rpx;"></view>
			<input class="input_tab" @input="password_input_change" placeholder="请输入密码" password type="text"
				placeholder-style="text-align: center;"></input>
		</view>

		<!-- 注册表单 -->
		<view class="login_form" v-else>
			<input class="input_tab" @input="username_input_change" placeholder="请输入手机号"
				placeholder-style="text-align: center;"></input>
			<view style="height: 35rpx;"></view>
			<input class="input_tab" @input="password_input_change" placeholder="请输入密码" password type="text"
				placeholder-style="text-align: center;"></input>
		</view>

		<!-- 提交按钮 -->
		<view class="btn_sub" @click="switch_login_method">
			<view>{{sub_text}}</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { Ref, ref } from 'vue'
	import { useStore } from 'vuex'
	import { login_api, register_api } from '@/api/user.ts'

	const store = useStore()

	const current_method_index : Ref<number> = ref(0);
	const login_tabs : string[] = ['账号登录', '账号注册']
	const subs : string[] = ['登录', '注册']
	const title : Ref<string> = ref(subs[0]);
	const sub_text : Ref<string> = ref(subs[0])

	let username : string = ''
	let password : string = ''

	const change_login_method = (index : number) => {
		current_method_index.value = index
		title.value = subs[index]
		sub_text.value = subs[index]
	}

	const username_input_change = (event : { detail : { value : string } }) => {
		username = event.detail.value
	}

	const password_input_change = (event : { detail : { value : string } }) => {
		password = event.detail.value
	}

	const switch_login_method = () => {
		if (current_method_index.value === 0) {
			start_login()
		} else {
			start_regist()
		}
	}

	const start_regist = () => {
		// 正在注册中
		uni.showLoading({
			title: '正在注册中...',
			mask: true
		});

		register_api({
			phone: username,
			password: password
		}).then((value) => {
			if (value.code === 200) {
				store.commit('set_token', value.data.token)
				store.commit('set_refresh_token', value.data.refreshToken)
				store.commit('set_login', true)

				setTimeout(() => {
					uni.hideLoading()
					uni.showToast({
						title: '注册成功',
						icon: 'success',
						duration: 2000
					})
					uni.reLaunch({
						url: '/pages/home/home'
					})
				}, 500)
			} else {
				uni.hideLoading()
				uni.showToast({
					title: value.msg,
					icon: 'none',
					duration: 2000
				})
			}
		});
	}

	const start_login = () => {
		// 正在登录中
		uni.showLoading({
			title: '正在登录中...',
			mask: true
		});

		login_api({
			phone: "",
			password: password
		}).then((value) => {
			if (value.code === 200) {
				store.commit('set_token', value.data.token)
				store.commit('set_refresh_token', value.data.refreshToken)
				store.commit('set_login', true)

				setTimeout(() => {
					uni.hideLoading()
					uni.showToast({
						title: '登录成功',
						icon: 'success',
						duration: 2000
					})
					uni.reLaunch({
						url: '/pages/home/home'
					})
				}, 500)
			} else {
				uni.hideLoading()
				uni.showToast({
					title: value.msg,
					icon: 'none',
					duration: 2000
				})
			}
		});
	}
</script>

<style lang="scss">
	// 渐变圆形
	.bg_circle {
		position: fixed;
		right: -80rpx;
		top: -60rpx;
		width: 300rpx;
		height: 300rpx;
		border-radius: 50%;
		background: linear-gradient(221.47deg, rgba(227, 16, 65, 1) 0%, rgba(255, 158, 181, 1) 100%);
	}

	.bg_blur_circle_right_corn {
		position: fixed;
		right: -80rpx;
		top: -60rpx;
		width: 300rpx;
		height: 300rpx;
		border-radius: 50%;
		background: linear-gradient(221.47deg, rgba(227, 16, 65, 1) 0%, rgba(255, 158, 181, 1) 100%);
		filter: blur(200rpx);
	}

	.bg_blur_circle_left_corn {
		position: fixed;
		left: -80rpx;
		bottom: -60rpx;
		width: 300rpx;
		height: 300rpx;
		border-radius: 50%;
		background: linear-gradient(221.47deg, rgba(227, 16, 65, 1) 0%, rgba(255, 158, 181, 1) 100%);
		filter: blur(200rpx);
	}

	.login_title {
		font-size: 50rpx;
		font-weight: bold;
		text-align: center;
		margin-top: 70rpx;
	}

	.tabs {
		margin-top: 150rpx;
		margin-left: 30rpx;
	}

	.login_form {
		margin-left: 50rpx;
		margin-right: 50rpx;
		margin-top: 50rpx;
	}

	.input_tab {
		border: 1rpx solid rgba(204, 204, 204, 1);
		height: 80rpx;
		border-radius: 50rpx;
		padding-left: 50rpx;
		padding-right: 50rpx;
	}

	.btn_sub {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 80rpx;
		margin-top: 50rpx;
		margin-left: 50rpx;
		margin-right: 50rpx;
		background: rgba(255, 143, 169, 1);
		border-radius: 50rpx;
		color: white;
	}
</style>