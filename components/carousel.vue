<template>
	<view class="carousel">
		<swiper @change="change" :circular="config?.circular || true" :autoplay="config?.autoplay || false"
			:interval="config?.interval || 3000">
			<swiper-item v-for="(item, index) in config?.itemList" :key="index">
				<navigator :url="item.url" :open-type="item.openType || 'navigate'" hover-class="none"
					class="navigator">
					<image mode="aspectFill" class="image" :src="item.src"></image>
				</navigator>
			</swiper-item>
		</swiper>
		<!-- 指示点 -->
		<view class="indicator">
			<text v-for="(item, index) in config?.itemList" :key="item" class="dot"
				:class="{ active: index === activeIndex }"></text>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { ref, defineProps } from 'vue'

	interface Config {
		autoplay : boolean,
		interval : number,
		circular ?: boolean,
		itemList : {
			url : string,
			openType ?: string,
			src : string
		}[]
	}

	const props = defineProps({
		config: {
			type: Object as () => Config,
			required: true
		}
	})

	const activeIndex = ref(0)
	const change = (e : { detail : { current : number } }) => {
		activeIndex.value = e.detail.current
	}
</script>

<style lang="scss">
	.carousel {
		height: 280rpx;
		position: relative;
		overflow: hidden;
		transform: translateY(0);
		background-color: #efefef;

		.indicator {
			position: absolute;
			left: 0;
			right: 0;
			bottom: 16rpx;
			display: flex;
			justify-content: center;
			filter: invert(50%);

			@keyframes indicator_normal {
				from {
					width: 40rpx;
				}

				to {
					width: 20rpx;
				}
			}

			@keyframes indicator_alternate {
				from {
					width: 20rpx;
				}

				to {
					width: 40rpx;
				}
			}

			.dot {
				width: 20rpx;
				height: 10rpx;
				margin: 0 7rpx;
				border-radius: 15rpx;
				background-color: rgba(255, 255, 255, 0.4);
				animation: indicator_normal 400ms;
			}

			.active {
				background-color: #fff;
				width: 40rpx;
				animation: indicator_alternate 400ms;
			}
		}

		.navigator,
		.image {
			width: 100%;
			height: 100%;
		}
	}
</style>