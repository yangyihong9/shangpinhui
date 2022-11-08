<template>
  <!--列表-->
  <div class="list-container">
    <div class="sortList clearfix">
      <div class="center">
        <!--banner轮播-->
        <Carousel :list="bannerList" />
      </div>
      <div class="right">
        <div class="news">
          <h4>
            <em class="fl">尚品汇快报</em>
            <span class="fr tip">更多 ></span>
          </h4>
          <div class="clearix"></div>
          <ul class="news-list unstyled">
            <li><span class="bold">[特惠]</span>备战开学季 全民半价购数码</li>
            <li><span class="bold">[公告]</span>备战开学季 全民半价购数码</li>
            <li><span class="bold">[特惠]</span>备战开学季 全民半价购数码</li>
            <li><span class="bold">[公告]</span>备战开学季 全民半价购数码</li>
            <li><span class="bold">[特惠]</span>备战开学季 全民半价购数码</li>
          </ul>
        </div>
        <ul class="lifeservices">
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">话费</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">机票</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">电影票</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">游戏</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">彩票</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">加油站</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">酒店</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">火车票</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">众筹</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">理财</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">礼品卡</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">白条</span>
          </li>
        </ul>
        <div class="ads">
          <img src="./images/ad1.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Swiper from 'swiper'
export default {
  name: "",
  // 数据存储在组件加载完毕时
  // mounted() 组件挂载完毕，DOM完成
  mounted() {
    // console.log('1');
    // 派发 action :通过 Vuex 发起 Ajax请求，将数据存储在仓库中
    this.$store.dispatch(`home/getBannerList`)

    /* 在 new Swiper 实例之前，页面中结构必须得有，【现在老师把 new Swiper 实例放在mounted 这里发现不行，
    因为虽然组件结构（DOM）已经全有了，但是因为有了动态需求（动态渲染结构） v -for，所以此时的 DOM 并未实现完成】 */
    // 因为 dispatch 当中设计到一步语句，导致 v-for 遍历的时候结构还没有完全因此不行 
    // 用定时器可以，但是会导致轮播图下面的显示原点延迟出现，所以用 watch +nextTick方法
    // setTimeout(() => {
    //   var mySwiper = new Swiper(document.querySelector('.swiper-container'), {
    //     loop: true,
    //     // 如果需要分页器
    //     pagination: {
    //       el: '.swiper-pagination',
    //       // 点击小球的时候切换图片
    //       clickable:true
    //     },
    //     // 如果需要前进后退按钮
    //     navigation: {
    //       nextEl: '.swiper-button-next',
    //       prevEl: '.swiper-button-prev'
    //     },
    //   });
    // },200)
  },
  computed: {
    // 传入字符串 'bannerList' 等同于 `state => state.home.bannerList`
    // ...mapState('home', ['bannerList'])
    ...mapState({
      bannerList: state => state.home.bannerList
    })
  },
  watch: {
    
    // 监听 bannerList 数据的变化：因为这条数据发生过变化----由空数组变为数组里有四个数组元素
    bannerList: {
      immdiate: true,
      handler(newValue, oldValue) {
        // 现在咱们通过 watch 监听 bannerList 属性的属性值的变化
        // 如果执行 handler 方法，代表组件实例身上的这个属性的属性值已经有了【数组：四个元素】
        // 当前这个函数执行，只能保证 bannerList 这个数据有了，但是不能保证 v-for 已经执行结束
        // v-for 执行完毕，才有结构，【但是现在不能确定v-for是否执行完毕，怎么办？】
        // nextTick:在下次 DOM 更新 【循环结束之后】 执行延迟回调。在 【修改数据之后】 立即使用这个方法，获取更新后的 DOM
        this.$nextTick(() => {
          // 当你执行这个回调的时候：保证服务器数据回来了，v-for 执行完毕了【一定轮播图的解构一定有了】
          var mySwiper = new Swiper(this.$refs.mySwiper, {
            loop: true,
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
              // 点击小球的时候切换图片
              clickable: true
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev'
            },
          });
        })
      }
    }
  }
};
</script>

<style lang="less" scoped>
.list-container {
  width: 1200px;
  margin: 0 auto;

  .sortList {
    height: 464px;
    padding-left: 210px;

    .center {
      box-sizing: border-box;
      width: 740px;
      height: 100%;
      padding: 5px;
      float: left;
    }

    .right {
      float: left;
      width: 250px;

      .news {
        border: 1px solid #e4e4e4;
        margin-top: 5px;

        h4 {
          border-bottom: 1px solid #e4e4e4;
          padding: 5px 10px;
          margin: 5px 5px 0;
          line-height: 22px;
          overflow: hidden;
          font-size: 14px;

          .fl {
            float: left;
          }

          .fr {
            float: right;
            font-size: 12px;
            font-weight: 400;
          }
        }

        .news-list {
          padding: 5px 15px;
          line-height: 26px;

          .bold {
            font-weight: 700;
          }
        }
      }

      .lifeservices {
        border-right: 1px solid #e4e4e4;
        overflow: hidden;
        display: flex;
        flex-wrap: wrap;

        .life-item {
          border-left: 1px solid #e4e4e4;
          border-bottom: 1px solid #e4e4e4;
          margin-right: -1px;
          height: 64px;
          text-align: center;
          position: relative;
          cursor: pointer;
          width: 25%;

          .list-item {
            background-image: url(./images/icons.png);
            width: 61px;
            height: 40px;
            display: block;
          }

          .service-intro {
            line-height: 22px;
            width: 60px;
            display: block;
          }

          &:nth-child(1) {
            .list-item {
              background-position: 0px -5px;
            }
          }

          &:nth-child(2) {
            .list-item {
              background-position: -62px -5px;
            }
          }

          &:nth-child(3) {
            .list-item {
              background-position: -126px -5px;
            }
          }

          &:nth-child(4) {
            .list-item {
              background-position: -190px -5px;
            }
          }

          &:nth-child(5) {
            .list-item {
              background-position: 0px -76px;
            }
          }

          &:nth-child(6) {
            .list-item {
              background-position: -62px -76px;
            }
          }

          &:nth-child(7) {
            .list-item {
              background-position: -126px -76px;
            }
          }

          &:nth-child(8) {
            .list-item {
              background-position: -190px -76px;
            }
          }

          &:nth-child(9) {
            .list-item {
              background-position: 0px -146px;
            }
          }

          &:nth-child(10) {
            .list-item {
              background-position: -62px -146px;
            }
          }

          &:nth-child(11) {
            .list-item {
              background-position: -126px -146px;
            }
          }

          &:nth-child(12) {
            .list-item {
              background-position: -190px -146px;
            }
          }
        }
      }

      .ads {
        margin-top: 5px;

        img {
          opacity: 0.8;
          transition: all 400ms;

          &:hover {
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>