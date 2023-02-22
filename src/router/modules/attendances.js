// 员工路由规则
import layout from '@/layout'
export default {
  // 路由规则
  path: '/attendances',
  name: 'attendances',
  component: layout,
  children: [{
    path: '', // 这里不用写
    component: () => import('@/views/attendances'),
    // 路由的原信息
    meta: {
      title: '考勤', // 这里为什么要用title 左侧导航读取这里的属性
      icon: 'skill'
    }
  }]
}
