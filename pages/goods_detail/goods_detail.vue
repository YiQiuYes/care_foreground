<template>
    <view>
        <!-- 商品图片 -->
        <view class="goods-image-container">
            <image class="image" :src="good.imageSrc" />
        </view>
        <!-- 信息容器 -->
        <view class="info-container">
            <!-- 商品价格 -->
            <view class="price">
                <text>¥{{ good.price }}</text>
            </view>
            <!-- 商品名称 -->
            <view class="name">
                <text>{{ good.name }}</text>
            </view>
            <!-- 已售数量 -->
            <view class="count">
                <text>已售0件</text>
            </view>
        </view>
        <!-- 商品描述 -->
        <view class="description-container">
            <view class="title">
                <text>• 商品详细 •</text>
            </view>
            <rich-text :nodes="good.description"></rich-text>
        </view>
        <!-- 底部固定栏 -->
        <view class="footer">
            <view class="btn-container">
                <button class="btn" @click="addCart" size="mini">加入购物车</button>
            </view>
            <view class="btn-container">
                <button class="btn" @click="purchase" size="mini">立即购买</button>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { Ref, ref } from 'vue'
import { Good } from '@/api/goods.ts'

const good: Ref<Good> = ref({
    id: 0,
    name: '',
    price: 0,
    type: '',
    description: '',
    imageSrc: '',
    isActice: 0,
    createTime: '',
})

onLoad((option) => {
    good.value = JSON.parse(option.data)

    // 设置标题
    uni.setNavigationBarTitle({
        title: good.value.name
    })
})
</script>

<style scoped lang="scss">
.goods-image-container {
    width: 100%;
    height: 750rpx;

    .image {
        width: 100%;
        height: 100%;
    }
}

.info-container {
    box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);
    border-radius: 20rpx;
    padding: 20rpx 20rpx 20rpx 20rpx;
    margin-left: 20rpx;
    margin-right: 20rpx;

    .price {
        font-size: 35rpx;
        font-weight: bold;
        color: #ff2e63;
    }

    .name {
        font-size: 32rpx;
        margin-top: 20rpx;
    }

    .count {
        font-size: 28rpx;
        color: #999;
        margin-top: 20rpx;
    }
}

.description-container {
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);
    padding: 30rpx 20rpx 150rpx 20rpx;
    margin: 30rpx 20rpx 20rpx 20rpx;
    border-radius: 20rpx;

    .title {
        display: flex;
        justify-content: center;
        font-size: 30rpx;
        margin-bottom: 20rpx;
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