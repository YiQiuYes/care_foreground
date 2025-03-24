<template>
	<view>
		<view class="container">
			<view class="horizontal-container">
				<view class="tip-text">
					<text>收货人</text>
				</view>
				<input class="input" v-model="postForm.name" placeholder="请输入收货人姓名" />
			</view>
			<view class="horizontal-line"></view>
			<view class="horizontal-container">
				<view class="tip-text">
					<text>联系电话</text>
				</view>
				<input class="input" v-model="postForm.phone" placeholder="请输入联系电话" />
			</view>
			<view class="horizontal-line"></view>
			<picker mode="region" @change="onChangeRegion">
				<view class="address-horizontal-container">
					<view class="tip-container">
						<text>所在地区</text>
						<text style="margin-left: 30rpx;">{{ postForm.province + postForm.city + postForm.district
                            }}</text>
					</view>
					<view class="choice-address-text">
						<text>请选择></text>
					</view>
				</view>
			</picker>
			<view class="horizontal-line"></view>
			<view class="horizontal-container">
				<view class="tip-text">
					<text>详细地址</text>
				</view>
				<input class="input" v-model="postForm.detail" placeholder="请输入详细地址" />
			</view>
		</view>
		<!-- 底部固定栏 -->
		<view class="footer">
			<view class="btn-container">
				<button class="btn" @click="btnAddress" size="mini">确认</button>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { addAddress, AddressDTO, updateAddress } from '@/api/user.ts'
	import { ref, Ref } from 'vue'
	import { onLoad, onUnload } from '@dcloudio/uni-app'

	const postForm : Ref<AddressDTO> = ref({
		id: undefined,
		name: '',
		phone: '',
		province: '',
		city: '',
		district: '',
		detail: '',
		isDefault: false
	})

	onLoad((option) => {
		let address = option.data
		if (address) {
			address = JSON.parse(address)
			postForm.value.id = address.id
			postForm.value.name = address.name
			postForm.value.phone = address.phone
			postForm.value.province = address.province
			postForm.value.city = address.city
			postForm.value.district = address.district
			postForm.value.detail = address.detail
			postForm.value.isDefault = address.isDefault
		}
	})

	const onChangeRegion = (e : any) => {
		postForm.value.province = e.detail.value[0]
		postForm.value.city = e.detail.value[1]
		postForm.value.district = e.detail.value[2]
	}

	const btnAddress = () => {
		if (postForm.value.id) {
			updateAddress(postForm.value).then(res => {
				if (res.code === 200) {
					uni.showToast({
						title: '修改成功',
						icon: 'success',
						duration: 2000
					})

					uni.$emit('address', { refresh: true });

					setTimeout(() => {
						uni.navigateBack()
					}, 2000)
				} else {
					uni.showToast({
						title: '修改失败',
						icon: 'none',
						duration: 2000
					})
				}
			})
		} else {
			addAddress(postForm.value).then(res => {
				if (res.code === 200) {
					uni.showToast({
						title: '添加成功',
						icon: 'success',
						duration: 2000
					})

					uni.$emit('address', { refresh: true });

					setTimeout(() => {
						uni.navigateBack()
					}, 2000)
				} else {
					uni.showToast({
						title: '添加失败',
						icon: 'none',
						duration: 2000
					})
				}
			})
		}
	}
</script>

<style scoped lang="scss">
	.container {
		box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);
		border-radius: 20rpx;
		margin: 20rpx 20rpx 0 20rpx;
		padding: 20rpx 20rpx 20rpx 20rpx;

		.horizontal-container {
			display: flex;

			.tip-text {
				font-size: 28rpx;
				width: 120rpx;
			}

			.input {
				font-size: 28rpx;
				margin-left: 25rpx;
			}
		}

		.horizontal-line {
			height: 1rpx;
			background-color: #dbdbdb;
			margin-top: 20rpx;
			margin-bottom: 20rpx;
		}

		.address-horizontal-container {
			display: flex;
			justify-content: space-between;

			.tip-container {
				font-size: 28rpx;
			}

			.choice-address-text {
				font-size: 28rpx;
				margin-right: 25rpx;
				color: #999999;
			}
		}
	}

	.footer {
		position: fixed;
		display: flex;
		width: 100%;
		justify-content: space-between;
		bottom: 0;
		background-color: #fff;
		padding: 20rpx 0;

		.btn-container {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;

			.btn {
				width: 80%;
				display: flex;
				background-color: #7098da;
				color: #fff;
				border-radius: 10rpx;
				justify-content: center;
			}
		}
	}
</style>