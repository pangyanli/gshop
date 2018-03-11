/* 直接更新状态的对象 */
import Vue from 'vue'
import {
  RECEIVE_ADDRESS,
  RECEIVE_FOODTYPES,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RECEIVE_SHOP_GOODS,
  RECEIVE_SHOPS_RATINGS,
  RECEIVE_SHOPS_INFO,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT
} from './mutation-types'

export default {
  // 1、接收地址
  [RECEIVE_ADDRESS](state, {address}){
    state.address = address
  },
  // 2、接收食物分类列表
  [RECEIVE_FOODTYPES](state, {foodTypes}){
    state.foodTypes = foodTypes
  },
  // 3、接收经纬度获取商家列表
  [RECEIVE_SHOPS](state, {shops}){
    state.shops = shops
  },
  // 4、保存用户userInfo
  [RECEIVE_USER_INFO](state,{userInfo}){
    state.userInfo = userInfo
  },
  // 5、商品列表
  [RECEIVE_SHOP_GOODS](state,{shopGoods}){
    state.shopGoods = shopGoods
  },
  // 6、评价列表
  [RECEIVE_SHOPS_RATINGS](state,{shopRatings}){
    state.shopRatings = shopRatings
  },
  // 7、商家信息
  [RECEIVE_SHOPS_INFO](state,{shopInfo}){
    state.shopInfo = shopInfo
  },
  // 9、增加food的count数量
  [INCREMENT_FOOD_COUNT](state,{food}){
    if(!food.count){  // 如果food没有count属性，就添加
      // food.count = 1   // 第一次点count就是1
      //问题：新添加的属性没有数据劫持-->数据绑定-->数据更新了但是界面并不更新
      // 解决：Vue.set(目标元素，属性名，属性值)  // 注意属性名是字符串
      Vue.set(food,'count',1)

    }else{
      food.count ++    // 如果有就增加1
    }
  },
  // 10、减少food的count数量
  [DECREMENT_FOOD_COUNT](state,{food}){
    if(food.count){
      food.count --
    }
  },
}
