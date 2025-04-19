<template>
    <view class="detail-container">
        <!-- 背景渐变层 -->
        <view class="header-bg" :style="headerStyle"></view>

        <!-- 床位主信息 -->
        <view class="main-card">
            <image class="bed-image" :src="bedData.image" mode="aspectFill"></image>

            <view class="info-section">
                <view class="status-tag" :class="bedData.status">{{ bedData.status === 'available' ? '可预定' : '已入住' }}
                </view>
                <text class="bed-number">#{{ bedData.number }}</text>
                <text class="bed-type">{{ bedData.type }}</text>

                <view class="price-section">
                    <text class="price">¥{{ bedData.price }}</text>
                    <text class="unit">/天</text>
                </view>
            </view>
        </view>

        <!-- 详细信息卡片 -->
        <view class="detail-card">
            <view class="card-title">
                <text class="iconfont icon-detail" /> 详细信息
            </view>

            <view class="detail-grid">
                <view class="grid-item">
                    <text class="iconfont icon-area" /> 面积
                    <text class="value">{{ bedData.area }}</text>
                </view>
                <view class="grid-item">
                    <text class="iconfont icon-floor" /> 楼层
                    <text class="value">{{ bedData.floor }}F</text>
                </view>
                <view class="grid-item">
                    <text class="iconfont icon-nurse" /> 护理等级
                    <text class="value">{{ bedData.careLevel }}</text>
                </view>
            </view>
        </view>

        <!-- 设施标签 -->
        <view class="facility-card">
            <view class="card-title">
                <text class="iconfont icon-facility" /> 配套设施
            </view>
            <view class="facility-tags">
                <text v-for="(item, index) in bedData.facilities" :key="index" class="tag">{{ item }}</text>
            </view>
        </view>

        <!-- 操作按钮 -->
        <view class="action-bar">
            <button class="action-btn cancel" @click="handleCancel">取消预定</button>
            <button class="action-btn contact" @click="handleContact">联系护理员</button>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 模拟数据
const bedData = ref({
    id: 1,
    number: 'A101',
    type: 'VIP护理床位',
    price: 580,
    status: 'occupied',
    image: '/static/images/address.png',
    facilities: ['智能监测系统', '无障碍卫浴', '紧急呼叫', '空气净化'],
    area: '25㎡',
    floor: 3,
    careLevel: '特级护理'
})

// 动态头部样式
const headerStyle = ref({
    background: `linear-gradient(135deg, ${bedData.value.status === 'available' ? '#3b82f6' : '#10b981'}, #60a5fa)`
})

const handleCancel = () => {
    uni.showModal({
        title: '确认取消',
        content: '确定要取消该床位的预定吗？',
        success(res) {
            if (res.confirm) {
                uni.removeStorageSync('currentBed')
                uni.navigateBack()
                uni.showToast({ title: '已取消预定', icon: 'success' })
            }
        }
    })
}

const handleContact = () => {
    uni.makePhoneCall({ phoneNumber: '400-123-4567' })
}
</script>

<style scoped lang="scss">
.detail-container {
    position: relative;
    padding: 30rpx;
    min-height: 118vh;

    .header-bg {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 420rpx;
        border-radius: 0 0 40rpx 40rpx;
        z-index: 0;
    }

    .main-card {
        position: relative;
        z-index: 1;
        background: white;
        border-radius: 32rpx;
        padding: 20rpx;
        box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.1);

        .bed-image {
            width: 100%;
            height: 400rpx;
            border-radius: 24rpx;
        }

        .info-section {
            padding: 30rpx 20rpx;

            .status-tag {
                position: absolute;
                top: -20rpx;
                right: 30rpx;
                padding: 12rpx 24rpx;
                border-radius: 8rpx;
                font-size: 24rpx;
                color: white;

                &.available {
                    background: #3b82f6;
                }

                &.occupied {
                    background: #10b981;
                }
            }

            .bed-number {
                font-size: 44rpx;
                font-weight: 600;
                color: #1f2937;
            }

            .bed-type {
                display: block;
                font-size: 32rpx;
                color: #4b5563;
                margin: 16rpx 0;
            }

            .price-section {
                .price {
                    font-size: 40rpx;
                    color: #ef4444;
                    font-weight: 700;
                }

                .unit {
                    font-size: 28rpx;
                    color: #6b7280;
                    margin-left: 12rpx;
                }
            }
        }
    }

    .detail-card,
    .facility-card {
        background: white;
        border-radius: 32rpx;
        padding: 30rpx;
        margin: 30rpx 0;
        box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);

        .card-title {
            font-size: 34rpx;
            font-weight: 500;
            color: #1f2937;
            margin-bottom: 30rpx;

            .iconfont {
                margin-right: 16rpx;
                color: #3b82f6;
            }
        }

        .detail-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 30rpx;

            .grid-item {
                text-align: center;

                .iconfont {
                    display: block;
                    font-size: 48rpx;
                    color: #3b82f6;
                    margin-bottom: 12rpx;
                }

                .value {
                    display: block;
                    font-size: 32rpx;
                    color: #1f2937;
                    font-weight: 500;
                }
            }
        }

        .facility-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 20rpx;

            .tag {
                padding: 12rpx 24rpx;
                background: #f3f4f6;
                border-radius: 8rpx;
                font-size: 28rpx;
                color: #374151;
            }
        }
    }

    .action-bar {
        position: fixed;
        bottom: 40rpx;
        left: 30rpx;
        right: 30rpx;
        display: flex;
        gap: 30rpx;

        .action-btn {
            flex: 1;
            height: 96rpx;
            border-radius: 64rpx;
            font-size: 32rpx;

            &.cancel {
                background: #f3f4f6;
                color: #374151;
            }

            &.contact {
                background: #3b82f6;
                color: white;
            }
        }
    }
}
</style>