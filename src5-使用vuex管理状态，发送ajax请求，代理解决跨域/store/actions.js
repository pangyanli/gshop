/* 通知mutations,间接更新状态的对象 */
import {
  reqAddress,
  reqFoodTyps,
  reqShops
} from '../api'

import {
  RECEIVE_ADDRESS,
  RECEIVE_FOODTYPS,
  RECEIVE_SHOPS
} from './mutation-types'

export default {
  // 1、异步获取地址信息（根据经纬度串）
  async getAddress({commit, state}){
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqAddress(geohash)
    commit(RECEIVE_ADDRESS, {address: result.data})
  },
  // 2、获取食物分类列表
  async getFoodTyopes ({coommit}){
    const result = reqFoodTyps()
    commit(RECEIVE_FOODTYPS, {foodTypes: result.data})
  },
  // 3、根据经纬度获取商家列表
  async getShops ({commit, state}){
    let {latitude, longitude} = state  // 这里的｛｝表示结构赋值的
    let result = await reqShops({latitude, longitude} )   // 这里的｛｝表示对象
    commit(RECEIVE_SHOPS, {shops: result.data})
  }
}
