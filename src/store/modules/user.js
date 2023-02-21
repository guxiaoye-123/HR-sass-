import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getUserInfo, getUserDetailById } from '@/api/user'
// 状态
const state = {
  token: getToken(), // 设置token为共享状态
  userInfo: {} // 定义一个空对象
}
// 修改状态
const mutations = {
  setToken(state, token) {
    state.token = token // 将数据设置给vuex
    // 同步给缓存
    setToken(token)
  },
  // 删除缓存
  removeToken(state) {
    state.token = null // 删除vuex的token
    removeToken() // 先清除 vuex 再清除缓存 vuex与缓存数据同步
  },
  setUserInfo(state, res) {
    // 更新一个对象
    state.userInfo = res // 响应式
  },
  removeUserInfo(state) {
    state.userInfo = {}
  }
}
// 执行异步
const actions = {
  async login(context, data) {
    // 调用api接口
    const res = await login(data)
    context.commit('setToken', res)
  },
  async getUserInfo(context) {
    const res = await getUserInfo()
    // 获取用户详情
    const baseInfo = await getUserDetailById(res.userId)
    context.commit('setUserInfo', { ...res, ...baseInfo }) // 提交到mutations
    return res // 后期做权限，现在无用
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}

