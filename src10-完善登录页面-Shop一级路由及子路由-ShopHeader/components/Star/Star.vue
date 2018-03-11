<template>
  <!-- 动态显示数据 -->
  <div class="star" :class="`star-${size}`">
    <span class="star-item" v-for="(sc, index) in  starClasses" :key="index" :class="sc"></span>
  </div>
<!--  <div class="star star-24">
    <span class="star-item on"></span>
    <span class="star-item on"></span>
    <span class="star-item on"></span>
    <span class="star-item half"></span>
    <span class="star-item off"></span>
  </div>-->
</template>

<script>
  //3个常量类名
  const CLASS_ON = 'on'
  const CLASS_HALF = 'half'
  const CLASS_OFF = 'off'

  export default{
    props: {
      score: Number,  //评分
      size: Number   // 星星尺寸
    },
    computed: {
      /*
      start的样式有三种：on-全星，half-半星，off-灰星，是哪种类型根据score来确定
      score最高是5分，整数部分显示on,小数部分小于0.5的不显示，大于0.5的显示半颗星half
      on和half加起来不满5那剩下的就是灰星,所以可以定义三个常量
      */
      starClasses(){
        // 获取到score
        let {score} = this
        let scs = []
        // 得到score的整数部分
        let scoreInteger = Math.floor(score)
        // 向scs数组中添加scoreInteger个CLASS_ON
        for (let i = 0; i < scoreInteger; i++) {
          scs.push(CLASS_ON)
        }
        // 向scs数组中添加CLASS_HALF,因为计算机对小数计算的精确度不能到0.1，所以扩大10倍来计算
        if(score*10 - scoreInteger*10 >= 5){
          scs.push(CLASS_HALF)
        }
        // 向scs数组中添加n个CLASS_OFF
        while(scs.length < 5){
          scs.push(CLASS_OFF)
        }
        return scs
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .star //2x图 3x图
    float left
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('./images/star48_on')
        &.half
          bg-image('./images/star48_half')
        &.off
          bg-image('./images/star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/star36_on')
        &.half
          bg-image('./images/star36_half')
        &.off
          bg-image('./images/star36_off')
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/star24_on')
        &.half
          bg-image('./images/star24_half')
        &.off
          bg-image('./images/star24_off')
</style>
