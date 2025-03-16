<template>
    <view>
        <!-- 养老院名称 -->
        <view class="nursing-tip">
            <view class="img-container">
                <image class="img" src="/static/images/home.png" />
            </view>
            <view class="name">
                <text>{{ nursing_detail.name }}</text>
            </view>
        </view>

        <!-- 预约联系人信息 -->
        <view class="info-container">
            <view class="blok">
                <view class="tip">
                    <text>联系人</text>
                </view>
                <input class="input_tab" v-model="postForm.name" placeholder="请输入联系人姓名">
                </input>
            </view>
            <view class="horizon-line"></view>
            <view class="blok">
                <view class="tip">
                    <text>联系地址</text>
                </view>
                <input class="input_tab" v-model="postForm.address" placeholder="请输入联系地址">
                </input>
            </view>
            <view class="horizon-line"></view>
            <view class="blok">
                <view class="tip">
                    <text>手机号码</text>
                </view>
                <input class="input_tab" v-model="postForm.phone" placeholder="请输入手机号码">
                </input>
            </view>
            <view class="horizon-line"></view>
        </view>

        <!-- 预约时间和内容 -->
        <view class="info-container">
            <uni-datetime-picker returnType="timestamp" v-model="postForm.time">
                <view class="blok">
                    <view class="time-container">
                        <view>
                            <text>预约时间</text>
                        </view>
                        <view class="time">
                            <text>{{ parseTime(postForm.time, '{y}-{m}-{d} {h}:{i}') }}</text>
                        </view>
                    </view>
                    <view class="choice-text" v-if="postForm.time === ''">
                        <text>请选择预约时间></text>
                    </view>
                </view>
            </uni-datetime-picker>
            <view class="horizon-line"></view>
            <view class="blok">
                <view class="tip">
                    <text>预约内容</text>
                </view>
                <input class="input_tab" v-model="postForm.content" placeholder="请输入预约内容">
                </input>
            </view>
            <view class="horizon-line"></view>
        </view>

        <!-- 底部固定栏 -->
        <view class="footer">
            <button class="btn" @click="submit" size="mini">立即预约</button>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { NursingDetail, nursingBooking } from '@/api/nursing.ts'
import { parseTime } from '@/utils/index.ts'

const nursing_detail: Ref<NursingDetail> = ref({
    id: 0,
    name: "",
    address: "",
    phone: "",
    content: "",
    time: "",
    bunkCount: 0,
    workerCount: 0,
    size: 0,
    aptitude: 0,
    images: [],
    infoImage: "",
    location: ""
})

const postForm = ref({
    name: '',
    address: '',
    phone: '',
    time: '',
    content: '',
    nursingId: 0
})

onLoad((option) => {
    nursing_detail.value = JSON.parse(option.data)
    postForm.value.nursingId = nursing_detail.value.id
})

const submit = () => {
    nursingBooking(postForm.value).then(res => {
        if (res.code === 200) {
            uni.showToast({
                title: '预约成功',
                icon: 'success',
                duration: 2000
            })

            setTimeout(() => {
                uni.navigateBack()
            }, 2000)
        } else {
            uni.showToast({
                title: '预约失败',
                icon: 'none',
                duration: 2000
            })
        }
    })
}
</script>

<style scoped lang="scss">
.nursing-tip {
    display: flex;
    margin: 20rpx 20rpx 0 20rpx;
    // 外边框加阴影
    box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);
    border-radius: 10rpx;
    padding: 20rpx 20rpx 20rpx 30rpx;

    .img-container {
        width: 20px;
        height: 20px;

        .img {
            width: 100%;
            height: 100%;
        }
    }

    .name {
        font-size: 30rpx;
        margin-left: 20rpx;
    }
}

.info-container {
    display: flex;
    flex-direction: column;
    margin: 30rpx 20rpx 0 20rpx;
    // 外边框加阴影
    box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);
    border-radius: 10rpx;
    padding: 0 20rpx 20rpx 30rpx;

    .blok {
        display: flex;
        align-items: center;
        margin-top: 40rpx;

        .tip {
            display: flex;
            width: 160rpx;
            font-size: 30rpx;
        }

        .time-container {
            display: flex;

            .time {
                margin-left: 30rpx;
            }
        }

        .choice-text {
            display: flex;
            font-size: 28rpx;
            color: #ccc;
            margin-left: auto;
            margin-right: 15rpx;
        }

        .input_tab {
            font-size: 30rpx;
        }
    }

    .horizon-line {
        width: 100%;
        height: 1rpx;
        background-color: #ccc;
        margin-top: 20rpx;
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

    .btn {
        width: 90%;
        display: flex;
        background-color: #7098da;
        color: #fff;
        border-radius: 10rpx;
        justify-content: center;
    }
}
</style>