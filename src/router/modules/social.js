// 员工路由规则
import layout from '@/layout'
export default {
  // 路由规则
  path: '/social',
  name: 'social',
  component: layout,
  children: [{
    path: '', // 这里不用写
    component: () => import('@/views/social'),
    // 路由的原信息
    meta: {
      title: '社保', // 这里为什么要用title 左侧导航读取这里的属性
      icon: 'table'
    }
  }]
}
