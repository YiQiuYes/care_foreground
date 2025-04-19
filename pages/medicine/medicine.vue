<template>
    <view class="page-container">
        <!-- 用药信息展示 -->
        <view class="medication-card" v-for="(item, index) in medicationData" :key="index">
            <view class="card-header">
                <text class="drug-name">{{ item.name }}</text>
                <text class="dosage">{{ item.dosage }}/次</text>
                <uni-icons type="trash" size="24" color="#ef4444" @click="handleDelete(index)" class="delete-icon" />
            </view>

            <view class="time-info">
                <uni-icons type="calendar" size="18" color="#3b82f6" />
                <text>{{ item.timeRange.join(' - ') }}</text>
            </view>

            <view class="assigned-staff">
                <image class="staff-avatar" src="/static/images/home.png" />
                <view class="staff-info">
                    <text class="name">{{ item.staffName }}</text>
                    <text class="position">{{ item.position }}</text>
                </view>
            </view>
        </view>

        <!-- 添加按钮 -->
        <button class="add-btn" @click="showForm = true" v-if="!showForm">
            + 添加新药物
        </button>

        <!-- 用药信息表单 -->
        <view class="form-card" v-if="showForm">
            <view class="form-header">
                <text class="form-title">填写用药信息</text>
                <uni-icons type="close" size="24" @click="showForm = false" />
            </view>
            <uni-forms>
                <uni-forms-item label="药物名称" required>
                    <uni-easyinput v-model="formData.name" placeholder="请输入药品全称" />
                </uni-forms-item>

                <uni-forms-item label="用药时间" required>
                    <uni-datetime-picker type="timerange" v-model="formData.timeRange" />
                </uni-forms-item>

                <uni-forms-item label="剂量" required>
                    <uni-easyinput type="number" v-model="formData.dosage" placeholder="单位：毫克/片" />
                </uni-forms-item>

                <uni-forms-item label="负责护理员" required>
                    <uni-data-select v-model="formData.staffId" :localdata="assignedStaff" />
                </uni-forms-item>

                <button class="submit-btn" @click="handleSubmit">提交信息</button>
            </uni-forms>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showForm = ref(false) // 控制表单显示状态

const formData = ref({
    name: '',
    timeRange: [],
    dosage: '',
    staffId: 1,
    staffName: '',
    position: ''
})

const assignedStaff = ref([
    { value: 1, text: '护理员1' },
    { value: 2, text: '护理员2' },
    { value: 3, text: '护理员3' }
])

const medicationData = ref([
    {
        name: '药品1',
        timeRange: ['2024-09-01 08:00', '2024-09-01 12:00'],
        dosage: '500mg',
        staffId: 1,
        staffName: '护理员1',
        position: 'A栋301号'
    },
    {
        name: '药品2',
        timeRange: ['2024-09-02 14:00', '2024-09-02 18:00'],
        dosage: '300mg',
        staffId: 2,
        staffName: '护理员2',
        position: 'B栋202号'
    }
])

// 提交处理函数
const handleSubmit = () => {
    medicationData.value.push({
        ...formData.value,
        staffName: assignedStaff.value.find(s => s.value === formData.value.staffId)?.text || ''
    })

    // 重置表单
    formData.value = {
        name: '',
        timeRange: [],
        dosage: '',
        staffId: 1,
        staffName: '',
        position: ''
    }
    showForm.value = false
    uni.showToast({ title: '添加成功', icon: 'success' })
}

// 删除处理函数
const handleDelete = (index: number) => {
    uni.showModal({
        title: '确认删除',
        content: '确定要删除这条用药记录吗？',
        success(res) {
            if (res.confirm) {
                medicationData.value.splice(index, 1)
                uni.showToast({ title: '已删除', icon: 'success' })
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

    .medication-card {
        background: white;
        border-radius: 24rpx;
        padding: 30rpx;
        box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.08);
        margin-bottom: 30rpx;

        .card-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 30rpx;

            .drug-name {
                font-size: 36rpx;
                font-weight: 600;
            }
        }

        .time-info {
            display: flex;
            align-items: center;
            gap: 15rpx;
            color: #64748b;
            margin-bottom: 40rpx;
        }

        .assigned-staff {
            display: flex;
            align-items: center;
            padding: 20rpx;
            background: #f1f5f9;
            border-radius: 16rpx;

            .staff-avatar {
                width: 100rpx;
                height: 100rpx;
                border-radius: 50%;
                margin-right: 20rpx;
            }

            .contact-btn {
                margin-left: auto;
                color: #3b82f6;
                padding: 10rpx 20rpx;
                border-radius: 8rpx;
            }
        }
    }

    .add-btn {
        width: 100%;
        height: 100rpx;
        background: #3b82f6;
        color: white;
        border-radius: 50rpx;
        margin: 30rpx 0;
        transition: all 0.1s ease-in-out;
        box-shadow: 0 4rpx 12rpx rgba(59, 130, 246, 0.4);

        &:active {
            transform: scale(0.98);
            box-shadow: 0 2rpx 6rpx rgba(59, 130, 246, 0.6);
            background: #2563eb;
        }
    }

    .form-card {
        background: white;
        border-radius: 24rpx;
        padding: 40rpx;
        box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.08);

        .form-header {
            margin-bottom: 30rpx;
            display: flex;
            justify-content: space-between;

            .form-title {
                font-size: 36rpx;
                font-weight: 600;
                margin-bottom: 40rpx;
                color: #1f2937;
            }
        }

        .submit-btn {
            margin-top: 60rpx;
            background: #3b82f6;
            color: white;
            height: 100rpx;
            line-height: 100rpx;
            border-radius: 50rpx;
            font-size: 32rpx;
            transition: all 0.1s ease-in-out;
            box-shadow: 0 4rpx 12rpx rgba(59, 130, 246, 0.4);

            &:active {
                transform: scale(0.98);
                box-shadow: 0 2rpx 6rpx rgba(59, 130, 246, 0.6);
                background: #2563eb;
            }
        }
    }
}
</style>