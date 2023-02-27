import request from '@/utils/request'
/**
 * 获取角色列表
 */

export const getRoleList = params => {
  return request({
    url: '/sys/role',
    params
  })
}

/**
 * 获取公司信息
 */

export const getCompanyInfo = companyId => {
  return request({
    url: `/company/${companyId}`
  })
}

/**
 * 删除角色
 */

export const deleteRole = id => {
  return request({
    url: `/sys/role/${id}`,
    method: 'DELETE'
  })
}

/**
 * 获取角色详情
 */

export const getRoleDetail = id => {
  return request({
    url: `/sys/role/${id}`
  })
}
/**
 * 修改角色
 */

export const updateRole = data => {
  return request({
    url: ` /sys/role/${data.id}`,
    method: 'PUT',
    data
  })
}

/**
 * 新增角色
 */

export const addRole = data => {
  return request({
    url: '/sys/role',
    method: 'POST',
    data
  })
}
