// 这个模块式用来一次性合并小仓库，将他们一次性暴露出去

import Vue from 'vue'
import Vuex from 'vuex'
import home from './Home/index.js'
import search from './Search/index.js'
import detail from './Detail/index.js'
import shopcart from './ShopCart/index.js'
import user from './User/index.js'
import trade from './Trade/index.js'
// 需要使用插件
Vue.use(Vuex)

// state :仓库--存储数据的地方
// const state = {
// }
// mutations:修改 state 的唯一手段
// const mutations = {
// }
// actions:处理 action,可以书写自己的业务逻辑，也可以处理异步
// const actions = {}
// getters:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
// const getters={}

// 对外暴露 stroe 类的一个实例
export default new Vuex.Store({
  // 实现 Vuex 仓库模块式开发存储数据
  modules: {
    home,
    search,
    detail,
    shopcart,
    user,
    trade
  }
})