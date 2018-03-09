/* 状态state对象*/

export default {
  latitude: 40.10038,   // 根据经纬度来获取信息，可以初始化数据显示一下
  longitude: 116.36867,
  address: {},  // 获取地址，这里设置成{}而不用null,是因为到时候没有数据是address.name不会报错
  foodTypes: [],  // 获取食物分类列表
  shops: []    // 获取商家列表
}
