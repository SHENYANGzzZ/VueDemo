import Vue from 'vue'
import VueRouter from 'vue-router'
//
import Login from '../src/components/login/Login.vue'
import User from '../src/components/demo/User.vue'
import Home from '../src/components/home/Home.vue'
import Test from '../src/components/test'

Vue.use(VueRouter)

// 路由规则
const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/user', component: User },
  { path: '/home', component: Home },
  { path: '/test', component: Test }
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
