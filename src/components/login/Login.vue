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
                    clearable></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input prefix-icon="el-icon-lock"
                    v-model="loginForm.password"
                    type="password"
                    clearable></el-input>
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
export default {
  data () {
    return {
      // 登录表单的数据绑定对象
      loginForm: {
        username: '',
        password: ''
      },
      loginFormRules: {
        username: [
          { required: true, message: '请输入登录名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    loginBtn () {
      // alert(this.loginForm.username + this.loginForm.password)
      this.$refs.loginFormRef.validate(valid => {
        // alert(valid)
        // if (!valid) return
        // const { data: res } = this.$http.post('login', this.loginForm)
        // if (res.meta.status !== 200) return this.$Message.error('登录失败')
        // this.$Message.success('登录成功')
        // window.sessionStorage.setItem('token', res.data.token)

        if (valid) {
          this.$Message.success('登录成功!')
          this.$router.push('home')
        }
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
  background-color: #2b4b6b;
  height: 1000px;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: white;
  border-radius: 10px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.toubu {
  height: 130px;
  width: 130px;
  border: 1px solid rgb(0, 0, 0);
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
    background-color: rgb(192, 201, 198);
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
