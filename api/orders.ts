import { Result } from '@/api/result_interface.ts'
import http from '@/utils/request_util.ts'

export interface OrderCreate {
    goodsId: number,
    address: string,
    phone: string,
    count: number
}

export async function ordersInsert(params: OrderCreate[]): Promise<Result> {
    const value = await http.post('/orders/insert', params)
    return value.data as Result
}

/** 
 * 根据商品类型获取订单列表
 * @param {string} type 商品类型,可用值:common,housekeeping,medicalCare,ageingAtHome,goods,device,healthCare
 * @param {number} pageNow 当前页码
 * @param {number} pageSize 每页条数
 * @param {number} status 订单状态
 * @returns
 */
export async function ordersTypeList(params: { type: string, pageNow: string, pageSize: string, status?: number }): Promise<Result> {
    const value = await http.get('/orders/typeList', {
        params: {
            type: params.type,
            pageNow: params.pageNow,
            pageSize: params.pageSize,
            status: params.status
        }
    })
    return value.data as Result
}

/** 
 * 确认收货
 * @param {number} id 订单id
 * @returns
 */
export async function ordersConfirmReceive(id: number): Promise<Result> {
    const value = await http.get('/orders/confirmReceive', { params: { id: id } })
    return value.data as Result
}