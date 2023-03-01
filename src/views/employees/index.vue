<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools :show-before="true">
        <template v-slot:before>
          <span>共{{ page.total }}条记录</span>
        </template>
        <template v-slot:after>
          <el-button
            type="primary"
            size="small"
            @click="$router.push('/import')"
          >Excel 导入</el-button>
          <el-button
            type="primary"
            size="small"
          >Excel 导出</el-button>
          <el-button
            type="primary"
            size="small"
            icon="el-icon-plus"
            @click="showDialog = true"
          >新增员工</el-button>
        </template>
      </PageTools>
      <!-- 表格组件和分页 -->
      <el-card v-loading="loading">
        <el-table
          border
          :data="list"
        >
          <el-table-column
            type="index"
            label="序号"
            sortable=""
          />
          <el-table-column
            prop="username"
            label="姓名"
            sortable=""
          />
          <el-table-column
            prop="workNumber"
            label="工号"
            sortable=""
          />
          <el-table-column
            prop="formOfEmployment"
            :formatter="formatEmployment"
            label="聘用形式"
            sortable=""
          />
          <el-table-column
            prop="departmentName"
            label="部门"
            sortable=""
          />
          <!-- 作用域插槽 + 过滤器 -->
          <el-table-column
            prop="timeOfEntry"
            label="入职时间"
            sortable=""
          >
            <template v-slot="{ row }">
              {{ row.timeOfEntry | formatDate }}
            </template>
          </el-table-column>
          <el-table-column
            prop="enableState"
            label="账户状态"
            sortable=""
          >
            <template v-slot="{ row }">
              <el-switch :value="row.enableState === 1" />
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            sortable=""
            fixed="right"
            width="280"
          >
            <template slot-scope="{ row }">
              <el-button
                type="text"
                size="small"
              >查看</el-button>
              <el-button
                type="text"
                size="small"
              >转正</el-button>
              <el-button
                type="text"
                size="small"
              >调岗</el-button>
              <el-button
                type="text"
                size="small"
              >离职</el-button>
              <el-button
                type="text"
                size="small"
              >角色</el-button>
              <el-button
                type="text"
                size="small"
                @click="delEmployee(row.id)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row
          type="flex"
          justify="center"
          align="middle"
          style="height: 60px"
        >
          <el-pagination
            :current-page="page.page"
            :page-size="page.size"
            :total="page.total"
            layout="prev, pager, next"
            @current-change="changePage"
          />
        </el-row>
      </el-card>
    </div>
    <!-- 放置新增员工弹层 -->
    <AddDemployee :show-dialog.sync="showDialog" />
  </div>
</template>

<script>
import { getEmployeeList, delEmployee } from '@/api/employees'
import EmployeeEnum from '@/api/constant/employees' // 引入员工的枚举对象
import AddDemployee from './components/add-employee'
export default {
  components: {
    AddDemployee
  },
  data() {
    return {
      list: [], // 接受数组
      page: {
        page: 1,
        size: 10,
        total: 0 // 总数
      },
      loading: false, // 控制弹层显示
      showDialog: false // 默认关闭弹出层
    }
  },
  created() {
    this.getEmployeeList()
  },
  methods: {
    async getEmployeeList() {
      this.loading = true
      const { total, rows } = await getEmployeeList(this.page)
      this.page.total = total
      this.list = rows
      this.loading = false
    },
    changePage(newPage) {
      this.page.page = newPage
      this.getEmployeeList() // 重新拉取
    },
    // 格式化聘用形式
    formatEmployment(row, column, cellValue, index) {
      const obj = EmployeeEnum.hireType.find(item => item.id === cellValue)
      return obj ? obj.value : '未知'
    },
    async delEmployee(id) {
      try {
        await this.$confirm('确定要删除该员工吗?')
        // 点击确定进入下方
        await delEmployee(id)
        this.$message.success('删除员工成功')
        this.getEmployeeList()
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style>
</style>
