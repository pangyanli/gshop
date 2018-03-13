<template>
  <div>
    <ShopHeader/>
    <div class="tab">
      <div class="tab-item">
        <!-- ruoter-link 除了to属性还有一个replace属性，不设置时默认是为false，点击跳转时，内部默认使用
         router.push()，如果设置设置了repace属性，则为true,则是使用router.replace()来实现跳转的，于是导航后不会留下
         history 记录，所以多次切换点击这三个路由链接后，再点击shopHeader页面头部左上角回退按钮时
         就可以直接回退到指定的页面了（首页）-->

        <router-link to="/shop/goods" replace>点餐</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/ratings" replace>评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/info" replace>商家</router-link>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
  import ShopHeader from '../../components/ShopHeader/ShopHeader.vue'
  export default{
    // 发送ajax请求异步获取商家信息info
    mounted(){ // 注意mounted是个函数
      this.$store.dispatch('getShopInfo')
    },
    components: {
      ShopHeader
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .tab
    height 40px
    line-height 40px
    bottom-border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      float left
      width: 33.33333%
      text-align center
      font-size 14px
      color rgb(77, 85, 93)
      a
        display block
        &.router-link-active
          color #02a774
</style>
