// API 可以获取后端数据
// 当前的模块，对所有的 API 进行统一管理
import requests from './requests'
import mockRequests from './mockAjax'

// 三级联动的接口
// /api/product/getBaseCategoryList   get请求，无参数
//箭头函数可以在程序任意地方使用,箭头函数返回即为服务器的数据
//下面箭头函数返回值：返回的是什么? promise,即为返回服务器的数据
//return关键字，千万别忘记书写，如果忘记书写，你在任意地方获取的都是undefined
export const reqCategoryList = () => requests.get(`/product/getBaseCategoryList`)
// 跨域问题：JSONP，CORS，代理

//  获取 banner （Home 首页轮播图接口）
export const reqGetBannerList = () => mockRequests.get(`/banner`)

// 获取 floor 数据
export const reqFloorList = () => mockRequests.get(`/floor`)

// 获取搜索模块数据 地址: /api/list  请求方式：post   参数：需要带参数
/* {
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
} */

// 获取 search 数据
// 当前这个函数需不需要接受外部传递参数 ---- 需要
// 当前这个接口（获取搜索模块的数据），给服务器传递一个默认参数【至少是一个空对象】
export const reqGetSearchInfo = (params) => requests({ url: `/list`, method: 'post', data: params })

// 获取产品详情信息的借口   URL: /api/item/{ skuId }  请求方式： get
export const reqGoodsInfo = (skuId) => requests({ url: `/item/${skuId}`, method: 'get' })

// 产品添加到购物车中活着更新某一个产品的个数
// /api/cart/addToCart/{ skuId }/{ skuNum }         -- post
export const reqAddorUpdateShopCart = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })

// 获取购物车列表数据的借口---get
// URL: / api / cart / cartList  -----get
export const reqCartList = () => requests({ url: `/cart/cartList`, method: 'get' })

// 删除购物车产品的接口
// /api/cart/deleteCart/{skuId}
export const reqDeleteCartById = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' })

// 修改商品的选中状态
// /api/cart/checkCart/{skuId}/{isChecked}
export const reqUpdateCheckById = (skuId, isChecked) => requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' })

// 获取验证码
// /api/user/passport/sendCode/{phone}  method:get
export const reqGetCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' });

// 注册的接口
// /api/user/passport/register
export const reqUserRegister = (data) => requests({ url: `/user/passport/register`, data, method: 'post' })

// 登录的接口
// /api/user/passport/login
export const reqUserLogin = (data) => requests({ url: `/user/passport/login`, data, method: 'post' })

// 获取用户的信息【需要带着用户的 token 向服务器要信息】
// /api/user/passport/auth/getUserInfo     ----method:get
export const reqUserInfo = () => requests({ url: `/user/passport/auth/getUserInfo`, method: 'get' })

// 退出登录
// /api/user/passport/logout  method:get
export const reqLogout = () => requests({ url: `/user/passport/logout`, method: 'get' })

// 获取用户地址信息结构
// /api/user/userAddress/auth/findUserAddressList     method:get
export const reqAddressInfo = () => requests({ url: `/user/userAddress/auth/findUserAddressList`, method: 'get' })

// 获取商品清单
// /api/order/auth/trade  method:get
export const reqOrderInfo = () => requests({ url: `/order/auth/trade`, method: 'get' })

// 提交订单的接口
// /api/order/auth/submitOrder?tradeNo={tradeNo}     method:post
export const reqSubmitOrder = (tradeNo, data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: 'post' })

// 获取支付信息
// /api/payment/weixin/createNative/{orderId}  method :get
export const reqPayInfo = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' })

// 获取支付订单状态
// /api/payment/weixin/queryPayStatus/{orderId}    method：get
export const reqPayStatus = (orderId) => requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' })

// 获取我的订单列表
// /api/order/auth/{page}/{limit}    method:get
export const reqMyorderList = (page, limit) => requests({ url: `/order/auth/${page}/${limit}`, method: 'get' })


