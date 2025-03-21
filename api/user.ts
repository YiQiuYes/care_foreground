import { Result } from '@/api/result_interface.ts'
import http from '@/utils/request_util.ts'

export interface LoginParams {
	/*密码 */
	password ?: string;
	/*手机号 */
	phone ?: string;
}

export interface AddressDTO {
	/*地址id*/
	id: number;
	/*联系人*/
	name: string;
	/*手机号*/
	phone: string;
	/*省份*/
	province: string;
	/*城市*/
	city: string;
	/*区县*/
	district: string;
	/*详细地址*/
	detail: string;
	/*是否默认地址*/
	isDefault: boolean;
}

/**
 * 用户登录
 * @param {object} params 用户信息
 * @param {string} params.password 密码
 * @param {string} params.phone 手机号
 * @returns
 */
export async function login_api(params : LoginParams) : Promise<Result> {
	const value = await http.post(
		'/user/login',
		params
	)
	return value.data as Result;
}

/**
 * 获取用户信息
 * @returns
 */
export async function getUserInfo(): Promise<Result> {
	const value = await http.get('/user/getUserInfo')
	return value.data as Result;
}

/**
 * 用户注册
 * @param {object} params 用户信息
 * @param {string} params.password 密码
 * @param {string} params.phone 手机号
 * @returns
 */
export async function register_api(params : LoginParams) : Promise<Result> {
	const value = await http.post(
		'/user/register',
		params
	)
	return value.data as Result;
}

/**
 * 刷新token
 * @param {string} refreshToken 刷新令牌
  * @returns
 */
export async function refresh_token_api(refreshToken : string) : Promise<Result> {
	const value = await http.get(
		'/user/refreshToken',
		{
			params: { refreshToken: refreshToken }
		}
	)
	return value.data as Result;
}

/** 
 * 添加用户地址
 * @param {object} params 地址信息类
 * @param {string} params.name 联系人
 * @param {string} params.phone 联系电话
 * @param {string} params.province 省份
 * @param {string} params.city 城市
 * @param {string} params.district 区县
 * @param {string} params.detail 详细地址
 * @returns
 */
export async function addAddress(address: AddressParams): Promise<Result> {
	const value = await http.post(
		'/user/addAddress',
		address
	)
	return value.data as Result;
}

/** 
 * 获取用户地址列表
 * @returns
 */
export async function getAddressList(): Promise<Result> {
	const value = await http.get('/user/addressList')
	return value.data as Result;
}

/** 
 * 更新用户地址
 * @param {number} id 地址id
 * @returns
 */
export async function updateAddress(address: AddressDTO): Promise<Result> {
	const value = await http.post(
		'/user/updateAddress',
		address
	)
	return value.data as Result;
}

/** 
 * 获取用户默认地址
 * @returns
 */
export async function getDefaultAddress(): Promise<Result> {
	const value = await http.get('/user/defaultAddress')
	return value.data as Result;
}