## 使用vue做gshop项目步骤
## 1、用vue脚手架初始化项目 项目名称为：gshop
    npm install -g vue-cli
    vue init webpack gshop
    cd gshop
    npm install
    npm run dev
    访问: localhost:8080

## 2、项目结构分析
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

## 3、项目源码目录设计
    src 文件夹
       |-- api  与后台交互模块文件夹
       |-- common  通用资源文件夹，如fonts/img/stylus
       |-- components  非路由组件文件夹
            |-- FooterGuide文件夹/FooterGuide.vue  项目底部组件
       |-- filters  自定义过滤器模块文件夹
       |-- mock  模拟数据接口文件夹
       |-- pages  路由组件文件夹（或者用views命名，这两个常用）
            |-- Msite文件夹/Msite.vue  项目首页组件
            |-- Order文件夹/Order.vue  项目订单组件
            |-- Profile文件夹/Profile.vue  项目个人组件
            |-- Search文件夹/Search.vue  项目搜索组件
       |-- router  路由文件夹
            |-- index.js  注册各个路由
       |-- store  vuex相关模块文件夹
       |-- App.vue   应用组件
       |-- main.js   入口js

## 4、安装stylus依赖包（因为webpack不识别，所以需要安装对应的加载器）
    npm install stylus stylus-loader --save-dev
    注意在组件中style标签的声明样式
   <style lang="stylus" rel="stylesheet/stylus"></style>


## 项目中遇到的问题
  1、FooterGuide 点击订单时没有显示内容，
    （1）原因1：是因为路由配置时/后面多了个空格
     router/index.js中的path: '/ order' --> 应该是path: '/order',
    （2）原因2：在绑定事件监听时，传递跳转的路径写错了，在/前面多了个点
     FooterGuide.vue中的 @click="goto('./msite')" --> 应该是 @click="goto('/msite')"
     :class="{on:$route.path === './msite'}" --> 应该是 :class="{on:$route.path === '/msite'}"




