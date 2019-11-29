<template>
  <div class="home_top">
    <el-container class="home_top">
      <!-- 布局的头部 -->
      <el-header>
        <div>
          <img class="head_img"
               src="../../assets/logo.png"
               alt="图片显示异常！" />
          <span>Life After Life</span>
        </div>
        <el-button type="info"
                   @click="logout">退出
        </el-button>
      </el-header>

      <el-container>
        <!-- 左侧边栏 -->
        <el-aside :width="isClose ? '64px' : '300px'">
          <!-- 折叠按钮 -->
          <div class="toggleBtn"
               @click="tolggleClose">|||</div>

          <el-menu :default-active="activePath"
                   class="el-menu-vertical-demo"
                   background-color="#545c64"
                   text-color="#fff"
                   active-text-color="#409EEE"
                   unique-opened
                   :collapse="isClose"
                   :collapse-transition="false"
                   router>
            <!-- 菜单 -->
            <el-submenu :index="item.id"
                        v-for="item in menuList"
                        :key="item.id">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{ item.authName }}</span>
              </template>
              <el-menu-item-group>
                <!-- <template slot="title">基础信息维护</template> -->
                <el-menu-item :index="'/' + childrenItem.path"
                              v-for="childrenItem in item.children"
                              :key="childrenItem.id"
                              @click="menuActive('/' + childrenItem.path)">
                  {{ childrenItem.authName }}
                </el-menu-item>

              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>

        <!-- 主体区 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>

</template>

<script>
import axios from 'axios'

export default {
  name: 'home',
  props: {

  },
  data () {
    return {
      // 左侧边栏
      menuList: [],

      // 侧边栏是否收起
      isClose: false,

      // 当前激活的菜单
      activePath: ''

    }
  },
  methods: {

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
        // 菜单信息
        var resMenu = response.data[0]
        // 响应信息
        var resInfo = response.data[1]
        if (resInfo.code !== 200) return this.$$message.error(resInfo.meg)

        this.menuList = resMenu
        // console.log(this.menuList)
      }).catch(function (error) {
        console.log(error)
      })
    },

    // 侧边栏的折叠和展开
    tolggleClose () {
      this.isClose = !this.isClose
    },

    // 保存激活菜单的状态
    menuActive (path) {
      window.sessionStorage.setItem('activePath', path)
      this.activePath = path
    }
  },
  created () {
    // 获取菜单
    this.getMenuList()
    // 获取当前激活的菜单
    this.activePath = window.sessionStorage.getItem('activePath')
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
.toggleBtn {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: white;
  letter-spacing: 0.2em;
  cursor: pointer;
}
.el-menu-vertical-demo {
  border: 1px solid #545c64;
}
</style>
