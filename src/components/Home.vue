<template>
  <div class="home_top">
    <el-container class="home_top">
      <el-header>
        <div>
          <img src
               alt />
          <span>XXXXX</span>
        </div>
        <el-button type="info"
                   @click="logout">退出
        </el-button>
      </el-header>

      <el-container>
        <el-aside width="300px">Aside</el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
  <!--   p376  -->
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}
.home_top {
  width: 100%;
  height: 100%;
  position: absolute;
}
</style>
