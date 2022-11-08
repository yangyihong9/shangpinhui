//  对 axios 进行二次封装
import axios from "axios";
//获取仓库:存储数据
import store from "@/store";
// 引入进度条
import nprogress from 'nprogress'
// console.log(nprogress);


// 引入进度条样式
import 'nprogress/nprogress.css'
// start：进度条开始 done：进度条结束


// 1: 利用 axios 对象的方法 create,去创建一个 axios 实例
// 2: request 就是 axios ，只不过稍微配置一下
// axios.create方法执行,其实返回一个axios和request一样的
let requests = axios.create({
    //基础路径,发请求URL携带api【发现:真实服务器接口都携带/api】
    baseURL: "/api",
    //超时的设置
    timeout: 5000
});

// 请求拦截器：在发送求情之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config) => {
  // config:配置对象，对象里面有一个属性很重要，headers请求头
  // 进度条开始动
  // if (localStorage.getItem("UUIDTOKEN")) {
  //   // 给请求头添加一个字段（userTempId):和后台老师商量好了
  //   config.headers.userTempId = localStorage.getItem("UUIDTOKEN")
  // }
  if (store.state.detail.uuid_token) {
    config.headers.userTempId = store.state.detail.uuid_token
  }
  // 需要携带 token 带给服务器
  if (store.state.user.token) {
    config.headers.token = store.state.user.token
  }
  nprogress.start();
  return config;
})

// 响应拦截器
requests.interceptors.response.use((res) => {
  // 成功的回调函数：服务器响应数据回来以后，相应拦截器可以检测到，可以做一些事情
  nprogress.done();
  return res.data
}, (err) => {
  // 响应失败的回调函数
  alert(err.message)
  return new Promise.reject(res);
});

// 对外暴露
export default requests;