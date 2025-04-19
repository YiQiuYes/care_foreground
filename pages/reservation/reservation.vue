<template>
    <view class="page-container">
        <!-- 标题栏 -->
        <view class="header">
            <text class="title">床位浏览与预定</text>
            <text class="subtitle">当前可预定床位：{{ availableBeds.length }}</text>
        </view>

        <!-- 床位列表 -->
        <scroll-view class="bed-list" scroll-y>
            <view v-for="(bed, index) in bedList" :key="index" class="bed-card">
                <image class="bed-image" :src="bed.image" mode="aspectFill"></image>

                <view class="bed-info">
                    <text class="bed-number">#{{ bed.number }}</text>
                    <view class="status-tag">
                        <text>{{ bed.status === 'available' ? '可预定' : '已占用' }}</text>
                    </view>

                    <view class="meta-info">
                        <view class="meta-item">
                            <text class="iconfont icon-bed" /> {{ bed.type }}
                        </view>
                        <view class="meta-item">
                            <text class="iconfont icon-coin" /> ¥{{ bed.price }}/天
                        </view>
                    </view>

                    <view class="facilities">
                        <text v-for="facility in bed.facilities" :key="facility" class="facility-tag">
                            {{ facility }}
                        </text>
                    </view>
                </view>

                <button class="reserve-btn" :disabled="bed.status !== 'available'" @click="handleReserve(bed)">
                    {{ bed.status === 'available' ? '立即预定' : '已占用' }}
                </button>
            </view>
        </scroll-view>
    </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface BedReservation {
    id: number
    number: string
    type: string
    price: number
    status: 'available' | 'occupied'
    image: string
    facilities: string[]
    area: string
}

// 模拟数据
const bedList = ref<BedReservation[]>([
    {
        id: 1,
        number: 'A101',
        type: '标准护理床位',
        price: 280,
        status: 'available',
        image: '/static/images/address.png',
        facilities: ['电动升降', '紧急呼叫', '独立卫生间'],
        area: '15㎡'
    },
    {
        id: 2,
        number: 'A102',
        type: '单床',
        price: 180,
        status: 'occupied',
        image: '/static/images/address.png',
        facilities: ['独立卫生间'],
        area: '10㎡'
    }
])

const availableBeds = computed(() =>
    bedList.value.filter(bed => bed.status === 'available')
)

const handleReserve = (bed: BedReservation) => {
    uni.showModal({
        title: '确认预定',
        content: `确定要预定 ${bed.number} 床位吗？`,
        success: res => {
            if (res.confirm) {
                bed.status = 'occupied'
                uni.showToast({ title: '预定成功！', icon: 'success' })
            }
        }
    })
}
</script>

<style scoped lang="scss">
.page-container {
    padding: 20rpx 30rpx;
    background: #f8fafc;
    min-height: 100vh;

    .header {
        padding: 30rpx 0;

        .title {
            font-size: 44rpx;
            font-weight: 600;
            color: #1e293b;
            display: block;
        }

        .subtitle {
            font-size: 28rpx;
            color: #64748b;
        }
    }

    .bed-list {
        .bed-card {
            background: white;
            border-radius: 24rpx;
            margin-bottom: 30rpx;
            padding: 20rpx;
            box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
            transition: transform 0.2s ease;

            &:active {
                transform: translateY(4rpx);
            }

            .bed-image {
                width: 100%;
                height: 400rpx;
                border-radius: 16rpx;
            }

            .bed-info {
                padding: 20rpx 0;

                .bed-number {
                    font-size: 36rpx;
                    font-weight: 500;
                    color: #1e293b;
                }

                .status-tag {
                    display: inline-block;
                    padding: 8rpx 16rpx;
                    background: #38bdf8;
                    color: white;
                    border-radius: 8rpx;
                    margin-left: 20rpx;
                    font-size: 24rpx;
                }

                .meta-info {
                    display: flex;
                    gap: 30rpx;
                    margin: 20rpx 0;
                    color: #64748b;

                    .iconfont {
                        margin-right: 8rpx;
                    }
                }

                .facilities {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 16rpx;

                    .facility-tag {
                        padding: 8rpx 16rpx;
                        background: #f1f5f9;
                        border-radius: 8rpx;
                        font-size: 24rpx;
                        color: #475569;
                    }
                }
            }

            .reserve-btn {
                margin-top: 20rpx;
                background: #3b82f6;
                color: white;
                border-radius: 12rpx;
                font-weight: 500;

                &[disabled] {
                    background: #cbd5e1;
                    color: #64748b;
                }
            }
        }
    }
}
</style>