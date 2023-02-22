// 员工路由规则
import layout from '@/layout'
export default {
  // 路由规则
  path: '/approvals',
  name: 'approvals',
  component: layout,
  children: [{
    path: '', // 这里不用写
    component: () => import('@/views/approvals'),
    // 路由的原信息
    meta: {
      title: '审批' // 这里为什么要用title 左侧导航读取这里的属性
    }
  }]
}
