/**
 * Created by h on 2018/3/9.
 */

import ajax from './ajax'

// 1、根据经纬度获取位置详情
export const reqAddress = geohash => ajax('/position/', geohash)

// 2、获取食品分类列表
export const reqFoodType = () => ajax('/index_category')

//  3、根据经纬度获取商铺列表
export const reqShops = ({latitude, longitude}) => ajax('/shops', {latitude, longitude})

// 4、获取一次性验证码
export const reqCaptcha = () => ajax('/captcha')

// 5、用户名密码登陆
export const pwdLogin = ({name,pwd,captcha}) => ajax('/login_pwd',{name,pwd,captcha},'POST')

// 6、发送短信验证码
export const sendCode = (phone) => ajax('/sendcode', phone)

// 7、手机号验证码登陆
export const smsLogin = ({pahone, code}) => ajax('/login_sms',{pahone, code},'POST')

// 8、根据会话获取用户信息

export const userInfo = () => ajax('/userinfo')
