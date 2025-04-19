<template>
    <view class="page-container">
        <!-- 头部搜索 -->
        <view class="search-bar">
            <input class="search-input" placeholder="搜索员工姓名或工号" />
            <button class="filter-btn">筛选</button>
        </view>

        <!-- 员工列表 -->
        <scroll-view class="staff-list" scroll-y>
            <view v-for="staff in staffList" :key="staff.id" class="staff-card">
                <image class="avatar" :src="staff.avatar" mode="aspectFill"></image>
                <view class="info">
                    <text class="name">{{ staff.name }}</text>
                    <text class="position">{{ staff.position }}</text>
                    <view class="tags">
                        <text class="tag" v-for="tag in staff.tags" :key="tag">{{ tag }}</text>
                    </view>
                </view>
                <button class="assign-btn" :class="{ 'assigned': staff.assigned }" @click="handleAssign(staff)">
                    {{ staff.assigned ? '已分配' : '分配' }}
                </button>
            </view>
        </scroll-view>
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Staff {
    id: number
    name: string
    position: string
    avatar: string
    tags: string[]
    assigned: boolean
}

const staffList = ref<Staff[]>([
    {
        id: 1,
        name: '王护理员',
        position: '高级护理师',
        avatar: '/static/images/address.png',
        tags: ['老年护理', '急救认证', '5年经验'],
        assigned: false
    },
    {
        id: 2,
        name: '李护士',
        position: '注册护士',
        avatar: '/static/images/address.png',
        tags: ['术后护理', '静脉注射'],
        assigned: true
    }
])

const handleAssign = (staff: Staff) => {
    uni.showModal({
        title: `确认${staff.assigned ? '取消' : ''}分配`,
        content: `确定要${staff.assigned ? '取消' : ''}分配 ${staff.name} 到当前床位吗？`,
        success(res) {
            if (res.confirm) {
                staff.assigned = !staff.assigned
                uni.showToast({ title: staff.assigned ? '分配成功' : '已取消分配', icon: 'success' })
            }
        }
    })
}
</script>

<style scoped lang="scss">
.page-container {
    padding: 30rpx;
    background: #f8fafc;
    min-height: 100vh;
}

.search-bar {
    display: flex;
    gap: 20rpx;
    margin-bottom: 30rpx;

    .search-input {
        flex: 1;
        height: 80rpx;
        background: white;
        border-radius: 48rpx;
        padding: 0 30rpx;
        font-size: 28rpx;
    }

    .filter-btn {
        width: 160rpx;
        line-height: 80rpx;
        border-radius: 48rpx;
        background: #3b82f6;
        color: white;
        font-size: 28rpx;
        transition: all 0.2s ease;
        transform-origin: center;

        &:active {
            transform: scale(0.95);
            background: #2563eb;
        }

        &::after {
            border: none;
            /* 去除微信小程序默认按钮边框 */
        }
    }
}

.staff-list {
    height: calc(100vh - 200rpx);

    .staff-card {
        background: white;
        border-radius: 24rpx;
        padding: 30rpx;
        margin-bottom: 30rpx;
        display: flex;
        align-items: center;
        box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);

        .avatar {
            width: 120rpx;
            height: 120rpx;
            border-radius: 50%;
            margin-right: 30rpx;
        }

        .info {
            flex: 1;

            .name {
                font-size: 34rpx;
                font-weight: 500;
                color: #1e293b;
                display: block;
            }

            .position {
                font-size: 28rpx;
                color: #64748b;
            }

            .tags {
                margin-top: 20rpx;

                .tag {
                    display: inline-block;
                    padding: 8rpx 16rpx;
                    background: #f1f5f9;
                    border-radius: 8rpx;
                    font-size: 24rpx;
                    color: #475569;
                    margin-right: 10rpx;
                }
            }
        }

        .assign-btn {
            width: 140rpx;
            height: 60rpx;
            line-height: 60rpx;
            border-radius: 40rpx;
            background: #3b82f6;
            color: white;
            font-size: 28rpx;
            transition: all 0.2s ease;

            &[disabled] {
                background: #cbd5e1;
                color: #64748b;
            }

            /* 新增已分配状态 */
            &.assigned {
                background: #10B981;

                &:active {
                    background: #0F9C7A;
                }
            }
        }
    }
}
</style>