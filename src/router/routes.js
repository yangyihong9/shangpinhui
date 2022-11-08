// 引入路由插件
/* import Login from '@/pages/Login/index.vue'
import Search from '@/pages/Search/index.vue'
import Register from '@/pages/Register/index.vue'
// import Detail from '@/pages/Detail/index.vue'
import Detail from '@/pages/Detail/index.vue'
import AddCartSuccess from '@/pages/AddCartSuccess/index.vue'
import ShopCart from '@/pages/ShopCart/index.vue'
import Trade from '@/pages/Trade/index.vue'
import Pay from '@/pages/Pay/index.vue'
import PaySuccess from '@/pages/PaySuccess/index.vue'
import Center from '@/pages/Center/index.vue' */
// 引入二级路由组件
/* import myOrder from '@/pages/Center/myOrder'
import groupOrder from '@/pages/Center/groupOrder' */


/* 路由懒加载---当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。
如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就会更加高效。
将 import UserDetails from './views/UserDetails.vue' 替换成 const UserDetails = () => import('./views/UserDetails.vue')
*/

// 路由配置
export default [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: () => import('@/pages/Home/index.vue'),
    // 路由组件的 key 不能瞎写，只能叫做 meta
    // meta是用来显示 footer
    meta: {
      show: true
    }
  },
  {
    path: '/detail/:skuId?',
    component: ()=>import ('@/pages/Detail'),
    //路由元信息,控制当前路由是否需要Footer组件
    meta: { show: true },
  },
  {
    path: '/login',
    component: ()=>import('@/pages/Login/index.vue'),
    // 路由组件的 key 不能瞎写，只能叫做 meta
    meta: {
      show: false
    }
  },
  {
    path: '/search/:keyword?',
    component: ()=>import('@/pages/Search/index.vue'),
    // 路由组件的 key 不能瞎写，只能叫做 meta
    meta: {
      show: true
    },
    name: "search",
    // 路由组件能不能传递 props 数据？
    // 布尔值写法：params
    // props:true
    // 对象写法：额外的给路由组件传递一些 props
    // props:{a:1,b:2}
    // 函数写法：可以 params参数、query参数，通过 props 传递给路由组件
    props: ($route) => {
      return { keyword: $route.params, k: $route.query.k }
    }

  }, // path: '/search/:keyword?' : ?表示params 参数可传可不传
  {
    path: '/register',
    component: ()=>import('@/pages/Register'),
    // 路由组件的 key 不能瞎写，只能叫做 meta
    meta: {
      show: false
    }
  },
  {
    path: '/addcartsuccess',
    name: 'addcartsuccess',
    component: ()=>import('@/pages/AddCartSuccess/index.vue'),
    // 路由组件的 key 不能瞎写，只能叫做 meta
    meta: {
      show: true
    }
  },
  {
    path: '/shopcart',
    name: 'shopcart',
    component: ()=>import('@/pages/ShopCart/index.vue'),
    // 路由组件的 key 不能瞎写，只能叫做 meta
    meta: {
      show: true
    },
  },
  {
    path: '/trade',
    name: 'trade',
    component: ()=>import('@/pages/Trade/index.vue'),
    // 路由组件的 key 不能瞎写，只能叫做 meta
    meta: {
      show: true
    },
    beforeEnter: (to, from, next) => {
      if (from.path == '/shopcart') {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    path: '/pay',
    name: 'pay',
    component: ()=>import('@/pages/Pay/index.vue'),
    // 路由组件的 key 不能瞎写，只能叫做 meta
    meta: {
      show: true
    },
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      // 去交易页面，必须是从购物车页面而来
      if (from.path == '/trade') {
        next()
      } else {
        // 其他路由页面而来，停留当前
        next(false)
      }
    }
  },
  {
    path: '/paysuccess',
    name: 'paysuccess',
    component:()=>import('@/pages/PaySuccess/index.vue'),
    // 路由组件的 key 不能瞎写，只能叫做 meta
    meta: {
      show: true
    },
    // 路由独享守卫
    // beforeEnter: (to, from, next) => {
    //   // 去交易页面，必须是从购物车页面而来
    //   if (from.path == '/pay') {
    //     next()
    //   } else {
    //     // 其他路由页面而来，停留当前
    //     next(false)
    //   }
    // }
  },
  // 个人中心
  {
    path: '/center',
    name: 'center',
    component: ()=>import('@/pages/Center/index.vue'),
    // 路由组件的 key 不能瞎写，只能叫做 meta
    meta: {
      show: true
    },
    children: [
      // 我的订单
      // 二级路由
      {
        path: 'myorder',
        component: ()=>import('@/pages/Center/myOrder/index.vue'),
      },
      // 团购订单
      // 二级路由
      {
        path: 'grouporder',
        component: ()=>import('@/pages/Center/groupOrder/index.vue'),
      },
      {
        path: '/center',
        redirect: '/center/myorder'
      }
    ]
  },
]