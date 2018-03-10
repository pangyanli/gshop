<template>
  <div class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
         <!-- <a href="javascript:;" class="on">短信登录</a>
          <a href="javascript:;" >密码登录</a>-->
          <!-- 将a标签改成span标签 -->
          <span :class="{on: showLogin}" @click="showLoginWay(true)">短信登录</span>
          <span :class="{on: !showLogin}" @click="showLoginWay(false)">密码登录</span>
        </div>
      </div>
      <div class="login_content">
        <form>
          <div :class="{on: showLogin}">
            <section class="login_message">
              <input type="text" maxlength="11" placeholder="手机号" v-model="phone">
              <button class="get_verification" :class="{right_phone: rightPhone}"
                      v-show="!computedTime" @click="getCode">获取验证码</button>
              <button disabled="disabled" class="get_verification"
                      v-show="computedTime">还剩{{computedTime}}s</button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on: !showLogin}">
            <section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="手机/邮箱/用户名">
              </section>
              <section class="login_verification">
                <input type="text" maxlength="8" placeholder="密码" v-if="showPassword">
                <input type="password" maxlength="8" placeholder="密码" v-else>
                <div class="switch_button off" :class="showPassword?'on':'off'" @click="tabShowPassword">
                  <div class="switch_circle" :class="{on: showPassword}"></div>
                  <span class="switch_text" v-show="showPassword">abc</span>
                  <!--<span class="switch_text">...</span>-->
                </div>
              </section>
              <section class="login_message" @click="getCaptcha">
                <input type="text" maxlength="11" placeholder="验证码">
                <img class="get_verification" src="http://localhost:3000/captcha" alt="captcha">
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <!-- 将a标签改成span标签，并绑定回退事件 -->
      <span class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </span>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        showLogin: true, // true是短信登录，false是密码登录
        phone: '',  // 输入的手机号
        computedTime: 0,  // 计算时间
        showPassword: false, // 是否显示密码
        pwd: ''  // 输入的密码
      }
    },
    computed: {
      rightPhone(){  // 以1开头的11为数字,输入的手机号合法就要显示验证码文字
        return  /^1\d{10}$/.test(this.phone)
      }
    },
    methods: {
      showLoginWay(showLogin){
        this.showLogin = showLogin
      },
      getCode(){ // 点击获取验证码
        if(this.rightPhone){
          this.computedTime = 60
          let intervalId = setInterval(() => {
            this.computedTime--
            if(this.computedTime === 0){
              clearInterval(intervalId)
            }
          },1000)
        }
      },

      // 点击小按钮切换显示或隐藏密码
      tabShowPassword(){
        this.showPassword = !this.showPassword
      },

      // 点击发请求获取一次性验证码图片,如果两次的src一样，是不会发请求的，所有改一下src的值
      getCaptcha(event){
        event.target.src = 'http://localhost:3000/captcha?time=' + new Date()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixins.styl'
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >span
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.right_phone
                  color black
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                //transform translateX(27px)
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.on
                    transform translateX(27px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>
