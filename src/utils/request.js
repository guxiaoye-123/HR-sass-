// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // dev-api /prod-api
  timeout: 500
}) // 创建一个axios的实例
service.interceptors.request.use(config => {
  // 请求配置信息
  // 注入token
  if (store.getters.token) {
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
  Message.error(error.Message) // 提示错误信息
  return Promise.reject(error) // 返回执行错误，让当前执行链跳出成功 直接进入catch
}) // 响应拦截器
export default service // 导出axios实例
