<template>
	<view>
		<checkbox-group @change="goodsCheckedChange">
			<label class="goods-item" v-for="(item, index) in cart_list" :key="index">
				<checkbox :value="item.id" :checked="item.checked" color="red" />
				<view class="image-container">
					<image class="image" :src="item.goodsDTO.imageSrc"></image>
				</view>
				<view class="goods-info-container">
					<view class="title-container">
						<view class="name">
							<text>{{ item.goodsDTO.name }}</text>
						</view>
						<view class="delete-container" @click="deleteCart(item.id)">
							<image class="image" src="/static/images/delete.png"></image>
						</view>
					</view>
					<view class="price-container">
						<view class="price">
							<text>¥{{ (item.goodsDTO.price * item.count).toFixed(2) }}</text>
						</view>
						<view class="count-container">
							<view class="count-bar">
								<button class="btn" @click="countSub(item.id)" size="mini">-</button>
								<view class="count">
									<text>{{ item.count }}</text>
								</view>
								<button class="btn" @click="item.count++" size="mini">+</button>
							</view>
						</view>
					</view>
				</view>
			</label>
		</checkbox-group>
		<!-- 底部固定栏 -->
		<view class="footer">
			<view>
				<checkbox-group @change="allCheckedChange">
					<label class="all-checked-container">
						<checkbox :checked="allChecked" color="red" />
						<view class="tip-text">
							<text>全选</text>
						</view>
						<view class="total-price">
							<text>合计：¥{{ totalPrice() }}</text>
						</view>
					</label>
				</checkbox-group>
			</view>
			<view>
				<button class="btn" @click="purchase" size="mini">去结算</button>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { cartList, cartDelete } from '@/api/cart.ts'
import { onLoad, onReachBottom } from '@dcloudio/uni-app'
import { ref } from 'vue'

const cart_list = ref([])

const allChecked = ref(false)

onLoad(() => {
	getCartList()
})

onReachBottom(() => {
	uni.showLoading({
		title: '加载中...'
	})

	getCartList().then(() => {
		uni.hideLoading()
	})
})

const allCheckedChange = (e: any) => {
	allChecked.value = !allChecked.value
	cart_list.value.forEach(item => {
		item.checked = allChecked.value
	})
}

const totalPrice = () => {
	return cart_list.value.filter(item => item.checked).reduce((total, item) => {
		return total + item.goodsDTO.price * item.count
	}, 0).toFixed(2)
}

const goodsCheckedChange = (e: any) => {
	console.log(e)
	const checkedList = e.detail.value
	// 检查cart_list中的每一项是否在checkedList中
	cart_list.value.forEach(item => {
		item.checked = checkedList.includes(item.id.toString())
	})
	// 检查是否全选
	allChecked.value = cart_list.value.every(item => item.checked)
}

const getCartList = () => {
	cartList(Math.floor(cart_list.value.length / 10) + 1, 10).then(res => {
		if (res.code === 200 && cart_list.value.length < (res.data.total as number)) {
			res.data.records.forEach(item => {
				item.checked = false
			})
			cart_list.value = cart_list.value.concat(res.data.records)
		}
	})
}

const countSub = (id: number) => {
	cart_list.value.forEach(item => {
		if (item.id === id) {
			if (item.count > 1) {
				item.count--
			}
		}
	})
}

const deleteCart = (id: number) => {
	cartDelete(id).then(res => {
		if (res.code === 200) {
			cart_list.value = cart_list.value.filter(item => item.id !== id)
			uni.showToast({
				title: '删除成功',
				icon: 'success'
			})
		} else {
			uni.showToast({
				title: '删除失败',
				icon: 'none'
			})
		}
	})
}

const purchase = () => {
	const checkedList = cart_list.value.filter(item => item.checked)
	if (checkedList.length === 0) {
		uni.showToast({
			title: '请选择商品',
			icon: 'none'
		})
		return
	}

	const goods = checkedList.map(item => {
		item.goodsDTO.count = item.count
		return item.goodsDTO
	})

	uni.navigateTo({
		url: '/pages/purchase/purchase?data=' + JSON.stringify(goods)
	})
}
</script>

<style scoped lang="scss">
.goods-item {
	display: flex;
	align-items: center;
	margin: 20rpx;
	box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);
	border-radius: 20rpx;
	padding: 20rpx;

	.image-container {
		width: 80px;
		height: 80px;
		margin-left: 30rpx;
		border-radius: 15rpx;

		.image {
			width: 100%;
			height: 100%;
		}
	}

	.goods-info-container {
		display: flex;
		flex-direction: column;

		.title-container {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.name {
				font-size: 35rpx;
				margin-top: 10rpx;
				margin-left: 20rpx;
				margin-right: 20rpx;
			}

			.delete-container {
				width: 40rpx;
				height: 40rpx;
				margin-right: 10rpx;

				.image {
					width: 100%;
					height: 100%;
				}
			}
		}

		.price-container {
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 420rpx;

			.price {
				font-size: 30rpx;
				margin-left: 20rpx;
				margin-top: 25rpx;
				color: #ff2e63;
			}

			.count-container {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 30rpx;
				padding-left: 20rpx;
				padding-right: 20rpx;

				.count-bar {
					display: flex;
					align-items: center;

					.btn {
						border-radius: 10rpx;
					}

					.count {
						font-size: 25rpx;
						margin-left: 20rpx;
						margin-right: 20rpx;
					}
				}
			}
		}
	}
}

.footer {
	position: fixed;
	display: flex;
	justify-content: space-between;
	align-items: center;
	bottom: 0;
	background-color: #fff;
	padding: 20rpx 0;

	.all-checked-container {
		display: flex;
		align-items: center;
		margin-left: 20rpx;

		.tip-text {
			margin-left: 20rpx;
			font-size: 28rpx;
		}

		.total-price {
			margin-left: 30rpx;
			font-size: 32rpx;
			color: #ff2e63;
		}
	}

	.btn {
		position: fixed;
		right: 20rpx;
		bottom: 20rpx;
		background-color: #7098da;
		color: #fff;
		border-radius: 100rpx;
	}
}
</style>
