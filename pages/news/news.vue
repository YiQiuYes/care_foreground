<template>
	<view>
		<!-- 新闻轮播图 -->
		<carousel class="carousel" :config="config"></carousel>
		<!-- 新闻类型切换 -->
		<v-tabs class="tabs" v-model="current_news_type_index" :tabs="news_type_tabs" @change="change_news_type_method"
			line-color="rgba(255, 143, 169, 1)" bg-color="transparent" color="#959899"
			active-color="rgba(227, 16, 65, 1)" font-size="31rpx">
		</v-tabs>

		<!-- 数据列表 -->
		<view v-show="current_news_type_index === 0">
			<newslist :news_list="notice_news_list"></newslist>
		</view>
		<view v-show="current_news_type_index === 1">
			<newslist :news_list="new_news_list"></newslist>
		</view>
		<view v-show="current_news_type_index === 2">
			<newslist :news_list="policy_news_list"></newslist>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { Ref, ref } from 'vue'
	import { onMounted } from 'vue'
	import carousel from '@/components/carousel.vue'
	import newslist from '@/components/news_list.vue'
	import { newslist_api, news_slide_api } from '@/api/news.ts'

	const config : Ref<{
		autoplay : boolean,
		interval : number,
		itemList : {
			url : string,
			src : string
		}[]
	}> = ref({
		autoplay: true,
		interval: 3000,
		itemList: []
	})

	const news_type_tabs : string[] = ['公告', '新闻', '政策']

	const current_news_type_index : Ref<number> = ref(0);

	// 公告列表
	const notice_news_list = ref([])
	// 新闻列表
	const new_news_list = ref([])
	// 政策列表
	const policy_news_list = ref([])

	onMounted(() => {
		news_slide_api().then(res => {
			if (res.code === 200) {
				(res.data as any).forEach((item : { imageSrc : string }) => {
					config.value.itemList.push({
						url: '',
						src: item.imageSrc,
					})
				})
			}
		})

		newslist_api('notice', 1, 30).then(res => {
			if (res.code === 200) {
				notice_news_list.value = res.data as any
			}
		})
	})

	const change_news_type_method = (index : number) => {
		current_news_type_index.value = index
		let type = ""
		switch (index) {
			case 0:
				type = "notice"
				break
			case 1:
				type = "new"
				break
			case 2:
				type = "policy"
				break
			default:
				type = "notice"
				break
		}

		newslist_api(type, 1, 30).then(res => {
			if (res.code === 200) {
				switch (index) {
					case 0:
						notice_news_list.value = res.data as any
						break
					case 1:
						new_news_list.value = res.data as any
						break
					case 2:
						policy_news_list.value = res.data as any
						break
				}
			}
		})
	}
</script>

<style lang="scss">
	.carousel {
		margin: 20rpx 20rpx 0 20rpx;
		border-radius: 20rpx;
	}

	.tabs {
		margin-left: 210rpx;
		margin-top: 20rpx;
	}
</style>