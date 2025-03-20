<template>
    <view>
        <!-- 无地址数据时 -->
        <view class="no-address-container" v-if="addressList.length === 0">
            <view class="text">
                <text>暂无有效地址信息</text>
            </view>
        </view>
        <!-- 有地址数据时 -->
        <view v-else class="have-address-container">
            <view v-for="(address, index) in addressList" :key="index" class="address-container">
                <view @click="choiceAddress(address)">
                    <view class="person-container">
                        <view class="text">
                            <text>收货人：{{ address.name }}</text>
                        </view>
                        <view class="text">
                            <text>{{ address.phone }}</text>
                        </view>
                    </view>
                    <view class="address-text">
                        <text>收货地址：{{ address.province + address.city + address.district + address.detail }}</text>
                    </view>
                </view>
                <view class="horizontal-line"></view>
                <view class="option-container">
                    <view class="radio-container">
                        <radio-group @change="radioChange">
                            <label>
                                <radio :value="JSON.stringify(address)" :checked="address.isDefault" color="red" />
                                &nbsp;设为默认
                            </label>
                        </radio-group>
                    </view>
                    <view class="edit-container">
                        <view class="btn-container">
                            <button class="btn" @click="addAddress(address)" size="mini">编辑</button>
                        </view>
                        <view class="btn-container">
                            <button class="btn" @click="deleteAddress" size="mini">删除</button>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <!-- 底部固定栏 -->
        <view class="footer">
            <view class="btn-container">
                <button class="btn" @click="addAddress()" size="mini">添加地址</button>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { onLoad, onUnload } from '@dcloudio/uni-app'
import { getAddressList, AddressDTO, updateAddress } from '@/api/user.ts'
import { ref, Ref } from 'vue'

const addressList: Ref<AddressDTO[]> = ref([])

onLoad(() => {
    loadAddressList()
    uni.$on('address', (data: { refresh: boolean }) => {
        if (data.refresh) {
            loadAddressList()
        }
    })
})

onUnload(() => {
    uni.$off('address')
})

const addAddress = (address?: AddressDTO) => {
    if (!address) {
        uni.navigateTo({
            url: '/pages/add_address/add_address'
        })
        return
    } else {
        uni.navigateTo({
            url: '/pages/add_address/add_address?data=' + JSON.stringify(address)
        })
    }
}

const choiceAddress = (address: AddressDTO) => {
    uni.$emit('choiceAddress', { address: address })
    uni.navigateBack()
}

const deleteAddress = () => {
    console.log('delete')
}

const loadAddressList = () => {
    getAddressList().then(res => {
        if (res.code === 200) {
            addressList.value = res.data
        }
    })
}

const radioChange = (e: any) => {
    let address = JSON.parse(e.detail.value)
    address.isDefault = true
    updateAddress(address).then(res => {
        if (res.code === 200) {
            loadAddressList()
        }
    })
}
</script>

<style scoped lang="scss">
.no-address-container {
    height: 300rpx;
    display: flex;
    justify-content: center;
    align-items: center;

    .text {
        font-size: 30rpx;
        color: #999999;
    }
}

.have-address-container {
    padding-bottom: 150rpx;

    .address-container {
        margin: 20rpx;
        padding: 20rpx;
        box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);
        border-radius: 20rpx;
        display: flex;
        flex-direction: column;

        .person-container {
            display: flex;
            justify-content: space-between;

            .text {
                margin-top: 20rpx;
                margin-left: 20rpx;
                margin-right: 20rpx;
                font-size: 28rpx;
            }
        }

        .address-text {
            margin-top: 20rpx;
            margin-left: 20rpx;
            font-size: 28rpx;
        }

        .horizontal-line {
            height: 1rpx;
            background-color: #dbdbdb;
            margin-top: 40rpx;
        }

        .option-container {
            display: flex;
            justify-content: space-between;
            margin-top: 20rpx;
            margin-left: 15rpx;

            .radio-container {
                font-size: 28rpx;
            }

            .edit-container {
                display: flex;

                .btn-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-left: 10rpx;
                    margin-right: 10rpx;

                    .btn {
                        border-radius: 10rpx;
                        justify-content: center;
                    }
                }
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

    .btn-container {
        width: 100%;
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