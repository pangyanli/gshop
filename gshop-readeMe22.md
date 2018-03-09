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
    ### 四、login登录页面
          1、创建login路由：pages/Login文件夹/Login.vue
          2、从静态页面index.html抽取登录页面的代码，index.styl中抽取对应的样式
          3、touter/index.js中注册登录路由：  /login
          4、Profile.vue ：注册登录那里一整块都有链接，将a标签改成router-link标签，并添加 to='/login'
          5、Login.vue：将左上角回退的字体图标的a标签改成span标签，并添加回退事件 @click="$router.back()"
          6、从静态页面中将svg图（验证码图）captcha.svg文件拷贝到当前路由下的images文件夹中
          7、Login.vue : 短信登录与密码登录切换
            （1）将短信登录与密码登录的a标签改成span标签，并绑定点击是否显示，样式根据点击事件来确定
            <span :class="{on: showLogin}" @click="showLoginWay(true)">短信登录</span>
            <span :class="{on: !showLogin}" @click="showLoginWay(false)">密码登录</span>
            （2）在data中配置对应的数据和事件
                export default{
                    data(){
                      return {
                        showLogin: true // true是短信登录，false是密码登录
                      }
                    },
                    methods: {
                      showLoginWay(showLogin){
                        this.showLogin = showLogin
                      }
                    }
                  }
          8、是否显示底部组件：
            （1） router/index.js: 在需要底部组件的路由中添加一个meta对象属性来标识需要底部组件
                  meta: {  // meta是个原数据，默认是个空对象，现在用来标识是否显示底部组件
                        showFooter: true
                      }
            （2）App.vue ：<FooterGuide v-show="$route.meta.showFooter"/> 通过v-show来确定是否显示

    ### 五、运行后台应用
          （1）确保启动mongodb服务
          （2）启动服务器应用（进入gshop_server文件夹），打开命令提示符窗口，输入npm start 运行起来
          （3）打开postman测试接口工具，将  硅谷外卖-接口.postman_collection 文件导入
                然后测试文件中的8个接口是否否是通的
          （4）api/ajax.js ：封装ajax请求模块
          （5）api/index.js ：引入封装好的ajax，写包含多个请求函数与后台交互的接口
    ### 六、前台与后台实现交互
         1、使用vuex管理状态：
            （1）创建文件夹及文件
                store 文件夹
                    |-- index.js   vuex的核心管理对象store对象模块
                    |-- actions.js  包含多个通知mutation，间接更新状态的函数的对象模块
                    |-- mutations.js  包含多个直接更新状态的函数的对象模块
                    |-- state.js      状态对象模块
                    |-- getters.js    计算state的getter对象
                    |-- mutation-types.js   mutation type常量名称模块
            （2）main.js   在入口js文件中注册store对象，先注册上，不然容易忘记
            （3）index.js   创建store对象
            （4）state.js   初始化需要管理的数据
            （5）actions.js  根据api/index.js文件中的接口，来创建对应的action，引入mutation-types.js中的常量
            （6）mutation-types.js   根据actions.js中提交给mutation的名称来定义对应的mutation函数常量名称
            （7）mutations.js  根据actions.js提交的名称来定义对应的mutation函数
         2、发送ajax请求获取地址信息
            （1）Msite.vue：中头部的地址是动态从后台获取的，通过mapState，方法取到state中的address对象，
                    再在取到address对象中的name属性值，就是要显示的地址了
            （2）Msite.vue：在应用组件中调用vue声明周期中的mounted勾子函数发送ajax请求获取地址
                 this.$store.dispatch('getAddress')  //注意分发对应的action
         3、用代理解决跨域问题
               因为后台运行服务器的端口号为3000，但是前台运行的服务器的端口号是8080，所以当前台发送ajax请求
               到后台获取数据，就存在跨域问题了，在这里是用代理的方式来解决的，找到config文件夹/index.js文件
               config/index.js: 在该文件中有一个 proxyTable:{}就是用来配置代理的，
               proxyTable: {
                     '/api': { // 匹配所有以'/api' 开头的请求路径
                       target: 'http://localhost:3000', // 代理目标的基础路径（后台的端口）
                       changeOrigin: true,  // 支持跨域
                       pathRewrite: {
                         '^/api': ''
                       }
                     }
                   }
               重写路径，去掉路径中开头的'/api' ,因为后台并没有'/api'，我们加上只是为了方便
               匹配需要代理的路由，所有要去掉，否则后台处理不了
         4、 api/index.js：给文件中的需要代理实现跨域访问的接口的url的前面添加  '/api'

    ### 七、发送ajax请求，从后台动态获取食物分类列表
        1、Msite.vue：通过vuex获取foodTypes数组(发请求, 读取)
          （1）在mounted中发ajax请求获取食物分类列表，注意action名字与actions.js文件中的对应一致
          （2）在computed中通过mapState方法读取数据 ...mapState(['footTypes']) footTypes必须要与state.js中的一致
        2、Msite.vue：对数据进行整合计算（将译为数组变为二维数组）
          （1）在computed：{}中计算foodTypesArr属性，定义一个大数组arr，里面放多个小数组；
           定义一个小数组tempArr，最大放8个type；forEach遍历从state中取出来的foodTypes，先将新的小数组添加到
           大数组中，然后看满足条件的就添加到小数组中，不满足的就再重新创建一个新的小数组，将该新的小数组添加到
           大数组中，然后再讲type存到该新的小数组中，最后将大数组arr返回
          （2）将foodTypesArr属性放到在模版代码的轮播代码中显示到界面，注意要两次v-for循环读取二维数组的数据
              第一个v-for是遍历轮播页数的，第二个v-for是一页轮播图中显示type的个数
          （3）修改轮播代码中img的路径，需要动态获取的，首先在data中定义imgBaseUrl: 'https://fuss10.elemecdn.com'
            是数据库的链接，然后带模版代码中个img标签的href拼路径 <img :src="imgBaseUrl + type.image_url">
            type.image_url这样写是因为接口文档的实例返回来的数据格式就是这样的
          （4）解决创建Swipe的问题，因为之前是在mouted中直接创建的，但是定义得早了，因为界面还没更新，就开始渲染轮播了，
              所以导致轮播效果出不来，那使用Swiper显示轮播, 如何在界面更新之后创建Swiper对象?有两个方法
               1). 使用回调+$nextTick()
                  // ①分发action时传在第二个参数传一个回调
                  this.$store.dispatch('getFoodTypes', () => { //当界面更新了该回调函数调用，但是页面并没有更新
                          this.$nextTick(() => { // 当前这次状态改变的界面更新已完成就调用
                            var swiper = new Swiper('.swiper-container', {
                              loop: true,
                              pagination: {
                                el: '.swiper-pagination'
                              }
                            })
                          })
                        })
                   // ②  store/actions.js文件中， 在getFoodTypes函数中声明接收一个callbak
                     然后在commit（）之后执行 callback && callback()
               2). 使用watch+$nextTick()
                  //① 在mounted中分发action
                  mounted(){this.$store.dispatch('getFoodTypes'）}
                  // ② 直接使用watch监视foodTypes
                   watch: {
                         footTypes(){
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
                       },

## 项目中遇到的问题
  ### 1、FooterGuide 点击订单时没有显示内容，
      （1）原因1：是因为路由配置时/后面多了个空格
       router/index.js中的path: '/ order' --> 应该是path: '/order',
      （2）原因2：在绑定事件监听时，传递跳转的路径写错了，在/前面多了个点
       FooterGuide.vue中的 @click="goto('./msite')" --> 应该是 @click="goto('/msite')"
       :class="{on:$route.path === './msite'}" --> 应该是 :class="{on:$route.path === '/msite'}"
  ### 2、首页的轮播图出不来（Msite.vue）
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
  ### 3、使用vuex管理数据
        Msite.vue：中头部的地址动态获取到了但是在界面不能显示
          提示报错：unknown mutation type: receive_address
          原因1：原因是store/index.js，中引用mutations时单词写错了，少写了个o，所以识别不了mutations的类型
          原因2：在 Msite.vue读取数据时，写错了，<HeaderTop :title="address">应该是
          <HeaderTop :title="address.name"> ，因为address是个对象，必须取到它里面的name属性值才正确
  ### 4、foodTypes数据获取不到，后台响应回来了，但是不能在页面显示，报如下错，
          Error in render: "ReferenceError: footTypes is not defined" --> 说明foodTypes是undefined
          原因1：footTypes，单词写错了，应该是foodTypes, 修改过来了还是报同样的错
          原因2：从state中获取不到数据，获取方式不正确
               ...mapState(['foodTypes'],['address'])这种方式是错误的，应该是
                ...mapState(['foodTypes','address'])或者是下面的方式也可以
                ...mapState({foodTypes:'foodTypes',address:'address'}) ，如果属性名不相同的话使用这个方法


## 使用vue脚手架创建项目的具体步骤
  ### 一初始化项目
      1、在指定的位置的地址栏中输入cmd，打开命令提示符
      2、具体命令如下
          npm install vue-cli -g   （如果之前安装过就不用再装了，执行完全局会多了一个vue命令）
          vue init webpack waimai   （waimai是项目名，）
          ？Project name (waimai)  --> 提示问是否确定以waimai为项目名，是的话就回车，不是的话就写出项目名然后回车
          ？Projectdescription（A Vue.js project） --> 项目描述，可以直接回车不写
          ？Author(...)   -->  回车
          ?Vue buid runtime  --> 回车--> 回车
          ？Install vue-router?  --> 回车   （是否安装vue-router插件）
          ？Use Eslint to lint your code?  --> 回车 （是否使用eslint检查代码，需要，但是在编码的
                            过程中可以设置忽略，项目做完了可以统一打开修改检查出来的问题）
          ？Stardart...    -->  回车
          ？Set up unit test   -->  n （不需要安装单元测试文件）
          ？Set up e2e test with ....   --> n （不需要）
          ？Should we run 'npm install' for you after... -->  Yes ,use NPM（然后就安装依赖了）



