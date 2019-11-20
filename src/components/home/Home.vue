<template>
  <div class="home_top">
    <el-container class="home_top">
      <!-- 布局的头部 -->
      <el-header>
        <div>
          <img class="head_img"
               src="../../assets/logo.png"
               alt="图片显示异常！" />
          <span>Learn By ing</span>
        </div>
        <el-button type="info"
                   @click="logout">退出
        </el-button>
      </el-header>

      <el-container>
        <!-- 左侧边栏 -->
        <el-aside width="300px">
          <el-menu default-active="2"
                   class="el-menu-vertical-demo"
                   @open="handleOpen"
                   @close="handleClose"
                   background-color="#545c64"
                   text-color="#fff"
                   active-text-color="#ffd04b">
            <!-- 菜单一 -->
            <el-submenu :index="item.id"
                        v-for="item in menuList"
                        :key="item.id">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{ item.authName }}</span>
              </template>
              <el-menu-item-group>
                <!-- <template slot="title">基础信息维护</template> -->
                <el-menu-item :index="childrenItem.id"
                              v-for="childrenItem in item.children"
                              :key="childrenItem.id">
                  {{ childrenItem.authName }}
                </el-menu-item>

                <!-- <el-menu-item index="user"
                              @click="userManager">人员管理</el-menu-item>
                <el-menu-item index="1-2">角色管理</el-menu-item> -->
              </el-menu-item-group>
              <!-- <el-menu-item-group title="分组2">
                    <el-menu-item index="1-3">选项3</el-menu-item>
                  </el-menu-item-group> -->
              <!-- <el-submenu index="1-4">
                    <template slot="title">选项4</template>
                    <el-menu-item index="1-4-1">选项1</el-menu-item>
                  </el-submenu> -->
            </el-submenu>

            <!-- 菜单二 -->
            <!-- <el-menu-item index="2">
                  <i class="el-icon-location"></i>
                  <span slot="title">导航二</span>
                </el-menu-item>

                <el-menu-item index="3"
                              disabled>
                  <i class="el-icon-document"></i>
                  <span slot="title">导航三</span>
                </el-menu-item>

                <el-menu-item index="4"
                              disabled>
                  <i class="el-icon-setting"></i>
                  <span slot="title">导航四</span>
                </el-menu-item> -->
          </el-menu>
        </el-aside>
        <!-- 主体区 -->
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
  <!--   p376  -->
</template>

<script>
import axios from 'axios'

export default {
  name: 'home',
  props: {

  },
  methods: {
    // 测试方法
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },

    // 业务方法
    userManager () {

    },
    logout () {
      // 清除登录状态的token
      window.sessionStorage.clear()

      this.$message('您已退出登录！')
      this.$router.push('/login')
    },
    // 登录成功获取左侧的菜单
    getMenuList () {
      axios.get('menu').then((response) => {
        var resMenu = response.data[0]
        var resInfo = response.data[1]
        if (resInfo.code !== 200) return this.$$message.error(resInfo.meg)

        this.menuList = resMenu
        console.log(this.menuList)
      }).catch(function (error) {
        console.log(error)
      })
    }
  },
  data () {
    return {
      menuList: []
    }
  },
  created () {
    this.getMenuList()
  }

}
</script>

<style lang="less" scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: white;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
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
