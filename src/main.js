import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from '@/router'
// 引入仓库
import store from '@/store'
// 引入 MockServe.js----mock 数据
import '@/mock/mockServe'
// 引入 Swiper样式
import 'swiper/css/swiper.css'
// 引入图片懒加载插件
import VueLazyload from 'vue-lazyload'

// 定义全局组件
// 三级联动的组件---全局组件
import TypeNav from '@/components/TypeNav/index.vue'
// 轮播图的组件
import Carousel from '@/components/Carousel/index.vue'
// 分页
import Pagination from '@/components/Pagination/index.vue'
import { Button, MessageBox } from 'element-ui'

// 第一个参数：全局组件的名字 第二个参数：那一个组件
Vue.component(TypeNav.name, TypeNav)
// 绑定轮播图插件
Vue.component(Carousel.name, Carousel)
// 分页 
Vue.component(Pagination.name, Pagination)
// 注册全局组件
Vue.component(Button.name, Button)
// Element-ui 注册组件还有一种写法，挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

Vue.config.productionTip = false

// 统一引入api 文件夹里面的全部请求函数
// 统一引入
import * as API from '@/api'
// console.log(API);
import bjt from '@/assets/1.jpg'

Vue.use(VueLazyload, {
  // 懒加载默认图片
  loading: bjt
})

import myPlugins from './plugins/myPlugins'
import validate from './plugins/validate.js'

// Vue.use(myPlugins, {
//   name:'upper'
// })




new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this,
      Vue.prototype.$API = API
  },
  // 注册路由 :底下的写法KV一致省略V 【router小写的】
  // 注册路由信息：当这里书写 router 的时候，这里都会有 $route,$router属性
  router,
  // 注册仓库：组件实例的身上会多了一个 $store 属性 
  store
}).$mount('#app')
