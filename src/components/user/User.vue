<template>
  <div>
    <div>
      <el-button type="primary"
                 size="medium"
                 @click="addEquipment">新增</el-button>

      <el-dialog :title="titleMap[dialogStatus]"
                 :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="ID">
            <el-input v-model="form.id"
                      auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="form.username"
                      auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.password"
                      auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="form.sex"
                       placeholder="请选择性别">
              <el-option label="男"
                         value="1"></el-option>
              <el-option label="女"
                         value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="form.email"
                      auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="出场时间">
            <div class="block"
                 style="margin-top:40px">
              <el-date-picker v-model="form.date"
                              type="date"
                              placeholder="选择日期">
              </el-date-picker>
            </div>
          </el-form-item>
        </el-form>
        <div slot="footer"
             class="dialog-footer">
          <el-button @click="addCancel">取 消</el-button>
          <el-button type="primary"
                     @click="addFinished">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!--  -->
    <div>
      <!-- 搜索框 -->
      <el-input placeholder="提示文字"
                prefix-icon="el-icon-search"
                v-model="keywords">
      </el-input>
      <!-- 搜索按钮 -->
      <el-button type="primary"
                 icon="el-icon-search"
                 @click="searchClick">搜索</el-button>
      <!-- 表格 -->
      <el-table ref="multipleTable"
                :data="userList"
                tooltip-effect="dark"
                style="width: 100%;overflow-x: hidden; overflow-y: hidden;"
                @selection-change="handleSelectionChange"
                :v-loading="loading">
        <!-- 多选 -->
        <el-table-column type="selection"
                         align="left"
                         v-if="showEdit || showDelete">
        </el-table-column>

        <!--  -->
        <el-table-column prop="id"
                         label="ID"
                         align="left">
        </el-table-column>
        <el-table-column label="姓名"
                         align="left"
                         prop="username">
          <!--  <template slot-scope="scope">
            <span style="color: #409eff;cursor: pointer"
                  @click="itemClick(scope.row)">
              {{ userList.name }}
            </span>
          </template> -->
        </el-table-column>

        <el-table-column prop="password"
                         label="密码"
                         align="left">
        </el-table-column>

        <el-table-column prop="sex"
                         label="性别"
                         align="left">
        </el-table-column>

        <el-table-column prop="email"
                         label="邮箱"
                         align="left">
        </el-table-column>

        <el-table-column label="操作"
                         align="left"
                         v-if="showEdit || showDelete">
          <template slot-scope="scope">
            <el-button size="mini"
                       @click="handleEdit(scope.$index, scope.row)"
                       v-if="showEdit">编辑
            </el-button>
            <el-button size="mini"
                       type="danger"
                       @click="handleDelete(scope.$index, scope.row)"
                       v-if="showDelete">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getRequest } from '../../api/api'
export default {
  data () {
    return {
      // 搜索框
      keywords: '',
      userList: [],
      selItems: [],
      loading: true,
      showEdit: true,
      showDelete: true,
      // 模态框
      dialogFormVisible: false,
      form: {
        id: null,
        name: '',
        age: null,
        data: ''
      },
      titleMap: {
        add: '新增人员',
        edit: '编辑人员'
      },
      dialogStatus: ''
    }
  },
  methods: {
    handleSelectionChange (val) {
      this.selItems = val
      console.log(this.selItems)
    },
    // 点击姓名，查看详情
    itemClick (row) {
      // this.$router.push({ path: '/blogDetail', query: { aid: row.id } })
      this.$Message(row)
    },
    handleEdit (index, row) {
      // this.$router.push({ path: '/editBlog', query: { from: this.activeName, id: row.id } })
      this.dialogStatus = 'edit'
      this.dialogFormVisible = true
      this.form = this.userList[index]
    },
    // 非物理删除，放入垃圾数据
    handleDelete (index, row) {
      // for (var i = 0; i < this.userList.length; i++) {
      //   if (this.userList[i].id === row.id) {
      //     this.userList.splice(i, 1)
      //     break
      //   }
      // }
      // this.deleteUser()
    },
    getUser () {
      var _this = this
      // var url = '/urm/list/TB_USER'
      var url = '/user'
      var params = ''
      getRequest(url, params).then(resp => {
        _this.loading = false
        this.userList = resp.data
        console.log(resp)
        // _this.$message({ type: 'error', message: '数据加载失败!' })
      }).catch(resp => {
        // 压根没见到服务器
        _this.loading = false
        _this.$message({ type: 'error', message: '加载人员数据失败！' })
      })
    },
    deleteUser () {
      var _this = this
      var url = ''
      var params = ''
      getRequest(url, params).then(resp => {
        _this.loading = false
        this.userList = resp.data
        console.log(resp)
        // _this.$message({ type: 'error', message: '数据加载失败!' })
      }).catch(resp => {
        // 压根没见到服务器
        _this.loading = false
        _this.$message({ type: 'error', message: '加载人员数据失败！' })
      })
    },
    searchClick () {
      console.log(this.keywords)
    },
    // 模态框
    addEquipment () {
      this.dialogFormVisible = true
      this.dialogStatus = 'add'
    },
    addFinished () {
      this.dialogFormVisible = false
      this.userList.push(this.form)
      this.form = {}
    },
    addCancel () {
      this.dialogFormVisible = false
      this.form = {}
    }
  },
  props: [
  ],
  created: function () {
    // 人员展示列表
    this.getUser()
  },
  mounted: function () {
    console.log('挂载完成！')
  }

}
</script>

<style scoped>
</style>
