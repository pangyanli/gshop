<template>
  <div class="cartcontrol">
    <!-- 小圆 - style="display: none;" 样式都使用v-show来控制 ,false表示不增加-->
    <transition name="move">
      <div class="iconfont icon-remove_circle_outline" v-show="food.count" @click.stop="updateFoodCount(false)"></div>
    </transition>
      <!-- 购物车的数量count -->
    <div class="cart-count" v-show="food.count">{{food.count}}</div>
    <!-- 小圆 + true表示增加-->
    <div class="iconfont icon-add_circle" @click.stop="updateFoodCount(true)"></div>
  </div>
</template>/

<script>
  export default{
    props:{  // 声明接收的数据
      food: Object
    },
    methods: {
      // 组件不能直接修改数据的状态，需要通过通知action派发事件给mutation去更新状态
      updateFoodCount(isAdd){  // 需要将当前的food以及对应的isAdd传过去
        let {food} = this
        this.$store.dispatch('updateFoodCount', {food, isAdd})
      }
    }
  }
</script>


<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .cartcontrol
    font-size: 0
    .cart-decrease
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)

    .icon-remove_circle_outline
      display: inline-block
      padding 6px
      line-height 24px
      font-size 24px
      color $green
      &.move-enter-active,&.move-leave-active
        transition all .5s
      &.move-enter,&.move-leave-to
        opacity 0
        transform translateX(10PX) rotate(90deg)
    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)
    .icon-add_circle
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color $green
</style>
