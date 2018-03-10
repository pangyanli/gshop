<!-- App应用组件 -->
<template>
  <div id="app">
    <router-view></router-view>
    <FooterGuide v-show="$route.meta.showFooter"/>
  </div>
</template>

<script>
// 1、引入组件
import FooterGuide from './components/FooterGuide/FooterGuide.vue'

export default {
/*  mounted(){   // 转到Msite.vue文件里发请求
    // 请求获取地址
    this.$store.dispatch('getAddress')
  },*/
  components: {  // 2.将组件映射成标签
    FooterGuide
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app
    width 100%
    height 100%
    background #f5f5f5
    position relative
</style>
