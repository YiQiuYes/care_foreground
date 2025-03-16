import { Result } from '@/api/result_interface.ts'
import http from '@/utils/request_util.ts'

export interface NursingDetail {
	id: number,
	name: string,
	address: string,
	phone: string,
	content: string,
	time: string,
	bunkCount: number,
	workerCount: number,
	size: number,
	aptitude: number,
	images: string[],
	infoImage: string,
	location: string
}

export interface NursingBookingParams {
	nursingId: number,
	name: string,
	address: string,
	phone: string,
	time: string,
	content: string
}

/**
 * 获取新闻列表
  * @param {string} page_now 当前页码
  * @param {string} page_size 每页条数
  * @returns
 */
export async function nursinglist_api(page_now: number, page_size: number): Promise<Result> {
	const value = await http.get(
		'/nursing/list',
		{
			params: {
				pageNow: page_now,
				pageSize: page_size
			}
		}
	)
	return value.data as Result
}

/** 
 * 养老院详情
 * @returns
 */
export async function get_nursing_by_id(id: number): Promise<Result> {
	const value = await http.get('/nursing/getNursingById', { params: { id: id } })
	return value.data as Result
}

/** 
 * 预约养老院
 * @param {object} params 资讯信息
 * @param {number} params.nursingId 养老院id
 * @param {string} params.name 联系人姓名
 * @param {string} params.address 联系人地址
 * @param {string} params.phone 联系人电话
 * @param {number} params.time 预约时间
 * @param {string} params.content 预约内容
 * @returns
 */
export async function nursingBooking(params: NursingBookingParams): Promise<Result> {
	const value = await http.post('/nursing/booking', params)
	return value.data as Result
}