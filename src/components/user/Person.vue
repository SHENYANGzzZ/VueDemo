<template>
  <div>
    <!-- 人员循环 -->
    <el-card class="card1">
      <!-- 模糊查询 -->
      <el-input class="search"
                v-model="input"
                placeholder="请输入内容"
                clearable>
      </el-input>
      <el-button icon="el-icon-search"
                 circle></el-button>
      <!-- 按钮 -->
      <el-button class="btn"
                 type="primary">新建</el-button>
      <el-table :data="tableData"
                style="width: 100%"
                stripe
                border>
        <el-table-column prop="date"
                         label="日期"
                         width="180">
        </el-table-column>

        <el-table-column prop="name"
                         label="姓名"
                         width="180">
        </el-table-column>

        <el-table-column prop="address"
                         label="地址">
        </el-table-column>

        <!-- 操作组件 -->
        <el-table-column label="操作">
          <el-button type="primary"
                     icon="el-icon-edit"
                     circle></el-button>
          <el-button type="danger"
                     icon="el-icon-delete"
                     circle></el-button>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-pagination class="pagination"
                     background
                     layout="prev, pager, next"
                     page-size="10"
                     :total="500">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      input: '',
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  }
}
</script>

<style lang="less" scoped>
.btn {
  margin-bottom: 15px;
}
.el-button {
  margin-left: 10px;
}
.card1 {
  margin-top: 20px;
}
.pagination {
  margin-top: 10px;
}
.search {
  width: 200px;
}
</style>
