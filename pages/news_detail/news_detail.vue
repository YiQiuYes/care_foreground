<template>
	<view>
		<!-- 标题 -->
		<view class="title">{{ news_detail.title }}</view>
		<!-- 来源与时间和日期 -->
		<view class="horizontal_container">
			<view>来源：{{ news_detail.source }}</view>
			<view>{{ new Date(news_detail.createTime).toLocaleString() }}</view>
		</view>
		<!-- 内容 -->
		<view class="content">
			<rich-text>{{ news_detail.content }}</rich-text>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { ref, Ref } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'

	interface NewsDetail {
		id : number,
		title : string,
		content : string,
		imageSrc : string,
		source : string,
		type : string,
		createTime : string
	}

	let news_detail : Ref<NewsDetail> = ref({
		id: 0,
		title: "",
		content: "",
		imageSrc: "",
		source: "",
		type: "",
		createTime: ""
	})

	onLoad((option) => {
		news_detail.value = JSON.parse(option.data)
		let title : string = ''
		switch (news_detail.value.type) {
			case 'notice':
				title = '公告详细'
				break
			case 'new':
				title = '新闻详细'
				break
			case 'policy':
				title = '政策详细'
				break
			default:
				title = '详细内容'
				break
		}

		// 设置标题
		uni.setNavigationBarTitle({
			title: title
		})
	})
</script>

<style lang="scss">
	.title {
		margin-top: 45rpx;
		margin-left: 30rpx;
		font-size: 35rpx;
		font-weight: bold;
	}

	.horizontal_container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin: 25rpx 20rpx 0 20rpx;
		font-size: 26rpx;
		color: #828282;
	}

	.content {
		margin: 25rpx 20rpx 0 20rpx;
		font-size: 28rpx;
	}
</style>