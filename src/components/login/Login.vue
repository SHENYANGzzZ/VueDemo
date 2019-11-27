<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像 -->
      <div class="toubu">
        <img src="../../assets/logo.png"
             alt />
      </div>

      <!-- 表单 -->
      <el-form ref="loginFormRef"
               class="form"
               :model="loginForm"
               :rules="loginFormRules">
        <!-- 输入框 -->
        <el-form-item prop="username">
          <el-input prefix-icon="el-icon-user-solid"
                    v-model="loginForm.username"
                    clearable
                    maxlength="10"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input prefix-icon="el-icon-lock"
                    v-model="loginForm.password"
                    type="password"
                    clearable
                    maxlength="15"></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button type="primary"
                     @click="loginBtn">登录</el-button>
          <el-button type="info"
                     @click="clearBtn">重置</el-button>
        </el-form-item>
        <!-- p362 -->
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

// 配置axios基础路径
// axios.defaults.baseURL = 'http://127.0.0.1:9090/'

export default {
  data () {
    return {
      // 登录表单的数据绑定对象
      loginForm: {
        username: '',
        password: ''
      },
      // 表单验证规则对象
      loginFormRules: {
        username: [
          { required: true, message: '请输入登录名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    loginBtn () {
      // alert(this.loginForm.username + this.loginForm.password)
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
        await axios.post('login', this.loginForm).then((response) => {
          // handle success
          // console.log(response.data)
          if (response.data.code !== 200) return this.$message.error('登录失败')
          this.$message.success('登录成功')
          // 登陆成功将用户信息放入SessionStorage中，因为登录的状态只应在网站打开状态下生效
          window.sessionStorage.setItem('token', response.data.value.username)
          this.$router.push('/home')
        }).catch((error) => {
          this.$message.error('对不起，服务器开了个小差！')

          // handle error
          console.log(error)
        })

        // if (res.meta.status !== 200) return this.$Message.error('登录失败')
        // this.$Message.success('登录成功')
        // window.sessionStorage.setItem('token', res.data.token)

        // if (valid) {
        //   this.$Message.success('登录成功!')
        //   this.$router.push('home')
        // }
      })
    },
    // 重置按钮
    clearBtn () {
      this.$refs.loginFormRef.resetFields()
    }
  }
}

</script>

<style lang="less" scoped>
.login_container {
  background-color: hsl(209, 80%, 77%);
  background-image: url('../../assets/logo.png');
  height: 1000px;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #ffffffbd;
  border-radius: 10px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.toubu {
  height: 130px;
  width: 130px;
  border: 1px solid #47474775;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  img {
    height: 100%;
    width: 100%;
    border-radius: 50%;
    background-color: rgb(120, 126, 139);
  }
}
.btns {
  display: flex;
  justify-content: flex-end;
}
.form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 30px;
  box-sizing: border-box;
}
</style>
