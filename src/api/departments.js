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
export const delDepartment = id => {
  return request({
    url: `/company/department/${id}`,
    method: 'delete'
  })
}
