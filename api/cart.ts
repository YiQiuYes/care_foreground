import { Result } from '@/api/result_interface.ts'
import http from '@/utils/request_util.ts'

/**
 * 获取购物车列表
 * @param {string} page_now 当前页码
 * @param {string} page_size 每页条数
 * @returns
 */
export async function cartList(page_now: number, page_size: number): Promise<Result> {
    const value = await http.get(
        '/cart/list',
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
 * 删除购物车商品
 * @param {number} id 购物车id
 * @returns
 */
export async function cartDelete(id: number): Promise<Result> {
    const value = await http.get(
        '/cart/delete',
        {
            params: { id: id }
        }
    )
    return value.data as Result
}