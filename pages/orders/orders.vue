<template>
    <view>
        <!-- 订单tab切换 -->
        <v-tabs class="tabs" :scroll="false" v-model="current_tab_index" :tabs="tabs" @change="change_order_method"
            line-color="rgba(255, 143, 169, 1)" bg-color="transparent" color="#959899"
            active-color="rgba(227, 16, 65, 1)" font-size="31rpx">
        </v-tabs>
        <view class="good-container">
            <view class="border-shape">
                <view class="good-item" v-for="(item, index) in orderList" :key="index">
                    <view class="image-container">
                        <image class="image" :src="item.goodsDTO.imageSrc"></image>
                    </view>
                    <view class="good-info-container">
                        <view class="good-name">
                            <text>{{ item.goodsDTO.name }}</text>
                        </view>
                        <view class="bottom-container">
                            <view class="good-count">
                                <text>数量 x{{ item.count }}</text>
                            </view>
                            <view class="good-price">
                                <text>¥{{ item.goodsDTO.price * item.count }}</text>
                            </view>
                        </view>
                        <!-- 确认收货 -->
                        <view v-if="status == 2" class="confirm-receiving">
                            <button class="btn" @click="confirmReceiving(item.id)" size="mini">确认收货</button>
                        </view>
                        <!-- 评价 -->
                        <view v-if="status == 3" class="confirm-receiving">
                            <button class="btn" @click="confirmAppraise(item.goodsDTO.id, item.id)"
                                size="mini">评价</button>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <!-- 选择购买数量 -->
        <view>
            <uni-popup ref="popup" type="bottom">
                <view class="popup-container">
                    <view class="textarea-container">
                        <textarea placeholder="请输入评价内容" v-model="commentDTO.content"></textarea>
                    </view>
                    <view class="option-container">
                        <view class="grade-container">
                            评分：
                            <uni-rate v-model="commentDTO.grade" />
                        </view>
                        <view class="btn-container">
                            <button class="btn" @click="commitComment" size="mini">提交评价</button>
                        </view>
                    </view>
                </view>
            </uni-popup>
        </view>
    </view>
</template>

<script setup lang="ts">
import { onLoad, onReachBottom, onShow } from '@dcloudio/uni-app'
import { Ref, ref } from 'vue'
import { ordersTypeList, ordersConfirmReceive } from '@/api/orders.ts'
import { insertComment } from '@/api/comment.ts'

const current_tab_index: Ref<number> = ref(0)
const tabs: string[] = ['全部', '待发货', '待收货', '待评价', '已完成']
const orderList = ref([])
const status = ref(0)
const popup = ref(null)
const commentDTO = ref({
    content: '',
    goodsId: 0,
    ordersId: 0,
    grade: 5
})

const change_order_method = (index: number) => {
    status.value = index
    orderList.value = []
    getOrderList()
}

const switchOrderType = (type: string) => {
    switch (type) {
        case 'all':
            return 0
        case 'shipments':
            return 1
        case 'receiving':
            return 2
        case 'appraise':
            return 3
        case 'finish':
            return 4
        default:
            return 0
    }
}

const commitComment = () => {
    insertComment({
        content: commentDTO.value.content,
        goodsId: commentDTO.value.goodsId,
        ordersId: commentDTO.value.ordersId,
        grade: commentDTO.value.grade
    }).then(res => {
        if (res.code === 200) {
            uni.showToast({
                title: '评价成功',
                icon: 'success'
            })
            popup.value.close()
            orderList.value = []
            getOrderList()
        } else {
            uni.showToast({
                title: '评价失败',
                icon: 'none'
            })
        }
    })
}

const confirmReceiving = (id: number) => {
    uni.showModal({
        title: '提示',
        content: '是否确认收货？',
        success: (res) => {
            if (res.confirm) {
                ordersConfirmReceive(id).then(res => {
                    if (res.code === 200) {
                        uni.showToast({
                            title: '确认收货成功',
                            icon: 'success'
                        })
                        orderList.value = []
                        getOrderList()
                    } else {
                        uni.showToast({
                            title: '确认收货失败',
                            icon: 'none'
                        })
                    }
                })
            }
        }
    })
}

const confirmAppraise = (goodsId: number, ordersId: number) => {
    commentDTO.value.goodsId = goodsId
    commentDTO.value.ordersId = ordersId
    popup.value.open('bottom')
}

const getOrderList = async () => {
    return await ordersTypeList({
        type: 'common',
        pageNow: 1,
        pageSize: 10,
        status: status.value == 0 ? undefined : status.value
    }).then(res => {
        if (res.code === 200 && orderList.value.length < (res.data.total as number)) {
            orderList.value = orderList.value.concat(res.data.records)
        }
    })
}

onLoad((option) => {
    let typeData = option.type
    if (typeData) {
        status.value = switchOrderType(typeData)
    }
    getOrderList()
})

onShow(() => {
    current_tab_index.value = status.value
})

onReachBottom(() => {
    uni.showLoading({
        title: '加载中...'
    })

    getOrderList().then(() => {
        uni.hideLoading()
        uni.showToast({
            title: '没有更多数据了',
            icon: 'none'
        })
    })
})
</script>

<style scoped lang="scss">
.tabs {
    margin-left: 210rpx;
    margin-top: 20rpx;
}

.good-container {
    padding: 20rpx;
    margin-top: 20rpx;

    .border-shape {
        background-color: #F4F4F4;
        border-radius: 20rpx;
        display: flex;
        flex-direction: column;

        .good-item {
            display: flex;
            padding: 20rpx;
            justify-content: space-between;
            margin-bottom: 25rpx;
            border-radius: 20rpx;
            box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.2);

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

                .confirm-receiving {
                    margin-top: 30rpx;
                    width: 730rpx;
                    display: flex;
                    justify-content: flex-end;

                    .btn {
                        background-color: #7098da;
                        color: #fff;
                        border-radius: 100rpx;
                        font-size: 28rpx;
                        text-align: center;
                        line-height: 60rpx;
                    }
                }
            }
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

    .textarea-container {
        margin: 20rpx;
        height: 220rpx;
    }

    .option-container {
        display: flex;
        justify-content: space-between;
        margin-top: 45rpx;
        padding-left: 20rpx;
        padding-right: 20rpx;

        .grade-container {
            display: flex;
            align-items: center;
            font-size: 32rpx;
        }

        .btn-container {
            display: flex;
            justify-content: center;

            .btn {
                background-color: #7098da;
                color: #fff;
                border-radius: 125rpx;
            }
        }
    }
}
</style>