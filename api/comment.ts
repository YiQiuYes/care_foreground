import { Result } from '@/api/result_interface.ts'
import http from '@/utils/request_util.ts'

/** 
 * 提交评价
 * @param {number} ordersId 订单id
 * @param {number} goodsId 商品id
 * @param {number} grade 评分
 * @param {string} content 评价内容
 * @returns
 */
export async function insertComment(params: { ordersId: number, goodsId: number, content: string, grade: number }): Promise<Result> {
    const value = await http.post('/comment/insert', params)
    return value.data as Result
}