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
        <!-- 选择购买数量 -->
        <view>
            <uni-popup ref="popup" type="bottom">
                <view class="popup-container">
                    <view class="good-container">
                        <view class="image-container">
                            <image class="image" :src="good.imageSrc" />
                        </view>
                        <view class="price">
                            <text>¥{{ good.price * good.count }}</text>
                        </view>
                    </view>

                    <view class="count-container">
                        <view class="count-title">
                            <text>数量：</text>
                        </view>
                        <view class="count-bar">
                            <button class="btn" @click="countSub" size="mini">-</button>
                            <view class="count">
                                <text>{{ good.count }}</text>
                            </view>
                            <button class="btn" @click="good.count++" size="mini">+</button>
                        </view>
                    </view>

                    <view class="btn-container">
                        <view>
                            <button class="btn" @click="addCart" size="mini">加入购物车</button>
                        </view>
                        <view>
                            <button class="btn" @click="navigationToPurchase" size="mini">立即购买</button>
                        </view>
                    </view>
                </view>
            </uni-popup>
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
    count: 0
})

const popup = ref(null)

onLoad((option) => {
    good.value = JSON.parse(option.data)
    good.value.count = 0

    // 设置标题
    uni.setNavigationBarTitle({
        title: good.value.name
    })
})

const countSub = () => {
    if (good.value.count > 0) {
        good.value.count--
    }
}

const addCart = () => {
    console.log('加入购物车')
}

const purchase = () => {
    popup.value.open('bottom')
}

const navigationToPurchase = () => {
    if (good.value.count === 0) {
        uni.showToast({
            title: '请选择购买数量',
            icon: 'none'
        })
        return
    }
    uni.navigateTo({
        url: '/pages/purchase/purchase?data=' + JSON.stringify([good.value])
    })
}
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

.popup-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 400rpx;
    background-color: #fff;
    border-radius: 25rpx 25rpx 0 0;

    .good-container {
        display: flex;
        flex-direction: row;

        .image-container {
            width: 150rpx;
            height: 150rpx;
            margin-left: 30rpx;
            margin-top: 30rpx;
            border-radius: 5rpx;
            box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);

            .image {
                width: 100%;
                height: 100%;
            }
        }

        .price {
            font-size: 40rpx;
            font-weight: bold;
            color: #ff2e63;
            margin-left: 40rpx;
            margin-top: 50rpx;
        }
    }

    .count-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 30rpx;
        padding-left: 20rpx;
        padding-right: 20rpx;

        .count-title {
            font-size: 25rpx;
        }

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

    .btn-container {
        display: flex;
        justify-content: space-between;
        margin-top: 45rpx;
        padding-left: 20rpx;
        padding-right: 20rpx;

        .btn {
            display: flex;
            width: 250rpx;
            background-color: #7098da;
            color: #fff;
            border-radius: 125rpx;
            justify-content: center;
        }
    }
}
</style>