<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 组织架构内容 -->
      <el-card class="tree-card">
        <!-- 前置结构内容 -->
        <tree-tools
          :tree-node="company"
          :is-root="true"
          @addDepts="addDepts"
        />
        <!-- 放置一个tree -->
        <el-tree
          :data="departs"
          :props="defaultProps"
          :default-expand-all="true"
        >
          <!-- 作用域插槽 slot-scope="obj" 接受传递给插槽的数据 -->
          <tree-tools
            slot-scope="{ data }"
            :tree-node="data"
            @delDepts="getDepartments"
            @addDepts="addDepts"
          />
        </el-tree>
      </el-card>
    </div>
    <addDept :show-dialog="showDialog" :tree-node="node" />
  </div>
</template>

<script>
import TreeTools from './components/tree-tools'
import { getDepartments } from '@/api/departments'
import { tranListToTreeData } from '@/utils/index'
import addDept from './components/add-dept'
export default {
  components: {
    TreeTools,
    addDept
  },
  data() {
    return {
      company: {},
      defaultProps: {
        label: 'name'
      },
      departs: [],
      showDialog: false,
      node: null // 记录当前点击的节点
    }
  },
  created() {
    this.getDepartments()
  },
  methods: {
    async getDepartments() {
      const res = await getDepartments()
      this.company = { name: res.companyName, manager: '负责人' }
      this.departs = tranListToTreeData(res.depts, '')
    },
    // 监听tree-tools中触发的点击添加子部门事件
    addDepts(node) {
      this.showDialog = true
      this.node = node
      console.log(this.node)
    }
  }
}

</script>

<style scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
