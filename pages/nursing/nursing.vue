<template>
	<!-- 横向容器 -->
	<view class="border">
		<view class="container">
			<!-- 左侧图片 -->
			<view class="img_container">
				<image class="img"
					src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/slider_1.jpg">
				</image>
			</view>
			<!-- 信息容器 -->
			<view class="info_container">
				<!-- 标题 -->
				<view class="title">柳空养老院</view>
				<!-- 营业时间 -->
				<view class="time">营业时间：24小时</view>
				<!-- 距离 -->
				<view class="distance">距离您600公里</view>
			</view>
			<!-- 前往图标 -->
			<view class="head_for_container">
				<image class="head_for_img" src="/static/images/head_for.png"></image>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
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