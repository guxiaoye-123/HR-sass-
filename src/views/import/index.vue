<template>
  <!-- 公共组件 -->
  <UploadExcel :on-success="success" />
</template>

<script>
import { importEmployee } from '@/api/employees'
export default {
  methods: {
    async success({ header, results }) {
      // header的数据为中文,results的数据也为中文
      // 新增员工的属性一致
      const userRelations = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber'
      }
      // var arr = []
      // results.forEach(item => {
      //   var userInfo = {}
      //   Object.keys(item).forEach(key => {
      //     // key为中文
      //     userInfo[userRelations[key]] = item[key]
      //   })
      //   arr.push(userInfo)
      // })
      const newArr = results.map(item => {
        console.log(item)
        console.log('2', Object.keys(item))
        var userInfo = {}
        Object.keys(item).forEach(key => {
          console.log('3', key)
          console.log('4', userRelations[key])
          if (userRelations[key] === 'timeOfEntry' || userRelations[key] === 'correctionTime') {
            // 后端限制 必须转化
            userInfo[userRelations[key]] = new Date(this.formatDate(item[key], '/')) // 只有这样才会存入数据库
          } else {
            // key为中文
            userInfo[userRelations[key]] = item[key]
          }
          console.log('5', userInfo)
        })
        return userInfo
      })
      await importEmployee(newArr) // 接受一个参数
      this.$message.success('导入excel成功')
      this.$router.back()
    },
    formatDate(numb, format) {
      const time = new Date((numb - 1) * 24 * 3600000 + 1)
      time.setYear(time.getFullYear() - 70)
      const year = time.getFullYear() + ''
      const month = time.getMonth() + 1 + ''
      const date = time.getDate() - 1 + ''
      if (format && format.length === 1) {
        return year + format + month + format + date
      }
      return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
    }
  }
}
</script>

<style>
</style>
