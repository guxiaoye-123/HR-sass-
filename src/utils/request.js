// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'
import { getTimeStamp } from './auth'
const TimeOut = 3600 // 定义超时时间
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // dev-api /prod-api
  timeout: 500
}) // 创建一个axios的实例
service.interceptors.request.use(config => {
  // 请求配置信息
  // 注入token
  if (store.getters.token) {
    if (IscheckTimeOut()) {
      // 如果为true 表示过期了
      // token没用了，删除
      store.dispatch('user/logout')
      // 跳到登录页
      return Promise.reject(new Error('超时了'))
    }
    // 只有在有token的情况下， 才有必要去检查时间戳超时
    config.headers['Authorization'] - `Bearer ${store.getters.token}`
  }
  return config // 必须要返回
}, error => {
  return Promise.reject(error)
}) // 请求拦截器

service.interceptors.response.use(response => {
  const { success, message, data } = response.data
  // 根据success的成功与否决定下面的操作
  if (success) {
    return data
  } else {
    // 业务已经错误 不能进入then 进入catch
    Message.error(message) // 提示错误消息
    return Promise.reject(new Error(message))
  }
}, error => {
  // error 信息里面 response的对象
  if (error.response && error.response.data && error.response.data.code === 10002) {
    // 当等于10002的时候 表示后端告诉超时了
    store.dispatch('user/logout') // 登出acion
    router.push('/login')
    return Promise.reject(new Error('超时了'))
  } else {
    Message.error(error.Message) // 提示错误信息
  }
  return Promise.reject(error) // 返回执行错误，让当前执行链跳出成功 直接进入catch
}) // 响应拦截器
// 是否超时
// 超时逻辑(当前时间 - 缓存时间) 是否大于时间差
function IscheckTimeOut() {
  var currentTime = Date.now() // 当前时间戳
  var timeStamp = getTimeStamp() // 缓存时间戳
  return (currentTime - timeStamp) / 1000 > TimeOut
}
export default service // 导出axios实例
