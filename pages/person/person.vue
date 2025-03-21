<template>
	<view>
		<!-- 用户头像昵称 -->
		<view class="user-info-container">
			<view class="image-container">
				<image class="image" :src="user.avatar"></image>
			</view>
			<view class="info-container">
				<text>{{ user.username }}</text>
			</view>
		</view>
		<!-- 我的订单 -->
		<view class="card-container">
			<view class="card-tip" @click="navigateToOrder('all')">
				<view class="card-tip-left">
					<text>我的订单</text>
				</view>
				<view class="card-tip-right">
					<text>查看更多></text>
				</view>
			</view>
			<view class="content-container">
				<view class="edit-container" @click="navigateToOrder('shipments')">
					<view class="image-container">
						<image class="image" src="/static/images/shipments.png"></image>
					</view>
					<view class="text">
						<text>待发货</text>
					</view>
				</view>
				<view class="edit-container" @click="navigateToOrder('receiving')">
					<view class="image-container">
						<image class="image" src="/static/images/receiving.png"></image>
					</view>
					<view class="text">
						<text>待收货</text>
					</view>
				</view>
				<view class="edit-container" @click="navigateToOrder('appraise')">
					<view class="image-container">
						<image class="image" src="/static/images/appraise.png"></image>
					</view>
					<view class="text">
						<text>待评价</text>
					</view>
				</view>
				<view class="edit-container" @click="navigateToOrder('finish')">
					<view class="image-container">
						<image class="image" src="/static/images/finish.png"></image>
					</view>
					<view class="text">
						<text>已完成</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 底部固定栏 -->
		<view class="footer">
			<view>
				<button class="btn" @click="logout" size="mini">退出登陆</button>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { getUserInfo } from "@/api/user.ts"
import { ref } from "vue"
import { onLoad } from "@dcloudio/uni-app"
import { useStore } from "vuex"

const user = ref({})
const store = useStore()

onLoad(() => {
	getUserInfo().then((res) => {
		if (res.code === 200) {
			user.value = res.data;
		}
	})
})

const navigateToOrder = (type: string) => {
	uni.navigateTo({
		url: `/pages/orders/orders?type=${type}`
	})
}

const logout = () => {
	store.commit('set_login', false)
	uni.showToast({ title: '退出登录成功！', icon: 'none' })
	setTimeout(() => {
		uni.reLaunch({ url: '/pages/login/login' })
	}, 2000)
}
</script>

<style scoped lang="scss">
.user-info-container {
	display: flex;
	align-items: center;

	.image-container {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50rpx;
		margin-left: 20rpx;
		margin-top: 20rpx;

		.image {
			width: 100%;
			height: 100%;
			border-radius: 50%;
		}
	}

	.info-container {
		margin-left: 20rpx;
		margin-top: 20rpx;
		font-weight: bold;
		font-size: 37rpx;
	}
}

.card-container {
	display: flex;
	flex-direction: column;
	margin: 50rpx 20rpx 20rpx 20rpx;
	border-radius: 20rpx;
	padding: 20rpx;
	box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.2);

	.card-tip {
		display: flex;
		justify-content: space-between;

		.card-tip-left {
			font-weight: bold;
			font-size: 35rpx;
			margin-left: 20rpx;
		}

		.card-tip-right {
			font-size: 28rpx;
			color: #999999;
			margin-right: 20rpx;
		}
	}

	.content-container {
		display: flex;
		justify-content: space-around;
		margin-top: 40rpx;
		margin-bottom: 20rpx;

		.edit-container {
			display: flex;
			flex-direction: column;

			.image-container {
				width: 70rpx;
				height: 70rpx;

				.image {
					width: 100%;
					height: 100%;
				}
			}

			.text {
				font-size: 28rpx;
				margin-top: 10rpx;
				color: #999999;
			}
		}
	}
}

.footer {
	position: fixed;
	width: 100%;
	bottom: 0;
	background-color: #fff;
	padding: 20rpx 0;
	display: flex;
	justify-content: center;

	.btn {
		width: 300rpx;
		background-color: #7098da;
		color: #fff;
		border-radius: 100rpx;
	}
}
</style>
