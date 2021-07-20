import Vue from 'vue'
import VueRouter from '../libs/vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)  // Vue.use安装VueRouter插件

const routes = [    // 路由表配置，包括主页和关于页
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]
// 创建VueRouter实例，单例模式
const router = new VueRouter({
  routes,
  mode: 'hash'  // or mode: 'history' 配置路由模式，支持hash，history，abstract
})
// 导出
export default router
