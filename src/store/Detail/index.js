import { reqGoodsInfo, reqAddorUpdateShopCart } from "@/api"
// 封装游客身份模块 uuid--->生成随机字符串（不能再变了）
import {getUUID} from '@/utils/uuid_token.js'
const state = {
  goodsInfo: {},
  // 游客的临时身份
  uuid_token:getUUID()
}
const mutations = {
  GETGOODSINFO(state, goodsInfo) {
    state.goodsInfo = goodsInfo
  }
}
const actions = {
  // 获取产品信息的 action
  async getGoodsInfo({ commit }, skuId) {
    let result = await reqGoodsInfo(skuId)
    // console.log(result);
    if (result.code === 200) {
      commit('GETGOODSINFO', result.data)
    }
  },
  // 将产品添加购物车中
  async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
    // 加入购物车返回的解构
    // 加入购物车以后（发请求），前台将参数带给服务器
    // 服务器写入数据成功，并没有返回其他的数据，只是返回 code=200，嗲表这次操作成功
    // 因为服务器没有返回数据，因此不需要三连环存储数据
    let result = await reqAddorUpdateShopCart(skuId, skuNum)
    // console.log(result);
    if (result.code === 200) {
      return '成功'
    } else {
      return Promise.reject(new Error('faile'))
    }
  }
}
// 简化数据而生
const getters = {
  // 路径导航简化的数据
  categoryView(state) {
    // 比如：state.goodsInfo初始状态为空对象，空对象的 categoryView 属性值 undefined,所以至少要返回一个 空对象 {} 而不是 undefined
    // 当前计算出来的 categoryView 属性值至少是一个空对象，假的报错不会有了
    return state.goodsInfo.categoryView || {}
  },
  // 简化产品信息的数据
  skuInfo(state) {
    return state.goodsInfo.skuInfo || {}
  },
  // 产品售卖属性的简化
  spuSaleAttrList(state) {
    return state.goodsInfo.spuSaleAttrList || []
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}