/* JS入口文件 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './mock/MockServer'
// 引入加载filter
import './filters'
import Split from './components/Split/Split.vue'



// 将Split分隔组件注册成全局组件，就类似于router-link标签一样，
// 在各个组件都可以直接使用，不用再引入并且映射成标签了
Vue.component('Split',Split)

new Vue({
  el: '#app',
/*  components:{
    App
  },
  template:' <App/>',*/
  render: h => h(App),  // 将组件映射成标签
  router,  //注册路由 内部会给所有的组件添加两个属性：$route（用于获取参数）$router（js导航）
  store   // 所有组件会多了一个$store属性
})
