<template>

  <!-- 最外层的div -->
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>

      <!-- 渲染的Table -->
      <div>
        <el-row :gutter="10">
          <el-col :span="7">
            <!-- 搜索框 -->
            <el-input placeholder="提示文字"
                      prefix-icon="el-icon-search"
                      v-model="queryInfo.query"
                      clearable>
              <!-- 搜索按钮 -->
              <el-button slot="append"
                         icon="el-icon-search"
                         @click="searchClick">搜索</el-button>
            </el-input>
          </el-col>
          <el-col :span="3">
            <!-- 新增人员的按钮 -->
            <el-button type="primary"
                       @click="addEquipment">新增
            </el-button>
          </el-col>
        </el-row>

        <!-- 表格 -->
        <el-table ref="multipleTable"
                  :data="userList.slice((queryInfo.pagenum-1)*queryInfo.pagesize,queryInfo.pagenum*queryInfo.pagesize)"
                  tooltip-effect="dark"
                  @selection-change="handleSelectionChange"
                  :v-loading="loading"
                  stripe
                  border>
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
                           align="left">
            <template slot-scope="scope">
              {{ scope.row.username }}
            </template>
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

          <el-table-column label="状态">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.status"></el-switch>
            </template>
          </el-table-column>

          <el-table-column label="操作"
                           align="left"
                           v-if="showEdit || showDelete"
                           width="300px">
            <template slot-scope="scope">
              <el-button size="mini"
                         icon="el-icon-edit"
                         @click="handleEdit(scope.$index, scope.row)"
                         v-if="showEdit">编辑
              </el-button>
              <el-button size="mini"
                         type="danger"
                         icon="el-icon-delete"
                         @click="handleDelete(scope.$index, scope.row)"
                         v-if="showDelete">删除
              </el-button>
              <el-tooltip class="item"
                          effect="dark"
                          content="分配角色"
                          placement="top"
                          :enterable="false">
                <el-button size="mini"
                           type="warning"
                           icon="el-icon-setting">配置
                </el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="queryInfo.pagenum"
                       :page-sizes="[1, 5, 10, 20]"
                       :page-size="queryInfo.pagesize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="this.userList.length">
        </el-pagination>

      </div>
    </el-card>

    <div>
      <!-- 弹出的模态框，新增和修改用同一个 -->
      <el-dialog :title="titleMap[dialogStatus]"
                 :visible.sync="dialogFormVisible"
                 width="35%"
                 :before-close="modalClose">
        <el-form ref="userFormRef"
                 :model="form"
                 style="display=inline-block"
                 :rules="userFormRules">
          <el-form-item label="ID"
                        class="addFormID">
            <el-input v-model="form.id"
                      auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item prop="username"
                        label="姓名"
                        class="formInput">
            <el-input v-model="form.username"
                      auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item prop="password"
                        label="密码"
                        class="formInput">
            <el-input v-model="form.password"
                      auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别"
                        class="formInput">
            <el-select v-model="form.sex"
                       placeholder="请选择性别">
              <el-option label="男"
                         value="男"></el-option>
              <el-option label="女"
                         value="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="email"
                        label="邮箱"
                        class="formInput">
            <el-input v-model="form.email"
                      auto-complete="off"></el-input>
          </el-form-item>
          <!-- <el-form-item label="出场时间"
                        class="formInput">
            <div class="block"
                 style="margin-top:40px">
              <el-date-picker v-model="form.date"
                              type="date"
                              placeholder="选择日期">
              </el-date-picker>
            </div>
          </el-form-item> -->
        </el-form>
        <div slot="footer"
             class="dialog-footer">
          <el-button @click="addCancel">取 消</el-button>
          <el-button type="primary"
                     @click="addFinished">确 定</el-button>
        </div>
      </el-dialog>

    </div>

  </div>

</template>

<script>
import { getRequest } from '../../api/User'
export default {
  data () {
    return {

      // 人员数据
      userList: [],
      selItems: [],
      loading: true,
      showEdit: true,
      showDelete: true,
      // 新增和修改的dialog
      dialogFormVisible: false,
      form: {
        id: '',
        username: '',
        password: '',
        sex: '',
        email: ''
      },
      titleMap: {
        add: '新增人员',
        edit: '编辑人员'
      },
      dialogStatus: '',
      userFormRules: {
        username: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 4, message: '长度在 2 到 4 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { pattern: /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/, message: '请输入正确的邮箱格式' }
        ]
      },
      queryInfo: {
        // 搜索框
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      total: ''
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
      this.deleteUser(row.id)
    },
    getUser () {
      // var url = '/urm/list/TB_USER'
      var url = '/user'
      var params = ''
      getRequest(url, params).then(resp => {
        this.loading = false
        this.userList = resp.data
        // _this.$message({ type: 'error', message: '数据加载失败!' })
      }).catch(resp => {
        // 压根没见到服务器
        this.loading = false
        this.$message({ type: 'error', message: '加载人员数据失败！' })
      })
    },
    deleteUser (id) {
      // var _this = this
      // var url = ''
      // var params = ''
      // getRequest(url, params).then(resp => {
      //   _this.loading = false
      //   this.userList = resp.data
      //   console.log(resp)
      //   // _this.$message({ type: 'error', message: '数据加载失败!' })
      // }).catch(resp => {
      //   // 压根没见到服务器
      //   _this.loading = false
      //   _this.$message({ type: 'error', message: '加载人员数据失败！' })
      // })
      for (var i = 0; i < this.userList.length; i++) {
        if (this.userList[i].id === id) {
          this.userList.splice(i, 1)
          break
        }
      }
    },
    searchClick () {
      console.log(this.queryInfo.query)
    },
    // 新增人员  模态框
    addEquipment () {
      this.dialogFormVisible = true
      this.dialogStatus = 'add'
    },

    // 确认按钮
    addFinished () {
      this.$refs.userFormRef.validate(vali => {
        if (!vali) return this.$message.error('操作失败了,请按规范填写!')

        this.dialogFormVisible = false
        if (this.dialogStatus === 'add') {
          if (this.userList.length !== 0) {
            this.form.id = this.userList[this.userList.length - 1].id + 1
          }
          this.form.id = 0
          this.userList.push(this.form)
          this.$message.success('添加成功!')
          this.$refs.userFormRef.clearValidate()
          this.form = {}
        }

        if (this.dialogStatus === 'edit') {
          this.$message.success('修改成功!')
        }
      })
    },
    // 返回
    addCancel () {
      this.dialogFormVisible = false
      this.form = {}
      this.$refs.userFormRef.clearValidate()
    },
    // 模态框关闭
    modalClose (done) {
      done()
      this.form = {}
      this.$refs.userFormRef.clearValidate()
    },
    // 监听每页展示条数
    handleSizeChange (size) {
      this.queryInfo.pagesize = size
    },
    // 监听当前选中的页码
    handleCurrentChange (page) {
      this.queryInfo.pagenum = page
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
.addFormID {
  display: none;
}
.formInput {
  width: 220px;
  display: inline-block;
  margin: 20px;
}
.el-table {
  margin-top: 10px;
}
</style>
