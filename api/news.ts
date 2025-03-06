import { Result } from '@/api/result_interface.ts'
import http from '@/utils/request_util.ts'

/**
 * 获取新闻列表
 * @param {string} type 新闻类型,可用值:new,notice,policy
  * @param {string} page_now 当前页码
  * @param {string} page_size 每页条数
  * @returns
 */
export async function newslist_api(type : string, page_now : number, page_size : number) : Promise<Result> {
	const value = await http.get(
		'/news/list',
		{
			params: {
				type: type,
				pageNow: page_now,
				pageSize: page_size
			}
		}
	)
	return value.data as Result
}

/** 
 * 新闻轮播图
 * @returns
 */
export async function news_slide_api() {
	const value = await http.get('/news/slide')
	return value.data as Result
}