// 登录与注册的仓库
import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from '@/api'
import { setToken, getToken, removeToken } from '@/utils/token'
const state = {
  code: '',
  token: getToken(),
  userInfo: {}
}
const mutations = {
  GETCODE(state, code) {
    state.code = code
  },
  USERLOGIN(state, token) {
    state.token = token
  },
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo
  },
  // 清除本地数据
  CLEAR(state) {
    // 把仓库中相关用户信息清空
    state.token = ''
    state.userInfo = {}
    // 本地存储数据清空
    removeToken()
  }

}
const actions = {
  //获取验证码
  async getCode({ commit }, phone) {
    // 获取验证码的这个接口，把验证码返回，但是正常情况下，后台把验证码发到用户手机上【省钱】
    let result = await reqGetCode(phone);
    console.log(result);
    if (result.code == 200) {
      commit('GETCODE', result.data);
      return 'ok';
    } else {
      return Promise.reject();
    }
  },
  // 用户注册
  async UserRegister({ commit }, user) {
    let result = await reqUserRegister(user)
    console.log(user);
    console.log(result);
    // 没有返回数据，不需要三连坏
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 登录业务【token】
  async userLogin({ commit }, data) {

    let result = await reqUserLogin(data);
    // console.log(result);
    // 服务器下发 token，用户唯一标志符 （uuid)
    // 将来经常通过带 token 找服务器要用户信息进行展示
    // 用户已经登陆成功并且获取到token
    if (result.code == 200) {
      commit('USERLOGIN', result.data.token);
      //以后开发的时候:经常的登录的成功获取token【持久化存储】
      // 持久化存储
      setToken(result.data.token)
      return 'ok';
    } else {
      //登录失败
      return Promise.reject(new Error(result.message));
    }
  },
  // 获取用户信息
  async getUserInfo({ commit }) {
    let result = await reqUserInfo()
    // console.log(result);
    if (result.code === 200) {
      // 提交用户信息
      // console.log(result);
      commit('GETUSERINFO', result.data)
      return 'ok'
    }
    else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 退出登录
  async userLogout({ commit }) {
    // 只是想服务器发起一次请求，通知服务器清除 token
    let result = await reqLogout()
    // console.log(result);
    // actions 里面不能操作 state，提交mutations 修改 state
    if (result.code === 200) {
      commit('CLEAR')
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  }
}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}