import { Result } from '@/api/result_interface.ts'
import http from '@/utils/request_util.ts'

export interface Good { 
    id: number,
    name: string,
    price: number,
    type: string,
    description: string,
    imageSrc: string,
    isActice: number,
    createTime: string,
    count: number
}

/**
 * 获取商品列表
 * @param {string} type 商品类型,可用值: "common", "housekeeping", "medicalCare", "ageingAtHome", "goods", "device", "healthCare"
 * @param {string} page_now 当前页码
 * @param {string} page_size 每页条数
 * @returns
 */
export async function goodslist_api(type : string, page_now : number, page_size : number) : Promise<Result> {
    const value = await http.get(
        '/goods/list',
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