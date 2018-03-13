<template>
  <div>
    <div class="shopcart" >
      <div class="content">
        <div class="content-left" @click="toggleShow">
          <div class="logo-wrapper">
            <!-- 有数量时，就产生高亮效果 -->
            <div class="logo" :class="{highlight:totalCount>0}">
              <i class="iconfont icon-shopping_cart" :class="{highlight: totalCount>0}"></i>
            </div>
            <!-- 小红数字 -->
            <div class="num" v-if="totalCount">{{totalCount}}</div>
          </div>
          <div class="price" :class="{highlight:totalCount>0}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{shopInfo.deliveryPrice}}元</div>
        </div>
        <div class="content-right" >
          <!-- not-enough 样式换成 动态的 -->
          <div class="pay" :class="payClass">
            {{payText}}
          </div>
        </div>
      </div>
      <transition name="move">
        <div class="shopcart-list" v-show="listShow" >
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="clearCart">清空</span>
          </div>
          <div class="list-content" id="listContent">
            <ul>
              <li class="food" v-for="(food,index) in shopCart" :key="index">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.price}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <CartControl :food="food"/>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
      <transition name="fade">
        <div class="list-mask" v-show="listShow" @click="toggleShow"></div>
      </transition>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import {mapState, mapGetters} from 'vuex'
  import CartControl from '../CartControl/CartControl.vue'
  export default{
    data(){
      return {
        isShow: false,  // 是否显示购物列表
      }
    },
    computed: {
      ...mapState(['shopInfo', 'shopCart']),
      ...mapGetters(['totalCount', 'totalPrice']),
      payClass(){
        let {totalPrice} = this
        let {minPrice} = this.shopInfo
        return totalPrice >= minPrice ? 'enough' : 'not-enough'
      },
      payText(){
        let {totalPrice} = this
        let {minPrice} = this.shopInfo
        if(totalPrice === 0){
          return `￥${minPrice}元起送`
        }else if(totalPrice<minPrice){
          return `还差￥${minPrice - totalPrice}元起送`
        }else{
          return '结算'
        }
      },
      /*是否显示购物车列表
      如果光靠一个isShow来控制购物列表的显示与隐藏是不够的，当购物车总数量减为0的时候列表还显示
      所以还要看总数量，所以需要计算属性来计算listShow()应该返回一个true或者false来表示是否显示
      */
      listShow(){
        // 如果没有数量，直接不显示，只需要看isShow是true还是false就可以了
        if(this.totalCount === 0){
          // 当totalCount=0是将isShow 改为false，如果不重置isShow为false就会出现问题
          // 当totalCount有值，将其减少为0后，再去点击任意food的+，购物列表就会马上显示出来了
          this.isShow = false
          return false
        }
        if(this.isShow){  // 如果列表显示出来了，food很多个，就需要滑动来看到所有的food了
          this.$nextTick(()=>{
            //单例
            // 在更新界面之后创建BScroll对象，注意只能创建一个
            // 单例：在创建前判断是否存在，只有不存在才去创建，创建后，保存它，保存到this，大家都能看到
            // 不能用局部变量来存，但是局部变量每一次调用，都会重新产生，所以只能存到this上
            if(!this.scroll){
              //如果不限制创建一个的话，当频繁点击购物车让列表频繁切换显示后再去点击+就会增加多个count数量
              this.scroll = new BScroll('#listContent',{
                click: true
              })
            }else{  // refresh()是用来通知scroll对象高度改变了，要重新计算
              // 如果不设置的话，当第一次点开购物列表，ul的高度就确定了，但是再点击添加food
              // 的count，高度已经超出了应该形成滚动了，但是并没有，只认第一次的高度了
              this.scroll.refresh()
            }
          })
        }
        // 有数量时只需看isShow
        return this.isShow
      }
    },
    methods: {
      // 是否显示购物列表，点击底部购物车左边和遮罩层会切换购物列表的显示与隐藏
      toggleShow(){
        //切换isShow需要有条件的先判断是否有totalCount，如果不判断，当totalCount为0，但是点击了
        // 底部购物车左边了，此时isShow就切换为false了，所有再去点任意food的+，购物列表就会显示出来了
        if(this.totalCount){  //只有有数量时才切换
          this.isShow = !this.isShow
        }
      },
      // 清空购物车
      clearCart(){
        if(window.confirm('确定要清空购物车中所有的内容吗？')){
          this.$store.dispatch('clearCart')
        }
      }
    },
    components: {
      CartControl
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  .shopcart
    position: fixed
    left: 0
    bottom: 0
    z-index: 50
    width: 100%
    height: 48px
    .content
      display: flex
      background: #141d27
      font-size: 50
      color: rgba(255, 255, 255, 0.4)
      .content-left
        flex: 1
        .logo-wrapper
          display: inline-block
          vertical-align: top
          position: relative
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box
          border-radius: 50%
          background: #141d27
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            text-align: center
            background: #2b343c
            &.highlight
              background: $green
            .icon-shopping_cart
              line-height: 44px
              font-size: 24px
              color: #80858a
              &.highlight
                color: #fff
          .num
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            line-height: 16px
            text-align: center
            border-radius: 16px
            font-size: 9px
            font-weight: 700
            color: #ffffff
            background: rgb(240, 20, 20)
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display: inline-block
          vertical-align: top
          margin-top: 12px
          line-height: 24px
          padding-right: 12px
          box-sizing: border-box
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          font-size: 16px
          font-weight: 700
          &.highlight
            color: #fff
        .desc
          display: inline-block
          vertical-align: top
          margin: 12px 0 0 12px
          line-height: 24px
          font-size: 10px
      .content-right
        flex: 0 0 105px
        width: 105px
        .pay
          height: 48px
          line-height: 48px
          text-align: center
          font-size: 12px
          font-weight: 700
          &.not-enough
            background: #2b333b
          &.enough
            background: #00b43c
            color: #fff
    .ball-container
      .ball
        position: fixed
        left: 32px
        bottom: 22px
        z-index: 200
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
        .inner
          width: 16px
          height: 16px
          border-radius: 50%
          background: $green
          transition: all 0.4s linear
    .shopcart-list
      position: absolute
      left: 0
      top: 0
      z-index: -1
      width: 100%
      transform translateY(-100%)
      &.move-enter-active, &.move-leave-active
        transition transform .5s
      &.move-enter, &.move-leave-to
        transform translateY(0)
      .list-header
        height: 40px
        line-height: 40px
        padding: 0 18px
        background: #f3f5f7
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        .title
          float: left
          font-size: 14px
          color: rgb(7, 17, 27)
        .empty
          float: right
          font-size: 12px
          color: rgb(0, 160, 220)

      .list-content
        padding: 0 18px
        max-height: 217px
        overflow: hidden
        background: #fff
        .food
          position: relative
          padding: 12px 0
          box-sizing: border-box
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          .name
            line-height: 24px
            font-size: 14px
            color: rgb(7, 17, 27)
          .price
            position: absolute
            right: 90px
            bottom: 12px
            line-height: 24px
            font-size: 14px
            font-weight: 700
            color: rgb(240, 20, 20)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 6px
  .list-mask
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: -2
    backdrop-filter: blur(10px)
    opacity: 1
    background: rgba(7, 17, 27, 0.6)
    &.fade-enter-active, &.fade-leave-active
      transition: all 0.5s
    &.fade-enter, &.fade-leave-to
      opacity: 0
</style>

