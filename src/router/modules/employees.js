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
  },
  {
    path: 'detail/:id', // query传参 动态路由传参
    component: () => import('@/views/employees/detail'),
    hidden: true, // 不在左侧菜单显示
    meta: {
      title: '员工详情' // 标记当前路由规则的中文名称 后续在做左侧菜单时 使用
    }
  }]
}
