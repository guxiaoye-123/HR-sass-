// 员工路由规则
import layout from '@/layout'
export default {
  // 路由规则
  path: '/employees',
  name: 'employees',
  component: layout,
  children: [{
    path: '', // 这里不用写
    component: () => import('@/views/employees'),
    // 路由的原信息
    meta: {
      title: '员工管理', // 这里为什么要用title 左侧导航读取这里的属性
      icon: 'people'
    }
  }]
}
