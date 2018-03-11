/* 包含多个mutation名称的常量模块 ,因为要暴露多个，所以不能用默认暴露方式*/

export const RECEIVE_ADDRESS = 'receive_address'  // 接收地址
export const RECEIVE_FOODTYPES = 'receive_foodtypes'  // 接收食物分类列表
export const RECEIVE_SHOPS = 'receive_shops'  // 接收地商家列表
export const RECEIVE_USER_INFO = 'receive_user_info'  // 保存用户信息到state中
export const RECEIVE_SHOP_GOODS = 'receive_shop_goods'  // 接收商品列表
export const RECEIVE_SHOPS_RATINGS = 'receive_shops_ratings'   // 接收评价列表
export const RECEIVE_SHOPS_INFO = 'receive_shops_info'   // 接收商家信息
export const INCREMENT_FOOD_COUNT = 'increment_Food_Count'   // 增加food的count
export const DECREMENT_FOOD_COUNT = 'decrement_Food_Count'   // 减少food的count
