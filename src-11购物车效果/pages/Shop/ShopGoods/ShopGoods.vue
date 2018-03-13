<template>
  <!-- 结构：左右两列menu-wrapper和 -->
  <div>
    <div class="goods">
      <!-- 左边shopGoods类型列表 -->
      <div class="menu-wrapper">
        <ul>
          <!-- current ，给li添加类名表示选择哪个li -->
          <li class="menu-item" v-for="(shopGood, index) in shopGoods" :key="index"
            :class="{current: index === currentIndex}" @click="selectCurrent(index)">
            <span class="text bottom-border-1px">
              <span class="icon" v-if="shopGood.type>=0" :class="supportClasses[shopGood.type]"></span>
              {{shopGood.name}}
            </span>
          </li>
        </ul>
      </div>
      <!-- 右边foods列表 -->
      <div class="foods-wrapper">
        <ul ref="foodWrapperllUl">
          <!-- v-for 遍历ShopGoods 得到shopGood,  food-list-hook是专门提供给css外需要用的勾子标识-->
          <li class="food-list food-list-hook" v-for="(shopGood, index) in shopGoods" :key="index">
            <h1 class="title">{{shopGood.name}}</h1>
            <!-- 给ul添加一个标识 能快速定位到这里，提高效率-->
            <ul>
              <!-- v-for 遍历foods 得到food-->
              <li class="food-item bottom-border-1px" v-for="(food, index) in shopGood.foods" :key="index">
                <div class="icon">
                  <!-- 路径 -->
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span></div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                   <CartControl :food="food"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <!-- 底部购物车导航 -->
      <ShopCart/>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import {mapState} from 'vuex'
  import CartControl from '../../../components/CartControl/CartControl.vue'
  import ShopCart from '../../../components/ShopCart/ShopCart.vue'

  export default{
    data () {
      return {
        supportClasses: ['decrease', 'discount', 'guarantee', 'invoice', 'special'],
        scrollY:0,  // 右侧Y轴滑动的坐标
        tops: []    // 包含所有分类列表小列表top值，通过top值来确定当前的li列表
      }
    },
    mounted () {
    /*
        创建 BScroll 对象过早就会影响效果，所以在这里传回调函数，注意在对应的action中接收该
        回调函数并调用，但是此时数据更新了但是界面并没有更新，所以需要借助 nestTic()函数来
        监视，当界面更新完成后该函数就会调用，所以在这里创建 BScroll 对象才合适的因为有两列，
        而且两列都需要滑动的效果，所以需要创建两个 BScroll 对象来分别控制，需要做对应的要配置
        后才会有效果
    */
      this.$store.dispatch('getShopGoods', () => {
        this.$nextTick(() => {
          // 初始化滚动
          this._initScroll()
          // 初始化tops
          this._initTops()
        })
      })
    },
    computed: {
      ...mapState(['shopGoods']),
      // 当前分类下标(每个li里的foods的高度应该是确定的，所以可以通过foos的top来确定)
      currentIndex(){
        let {scrollY, tops} = this
        // scrollY要>= top,并且要 < 下一个top
        // findIndex():返回值是第1个返回true的元素所对应的index
        return tops.findIndex((top, index) => scrollY >= top && scrollY < tops[index + 1])
      },
    },
    methods: {  // 因为回调函数代码比较多，，所以封装起来方便调用
      _initScroll(){
        // 控制左边滑动的BScroll
        new BScroll('.menu-wrapper',{  // 参数1是选择器定位到的对象
          click: true   // 默认是false，点击的时候不会派发事件，所以要设置为true
        })
        // 控制右边滑动的BScroll,因为会有其他地方也用这个对象，所以将它添加到this上，大家都能看到
        this.foodsScroll = new BScroll('.foods-wrapper',{
          probType: 2,   // 监视手指滑动（但是不监视惯性滑动和编码滑动）
          click: true
        })
        // 监视右侧foods列表的滑动
        this.foodsScroll.on('scroll',(pos) => {
          this.scrollY = Math.abs(pos.y)   // 保存y，要取绝对值
        })
        // 监视滑动结束
        this.foodsScroll.on('scrollEnd', (pos) => {
          this.scrollY = Math.abs(pos.y)
        })
      },
      _initTops(){
        // 定义一个tops，里面会存每个li的top值，第一个li的top值为0，
        // 第二个li的top值是第一个li的高度，依次类推
        let tops = []
        let top = 0   // 初始化top为0
        tops.push(top)   // 将各个li的top添加到tops中,第一个li的top为0

        // 得到包裹某个shopGood的ul下面的所有子元素li，给ul添加一个ref标识，能快速找到，提高效率
        let lis = this.$refs.foodWrapperllUl.getElementsByClassName('food-list-hook')
        // 将得到的伪数组lis转为真数组并遍历
        Array.prototype.slice.call(lis).forEach((li, index) => {
          top += li.clientHeight
          tops.push(top)
        })
        console.log(tops)
        // 保存tops
        this.tops = tops
      },
      // 选择当前分类
      selectCurrent(index){ // 传了index才知道是哪个分类
        // 得到滚动目标坐标
        let top = this.tops[index]
        // 更新目标scrollY的值
        let scrollY = top
        // 右侧的foods列表平滑的滑动到指定的位置，因为scroll都是正值，但是向上滑动，所以top应该是负值的
        this.foodsScroll.scrollTo(0,-top,300)  // 0是初始位置，-top是指定滑动的位置，300是时间
      }
    },
    components: {
      CartControl,
      ShopCart
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"

  .goods
    display: flex
    position: absolute
    top: 174px
    bottom: 46px
    width: 100%
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
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
            right: 0
            bottom: 12px
</style>

