<template>
  <div class="footer_guide border-1px">
    <!-- 将a标签该成span标签，通过绑定事件切换到指定的路由，
    也可以使用routesr-link标签来跳转 ;这里的class on 应该是动态的
    点谁谁显示当前选中的颜色,表达式可以是变量，可以是对象，或是数组的形式，当属性名确定了，
    只是不确定需不需要，那表达式应该使用对象来实现{on:$route.path === '/msite'}
    -->
    <!--<a href="javascript:;" class="guide_item on"></a>-->
    <span class="guide_item" :class="{on:$route.path === '/msite'}" @click="goto('/msite')">
      <span class="item_icon">
        <i class="iconfont icon-waimai"></i>
      </span>
      <span>外卖</span>
    </span>
    <span class="guide_item" :class="{on:$route.path == '/search'}" @click="goto('/search')">
      <span class="item_icon">
        <i class="iconfont icon-search"></i>
      </span>
      <span>搜索</span>
    </span>
    <span class="guide_item" :class="{on:$route.path == '/order'}" @click="goto('/order')">
      <span class="item_icon">
        <i class="iconfont icon-dingdan"></i>
      </span>
      <span>订单</span>
    </span>
    <span class="guide_item" :class="{on:$route.path == '/profile'}" @click="goto('/profile')">
      <span class="item_icon">
        <i class="iconfont icon-geren"></i>
      </span>
      <span>我的</span>
    </span>
  </div>
</template>

<script>
  export default{
    methods: {
      goto(path){
        /*点击切换到指定的路由，因为这里可以直接切换不需要回退来跳转回了，
        所以使用replace，不用push */
        this.$router.replace(path)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .footer_guide  //footer
    top-border-1px(#e4e4e4)
    position fixed
    z-index 100
    left 0
    right 0
    bottom 0
    background-color #fff
    width 100%
    height 50px
    display flex
    .guide_item
      display flex
      flex 1
      text-align center
      flex-direction column
      align-items center
      margin 5px
      color #999999
      &.on
        color #02a774
      span
        font-size 12px
        margin-top 2px
        margin-bottom 2px
        .iconfont
          font-size 22px
</style>
