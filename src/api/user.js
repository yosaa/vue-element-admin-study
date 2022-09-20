import request from '@/utils/request'

// 登入
export function login(data) {
  return request({
    url: '/v1/staff/loginByPwd',
    method: 'post',
    data
  })
}

// 获取个人信息
export function getInfo(uid, token) {
  return request({
    url: `/v1/staff/${uid}`,
    method: 'get',
    headers: { 'Authorization': 'Bearer ' + [token] }
  })
}

// 登出已作废 本地实现
export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}

// 获取菜单
export function getMenu(token) {
  return request({
    url: '/v1/staff/menu',
    method: 'get',
    headers: { 'Authorization': 'Bearer ' + [token] }
  })
}
