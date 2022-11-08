import { reqGetSearchInfo } from "@/api"
// search 模块的仓库
const state = {
  // 仓库当中初始状态
  searchList: {}
}
const mutations = {
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList
    // 这里成功
    // console.log(searchList);
  }
}
// Action 提交的是 mutation，而不是直接变更状态。
const actions = {
  // 获取 search 模块的数据
  async getSearchList({ commit }, params = {}) {
    // 当前这个 reqGetSearchInfo 这个函数在调用剧哦去服务器数据的时候，至少穿第一个参数（空对象）
    // params 形参：适当用户派发action 的时候，第二个参数传递过来的，至少是一个空对象
    let result = await reqGetSearchInfo(params)
    if (result.code === 200) {
      commit("GETSEARCHLIST", result.data)
      // 这里成功
      // console.log(result);
    }
  }

}
// 计算属性，在项目当中，为简化数据而生
// 在项目中， getters 主要的作用是简化仓库中的数据
// 可以把我们将来在组建当中需要用的数据简化一下【将来组件在获取数据的时候更方便了】
const getters = {
  // 当前形参 state ，是当前仓库中的 state ，并非大仓库中的那个 state 
  goodsList(state) {
    // console.log(state);
    // 单纯 return state.searchList.goodsList 这样的写法有问题
    // state.searchList.goodsList 如果服务器数据回来了，没问题是一个数组
    // 加入网络不给力 || 没有网，state.searchList.goodsList 应该返回的是 undefined
    // 所以计算心得属性的属性值至少给人家来一个数组
    return state.searchList.goodsList||[]
  },
  trademarkList(state) {
    return state.searchList.trademarkList
  },
  attrsList(state) {
    return state.searchList.attrsList
  },
}

// 向外暴露
export default {
  state,
  mutations,
  actions,
  getters
}