/** *
 *
 * 获取组织架构数据
 * **/
import request from '@/utils/request'
export const getDepartments = () => {
  return request({
    url: '/company/department'
  })
}
