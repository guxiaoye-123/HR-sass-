// 员工路由规则
import layout from '@/layout'
export default {
  // 路由规则
  path: '/setting',
  name: 'setting',
  component: layout,
  children: [{
    path: '', // 这里不用写
    component: () => import('@/views/setting'),
    // 路由的原信息
    meta: {
      title: '公司设置', // 这里为什么要用title 左侧导航读取这里的属性
      icon: 'setting'
    }
  }]
}
