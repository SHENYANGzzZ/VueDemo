<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像 -->
      <div class="toubu">
        <img src="../../assets/logo.png" alt />
      </div>

      <!-- 表单 -->
      <el-form ref="form" class="form">
        <el-form-item>
          <el-input></el-input>
        </el-form-item>
        <el-form-item>
          <el-input></el-input>
        </el-form-item>

        <el-form-item class="btns">
          <el-button type="primary">登录</el-button>
          <el-button type="primary">重置</el-button>
        </el-form-item>
        <!-- p362 -->
      </el-form>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
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
