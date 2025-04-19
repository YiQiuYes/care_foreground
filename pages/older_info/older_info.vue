<template>
    <view class="page-container">
        <!-- 基本信息卡片 -->
        <view class="profile-card">
            <image class="avatar" src="/static/images/home.png"></image>
            <view class="info">
                <text class="name">张伟民</text>
                <view class="meta">
                    <view class="item">
                        <text>82岁</text>
                    </view>
                    <view class="item">
                        <text>男性</text>
                    </view>
                    <view class="item">
                        <text>特级护理</text>
                    </view>
                </view>
                <view class="room-info">
                    A栋302室 · 床位12号
                </view>
            </view>
        </view>

        <!-- 健康信息 -->
        <view class="health-card">
            <view class="card-title">
                健康档案
            </view>
            <view class="health-grid">
                <view class="item blood-pressure">
                    <text class="value">128/76 </text>
                    <text class="label">血压</text>
                </view>
                <view class="item heart-rate">
                    <text class="value">78 </text>
                    <text class="label">心率</text>
                </view>
                <view class="item temperature">
                    <text class="value">36.5℃ </text>
                    <text class="label">体温</text>
                </view>
            </view>
            <view class="status-tag">生命体征正常</view>
        </view>
    </view>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.page-container {
    padding: 30rpx;
    background: #f8fafc;
    min-height: 100vh;

    .profile-card {
        background: white;
        border-radius: 24rpx;
        padding: 40rpx;
        display: flex;
        align-items: center;
        box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.08);

        .avatar {
            width: 160rpx;
            height: 160rpx;
            border-radius: 50%;
            margin-right: 30rpx;
        }

        .info {

            .name {
                font-size: 40rpx;
                font-weight: 600;
                color: #1f2937;
            }

            .meta {
                margin: 20rpx 0;
                color: #64748b;
                display: flex;
                flex-wrap: wrap;
                gap: 16rpx;

                .item {
                    padding: 8rpx 16rpx;
                    background: #f1f5f9;
                    border-radius: 8rpx;
                    font-size: 24rpx;
                    color: #475569;
                }
            }

            .room-info {
                color: #3b82f6;
                font-size: 28rpx;
            }
        }
    }
}

.health-card {
    background: white;
    border-radius: 24rpx;
    padding: 30rpx;
    margin: 30rpx 0;
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);

    .card-title {
        font-size: 32rpx;
        font-weight: 600;
        color: #1f2937;
        margin-bottom: 30rpx;
    }

    .health-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 30rpx;

        .item {
            text-align: center;
            padding: 20rpx;
            border-radius: 16rpx;

            &.blood-pressure {
                background: #fef2f2;
            }

            &.heart-rate {
                background: #f0f9ff;
            }

            &.temperature {
                background: #f0fdf4;
            }

            .value {
                font-size: 36rpx;
                font-weight: 600;
            }
        }
    }

    .status-tag {
        margin-top: 30rpx;
        padding: 12rpx;
        text-align: center;
        background: #10b981;
        color: white;
        border-radius: 8rpx;
    }
}

@media (max-width: 768px) {
    .health-grid {
        grid-template-columns: 1fr !important;
    }
}
</style>