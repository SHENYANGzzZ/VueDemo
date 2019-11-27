import Vue from 'vue'
import VueRouter from 'vue-router'
//
import Login from './components/login/Login.vue'
import User from './components/demo/User.vue'
import Home from './components/home/Home.vue'
import Test from './components/test'
import Echarts from './components/demo/echart.vue'
// uum应急管理部
import UUM from './components/demo/uumRest.vue'

Vue.use(VueRouter)

// 路由规则
const routes = [
  { path: '/', redirect: '/home' },
  { path: '/login', component: Login },
  { path: '/user', component: User },
  {
    path: '/home',
    component: Home,
    redirect: '/test',
    children: [
      { path: '/test', component: Test },
      { path: '/users', component: User },
      { path: '/roles', component: Test },
      { path: '/echarts', component: Echarts },
      { path: '/uum', component: UUM }
    ]
  }

]

// 路由实例
const router = new VueRouter({
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  //   next() 直接放行   next('/login') 加路径强制跳转

  // 登录界面不做限制
  if (to.path === '/login') return next()

  // 获取token值,没有就强制登录
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')

  next()
})

export default router
