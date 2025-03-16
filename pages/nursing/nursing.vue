<template>
	<view>
		<!-- 横向容器 -->
		<view class="border" v-for="(item, index) in nursing_list" :key="index">
			<view class="container" @click="navigatorToDetail(index)">
				<!-- 左侧图片 -->
				<view class="img_container">
					<image class="img" :src="item.infoImage"></image>
				</view>
				<!-- 信息容器 -->
				<view class="info_container">
					<!-- 标题 -->
					<view class="title">{{ item.name }}</view>
					<!-- 营业时间 -->
					<view class="time">营业时间：{{ item.time }}</view>
					<!-- 距离 -->
					<view class="distance">{{ getDistance(item.location, location) }}</view>
				</view>
				<!-- 前往图标 -->
				<view class="head_for_container">
					<image class="head_for_img" src="/static/images/head_for.png"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { nursinglist_api } from '@/api/nursing.ts'
import { ref, onMounted } from 'vue'
import { onReachBottom } from '@dcloudio/uni-app'
import { getDistance } from '@/utils/index.ts'

const nursing_list = ref([])
const location = ref({
	longitude: 0,
	latitude: 0
})

onMounted(() => {
	nursinglist_api(Math.floor(nursing_list.value.length / 10) + 1, 10).then((res) => {
		if (res.code === 200 && nursing_list.value.length < (res.data.total as number)) {
			nursing_list.value = nursing_list.value.concat(res.data.records)
		}
	})

	getLocation()
})

onReachBottom(() => {
	uni.showLoading({
		title: '加载中...'
	})

	nursinglist_api(Math.floor(nursing_list.value.length / 10) + 1, 10).then(res => {
		uni.hideLoading()
		if (res.code === 200 && length < (res.data.total as number)) {
			nursing_list.value = nursing_list.value.concat(res.data.records)
		} else if (length >= (res.data.total as number)) {
			uni.showToast({
				title: '没有更多数据了',
				icon: 'none'
			})
		}
	})
})

const getLocation = () => {
	uni.getLocation({
		success: function (res) {
			location.value.longitude = res.longitude
			location.value.latitude = res.latitude
		}
	})
}

const navigatorToDetail = (index: number) => {
	uni.navigateTo({
		url: `/pages/nursing_detail/nursing_detail?data=${JSON.stringify(nursing_list.value[index])}&location=${JSON.stringify(location.value)}`
	})
}
</script>

<style lang="scss">
.border {
	margin: 20rpx 30rpx;
	border: 1rpx solid #f0f0f0;
	border-radius: 15rpx;

	.container {
		display: flex;
		height: 150rpx;
		margin: 20rpx;

		.img_container {
			width: 150rpx;
			height: 100%;

			.img {
				width: 100%;
				height: 100%;
				border-radius: 15rpx;
			}
		}

		.info_container {
			margin-left: 35rpx;
			height: 100%;

			.title {
				margin-top: 5rpx;
				font-size: 28rpx;
				font-weight: bold;
			}

			.time {
				margin-top: 10rpx;
				font-size: 24rpx;
			}

			.distance {
				margin-top: 15rpx;
				font-size: 24rpx;
				color: #999;
			}
		}

		.head_for_container {
			display: flex;
			width: 70rpx;
			height: 70rpx;
			margin-left: auto;
			margin-top: 40rpx;
			margin-right: 5rpx;

			.head_for_img {
				width: 100%;
				height: 100%;
			}
		}
	}
}
</style>