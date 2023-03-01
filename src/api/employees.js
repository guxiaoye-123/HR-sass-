import request from '@/utils/request'

/**
 * 获取员工简单列表
 */

export const getEmployeeSimple = () => {
  return request({
    url: '/sys/user/simple'
  })
}

/**
 * 获取员工的综合列表数据
 */

export const getEmployeeList = params => {
  return request({
    url: '/sys/user',
    params
  })
}

/**
 * 获取员工的综合列表数据
 */

export const delEmployee = id => {
  return request({
    url: `/sys/user/${id}`,
    method: 'DELETE'
  })
}

/**
 * 新增员工
 */

export const addEmployee = data => {
  return request({
    url: '/sys/user',
    method: 'POST',
    data
  })
}

/**
 * 批量导入员工
 */

export const importEmployee = data => {
  return request({
    url: '/sys/user/batch',
    method: 'POST',
    data
  })
}
