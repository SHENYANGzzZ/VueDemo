<template>
  <div>
    <el-dialog title="用户详细信息"
               :visible.sync="dialogVisible">
      <el-row type="flex">
        <el-col :span="6">
          姓名：
        </el-col>
        <el-col :span="6">
          姓名拼音：
        </el-col>
        <el-col :span="6">
          身份证号：
        </el-col>
        <el-col :span="6">
          手机号码：
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="7">
          {{ userInfo.USER_NAME }}
        </el-col>
        <el-col :span="7">
          {{ userInfo.USER_NAME_PINYIN }}
        </el-col>
        <el-col :span="7">
          {{ userInfo.IDCARD_NO }}
        </el-col>
        <el-col :span="7">
          {{ userInfo.MOBILE }}
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row type="flex">
        <el-col :span="6">
          职务：
        </el-col>
        <el-col :span="6">
          职称：
        </el-col>
        <el-col :span="6">
          邮箱：
        </el-col>
        <el-col :span="6">
          备注：
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="7">
          {{ JobPosition[userInfo.JOB_POSITION] }}
        </el-col>
        <el-col :span="7">
          {{ JobTitle[userInfo.JOB_TITLE] }}
        </el-col>
        <el-col :span="7">
          {{ userInfo.EMAIL }}
        </el-col>
        <el-col :span="7">
          {{ userInfo.REMARK }}
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
// 枚举
import userEnum from '../../plugins/enum'

export default {
  name: 'second',
  data () {
    return {
      JobTitle: userEnum.userJobTitleEnum,
      JobPosition: userEnum.userPositionEnum,
      dialogVisible: false,
      userInfo: {}
    }
  },
  created () {
    let that = this
    this.$root.bus.$on('transmit', function (t) {
      that.userInfo = t
    })
    this.$root.bus.$on('isShow', function (b) {
      that.dialogVisible = b
    })
  }
}

</script>
