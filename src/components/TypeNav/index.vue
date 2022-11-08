<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveShow" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 三级联动 -->
        <!-- v-show用来显示一级联动 -->
        <!-- 过渡动画 -->
        <transition name="sort">
          <div class="sort" v-show="show">
            <!-- 利用 事件委派 + 编程式导航是可以的，但是事件委派带来的问题还需要处理 -->
            <!-- 事件委派带来的问题： 1.点击的是否一定是 a 标签？  2.如何获取参数 【1、2/3级分类的产品的名字、id】? -->
            <div class="all-sort-list2" @click="goSearch">
              <div class="item" v-for="(c1, index) in categoryList" :key="c1.categoryId"
                :class="{ 'cur': currentIndex === index }">
                <!-- 一级分类 -->
                <h3 @mouseenter="changebgColor(index)">
                  <!-- 使用声明式导航会导致卡顿，的原因是：router-link 相当于 new vue Component，会创建很多实例 -->
                  <!-- <router-link href="" to="/search">{{ c1.categoryName }}</router-link> -->
                  <a @click="goSearch" :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{
                      c1.categoryName
                  }}</a>
                </h3>
                <!-- 二级、三级分类 -->
                <div class="item-list clearfix" :style="{ display: currentIndex === index ? 'block' : 'none' }">
                  <div class="subitem" v-for="(c2, index) in c1.categoryChild" :key="c2.categoryId">
                    <dl class="fore">
                      <dt>
                        <!-- <router-link href="" to="/search">{{ c2.categoryName }}</router-link> -->
                        <a @click="goSearch" :data-categoryName="c1.categoryName" :data-category2Id="c2.categoryId">{{
                            c2.categoryName
                        }}</a>

                      </dt>
                      <dd>
                        <em v-for="(c3, index) in c2.categoryChild" :key="c3.categoryId">
                          <!-- <router-link href="" to="/search">{{ c3.categoryName }}</router-link> -->
                          <a @click="goSearch" :data-categoryName="c1.categoryName" :data-category3Id="c3.categoryId">{{
                              c3.categoryName
                          }}</a>

                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>

    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// 引入方式：是把 loodash  全部功能函数引入
// import _ from 'lodash'
// 最好的方式是按需加载
import throttle from 'lodash/throttle'

export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
      // 为search地址的 商品类名挂载一个 show 属性
      show: true
    }
  },
  // 组价挂载完毕:可以向服务器发请求
  mounted() {
    // 通知 vuex 发请求，获取数据，存储于仓库中
    // 将 this.$store.dispatch("home/categoryList") 转移到 App.vue 中的 mounted() 中，实现每次跳转都只执行一次
    // this.$store.dispatch("home/categoryList");
    // 当组件挂载完毕，让 show 的值变为 false
    // 如果不是路由组件，将 typeNav 进行隐藏
    if (this.$route.path != '/home') {
      this.show = false
    }
  },
  computed: {
    // ...mapState({
    //   // 右侧需要的是一个函数，当使用这个计算属性的时候，右侧函数会立即执行一次
    //   // 注入一个参数 state,启示即为大仓库中的数据
    //   categoryList:function(state){
    //     console.log(state);
    //     // state.home.categoryList
    //   }
    // })

    //  'home' 指向模块 home，'categoryList'表示 store.home.categoryList
    ...mapState('home', ['categoryList'])

  },
  methods: {
    // 鼠标进入修改响应式数据 currentIndex 属性
    // (lodash.)throttle 开启节流, throttle 回调函数别用箭头函数，可能会出现上下文 this
    changebgColor: throttle(function (index) {
      // index：鼠标移入某一个一级分类的元素的索引值
      // 正常情况下（用户慢慢的操作）：鼠标进入，每一个一级分类 h3,都会触发进入事件
      // 非正常情况下（用户操作过快）：本身全部的一级分类都应该出发鼠标进入事件，但是经过测试，只有部分 h3触发了
      // 就是由于用户行为过快，导致浏览器反应不过来。如果当前回调函数中有一些大量事务，有可能会出现卡顿现象
      this.currentIndex = index
      // console.log('鼠标进入'+index);
    }, 50),
    leaveIndex() {
      this.currentIndex = -1
    },
    goSearch(event) {
      // 最好的解决方案：编程式导航 + 事件委派
      // 存在一些问题：事件委派，是把全部的子节点【 h3、dt、dl、em 】的事件委派给父亲节点
      // 点击 a 标签的时候，才会进行路由跳转，【怎么才能确定点击的一定是 a 标签】
      // 存在另外一个问题：即使你能确定点击的是 a 标签，如何区分是一级、二级、三级分类的标签

      // 第一个问题：把子节点当中的 a 标签，加上自定义属性 data-categoryName,其余的子节点不加
      let element = event.target
      // console.log(element);
      // 获取到当前触发的这个事件的节点【h3、a、dt、dl】，需要带有 data-categoryName 这样的节点 的【一定是 a 标签】
      // 节点有一个属性 dataset 属性，可以获取节点的自定义属性与属性值
      console.log(element.dataset);
      let { categoryname, category1id, category2id, category3id } = element.dataset
      // 如果标签身上有 categoryname 一定是 a 标签
      if (categoryname) {
        // 整理路由跳转的参数
        let location = { name: "search" };
        let query = { categoryName: categoryname }
        // 第二个问题：一级分类、二级分类、三级分类的 a 标签
        if (category1id) {
          query.category1Id = category1id
        } else if (category2id) {
          query.category2Id = category2id
        } else {
          query.category3Id = category3id
        }
        // 判断：如果路由跳转的时候，带有 params 参数，捎带传过去
        if (this.$route.params) {
          location.params=this.$route.params
          // 整理完参数
          // console.log(location,query);
          location.query = query
          // console.log(location);
          // 路由跳转
          this.$router.push(location)
        }
      }
    },
    enterShow() {
      this.show = true
    },
    leaveShow() {
      this.currentIndex = -1
      if (this.$route.path != '/home') {
        this.show = false
      }
    }
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 28px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // 此处不采用样式的方法显示，用 v-show / v-if
          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }

        .cur {
          background: skyblue;
        }

        // .item:hover{
        //   background-color: skyblue;
        // }
      }
    }

    /*过渡动画:商品分类 进入阶段*/
    // 过度动画开始状态（进入）
    .sort-enter {
      height: 0px;
    }
    // 过渡动画结束状态（进入）
    .sort-enter-to {
      height: 461px;
    }
    // 定义动画时间，速率
    .sort-enter-active {
      transition: all 0.3s;
    }
  }
}
</style>