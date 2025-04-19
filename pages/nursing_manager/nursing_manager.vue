<template>
	<view class="page-container">
		<view class="function-container">
			<!-- 为每个功能块添加点击事件和动画类 -->
			<view class="item-info bg-bed-info" @click="navigateTo('bed_info')">
				<view class="icon-wrapper">
					<image class="icon" src="/static/images/home.png"></image>
				</view>
				<text class="function-title">床位信息</text>
			</view>

			<view class="item-info bg-reservation" @click="navigateTo('reservation')">
				<view class="icon-wrapper">
					<image class="icon" src="/static/images/home.png"></image>
				</view>
				<text class="function-title">床位预定</text>
			</view>

			<view class="item-info bg-allocation" @click="navigateTo('allocation')">
				<view class="icon-wrapper">
					<image class="icon" src="/static/images/home.png"></image>
				</view>
				<text class="function-title">分配人员</text>
			</view>

			<view class="item-info bg-older-info" @click="navigateTo('older_info')">
				<view class="icon-wrapper">
					<image class="icon" src="/static/images/home.png"></image>
				</view>
				<text class="function-title">老人信息</text>
			</view>

			<view class="item-info bg-medicine" @click="navigateTo('medicine')">
				<view class="icon-wrapper">
					<image class="icon" src="/static/images/home.png"></image>
				</view>
				<text class="function-title">用药管理</text>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { onShow } from '@dcloudio/uni-app'

// onShow(() => {
// 	uni.showModal({
// 		title: '提示',
// 		content: "尚未查询到入住信息，请确定您是否已经预约并线下办理了入住，点击确认前往预约，点击取消返回首页",
// 		success: (res) => {
// 			if (res.confirm) {
// 				uni.switchTab({
// 					url: '/pages/home/home'
// 				})

// 				uni.navigateTo({
// 					url: '/pages/nursing/nursing'
// 				})
// 			} else {
// 				uni.switchTab({
// 					url: '/pages/home/home'
// 				})
// 			}
// 		}
// 	})
// })

const navigateTo = (url: string) => {
	uni.navigateTo({
		url: `/pages/${url}/${url}`
	})	
}
</script>

<style scoped lang="scss">
.page-container {
	padding: 20rpx;
	background: #f5f7fa;
	min-height: 100vh;

	.function-container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220rpx, 1fr));
		gap: 24rpx;
		margin: 0 20rpx;

		.item-info {
			height: 280rpx;
			border-radius: 24rpx;
			padding: 20rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			transition: all 0.3s ease;
			box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.08);

			&:active {
				transform: scale(0.98);
			}

			.icon-wrapper {
				width: 120rpx;
				height: 120rpx;
				background: rgba(255, 255, 255, 0.2);
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-bottom: 20rpx;

				.icon {
					width: 80rpx;
					height: 80rpx;
				}
			}

			.function-title {
				font-size: 30rpx;
				color: #fff;
				font-weight: 500;
				text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
			}
		}

		// 渐变色方案
		.bg-bed-info {
			background: linear-gradient(135deg, #08d9d6, #07c1be);
		}

		.bg-reservation {
			background: linear-gradient(135deg, #f9ed69, #f7d842);
		}

		.bg-allocation {
			background: linear-gradient(135deg, #b83b5e, #a83252);
		}

		.bg-older-info {
			background: linear-gradient(135deg, #6a2c70, #5c2463);
		}

		.bg-medicine {
			background: linear-gradient(135deg, #ffb6b9, #ff99a2);
		}
	}

	@media (max-width: 768px) {
		.function-container {
			grid-template-columns: repeat(2, 1fr);
		}
	}
}
</style>