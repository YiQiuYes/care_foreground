<template>
    <view>
        <view class="address-container">
            <view class="border-shape">
                <view class="title-container">
                    <view class="address-image-container">
                        <image class="image" src="/static/images/courier.png" />
                    </view>
                    <view class="title-text">
                        <text>收货地址</text>
                    </view>
                </view>
                <view class="no-address-tip-container" @click="navigationToAddress"
                    v-if="Object.keys(defaultAddress).length === 0">
                    <text>+请添加收货地址</text>
                </view>
                <view class="address-tip-container" v-else @click="navigationToAddress">
                    <view class="person-container">
                        <view class="text">
                            <text>收货人：{{ defaultAddress.name }}</text>
                        </view>
                        <view class="text">
                            <text>{{ defaultAddress.phone }}</text>
                        </view>
                    </view>
                    <view class="address-text">
                        <text>收货地址：{{ defaultAddress.province + defaultAddress.city + defaultAddress.district +
                            defaultAddress.detail }}</text>
                    </view>
                    <view class="choice-address-text">
                        <text>点击此选择地址</text>
                    </view>
                </view>
                <view>

                </view>
            </view>
        </view>
        <view class="good-container">
            <view class="border-shape">
                <view class="good-for-container" v-for="(item, index) in goods" :key="index">
                    <view class="good-item">
                        <view class="image-container">
                            <image class="image" :src="item.imageSrc"></image>
                        </view>
                        <view class="good-info-container">
                            <view class="good-name">
                                <text>{{ item.name }}</text>
                            </view>
                            <view class="bottom-container">
                                <view class="good-count">
                                    <text>数量 x{{ item.count }}</text>
                                </view>
                                <view class="good-price">
                                    <text>¥{{ item.price * item.count }}</text>
                                </view>
                            </view>
                        </view>
                    </view>
                    <view class="horizontal-line" v-if="index != goods.length - 1"></view>
                </view>
            </view>
        </view>
        <!-- 底部固定栏 -->
        <view class="footer">
            <view class="total-container">
                <view class="total-text">
                    <text>合计：</text>
                </view>
                <view class="total-price">
                    <text>¥{{ totalPrice() }}</text>
                </view>
            </view>
            <view class="btn-container">
                <button class="btn" @click="purchase" size="mini">提交订单</button>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { onLoad, onUnload } from '@dcloudio/uni-app'
import { Ref, ref } from 'vue'
import { Good } from '@/api/goods.ts'
import { getAddressList, getDefaultAddress, AddressDTO } from '@/api/user.ts'
import { ordersInsert, OrderCreate } from '@/api/orders.ts'

const goods: Ref<Good[]> = ref([])

const defaultAddress = ref<AddressDTO>({})

onLoad((option) => {
    goods.value = JSON.parse(option.data)

    getDefaultAddress().then(res => {
        if (res.code === 200) {
            defaultAddress.value = res.data
        }
    })

    uni.$on('choiceAddress', (data: { address: AddressDTO }) => {
        if (data) {
            defaultAddress.value = data.address
        }
    })
})

onUnload(() => {
    uni.$off('choiceAddress')
})

const navigationToAddress = () => {
    uni.navigateTo({
        url: '/pages/choice_address/choice_address'
    })
}

const totalPrice = () => {
    return goods.value.reduce((total, good) => (total + good.price * good.count), 0)
}

const purchase = () => {
    let params = []
    goods.value.forEach(good => {
        let order: OrderCreate = {
            goodsId: good.id,
            address: defaultAddress.value.province + defaultAddress.value.city + defaultAddress.value.district + defaultAddress.value.detail,
            phone: defaultAddress.value.phone,
            count: good.count,
        }
        params.push(order)
    })
    ordersInsert(params).then(res => {
        if (res.code === 200) {
            uni.showToast({
                title: '下单成功',
                icon: 'success',
                duration: 2000
            })
            setTimeout(() => {
                uni.switchTab({
                    url: '/pages/home/home'
                })
            }, 2000)
        } else {
            uni.showToast({
                title: res.msg,
                icon: 'none'
            })
        }
    })
}
</script>

<style scoped lang="scss">
.address-container {
    height: 270rpx;
    background: linear-gradient(to bottom, #ff5e7e, #F4F4F4);
    padding: 20rpx;

    .border-shape {
        height: 270rpx;
        background-color: #F4F4F4;
        border-radius: 20rpx;

        .title-container {
            display: flex;

            .address-image-container {
                width: 50rpx;
                height: 50rpx;
                margin-top: 20rpx;
                margin-left: 20rpx;

                .image {
                    width: 100%;
                    height: 100%;
                }
            }

            .title-text {
                margin-left: 20rpx;
                margin-top: 20rpx;
            }
        }

        .no-address-tip-container {
            width: 100%;
            height: 70%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 30rpx;
            color: #999999;
        }

        .address-tip-container {
            display: flex;
            flex-direction: column;
            padding: 20rpx 20rpx 20rpx 20rpx;

            .person-container {
                display: flex;
                justify-content: space-between;

                .text {
                    font-size: 28rpx;
                }
            }

            .address-text {
                margin-top: 20rpx;
                font-size: 28rpx;
            }

            .choice-address-text {
                margin-top: 20rpx;
                font-size: 26rpx;
                display: flex;
                justify-content: center;
                color: #999999;
            }
        }
    }
}

.good-container {
    padding: 20rpx;

    .border-shape {
        background-color: #F4F4F4;
        border-radius: 20rpx;

        .good-for-container {
            display: flex;
            flex-direction: column;

            .good-item {
                display: flex;
                padding: 20rpx;
                justify-content: space-between;

                .image-container {
                    width: 150rpx;
                    height: 150rpx;
                    border-radius: 20rpx;

                    .image {
                        width: 100%;
                        height: 100%;
                    }
                }

                .good-info-container {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    margin-left: 50rpx;
                    width: 470rpx;

                    .good-name {
                        margin-top: 10rpx;
                        font-size: 28rpx;
                    }

                    .bottom-container {
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: 10rpx;

                        .good-count {
                            font-size: 28rpx;
                            color: #999;
                        }

                        .good-price {
                            font-size: 35rpx;
                            color: #ff2e63;
                            margin-right: 20rpx;
                        }
                    }
                }
            }

            .horizontal-line {
                height: 1rpx;
                background-color: #f4a9a9;
                margin: 20rpx;
            }
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

    .total-container {
        display: flex;
        align-items: center;

        .total-text {
            margin-left: 20rpx;
            font-size: 28rpx;
        }

        .total-price {
            font-size: 45rpx;
            color: #ff2e63;
            margin-left: 10rpx;
        }
    }

    .btn-container {
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;

        .btn {
            width: 80%;
            display: flex;
            background-color: #ea3333;
            color: #fff;
            border-radius: 100rpx;
            justify-content: center;
        }
    }
}
</style>