import request from '@/utils/request'

// 获取员工列表
export function getStaff(query, token) {
  const { page, pageSize, username, cell, department } = query
  return request({
    url: `/v1/staff?page=${page}&pageSize=${pageSize}&username=${username}&cell=${cell}&department=${department}`,
    method: 'get',
    headers: { 'Authorization': 'Bearer ' + [token] }
  })
}
