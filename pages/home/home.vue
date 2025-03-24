<template>
	<view>
		<carousel class="carousel" :config="config"></carousel>
		<!-- 功能九宫格 -->
		<view class="fn_container">
			<view class="fn_item" v-for="(item, index) in function_list" :key="item.id" @click="navigator_fn(item.id)">
				<view class="fn_img_container">
					<image class="fn_img" :src="item.img"></image>
				</view>
				<view class="fn_title">{{ item.title }}</view>
				<!-- 竖向线 -->
				<view class="vertical_line" v-if="(index + 1) % 4 != 0"></view>
				<!-- 横向线 -->
				<view class="horizontal_line" v-if="index < 4"></view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { onLoad } from '@dcloudio/uni-app'
	import { useStore } from 'vuex'
	import { Ref, ref } from 'vue'
	import carousel from '@/components/carousel.vue'
	import { news_slide_api } from '@/api/news.ts'

	const store = useStore()

	const function_list = [
		{ id: 1, img: '/static/images/nursing.png', title: '养老机构' },
		{ id: 2, img: '/static/images/ageing_at_home.png', title: '居家养老' },
		{ id: 3, img: '/static/images/medical_care.png', title: '医养结合' },
		{ id: 4, img: '/static/images/housekeeping.png', title: '家政服务' },
		{ id: 5, img: '/static/images/shopping.png', title: '商城购物' },
		{ id: 6, img: '/static/images/lease.png', title: '辅具租赁' },
		{ id: 7, img: '/static/images/health_care.png', title: '医护上门' },
		{ id: 8, img: '/static/images/news.png', title: '新闻快讯' }
	]

	const config : Ref<{
		autoplay : boolean,
		interval : number,
		itemList : {
			url : string,
			src : string
		}[]
	}> = ref({
		autoplay: true,
		interval: 3000,
		itemList: []
	})

	onLoad(() => {
		news_slide_api().then(res => {
			if (res.code === 200) {
				(res.data as any).forEach((item : { imageSrc : string }) => {
					config.value.itemList.push({
						url: `/pages/news_detail/news_detail?data=${JSON.stringify(item)}`,
						src: item.imageSrc,
					})
				})
			}
		})
	})

	const navigator_fn = (index : number) => {
		switch (index) {
			case 1:
				uni.navigateTo({
					url: '/pages/nursing/nursing'
				})
				break
			case 2:
				uni.navigateTo({
					url: '/pages/goods/goods' + '?type=ageingAtHome'
				})
				break
			case 3:
				uni.navigateTo({
					url: '/pages/goods/goods' + '?type=medicalCare'
				})
				break
			case 4:
				uni.navigateTo({
					url: '/pages/goods/goods' + '?type=housekeeping'
				})
				break
			case 5:
				uni.navigateTo({
					url: '/pages/goods/goods' + '?type=goods'
				})
				break
			case 6:
				uni.navigateTo({
					url: '/pages/goods/goods' + '?type=device'
				})
				break
			case 7:
				uni.navigateTo({
					url: '/pages/goods/goods' + '?type=healthCare'
				})
				break
			case 8:
				uni.navigateTo({
					url: '/pages/news/news'
				})
				break
		}
	}
</script>

<style lang="scss">
	.carousel {
		margin: 20rpx 20rpx 0 20rpx;
		border-radius: 20rpx;
	}

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
			position: relative;

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

			.vertical_line {
				position: absolute;
				width: 2rpx;
				height: 100rpx;
				background-color: #d0d0d5;
				top: 50%;
				right: 0;
				transform: translateY(-50%);
			}

			.horizontal_line {
				position: absolute;
				width: 100rpx;
				height: 2rpx;
				background-color: #d0d0d5;
				bottom: 0;
				left: 50%;
				transform: translateX(-50%);
			}
		}
	}
</style>