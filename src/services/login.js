// import req from '@/utils/req'
import req from "../utils/request";

export function getInfo (token) {
  return req({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout () {
  return req({
    url: '/user/logout',
    method: 'post'
  })
}

// 获取uuid
export function genUUID () {
  return req({
    url: 'sso/authentication/genUUID.do',
    method: 'GET'
  })
}
// 用户登录
export function apiLogin (par) {
  return req({
    url: 'sso/authentication/login.do',
    method: 'POST',
    params: par
  })
}

// 获取用户信息
export function userDetail (token) {
  return req({
    url: 'sso/authentication/userDetail.do?token=' + token,
    method: 'POST'
  })
}

// 获取用户菜单权限列表
export function userPermission (id, etype, utype) {
  return req({
    url: 'admin/userManager/queryUserMenu.do?user_id=' + id + '&entity_type=' + etype + '&user_type=' + utype,
    method: 'GET'
  })
}
