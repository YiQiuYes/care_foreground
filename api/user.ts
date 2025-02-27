export interface LoginParams {
	/*密码 */
	password ?: string;
	/*手机号 */
	phone ?: string;
}

export interface Result {
	/* 状态码 */
	code : number;
	/* 消息 */
	msg : string;
	/* 数据 */
	data : Record<string, unknown>;
	/* 时间戳 */
	timestamp : number;
}

/** 
 * 用户登录
 * @param {object} params 用户信息
 * @param {string} params.password 密码
 * @param {string} params.phone 手机号
 * @returns
 */
export async function login_api(params : LoginParams) : Promise<Result> {
	const value = await uni.request({
		url: `http://localhost:8080/user/login`,
		method: 'POST',
		data: params
	});
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
	const value = await uni.request({
		url: `http://localhost:8080/user/register`,
		method: 'POST',
		data: params
	});
	return value.data as Result;
}

/** 
 * 刷新token
 * @param {string} refreshToken 刷新令牌
  * @returns
 */
export async function refresh_token_api(refreshToken : string) : Promise<Result> {
	const value = await uni.request({
		url: `http://localhost:8080/user/refreshToken`,
		method: 'GET',
		data: {
			refreshToken,
		}
	});
	return value.data as Result;
}