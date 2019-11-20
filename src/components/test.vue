<template>
  <div>
    <el-button type="primary"
               size="medium"
               @click="addEquipment">新增</el-button>
    <el-button type="text"
               size="medium"
               @click="handelEdit(scope.$index, scope.row)">编辑</el-button>
    <el-dialog :title="titleMap[dialogStatus]"
               :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="major">
          <el-input v-model="form.major"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="minior">
          <el-input v-model="form.minior"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="mac">
          <el-input v-model="form.mac"
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
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dialogFormVisible: false,
      form: {
        major: '',
        minior: '',
        mac: '',
        date: ''
      },
      titleMap: {
        addEquipment: '新增设备',
        editEquipment: '编辑设备'
      },
      dialogStatus: ''
    }
  },
  methods: {
    addEquipment () {
      this.dialogFormVisible = true
      this.dialogStatus = 'addEquipment'
    },
    handelEdit () {
      this.dialogFormVisible = true
      this.dialogStatus = 'editEquipent'
    }
  }
}
</script>

<style lang="less" scoped>
</style>
