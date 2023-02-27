<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="角色管理">
            <!-- 左侧标签 -->
            <el-row>
              <el-button
                type="primary"
                icon="el-icon-plus"
                size="small"
              >新增角色</el-button>
            </el-row>
            <el-table
              border=""
              style="margin-top: 50px;"
              :data="list"
            >
              <el-table-column
                label="序号"
                width="120"
                type="index"
                align="center"
              >
                <!--  -->
              </el-table-column>
              <el-table-column
                label="角色名"
                width="240"
                prop="name"
                align="center"
              >
                <!--  -->
              </el-table-column>
              <el-table-column align="center" label="描述" prop="description">
                <!--  -->
              </el-table-column>
              <el-table-column align="center" label="操作" prop="companyId">
                <template slot-scope="{ row }">
                  <el-button
                    size="small"
                    type="success"
                  >分配权限</el-button>
                  <el-button
                    size="small"
                    type="primary"
                    @click="eidtRole(row.id)"
                  >编辑</el-button>
                  <el-button
                    size="small"
                    type="danger"
                    @click="deleteRole(row.id)"
                  >
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 放置分页组件 -->
            <el-row
              type="flex"
              justify="center"
              align="middle"
              style="height: 60px"
            >
              <el-pagination
                :page-size="page.pagesize"
                :total="page.total"
                :current-page="page.page"
                layout="prev, pager, next"
                @current-change="changePage"
              />
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="公司信息">
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
              show-icon
              :closable="false"
            />
            <!-- 右侧标签 -->
            <el-form
              label-width="120px"
              style="margin-top: 50px;"
            >
              <el-form-item label="企业名称">
                <el-input v-model="formData.name" disabled style="width: 400px;" />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input v-model="formData.companyAddress" disabled style="width: 400px;" />
              </el-form-item>
              <el-form-item label="公司电话">
                <el-input v-model="formData.companyPhone" disabled style="width: 400px;" />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="formData.mailbox" disabled style="width: 400px;" />
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="formData.remarks" disabled type="textarea" :rows="3" style="width: 400px;" />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <!-- 弹层 -->
    <el-dialog title="编辑部门" :visible="showDialog" @close="btnCancel">
      <el-form ref="roleForm" :model="roleForm" :rules="rules" label-width="120px">
        <el-form-item prop="name" label="角色名称">
          <el-input v-model="roleForm.name" />
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="roleForm.description" />
        </el-form-item>
      </el-form>
      <!-- 放置footer插槽 -->
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" type="primary" @click="btnOK">确定</el-button>
          <el-button size="small" type="primary" @click="btnCancel">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { getRoleList, getCompanyInfo, deleteRole, getRoleDetail, updateRole, addRole } from '@/api/setting'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      list: [], // 承接数组
      page: {
        // 放置页码及相关数据
        page: 1, // 页码
        pagesize: 10, // 每页条数
        total: 0 // 默认总数为0
      },
      formData: {}, // 公司信息
      showDialog: false, // 控制弹层显示
      roleForm: {
        name: '',
        description: ''
      },
      rules: {
        name: [{ required: true, message: '角色名称不能为空', trgger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapGetters(['companyId'])
  },
  created() {
    this.getRoleList()
    this.getCompanyInfo()
  },
  methods: {
    async getRoleList() {
      const { total, rows } = await getRoleList(this.page)
      this.page.total = total
      this.list = rows
    },
    changePage(newPage) {
      // 当前点击的页码,将其赋值给当前最新的页码
      this.page.page = newPage
      this.getRoleList()
    },
    async getCompanyInfo() {
      this.formData = await getCompanyInfo(this.companyId)
    },
    async deleteRole(id) {
      // 提示
      try {
        await this.$confirm('你确定要删除该角色吗?')
        await deleteRole(id) // 调用删除接口
        this.getRoleList() // 重新加载
        console.log(id)
        this.$message.success('删除角色成功')
        this.$message()
      } catch (err) {
        console.log(err)
      }
    },
    async eidtRole(id) {
      this.roleForm = await getRoleDetail(id)
      this.showDialog = true
    },
    async btnOK() {
      try {
        await this.$refs.roleForm.validate()
        if (this.formData.id) {
          await updateRole(this.formData)
        } else {
          // 新增业务
          await addRole(this.formData)
        }
        this.getRoleList() // 重新加载
        this.$message.success('操作成功')
        this.showDialog = false
      } catch (err) {
        console.log(err)
      }
    },
    btnCancel() {
      this.formData = {
        name: '',
        description: ''
      }
      this.$refs.roleForm.resetFields()
      this.showDialog = false
    }
  }
}
</script>

<style>
</style>
