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
                      v-model="searchInfo"
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
          <el-table-column label="序号"
                           width="50px">
            <template slot-scope="scope">
              {{ scope.$index+1 }}
            </template>
          </el-table-column>

          <el-table-column label="姓名"
                           align="left">
            <template slot-scope="scope">
              {{ scope.row.USER_NAME }}
            </template>
          </el-table-column>

          <el-table-column prop="IDCARD_UUID"
                           label="身份UUID"
                           align="left">
          </el-table-column>

          <el-table-column prop="MOBILE"
                           label="手机号">
          </el-table-column>

          <el-table-column prop="IDCARD_NO"
                           label="身份证号">
          </el-table-column>

          <el-table-column prop="EAMIL"
                           label="邮箱"
                           align="left">
          </el-table-column>

          <el-table-column label="操作"
                           align="left"
                           v-if="showEdit || showDelete"
                           width="300px">
            <template slot-scope="scope">
              <!-- 编辑按钮 -->
              <el-button size="mini"
                         icon="el-icon-edit"
                         @click="handleEdit(scope.$index, scope.row)"
                         v-if="showEdit">编辑
              </el-button>

              <!-- 删除按钮 -->
              <el-button size="mini"
                         type="danger"
                         icon="el-icon-delete"
                         @click="handleDelete(scope.$index, scope.row)"
                         v-if="showDelete">删除
              </el-button>

              <!-- 配置按钮 -->
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
                       :page-sizes="[5, 10, 15, 20]"
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
                 width="40%"
                 :before-close="modalClose">
        <el-form ref="userFormRef"
                 :model="form"
                 style="display=inline-block"
                 :rules="userFormRules">

          <el-form-item prop="USER_NAME"
                        label="姓名"
                        class="formInput">
            <el-input v-model="form.USER_NAME"></el-input>
          </el-form-item>

          <el-form-item prop="IDCARD_NO"
                        label="身份证号"
                        class="formInput">
            <el-input v-model="form.IDCARD_NO"
                      disabled></el-input>
          </el-form-item>

          <el-form-item prop="JOB_TITLE"
                        label="职称"
                        class="formInput">
            <el-input v-model="form.JOB_TITLE"></el-input>
          </el-form-item>

          <el-form-item prop="MOBILE"
                        label="手机号"
                        class="formInput">
            <el-input v-model="form.MOBILE"></el-input>
          </el-form-item>

          <el-form-item prop="EMAIL"
                        label="邮箱"
                        class="formInput">
            <el-input v-model="form.EMAIL"></el-input>
          </el-form-item>

          <el-form-item orop="ORG_NO"
                        label="机构编码"
                        class="formInput">
            <el-input v-model="form.ORG_NO"
                      disabled></el-input>
          </el-form-item>

          <el-form-item prop="TYPE"
                        label="用户类型"
                        class="formInput">
            <el-input v-model="form.TYPE"></el-input>
          </el-form-item>

          <el-form-item prop="JOB_POSITION"
                        label="职务"
                        class="formInput">
            <el-input v-model="form.JOB_POSITION"></el-input>
          </el-form-item>

          <el-form-item prop="REMARK"
                        label="备注"
                        class="formInput">
            <el-input v-model="form.REMARK"></el-input>
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

  </div>

</template>

<script>
import { getRequest, putRequest, deleteRequest } from '../../api/uum'
export default {
  data () {
    return {
      // 搜索框
      searchInfo: '',
      // 人员数据
      userList: [],
      selItems: [],
      loading: true,
      showEdit: true,
      showDelete: true,
      // 新增和修改的dialog
      dialogFormVisible: false,
      form: {
        USER_NAME: '',
        IDCARD_NO: '',
        JOB_TITLE: '',
        MOBILE: '',
        EMAIL: '',
        ORG_NO: '',
        TYPE: '',
        JOB_POSITION: '',
        REMARK: ''
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
        query: '',
        pagenum: 1,
        pagesize: 5
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

    // 修改按钮
    handleEdit (index, row) {
      // this.$router.push({ path: '/editBlog', query: { from: this.activeName, id: row.id } })
      this.dialogStatus = 'edit'
      this.dialogFormVisible = true
      // this.form = this.userList[index]
    },
    // 删除
    handleDelete (index, row) {
      this.deleteUser(row.USER_ID)
    },
    getUser () {
      // var url = '/urm/list/TB_USER'
      getRequest('/ums/service/V1/res/users', { startTime: '2017-06-21T08:00:00.000Z' }).then(resp => {
        this.loading = false
        this.userList = resp.data.data
        this.total = resp.data.total
      }).catch(resp => {
        // 压根没见到服务器
        this.loading = false
        this.$message({ type: 'error', message: '加载人员数据失败！' })
      })
    },
    deleteUser (id) {
      deleteRequest('', {}).then(resp => {

      }).catch(resp => {
        this.loading = false
        this.$message({ type: 'error', message: '删除人员数据失败！' })
      })
    },
    searchClick () {
      console.log(this.searchInfo)
    },
    // 新增人员  模态框
    addEquipment () {
      this.dialogFormVisible = true
      this.dialogStatus = 'add'
    },

    // 确认按钮,添加和修改为同一个 dialog
    addFinished () {
      this.dialogFormVisible = false

      this.$refs.userFormRef.validate(vali => {
        if (!vali) return

        if (this.dialogStatus === 'add') {
          console.log('添加')
        }
        if (this.dialogStatus === 'edit') {
          console.log(this.form)
          var url = '/ums/service/V1/res/users/'
          let params = this.form
          putRequest(url, params).then(resp => {
            console.log(resp)
          }).catch(resp => {
            this.$message({ type: 'error', message: '修改人员数据失败！' })
          })
        }
      })
      this.$refs.userFormRef.resetFields()
    },
    // 模态框返回按钮
    addCancel () {
      this.dialogFormVisible = false
      this.$refs.userFormRef.resetFields()
    },
    // 模态框关闭
    modalClose (done) {
      done()
      this.$refs.userFormRef.resetFields()
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
    console.log('创建实例完成！')
    // 获取人员数据并渲染
    this.getUser()
  },
  mounted: function () {
    console.log('挂载完成！')
  }

}
</script>

<style scoped>
.formInput {
  width: 200px;
  display: inline-block;
  margin: 20px;
}
.el-table {
  margin-top: 10px;
}
</style>
