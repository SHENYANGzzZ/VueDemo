import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './components/login/Login.vue'
import Users from './components/user/Users.vue'
import Home from './components/Home.vue'
import Per from './components/user/Person.vue'

Vue.use(VueRouter)

const routes = [
  // redirect: '/login'
  { path: '/' },
  { path: '/login', component: Login },
  { path: '/user', component: Users },
  {
    path: '/home',
    component: Home,
    redirect: '',
    children: [{
      path: '/user', component: Users
    }]
  },
  { path: '/p', component: Per }
]

const router = new VueRouter({
  routes
})

export default router
