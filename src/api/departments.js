import request from '@/utils/request'

/** *
 *
 * 获取组织架构数据
 * **/
export const getDepartments = () => {
  return request({
    url: '/company/department'
  })
}

/** *
 *
 * 删除组织架构的部门
 * **/
export function delDepartments(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'delete'
  })
}

/** *
 *
 * 新增组织架构部门
 * **/
export const addDepartments = data => {
  return request({
    url: '/company/department',
    method: 'POST',
    data
  })
}

/** *
 * 获取某个部门详情
 * ***/

export const getDepartDetail = id => {
  return request({
    url: `/company/department/${id}`
  })
}

/** *
 * 保存编辑的数据
 * ***/

export const updateDepartments = data => {
  return request({
    url: `/company/department/${data.id}`,
    method: 'PUT',
    data
  })
}
