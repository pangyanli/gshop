/* 直接更新状态的对象 */
import {
  RECEIVE_ADDRESS,
  RECEIVE_FOODTYPES,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RECEIVE_SHOP_GOODS,
  RECEIVE_SHOPS_RATINGS,
  RECEIVE_SHOPS_INFO
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

}
