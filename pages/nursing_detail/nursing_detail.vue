<template>
	<view>
		<!-- 介绍轮播图 -->
		<carousel class="carousel" :config="config"></carousel>
	</view>
</template>

<script setup lang="ts">
	import { ref, Ref } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	import carousel from '@/components/carousel.vue'
	import { get_nursing_by_id } from '@/api/nursing.ts'

	interface NursingDetail {
		id : number,
		name : string,
		address : string,
		phone : string,
		content : string,
		time : string,
		bunkCount : number,
		workerCount : number,
		size : number,
		aptitude : number,
		images : string[],
		infoImage : string,
		location : string
	}

	const nursing_detail : Ref<NursingDetail> = ref({
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

	onLoad((option) => {
		nursing_detail.value = JSON.parse(option.data)
		let title : string = nursing_detail.value.name

		// 设置标题
		uni.setNavigationBarTitle({
			title: title
		})

		get_nursing_by_id(nursing_detail.value.id).then(res => {
			if (res.code === 200) {
				nursing_detail.value = res.data as any
				nursing_detail.value.images.forEach((item : string) => {
					config.value.itemList.push({
						url: '',
						src: item
					})
				})
			}
		})
	})
</script>

<style lang="scss">
	.carousel {
		margin: 20rpx 20rpx 0 20rpx;
		border-radius: 20rpx;
	}
</style>