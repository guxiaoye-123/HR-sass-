import request from '@/utils/request'
/**
 * 登录接口的封装
 */
export const login = data => {
  // 返回一个promise对象
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}

export const getInfo = token => {

}

export const logout = () => {

}
/**
 * 获取用户基本资料
 */
export const getUserInfo = () => {
  // 返回一个promise对象
  return request({
    url: ' /sys/profile',
    method: 'POST'
  })
}
