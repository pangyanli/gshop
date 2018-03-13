<template>
  <div class="food" v-show="isShow" ref="food">
      <div class="food-content">
        <div class="image-header" >
          <img :src="food.image">
          <div class="back" @click="showOrHide(false)">
            <i class="iconfont icon-arrow_left"></i>
          </div>
        </div>
        <div class="content" >
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span>
            <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">

            <!-- 操作购物车的加减圆 -->
           <CartControl :food="food"/>
          </div>
          <div class="buy" v-if="!food.count" @click="addToCart">加入购物车</div>
        </div>
        <!-- 分隔组件 -->
        <Split/>
        <div class="info" >
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <!-- 分隔组件 -->
        <!--<div class="split" ></div>-->
        <Split/>
        <div class="rating" >
          <h1 class="title">商品评价</h1>
          <RatingSelect :desc="{all: '全部', positive: '推荐',negative: '吐糟'}"
                         :onlyShowContent="onlyShowContent"
                         :ratings="food.ratings"
                         :selectType="selectType"
                         @toggleShowContent="toggleShowContent"
                         @setSelectType="setSelectType"
                         v-if="food.ratings"/>
          <div class="rating-wrapper">
            <ul>
              <!-- 应该遍历过滤后的filterRatings 不应该是food.ratings-->
              <li class="rating-item bottom-border-1px" v-for="rating in filterRatings">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img width="12" height="12" :src="rating.avatar" class="avatar">
                </div>
                <div class="time">{{rating.rateTime}}</div>
                <p class="text">
                  <span class="iconfont" :class="{'icon-thumb_up':rating.type==0,
                  'icon-thumb_up':rating.type==1,}"></span>
                  {{rating.text}}
                </p>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || food.ratings.length === 0">暂无评价</div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import RatingSelect from '../RatingSelect/RatingSelect.vue'
  import CartControl from '../CartControl/CartControl.vue'

  const all = 2 // 全部
  export default{
    props:{
      food: Object
    },
    data(){
      return{
        isShow: false,
        onlyShowContent: false,
        selectType: all  // 0 表示positive,  1表示negative  2表示全部all
      }
    },
    methods: {
      // 显示与隐藏当前food
      showOrHide(isShow){
        this.isShow = isShow
        //只有food显示了，才要生成BScroll对象形成滚动，而且只能创建一个
        if(this.isShow){
          this.$nextTick(() => {
            if(!this.scroll){  // 如果还没有scroll对象则创建一个
              this.scroll = new BScroll(this.$refs.food,{
                click: true
              })
            }else{  // 已经存在scroll对象，则要通知该对象更新
              this.scroll.refresh()
            }
          })
        }
      },
      // 将food添加到购物车
      addToCart(){
        this.$store.dispatch('updateFoodCount',{food:this.food,isAdd:true})
      },
      //切换仅显示内容
      toggleShowContent(){
        this.onlyShowContent = !this.onlyShowContent
        // 刷新列表
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      },
      // 更新selectType
      setSelectType(selectType){
        this.selectType = selectType
        // 刷新列表
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      },
    },
    computed: {
      // 过滤显示评价内容
      filterRatings(){
//        debugger
         //如果还没有数据，直接返回一个空数组
        if(!this.food.ratings){
          return []
        }
        //取出相关的数据
        let {ratings} = this.food
        let {selectType, onlyShowContent} = this
        // 过滤的数组要同时满足两个条件才能返回true，两个条件里又分别有两种情况
        return ratings.filter((rating) => {
          let {rateType,text} = rating
          //rateType: 0-推荐   1-吐槽
          // text: 有文本显示true/五文本不显示
          // selectType: 0-推荐   1-吐槽  2-全部
          // onlyShowContent：true/false

          // 条件一：selectType与rateType
          // 1)selectType === 2 --> true ;  2)selectType===rateType --->true
          // 综合起来返回true的情况就是：selectType === 2 || selectType===rateType

          // 条件二：onlyShowContent与text
          // 1）!onlyShowContent ; 2）text.length>0
          // 综合 !onlyShowContent  || text.length>0
          return (selectType === 2 || selectType===rateType) && (!onlyShowContent  || text.length>0)
        })
      }
    },
    components: {
      CartControl,
      RatingSelect
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"

  .food
    position: fixed
    left: 0
    top: 0
    bottom: 48px
    z-index: 30
    width: 100%
    background: #fff

    &.move-enter-active, &.move-leave-active
      transition: all .2s linear
    &.move-enter, &.move-leave-active
      opacity 0
      transform: translate3d(100%, 0, 0)

    .image-header
      position: relative
      width: 100%
      height: 0
      padding-top: 100%
      img
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
      .back
        position: absolute
        top: 10px
        left: 0
        .icon-arrow_left
          display: block
          padding: 10px
          font-size: 20px
          color: #fff

    .content
      position: relative
      padding: 18px
      .title
        line-height: 14px
        margin-bottom: 8px
        font-size: 14px
        font-weight: 700
        color: rgb(7, 17, 27)
      .detail
        margin-bottom: 18px
        line-height: 10px
        height: 10px
        font-size: 0
        .sell-count, .rating
          font-size: 10px
          color: rgb(147, 153, 159)
        .sell-count
          margin-right: 12px
      .price
        font-weight: 700
        line-height: 24px
        .now
          margin-right: 8px
          font-size: 14px
          color: rgb(240, 20, 20)
        .old
          text-decoration: line-through
          font-size: 10px
          color: rgb(147, 153, 159)
      .cartcontrol-wrapper
        position: absolute
        right: 12px
        bottom: 12px
      .buy
        position: absolute
        right: 18px
        bottom: 18px
        z-index: 10
        height: 24px
        line-height: 24px
        padding: 0 12px
        box-sizing: border-box
        border-radius: 12px
        font-size: 10px
        color: #fff
        background: $green
        &.fade-transition
          transition: all 0.2s
          opacity: 1
        &.fade-enter, &.fade-leave
          opacity: 0
    .info
      padding: 18px
      .title
        line-height: 14px
        margin-bottom: 6px
        font-size: 14px
        color: rgb(7, 17, 27)
      .text
        line-height: 24px
        padding: 0 8px
        font-size: 12px
        color: rgb(77, 85, 93)
    .rating
      padding-top: 18px
      .title
        line-height: 14px
        margin-left: 18px
        font-size: 14px
        color: rgb(7, 17, 27)
      .rating-wrapper
        padding: 0 18px
        .rating-item
          position: relative
          padding: 16px 0
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          .user
            position: absolute
            right: 0
            top: 16px
            line-height: 12px
            font-size: 0
            .name
              display: inline-block
              margin-right: 6px
              vertical-align: top
              font-size: 10px
              color: rgb(147, 153, 159)
            .avatar
              border-radius: 50%
          .time
            margin-bottom: 6px
            line-height: 12px
            font-size: 10px
            color: rgb(147, 153, 159)
          .text
            line-height: 16px
            font-size: 12px
            color: rgb(7, 17, 27)
            .icon-thumb_up, .icon-thumb_down
              margin-right: 4px
              line-height: 16px
              font-size: 12px
            .icon-thumb_up
              color: $yellow
            .icon-thumb_down
              color: rgb(147, 153, 159)

        .no-rating
          padding: 16px 0
          font-size: 12px
          color: rgb(147, 153, 159)
</style>
