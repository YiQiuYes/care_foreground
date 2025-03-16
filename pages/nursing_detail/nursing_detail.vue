<template>
	<view>
		<!-- 介绍轮播图 -->
		<carousel class="carousel" :config="config"></carousel>
		<!-- 标题横向组 -->
		<view class="head-container">
			<!-- 介绍图片 -->
			<view class="image-container">
				<image class="image" :src="nursing_detail.infoImage" mode="scaleToFill" />
			</view>
			<view class="right-container">
				<!-- 养老院名称 -->
				<view class="name">
					<text>{{ nursing_detail.name }}</text>
				</view>
				<!-- 营业时间 -->
				<view class="time">
					<text>{{ nursing_detail.time }}</text>
				</view>
				<!-- 距离 -->
				<view class="distance">
					<text>{{ getDistance(nursing_detail.location, location) }}</text>
				</view>
			</view>
		</view>
		<!-- 电话行 -->
		<view class="inline-container">
			<view class="blok">
				<image class="img" src="/static/images/phone.png"></image>
				<text class="text">{{ nursing_detail.phone }}</text>
			</view>
			<view>
				<button class="btn" @click="callPhone" size="mini">
					拨打电话
				</button>
			</view>
		</view>
		<!-- 地址行 -->
		<view class="inline-container">
			<view class="blok">
				<image class="img" src="/static/images/address.png"></image>
				<text class="text">{{ nursing_detail.address }}</text>
			</view>
			<view>
				<button class="btn" @click="openLocation" size="mini">
					导航到这
				</button>
			</view>
		</view>
		<!-- 院点信息 -->
		<view class="nursing-info">
			<view class="title">
				<text>养老院信息</text>
			</view>
			<view class="horizontal">
				<view class="blok">
					<view class="img-container">
						<image class="img" src="/static/images/bed.png" />
					</view>
					<view class="tip">
						<text>床位数</text>
					</view>
					<view class="text">
						<text>{{ nursing_detail.bunkCount }}张</text>
					</view>
				</view>

				<view class="blok">
					<view class="img-container">
						<image class="img" src="/static/images/worker.png" />
					</view>
					<view class="tip">
						<text>职工</text>
					</view>
					<view class="text">
						<text>{{ nursing_detail.workerCount }}人</text>
					</view>
				</view>

				<view class="blok">
					<view class="img-container">
						<image class="img" src="/static/images/size.png" />
					</view>
					<view class="tip">
						<text>面积</text>
					</view>
					<view class="text">
						<text>{{ nursing_detail.size }}㎡</text>
					</view>
				</view>

				<view class="blok">
					<view class="img-container">
						<image class="img" src="/static/images/aptitude.png" />
					</view>
					<view class="tip">
						<text>资质</text>
					</view>
					<view class="text">
						<text>{{ nursing_detail.aptitude }}级</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 详细介绍 -->
		<view class="nursing-content">
			<view class="title">
				<text>详细介绍</text>
			</view>
			<view class="content">
				<rich-text :nodes="nursing_detail.content"></rich-text>
			</view>
		</view>
		<!-- 底部固定栏 -->
		<view class="footer">
			<view class="btn-container">
				<button class="btn" @click="callPhone" size="mini">电话咨询</button>
			</view>
			<view class="btn-container">
				<button class="btn" size="mini">立即预约</button>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import carousel from '@/components/carousel.vue'
import { get_nursing_by_id } from '@/api/nursing.ts'
import { getDistance } from '@/utils/index.ts'

interface NursingDetail {
	id: number,
	name: string,
	address: string,
	phone: string,
	content: string,
	time: string,
	bunkCount: number,
	workerCount: number,
	size: number,
	aptitude: number,
	images: string[],
	infoImage: string,
	location: string
}

const nursing_detail: Ref<NursingDetail> = ref({
	id: 0,
	name: "",
	address: "",
	phone: "",
	content: "",
	time: "",
	bunkCount: 0,
	workerCount: 0,
	size: 0,
	aptitude: 0,
	images: [],
	infoImage: "",
	location: ""
})

let location = {}

const config: Ref<{
	autoplay: boolean,
	interval: number,
	itemList: {
		url: string,
		src: string
	}[]
}> = ref({
	autoplay: true,
	interval: 3000,
	itemList: []
})

onLoad((option) => {
	nursing_detail.value = JSON.parse(option.data)
	location = JSON.parse(option.location)
	let title: string = nursing_detail.value.name

	// 设置标题
	uni.setNavigationBarTitle({
		title: title
	})

	get_nursing_by_id(nursing_detail.value.id).then(res => {
		if (res.code === 200) {
			nursing_detail.value = res.data as any
			nursing_detail.value.images.forEach((item: string) => {
				config.value.itemList.push({
					url: '',
					src: item
				})
			})
		}
	})
})

const callPhone = () => {
	uni.makePhoneCall({
		phoneNumber: nursing_detail.value.phone,
		success: (_success) => { },
		fail: (_fail) => {
			uni.showToast({
				title: '拨打电话失败',
				icon: 'none'
			})
		},
	})
}

const openLocation = () => {
	uni.openLocation({
		latitude: parseFloat(nursing_detail.value.location.split(',')[1]),
		longitude: parseFloat(nursing_detail.value.location.split(',')[0]),
		name: nursing_detail.value.name,
		address: nursing_detail.value.address,
		scale: 5,
		success: (_success) => { },
		fail: (_fail) => {
			uni.showToast({
				title: '打开地图失败',
				icon: 'none'
			})
		},
	})
}
</script>

<style lang="scss">
.carousel {
	margin: 20rpx 20rpx 0 20rpx;
	border-radius: 20rpx;
}

.head-container {
	// 横向布局
	display: flex;
	margin-left: 20rpx;

	.image-container {
		width: 200rpx;
		height: 200rpx;

		image {
			width: 100%;
			height: 100%;
			border-radius: 15rpx;
		}
	}

	.right-container {
		margin-left: 20rpx;

		.name {
			margin-top: 15rpx;
			font-size: 36rpx;
			font-weight: bold;
		}

		.time {
			display: inline-block;
			background-color: #7098da;
			border-radius: 10rpx;
			padding: 5rpx 15rpx;
			margin-top: 15rpx;
			font-size: 32rpx;
			color: white;
		}

		.distance {
			margin-top: 15rpx;
			font-size: 29rpx;
			color: #999;
		}
	}
}

.inline-container {
	display: flex;
	justify-content: space-between;
	border-bottom: 2px solid #f0f0f0;
	padding-bottom: 15rpx;
	margin: 40rpx 20rpx 0 20rpx;

	.blok {
		display: flex;
		align-items: center;

		.img {
			width: 50rpx;
			height: 50rpx;
			margin-left: 20rpx;
		}

		.text {
			width: 450rpx;
			font-size: 30rpx;
			margin-left: 10rpx;
		}
	}

	.btn {
		display: flex;
		background-color: #7098da;
		color: #fff;
		border-radius: 10rpx;
	}
}

.nursing-info {
	display: flex;
	flex-direction: column;
	margin: 40rpx 20rpx 0 20rpx;
	border: 1rpx solid #7098da;
	border-radius: 20rpx;
	padding: 20rpx;

	.title {
		display: flex;
		justify-content: center;
		font-size: 36rpx;
		font-weight: bold;
		color: #7098da;
	}

	.horizontal {
		display: flex;
		justify-content: space-between;
		margin-top: 30rpx;

		.blok {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin: 0 20rpx;

			.img-container {
				width: 80rpx;
				height: 80rpx;

				.img {
					width: 100%;
					height: 100%;
				}
			}

			.tip {
				margin-top: 10rpx;
				font-size: 25rpx;
				color: #7098da;
			}

			.text {
				margin-top: 10rpx;
				font-size: 28rpx;
			}
		}
	}
}

.nursing-content {
	display: flex;
	flex-direction: column;
	margin: 40rpx 20rpx 0rpx 20rpx;
	padding-bottom: 140rpx;

	.title {
		display: flex;
		justify-content: center;
		font-size: 36rpx;
		font-weight: bold;
		color: #7098da;
	}

	.content {
		margin-top: 20rpx;
		font-size: 30rpx;
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
		width: 50%;
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