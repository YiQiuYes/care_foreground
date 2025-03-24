<template>
	<view>
		<view class="function-container">
			<view class="item-info" style="background-color: #08d9d6;">
				<view class="image-container">
					<image class="image" src="/static/images/home.png"></image>
				</view>
				<text class="text">床位信息</text>
			</view>
			<view class="item-info" style="background-color: #f9ed69;">
				<view class="image-container">
					<image class="image" src="/static/images/home.png"></image>
				</view>
				<text class="text">床位预定</text>
			</view>
			<view class="item-info" style="background-color: #b83b5e;">
				<view class="image-container">
					<image class="image" src="/static/images/home.png"></image>
				</view>
				<text class="text">分配人员</text>
			</view>
			<view class="item-info" style="background-color: #6a2c70;">
				<view class="image-container">
					<image class="image" src="/static/images/home.png"></image>
				</view>
				<text class="text">老人信息</text>
			</view>
			<view class="item-info" style="background-color: #ffb6b9;">
				<view class="image-container">
					<image class="image" src="/static/images/home.png"></image>
				</view>
				<text class="text">用药管理</text>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { onShow } from '@dcloudio/uni-app'

	onShow(() => {
		uni.showModal({
			title: '提示',
			content: "尚未查询到入住信息，请确定您是否已经预约并线下办理了入住，点击确认前往预约，点击取消返回首页",
			success: (res) => {
				if (res.confirm) {
					uni.switchTab({
						url: '/pages/home/home'
					})
					uni.navigateTo({
						url: '/pages/nursing/nursing'
					})
				} else {
					uni.switchTab({
						url: '/pages/home/home'
					})
				}
			}
		})
	})
</script>

<style scoped lang="scss">
	.function-container {
		// 网格布局
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		margin: 20rpx;
		gap: 20rpx;

		.item-info {
			height: 220rpx;
			border-radius: 20rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.image-container {
				width: 80rpx;
				height: 80rpx;

				.image {
					width: 100%;
					height: 100%;
				}
			}

			.text {
				margin-top: 20rpx;
			}
		}
	}
</style>