import request from '@/utils/request'

// 获取商品列表
export function getSkuList(query, token) {
  const { page, pageSize, erp_type, name, goods_id, sku_id, level } = query
  return request({
    url: `/v1/erp/sku_list?page=${page}&pageSize=${pageSize}&erp_type=${erp_type}&store=1&name=${name}&goods_id=${goods_id}&sku_id=${sku_id}&level=${level}`,
    method: 'get',
    headers: { 'Authorization': 'Bearer ' + [token] }
  })
}
