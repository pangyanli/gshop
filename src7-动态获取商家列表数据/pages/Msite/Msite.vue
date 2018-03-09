<template>
  <div class="msite">
    <!--首页头部,抽取为UI组件了，使用slot插槽技术实现传递数据-->
    <!--<HeaderTop title="昌平区北七家宏福科技园(337省道北)">-->
    <HeaderTop :title="address.name">
      <span class="header_search" slot="search">
        <i class="iconfont icon-sousuo"></i>
      </span>
      <span class="header_login" slot="login">
        <span class="header_login_text">登录|注册</span>
      </span>
    </HeaderTop>
    <!--首页导航-->
    <nav class="msite_nav border-1px">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <!-- 通过两个v-for遍历二维数组 -->
          <div class="swiper-slide" v-for="(types, index) in foodTypesArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(type, index2) in types" :key="index2">
              <div class="food_container">
                <!--<img src="./images/nav/1.jpg">-->
                <!-- 动态获取图片 -->
                <img :src="imgBaseUrl + type.image_url">
              </div>
              <!--<span>甜品饮品</span>-->
              <!-- 动态获取标题 -->
              <span>{{type.title}}</span>
            </a>
            <!--  <a href="javascript:" class="link_to_food">
                <div class="food_container">
                  <img src="./images/nav/2.jpg">
                </div>
                <span>商超便利</span>
              </a>
              <a href="javascript:" class="link_to_food">
                <div class="food_container">
                  <img src="./images/nav/3.jpg">
                </div>
                <span>美食</span>
              </a>
              <a href="javascript:" class="link_to_food">
                <div class="food_container">
                  <img src="./images/nav/4.jpg">
                </div>
                <span>简餐</span>
              </a>
              <a href="javascript:" class="link_to_food">
                <div class="food_container">
                  <img src="./images/nav/5.jpg">
                </div>
                <span>新店特惠</span>
              </a>
              <a href="javascript:" class="link_to_food">
                <div class="food_container">
                  <img src="./images/nav/6.jpg">
                </div>
                <span>准时达</span>
              </a>
              <a href="javascript:" class="link_to_food">
                <div class="food_container">
                  <img src="./images/nav/7.jpg">
                </div>
                <span>预订早餐</span>
              </a>
              <a href="javascript:" class="link_to_food">
                <div class="food_container">
                  <img src="./images/nav/8.jpg">
                </div>
                <span>土豪推荐</span>
              </a>-->
          </div>
          <!-- <div class="swiper-slide">
             <a href="javascript:" class="link_to_food">
               <div class="food_container">
                 <img src="./images/nav/9.jpg">
               </div>
               <span>甜品饮品</span>
             </a>
             <a href="javascript:" class="link_to_food">
               <div class="food_container">
                 <img src="./images/nav/10.jpg">
               </div>
               <span>商超便利</span>
             </a>
             <a href="javascript:" class="link_to_food">
               <div class="food_container">
                 <img src="./images/nav/11.jpg">
               </div>
               <span>美食</span>
             </a>
             <a href="javascript:" class="link_to_food">
               <div class="food_container">
                 <img src="./images/nav/12.jpg">
               </div>
               <span>简餐</span>
             </a>
             <a href="javascript:" class="link_to_food">
               <div class="food_container">
                 <img src="./images/nav/13.jpg">
               </div>
               <span>新店特惠</span>
             </a>
             <a href="javascript:" class="link_to_food">
               <div class="food_container">
                 <img src="./images/nav/14.jpg">
               </div>
               <span>准时达</span>
             </a>
             <a href="javascript:" class="link_to_food">
               <div class="food_container">
                 <img src="./images/nav/1.jpg">
               </div>
               <span>预订早餐</span>
             </a>
             <a href="javascript:" class="link_to_food">
               <div class="food_container">
                 <img src="./images/nav/2.jpg">
               </div>
               <span>土豪推荐</span>
             </a>
           </div>-->
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list border-1px">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <!-- 将商家列表抽取为UI组件，注意样式也要一起抽取 -->
      <ShopList/>
    </div>
  </div>
</template>

<script>
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css'
  import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
  import ShopList from '../../components/ShopList/ShopList.vue'
  import {mapState} from 'vuex'

  export default{
    data(){
      return {
        imgBaseUrl: 'https://fuss10.elemecdn.com'
      }
    },
    mounted(){
      // ajax请求获取地址信息
      this.$store.dispatch('getAddress')
      // 发ajax请求获取商家列表
      this.$store.dispatch('getShops')
      // 发ajax请求获取食物分类列表
      this.$store.dispatch('getFoodTypes', () => { //当界面更新了该回调函数调用，但是页面并没有更新
        this.$nextTick(() => { // 当前这次状态改变的界面更新已完成就调用
          //swiper
          var swiper = new Swiper('.swiper-container', {
            loop: true,
            pagination: {
              el: '.swiper-pagination'
            }
          })
        })
      })
    },
    computed: {
//      ...mapState({foodTypes:'foodTypes',address:'address'}),
      ...mapState(['foodTypes', 'address']),
      foodTypesArr(){
        // 定义一个大数组，里面放多个小数组
        let arr = []
        const {foodTypes} = this
        // 定义一个小数组，最大放8个type
        let tempArr = []
        foodTypes.forEach(type => {
          // 先判断tempArr 是否是新的数组，是的话就先添加到大数组中
          if (tempArr.length === 0) {
            arr.push(tempArr)
          }
          if (tempArr.length < 8) {
            // 当小数组的长度小于8时，添加type
            tempArr.push(type)
          } else {
            // 当小数组的长度大于8时，要新创建一个小数组来存type
            // 注意这里是不会出现覆盖现象的，两个对象同时对一个数组引用，其中一个改变指向不会引起变化
            tempArr = []
            // 将新的小数组添加到大数组中
            arr.push(tempArr)
            // 将type添加到小数组中
            tempArr.push(type)
          }
        })
        return arr
      }
    },
    // 第二中实现使用Swiper显示轮播，创建Swiper对象方法
  /*   watch: {
       foodTypes(){
         this.$nextTick(() => {
           //swiper
           var swiper = new Swiper('.swiper-container', {
             loop: true,
             pagination: {
               el: '.swiper-pagination'
             }
           })
         })
       }
     },*/
    components: {
      HeaderTop,
      ShopList
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixins.styl'
  .msite //首页
    width 100%
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          > span.swiper-pagination-bullet-active
            background #02a774
    .msite_shop_list
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff
      .shop_header
        padding 10px 10px 0
        .shop_icon
          margin-left 5px
          color #999
        .shop_header_title
          color #999
          font-size 14px
          line-height 20px

</style>
