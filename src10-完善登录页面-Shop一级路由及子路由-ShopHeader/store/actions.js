/* 通知mutations,间接更新状态的对象 */
import {
  reqAddress,
  reqFoodTyps,
  reqShops,
  reqUser,
  reqShopGoods,
  reqRatings,
  reqShopInfo
} from '../api'

import {
  RECEIVE_ADDRESS,
  RECEIVE_FOODTYPES,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RECEIVE_SHOP_GOODS,
  RECEIVE_SHOPS_RATINGS,
  RECEIVE_SHOPS_INFO
} from './mutation-types'
/*
 使用async和await的作用:
 1. 使用同步编码的方式实现异步的效果
 2. 包装promise, 简洁化编码
 用法
 1. 加await: 在返回promise对象的函数调用的左边
 2. 加async: 在await所在的函数定义的左边
 */
export default {
  // 1、异步获取地址信息（根据经纬度串）
  async getAddress({commit, state}){
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqAddress(geohash)
    commit(RECEIVE_ADDRESS, {address: result.data})
  },
  // 2、获取食物分类列表
  async getFoodTypes({commit},callback){
    const result =await reqFoodTyps()
    commit(RECEIVE_FOODTYPES, {foodTypes: result.data})
    callback && callback()

  },
  // 3、根据经纬度获取商家列表
  async getShops ({commit, state}){
    let {latitude, longitude} = state  // 这里的｛｝表示结构赋值的
    let result = await reqShops({latitude, longitude} )   // 这里的｛｝表示对象
    commit(RECEIVE_SHOPS, {shops: result.data})
  },
  // 4、将获取到用户信息保存到state中
  recordUserInfo({commit}, userInfo){
    commit(RECEIVE_USER_INFO,{userInfo})
  },
  // 5、异步获取用户信息（实现规定时间内免登陆功能）
  async getUserInfo({commit}){
    let result = await reqUser()
    if(result.code === 0){
      commit(RECEIVE_USER_INFO, {userInfo: result.data})
    }
  },

  // 6、获取商品列表
  async getShopGoods({commit}){
    let result = await reqShopGoods()
    if(result.code===0) {
      commit(RECEIVE_SHOP_GOODS, {shopGoods: result.data})
    }
  },
  // 7、获取评价列表
  async getShopRatings({commit}){
    let result = await reqRatings()
    if(result.code===0) {
      commit(RECEIVE_SHOPS_RATINGS, {shopRatings: result.data})
    }
  },

  // 8、获取商家信息
  async getShopInfo({commit}){
    let result = await reqShopInfo()
    if (result.code === 0) {
      commit(RECEIVE_SHOPS_INFO, {shopInfo: result.data})
    }
  }
}
