import { Result } from '@/api/result_interface.ts'
import http from '@/utils/request_util.ts'

export interface LoginParams {
	/*密码 */
	password ?: string;
	/*手机号 */
	phone ?: string;
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
		'http://localhost:8080/user/refreshToken',
		{
			params: { refreshToken: refreshToken }
		}
	)
	return value.data as Result;
}