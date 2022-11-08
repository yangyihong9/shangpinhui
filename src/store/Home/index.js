import { reqCategoryList, reqGetBannerList,reqFloorList } from '@/api'
// home 模块的小仓库
const state = {
  // state 中的数据默认初始值别瞎写，服务器返回对象，起始值就是对象，服务器返回数组，起始值就是数组。【根据接口的返回值初始化的】
  categoryList: [],
  // 轮播图的数据
  bannerList: [],
  // floor组件的数据
  floorList:[]
}
const mutations = {
  CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList;
  },
  GETBANNERLIST(state, bannerList) {
    state.bannerList = bannerList
    // console.log('3');
  },
  GETFLOORLIST(state, floorList) {
    state.floorList = floorList
  }
};

const actions = {
  // 通过API里面的接口函数调用，向服务器发请求，获取服务器的数据
  async categoryList({ commit }) {
    let result = await reqCategoryList();
    // console.log(result);
    // console.log(result.data);
    if (result.code === 200) {
      commit("CATEGORYLIST", result.data)
    }
  },
  // 获取首页banner轮播图数据
  async getBannerList({ commit }) {
    // console.log('2');
    let result = await reqGetBannerList();
    // console.log(result);
    if (result.code === 200) {
      commit('GETBANNERLIST',result.data)
    }
  },
  // 获取floor轮播图数据
  async getFloorList({commit}) {
    let result =await reqFloorList();
    // console.log(result);
    if (result.code === 200) {
      commit("GETFLOORLIST",result.data)
    }
  }

};
// 计算属性
const getters = {}

// 向外暴露
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}


