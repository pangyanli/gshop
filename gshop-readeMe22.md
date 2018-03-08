## 使用vue做gshop项目步骤
## 一、搭建基本环境
    ###  1、用vue脚手架初始化项目 项目名称为：gshop
        npm install -g vue-cli
        vue init webpack gshop
        cd gshop
        npm install
        npm run dev
        访问: localhost:8080
    ###  2、项目结构分析
        gshop
          |-- build : webpack相关的配置文件夹(基本不需要修改)
            |-- dev-server.js : 通过express启动后台服务器
          |-- config: webpack相关的配置文件夹(基本不需要修改)
            |-- index.js: 指定的后台服务的端口号和静态资源文件夹
          |-- node_modules
          |-- src : 源码文件夹
            |-- components: vue组件及其相关资源文件夹
            |-- app.vue: 应用根主组件
            |-- main.js: 应用入口js
          |-- static: 静态资源文件夹
          |-- .babelrc: babel的配置文件
          |-- .editorconfig: 通过编辑器的编码/格式进行一定的配置
          |-- .eslintignore: eslint检查忽略的配置
          |-- .eslintrc.js: eslint检查的配置
          |-- .gitignore: git版本管制忽略的配置
          |-- index.html: 主页面文件
          |-- package.json: 应用包配置文件
          |-- README.md: 应用描述说明的readme文件
    ###  3、项目源码目录设计
        src 文件夹
           |-- api  与后台交互模块文件夹
           |-- common  通用资源文件夹，如fonts/img/stylus
                |-- stylus文件夹
                    |-- index.styl    stylus样式
                    |-- mixins.styl   混合写stylus样式的
           |-- components  非路由组件文件夹
                |-- FooterGuide文件夹/FooterGuide.vue  项目底部组件
           |-- filters  自定义过滤器模块文件夹
           |-- mock  模拟数据接口文件夹
           |-- pages  路由组件文件夹（或者用views命名，这两个常用）
                |-- Msite文件夹
                    |-- Msite.vue  项目首页组件
                    |-- images文件夹   该组件要使用的图片（就近管理原则）
                |-- Order文件夹
                     |-- Order.vue  项目订单组件
                     |-- images文件夹   该组件要使用的图片（就近管理原则）
                |-- Profile文件夹/Profile.vue  项目个人组件
                |-- Search文件夹/Search.vue  项目搜索组件
           |-- router  路由文件夹
                |-- index.js  注册各个路由
           |-- store  vuex相关模块文件夹
           |-- App.vue   应用组件
           |-- main.js   入口js

    ###  4、安装stylus依赖包（因为webpack不识别，所以需要安装对应的加载器）
        npm install stylus stylus-loader --save-dev
        注意在组件中style标签的声明样式
       <style lang="stylus" rel="stylesheet/stylus"></style>
    ###  5、引入vue-router
          npm install vue-router --save
## 二、具体流程
    ### 一搭建项目
    ### 二、使用组件实现静态界面
        1、main.js   //js入口文件
        2、App.vue   // 应用组件
        3、index.html: 在主页面引入css重置样式和从阿里巴巴矢量图标库下载好的字体图标
            <link rel="stylesheet" href="./static/css/reset.css">
            <link rel="stylesheet" href="http://at.alicdn.com/t/font_518606_rijg2hi5xj2it3xr.css">
        4、FooterGuide.vue 实现底部静态效果
        5、导航路由组件：Msite.vue/Order.vue/Profile.vue/Search.vue 依次用组件实现静态界面效果
    ### 三、抽取头部和商家列表的组件
         1、创建文件夹：
          components文件夹
              |-- HeaderTop/HeaderTop.vue
              |-- ShopList/ShopList.vue
          2、抽取头部的代码和样式
              （1） Msite.vue ：
                  将头部中的头部的代码和样式一并抽取到 HeaderTop.vue
                  注意抽取样式时，@import '../../common/stylus/mixins.styl' 也要复制引入
              （2）HeaderTop.vue
                  抽取过来的代码，大家都使用的代码不用变化，只需要把内容改成{{title}}；
                  不共用的代码需要使用slot标签来占位，如<slot name="search"></slot>；
                  用props声明接收的数据
              （3）Msite.vue ：
                  引入HeaderTop组件 --> 映射成标签 --> 使用标签
                  自己独有的效果代码正常完整写出来，再用HeaderTop标签包起来，
                  数据title是通过HeaderTop标签属性传出去，如
                  <HeaderTop title="昌平区北七家宏福科技园(337省道北)">
                    自己独有的代码，就是与slot标签占位的内容，注意在标签设置slot="search"属性
                  </HeaderTop>
              （4）对Order.vue/Profile.vue/Search.vue 的组件分别重复以上操作
          3、抽取商家列表
             （1）Msite.vue：
                  将商家列表的代码抽取到ShopList.vue中
                  注意：相关的样式和图片（images文件夹里的）一并抽取过去
                  记得引入 @import '../../common/stylus/mixins.styl'
             （2） Msite.vue ：
                  引入HeaderTop组件 --> 映射成标签 --> 使用标签




## 项目中遇到的问题
  1、FooterGuide 点击订单时没有显示内容，
    （1）原因1：是因为路由配置时/后面多了个空格
     router/index.js中的path: '/ order' --> 应该是path: '/order',
    （2）原因2：在绑定事件监听时，传递跳转的路径写错了，在/前面多了个点
     FooterGuide.vue中的 @click="goto('./msite')" --> 应该是 @click="goto('/msite')"
     :class="{on:$route.path === './msite'}" --> 应该是 :class="{on:$route.path === '/msite'}"
  2、首页的轮播图出不来（Msite.vue）
      原因是没有引入swiper样式，import 'swiper/dist/css/swiper.min.css'
      注意：要使用swiper框架（第三方库），有四步
      （1）下载安装swiper :  npm install --save swiper
      （2）在script标签中引入： import Swiper from 'swiper'
      （3）在script标签中引入样式：import 'swiper/dist/css/swiper.min.css'
      （4）配置：
          export default{
            mounted(){
              //swiper
              var swiper = new Swiper('.swiper-container', {  // .swiper-container在标签中添加的类名
                loop: true,
                pagination: {
                  el: '.swiper-pagination'
                }
              })
            }
          }




