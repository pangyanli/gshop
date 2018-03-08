/* 将组件映射成路由 */
import  Vue from 'vue'
import  VueRouter from 'vue-router'

import Msite from '../pages/Msite/Msite.vue'
import Search from '../pages/Search/Search.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
import Login from '../pages/Login/Login.vue'

//声明使用插件
Vue.use(VueRouter)

//默认暴露VueRouter对象
export default new VueRouter({
  routes: [
    {
      path: '/msite',
      component: Msite,
      meta: {  // meta是个原数据，默认是个空对象，现在用来标识是否显示底部组件
        showFooter: true
      }
    },
    {
      path: '/search',
      component: Search,
      meta: {  // meta是个原数据，默认是个空对象，现在用来标识是否显示底部组件
        showFooter: true
      }
    },
    {
      path: '/order',
      component:  Order,
      meta: {  // meta是个原数据，默认是个空对象，现在用来标识是否显示底部组件
        showFooter: true
      }
    },
    {
      path: '/profile',
      component: Profile,
      meta: {  // meta是个原数据，默认是个空对象，现在用来标识是否显示底部组件
        showFooter: true
      }
    },
    {
      path: '/login',
      component: Login
    },
    { // 默认显示首页
      path: '/',
      redirect: '/msite'
    },
  ]
})

