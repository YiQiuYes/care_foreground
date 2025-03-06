<template>
	<view>
		<view class="news_list">
			<view class="news_item" v-for="(item, index) in news_list" :key="index">
				<!-- 标题 -->
				<view class="title">{{ item.title }}</view>
				<!-- 时间和日期 -->
				<view class="time">{{ new Date(item.createTime).toLocaleString() }}</view>
				<!-- 横线 -->
				<view class="horizontal_line" v-if="index != news_list.length - 1"></view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { defineProps } from 'vue'

	const props = defineProps({
		news_list: {
			type: Object as () => {
				id : number,
				title : string,
				content : string,
				imageSrc : string,
				source : string,
				type : string,
				createTime : string
			}[],
			required: true
		}
	})
</script>

<style lang="scss">
	.news_list {
		display: flex;
		flex-direction: column;
		margin-top: 20rpx;

		.news_item {
			display: flex;
			flex-direction: column;
			margin: 0 20rpx;

			.title {
				margin-top: 20rpx;
				font-size: 31rpx;
				color: #333;
			}

			.time {
				font-size: 20rpx;
				margin-top: 15rpx;
				color: #999;
			}

			.horizontal_line {
				margin-top: 20rpx;
				height: 2rpx;
				background-color: #d0d0d5;
				bottom: 0;
			}
		}
	}
</style>