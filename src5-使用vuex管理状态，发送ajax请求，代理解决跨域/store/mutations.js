/* 直接更新状态的对象 */
import {
  RECEIVE_ADDRESS,
  RECEIVE_FOODTYPS,
  RECEIVE_SHOPS
} from './mutation-types'

export default {
  // 1、接收地址
  [RECEIVE_ADDRESS](state, {address}){
    state.address = address
  },
  // 2、接收食物分类列表
  [RECEIVE_FOODTYPS](state, {foodTypes}){
    state.foodTypes = foodTypes
  },
  // 3、接收经纬度获取商家列表
  [RECEIVE_SHOPS](state, {shops}){
    state.shops = shops
  }
}
