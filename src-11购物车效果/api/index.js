/* 包含多个与后台交互函数的模块 */

import ajax from './ajax'

// 1、获取地址信息（根据经纬度串）
export const reqAddress = geohash => ajax('/api/position/' + geohash)

// 2、获取msite页面食品分类列表
export const reqFoodTyps = () => ajax('/api/index_category')

// 3、获取msite商铺列表（根据经纬度）
export const reqShops = ({latitude, longitude}) => ajax('/api/shops', {latitude, longitude})

// 4、获取图片验证码
export const reqCaptChas = () => ajax('/api/captchas')

// 5、帐号密码登录
export const pwdLogin = ({name, pwd, captcha}) => ajax('/api/login_pwd',{name,pwd,captcha},'POST')

// 6、发送短信验证码
export const reqMobileCode = phone => ajax('/api/sendcode', {phone})

// 7、手机号验证码登陆
export const phoneLogin = ({phone, code}) => ajax('/api/login_sms', {phone,code}, 'POST')

//8、根据会话获取用户信息
export const reqUser = () => ajax('/api/userinfo')

// 9、获取商家商品列表
export const reqShopGoods = () => ajax('/goods')

// 9、获取商家评价列表
export const reqRatings = () => ajax('/ratings')

// 9、获取商家商品列表
export const reqShopInfo = () => ajax('/info')

