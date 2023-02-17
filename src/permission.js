// 权限拦截在路由跳转 导航守卫
import router from '@/router'
import store from '@/store' // 引入 store实例 和组件中的this.$store是一回事
import nProgress from 'nprogress' // 引入进度条
import 'nprogress/nprogress.css' // 引入进度条样式
// 不需要导出，只需要执行即可

// 前置守卫
// next 是前置守卫必须执行的钩子，如果next 不执行 页面无法进行
// next() 放过
// next(false) 跳转终止
// next(地址) 跳转到某个地址
const whiteList = ['/login', '/404'] // 定义白名单
router.beforeEach((to, from, next) => {
  nProgress.start()
  if (store.getters.token) {
    // 如果有token
    if (to.path === '/login') {
      // 如果要访问的是登录页
      next('/') // 回到主页
    } else {
      next()
    }
  } else {
    // 没有token的情况，是否在白名单
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})
// 后置守卫
router.afterEach(() => {
  nProgress.done() // 关闭进度条
})
