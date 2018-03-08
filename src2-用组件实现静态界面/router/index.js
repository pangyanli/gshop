/* 将组件映射成路由 */
import  Vue from 'vue'
import  VueRouter from 'vue-router'

import Msite from '../pages/Msite/Msite.vue'
import Search from '../pages/Search/Search.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'

//声明使用插件
Vue.use(VueRouter)

//默认暴露VueRouter对象
export default new VueRouter({
  routes: [
    {
      path: '/msite',
      component: Msite
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/order',
      component:  Order
    },
    {
      path: '/profile',
      component: Profile
    },
    { // 默认显示首页
      path: '/',
      redirect: '/msite'
    },
  ]
})

