/* JS入口文件 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'


new Vue({
  el: '#app',
/*  components:{
    App
  },
  template:' <App/>',*/
  render: h => h(App),  // 将组件映射成标签
  router  //注册路由 内部会给所有的组件添加两个属性：$route（用于获取参数）$router（js导航）
})
