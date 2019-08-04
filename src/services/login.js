// import req from '@/utils/req'
import req from "../utils/request";

export function apiUserInfo (token) {
  return req({
    url: 'api/user/info',
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
    url: 'api/sso/authentication/genUUID.do',
    method: 'GET'
  })
}
// 用户登录
export function apiLogin1 (par) {
  return req({
    url: 'api/sso/authentication/login.do',
    method: 'POST',
    body: JSON.stringify(par)
  })
}

// 用户登录
export function apiLogin (uuid, encryptPwd, loginName) {
  return req({
    url: 'api/sso/authentication/login.do?uuid=' + uuid + '&encryptPwd=' + encryptPwd + '&loginName=' + loginName,
    method: 'POST'
  })
}

// 获取用户信息
export function apiUserDetail (token) {
  return req({
    url: 'api/sso/authentication/userDetail.do?token=' + token,
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
