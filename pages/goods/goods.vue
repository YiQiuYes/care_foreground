<template>
	<view>
		<!-- 搜索条 -->
		<view class="search-bar">
			<uni-search-bar v-model="searchName" class="uni-mt-10" radius="100" placeholder="搜索" clearButton="auto"
				cancelButton="none" @confirm="search_confirm" />
		</view>
		<!-- 条件tab切换 -->
		<view class="tabs-container">
			<v-tabs v-model="current_tabs_index" :scroll="false" :tabs="tabs" @change="change_tabs_method"
				line-color="rgba(255, 143, 169, 1)" bg-color="transparent" color="#959899"
				active-color="rgba(227, 16, 65, 1)" font-size="31rpx">
			</v-tabs>
		</view>
		<!-- 商品列表 -->
		<view class="list-container">
			<view v-for="(item, index) in goods_list" :key="index" class="goods-item" @click="go_detail(item)">
				<view class="image-container">
					<image class="image" :src="item.imageSrc" mode="aspectFill" style="width: 100%; height: 200rpx;">
					</image>
				</view>
				<view class="name">
					<text>{{ item.name }}</text>
				</view>
				<view class="shopping-container">
					<view class="price">
						<text>¥{{ item.price }}</text>
					</view>
					<view class="image-container">
						<image class="image" src="/static/images/purchase.png" />
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { onLoad, onReachBottom } from '@dcloudio/uni-app'
	import { Ref, ref } from 'vue'
	import { goodslist_api } from '@/api/goods.ts'

	let type : string = ''
	const goods_list = ref([])
	const searchName : Ref<string> = ref('')
	const tabs : string[] = ['综合', '最新', '销量', '价格升序', '价格降序']
	const current_tabs_index : Ref<number> = ref(0)

	const change_tabs_method = (index : number) => {
		console.log(index)
	}

	const search_confirm = (res) => {
		console.log(res)
	}

	const go_detail = (item) => {
		uni.navigateTo({
			url: `/pages/goods_detail/goods_detail?data=${JSON.stringify(item)}`
		})
	}

	onLoad((option) => {
		type = option.type
		let title : string = ''
		switch (type) {
			case 'common':
				title = '商品列表'
				break
			case 'housekeeping':
				title = '家政服务列表'
				break
			case 'medicalCare':
				title = '医养结合列表'
				break
			case 'ageingAtHome':
				title = '居家养老列表'
				break
			case 'goods':
				title = '商城购物列表'
				break
			case 'device':
				title = '辅具租赁列表'
				break
			case 'healthCare':
				title = '医护上门列表'
				break
			default:
				title = '详细内容'
				break
		}

		// 设置标题
		uni.setNavigationBarTitle({
			title: title
		})

		goodslist_api(type, Math.floor(goods_list.value.length / 10) + 1, 10).then(res => {
			if (res.code === 200) {
				goods_list.value = goods_list.value.concat(res.data.records)
			}
		})
	})

	onReachBottom(() => {
		uni.showLoading({
			title: '加载中...'
		})

		goodslist_api(type, Math.floor(goods_list.value.length / 10) + 1, 10).then(res => {
			uni.hideLoading()
			if (res.code === 200 && goods_list.value.length < (res.data.total as number)) {
				goods_list.value = goods_list.value.concat(res.data.records)
			} else if (length >= (res.data.total as number)) {
				uni.showToast({
					title: '没有更多数据了',
					icon: 'none'
				})
			}
		})
	})
</script>

<style scoped lang="scss">
	.search-bar {
		margin: 20rpx 20rpx 0 20rpx;
	}

	.tabs-container {
		margin-top: 10rpx;
	}

	.list-container {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 20rpx;
		margin: 30rpx 20rpx 0 20rpx;

		.goods-item {
			display: flex;
			flex-direction: column;
			box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);
			border-radius: 20rpx;

			.image-container {
				width: 100%;
				height: 200rpx;

				border-radius: 20rpx 20rpx 0 0;

				.image {
					width: 100%;
					height: 100%;
				}
			}

			.name {
				font-size: 32rpx;
				margin: 20rpx 20rpx 0 20rpx;
				height: 100rpx;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			.shopping-container {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin: 25rpx 20rpx 30rpx 20rpx;

				.price {
					font-size: 35rpx;
					font-weight: bold;
					color: #ff2e63;
				}

				.image-container {
					width: 70rpx;
					height: 70rpx;
					margin-right: 10rpx;

					.image {
						width: 100%;
						height: 100%;
					}
				}
			}
		}
	}
</style>