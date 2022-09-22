<template>
  <div>
    <div class="box">
      <span style="text-align: center;width:50px;margin:10px">姓名</span><el-input v-model="username" style="width:400px" placeholder="请输入姓名" />
      <span style="text-align: center;width:50px;margin:10px">手机号</span><el-input v-model="cell" style="width:400px" placeholder="请输入手机号" />
      <el-button type="primary" @click="searchStaff">点击搜索</el-button>
    </div>

    <div>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="uid" label="UID" />
        <el-table-column prop="username" label="用户姓名" width="180" />
        <el-table-column prop="cell" label="手机号" width="180" />
        <el-table-column prop="department" label="部门" />
        <el-table-column prop="role_id" label="权限等级" />
        <el-table-column prop="created_at" label="创建时间" />
      </el-table>
    </div>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      @current-change="handleCurrentChange"
    />
    <!-- <div id="container" /> -->
  </div>

</template>

<script>
import { getStaff } from '@/api/staff'
import { getToken } from '@/utils/auth'
// import { Liquid } from '@antv/g2plot'
export default {
  data() {
    return {
      total: 0,
      page: 0,
      pageSize: 5,
      username: '',
      cell: '',
      department: '',
      tableData: []
    }
  },
  created() {
    this.searchStaff()
  },
  mounted() {
    // const liquidPlot = new Liquid('container', {
    //   percent: 0.25
    // })
    // liquidPlot.render()
  },
  methods: {
    async searchStaff() {
      const { data } = await getStaff({
        page: this.page, pageSize: this.pageSize, username: this.username, cell: this.cell, department: this.department
      }, getToken())
      this.total = data.totalElements
      this.tableData = data.elements
    },

    handleCurrentChange(val) {
      this.page = val - 1
      this.searchStaff() // 获取用户点击的当前页后刷新页面数据
    }
  }
}

</script>

<style lang=scss>
.box {
    display: flex;
    flex-direction: row;
    justify-content:flex-start ;
}

.el-dropdown {
    vertical-align: top;
  }
  .el-dropdown + .el-dropdown {
    margin-left: 15px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
