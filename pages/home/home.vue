<template>
	<view>
		<carousel :config="config"></carousel>
		<view class="fn_container">
			<view class="fn_item" v-for="item in function_list" :key="item.id">
				<view class="fn_img_container">
					<image class="fn_img" :src="item.img"></image>
				</view>
				<view class="fn_title">{{ item.title }}</view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { onMounted } from 'vue'
	import { refresh_token_api } from '@/api/user.ts'
	import { useStore } from 'vuex'
	import carousel from '@/components/carousel.vue'

	const store = useStore()

	const function_list = [
		{ id: 1, img: '/static/images/nursing.png', title: '养老院' },
		{ id: 2, img: '/static/images/nursing.png', title: '九宫格布局2' },
		{ id: 3, img: '/static/images/nursing.png', title: '九宫格布局3' },
		{ id: 4, img: '/static/images/nursing.png', title: '九宫格布局4' },
		{ id: 5, img: '/static/images/nursing.png', title: '九宫格布局5' },
		{ id: 6, img: '/static/images/nursing.png', title: '九宫格布局6' },
		{ id: 7, img: '/static/images/nursing.png', title: '九宫格布局7' },
		{ id: 8, img: '/static/images/nursing.png', title: '九宫格布局8' }
	]

	const config = {
		autoplay: true,
		interval: 3000,
		itemList: [
			{
				url: 'pages/person/person',
				src: 'https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/slider_1.jpg'
			},
			{
				openType: 'switchTab',
				url: '/pages/category/category',
				src: 'https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/slider_2.jpg'
			}
		]
	}

	onMounted(() => {
		refresh_token_api(store.state.setting.refresh_token).then(value => {
			if (value.code === 200) {
				store.commit('set_token', value.data.token)
				store.commit('set_refresh_token', value.data.refreshToken)
			} else {
				store.commit('set_login', false)
			}
		})
	})
</script>

<style lang="scss">
	.fn_container {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-content: space-between;
		padding: 10rpx 0;

		.fn_item {
			width: 25%;
			height: 200rpx;
			text-align: center;
			box-sizing: border-box;

			.fn_img_container {
				width: 96rpx;
				height: 96rpx;
				margin-top: 30rpx;
				margin-left: auto;
				margin-right: auto;

				.fn_img {
					width: 96rpx;
					height: 96rpx;
				}
			}

			.fn_title {
				width: 100%;
				height: 34rpx;
				line-height: 34rpx;
				color: #06121e;
				font-size: 24rpx;
				margin-top: 20rpx;
			}
		}
	}
</style>