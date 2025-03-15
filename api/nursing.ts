import { Result } from '@/api/result_interface.ts'
import http from '@/utils/request_util.ts'

/**
 * 获取新闻列表
  * @param {string} page_now 当前页码
  * @param {string} page_size 每页条数
  * @returns
 */
export async function nursinglist_api(page_now : number, page_size : number) : Promise<Result> {
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
export async function get_nursing_by_id(id : number) {
	const value = await http.get('/nursing/getNursingById', { params: { id: id } })
	return value.data as Result
}