// 引入接口 
import { reqCartList, reqDeleteCartById, reqUpdateCheckById } from "@/api"
const state = {
  cartList: []
}
const mutations = {
  GETCARTLIST(state, cartList) {
    state.cartList = cartList
  }
}
const actions = {
  // 获取购物车数据
  async getCartList({ commit }) {
    let result = await reqCartList()
    // 测试你个人购物车是否能接收数据，就要派发 action
    // console.log(result);
    if (result.code === 200) {
      commit('GETCARTLIST', result.data)
    }
  },
  // 删除购物车某一个产品
  async deleteCartListBySkuId({ commit }, skuId) {
    let result = await reqDeleteCartById(skuId)
    // console.log(result);
    if (result.code === 200) {
      return 'ok'
    }
    else {
      Promise.reject(new Error('faile'))
    }
  },
  // 修改购物车某一个产品的选中状态
  async updateCheckedById({ commit }, { skuId, isChecked }) {
    let result = await reqUpdateCheckById(skuId, isChecked)
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 删除全部勾选的商品
  deleteAllCheckedCart({ dispatch, getters}) {
    // context 可以就是理解成为 小仓库，commit 【提交 mutations 修改 state】 getters【计算属性】 dispatch【派发action】 state【当前仓库数据】
    // console.log(getters.cartList.cartInfoList);

    // 获取购物车中的全部的产品（是一个数组）
    // let PromiseAll = ['p1','p2','...']
    let PromiseAll = []
    getters.cartList.cartInfoList.forEach(item => {
      let promise = item.isChecked == 1 ? dispatch('deleteCartListBySkuId', item.skuId) : ''
      // 将每一次返回的 Promise添加到数组当中
      PromiseAll.push(promise)
    })
    // 如果全部的 p1,p2....都成功，返回结果即为成功
    // 如果有一个失败，返回的即为失败的结果
    return Promise.all(PromiseAll)
  },
  // 修改全部商品的状态
  updateAllCartIsChecked({ dispatch, state }, isChecked) {
    // console.log(state);
    // console.log(isChecked);
    let promiseAll=[]
    state.cartList[0].cartInfoList.forEach(item => {
      // item.isChecked==0?dispatch()
      let promise = dispatch('updateCheckedById', { skuId: item.skuId, isChecked, })
      promiseAll.push(promise)
    })
    return Promise.all(promiseAll)
  }
}
const getters = {
  cartList(state) {
    return state.cartList[0] || []
  },
  // cartInfoList(state) {
  //   return state.cartList.cartInfoList
  // }
}

export default {
  state,
  mutations,
  actions,
  getters
}