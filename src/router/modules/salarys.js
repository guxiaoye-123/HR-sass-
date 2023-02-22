// 员工路由规则
import layout from '@/layout'
export default {
  // 路由规则
  path: '/salarys',
  name: 'salarys',
  component: layout,
  children: [{
    path: '', // 这里不用写
    component: () => import('@/views/salarys'),
    // 路由的原信息
    meta: {
      title: '工资', // 这里为什么要用title 左侧导航读取这里的属性
      icon: 'money'
    }
  }]
}
