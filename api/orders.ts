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