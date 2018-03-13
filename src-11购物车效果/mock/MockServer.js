/* 使用mock模拟数据暴露出去的接口不能使用postman或者浏览器测试接口，因为mock.js
 * 是拦截ajax请求，并返回随机的数据的，所以需要编码来实现测试接口，这里我们并不用
 * mock的随机数据，而是用自己的JSON数据;注意并不用向外暴露申毛毛东西，要使用这些数据，
 * 只要像引入css样式在某个模块中引入就可以直接使用里面的数据了
 */
import data from './data.json'
import Mock from 'mockjs'

// 向外提供goods数据
Mock.mock('/goods',{code:0, data:data.goods})

// 向外提供ratings数据
Mock.mock('/ratings',{code:0, data:data.ratings})

// 向外提供info数据
Mock.mock('/info',{code:0, data:data.info})


