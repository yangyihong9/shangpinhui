// 配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index.js'
// 使用插件
Vue.use(VueRouter)
//引入路由相关的配置项
// import routes from './routes'

// 引入 routes
import routes from './routes'

//把人家原型对象的push方法进行保存
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
//VueRouter.prototype原型对象添加一个方法
//location:路由跳转相关的信息

// 重写 push | replace
// 第一个参数，告诉原来的push 方法，你往哪里跳转（传递哪些参数）
// 第二个参数：成功的回调函数
// 第三个参数：失败的回调函数
//  call | apply 区别：
// 相同点：都可以调用函数一次，都可以篡改函数的上下文
// 不同点： call 与 apply 传递参数：call 传递参数用逗号隔开，apply 方法执行，传递数组
VueRouter.prototype.push = function (location, resolve, reject) {
  //当前函数this：即为VueRouter类的实例
  //相当于push方法里面this，是windows【完犊子了】
  //利用人家push方法实现路由跳转，保证push里面this,应该vueRouter类的实例

  //面试:函数apply与call区别?
  //相同的地方:都可以篡改函数里面this
  //不同的地方:apply传递参数 数组  call传递参数 逗号分割

  if (resolve && reject) {
    //代表真:代表着两个形参接受参数【箭头函数】
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(this, location, () => { }, () => { });
  }
}

VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    //代表真:代表着两个形参接受参数【箭头函数】
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(this, location, () => { }, () => { });
  }
}


// 配置路由
let router = new VueRouter({
  // 配置路由
  routes,
  scrollBehavior(to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    // 点击商品默认跳转到顶部
    return { y: 0 }
  }
})

// 全局前置守卫
router.beforeEach(async (to, from, next) => {
  // to: 即将要进入的目标,要跳转到哪个路由
  // from: 当前导航正要离开的路由，要从哪个路由跳转
  // next ：放行     next()放行    next(path)放行到指定路由
  // next()
  // console.log(store);
  // 用户登录了才会有token，未登录一定不会有 token
  let token = store.state.user.token
  // 用户登录了
  if (token) {
    // 用户已经登陆了，如果还想去 login，那么不行
    if (to.path == '/login') {
      next('/home')
      // console.log(1111);
    } else {
      // 登录，去的不是 login 【home|search|detail|shopcart】
      // 如果用户名已有
      if (name) {
        next()
        // console.log(22222222);
      } else {
        // 没有用户信息，派发action 让仓库存储用户信息在跳转
        // 获取用户信息在首页展示
        try {
          // 获取用户信息成功
          await store.dispatch(`getUserInfo`)
          // 放行
          next()
          // console.log(3333);
        } catch (error) {
          // token 失效获取不到用户信息，重新登陆
          // 清除token
          await store.dispatch('userLogout')
          next('/login')
        }
      }
    }
  } else {  // 用户未登录
    // 未登录暂时没有处理完毕，先这个样子后期再进行处理
    // 未登录不能去交易相关的 /trade, 支付相关  /pay /paysuccess/, 个人中心 /center
    // 未登录时想去上面这些页面要跳转到登录页面
    let toPath = to.path
    if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1) {
      // console.log(toPath);
      // 把未登录的时候想去而没有去成的信息，存储于地址栏【路由】当中
      next('/login?redirect='+toPath)
    } else {
      next()
    }
  }
})


export default router