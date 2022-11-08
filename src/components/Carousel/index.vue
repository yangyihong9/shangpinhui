<template>
  <!-- 轮播图的地方 -->
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(carousel, index) in list" :key="carousel.id">
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
// 引入 swiper 轮播图
import Swiper from 'swiper';
export default {
  name: 'Carousel',
  props: ['list'],
  watch: {
    list: {
      // 为什么 watch 监听不到 list ，因为这个数据从来没有发生变化（数据是父亲给的，父亲给的时候就是一个对象，对象里面该有的数据都是有的）
      // immediate：立即监听 -- 不管你数据有没有变化，我上来立即监听一次
      immediate: true,
      // 只能监听到数据已经有了，但是 V-for 动态渲染结构我们还是没有办法确定，因此还是需要用 nextTick
      handler() {
        this.$nextTick(() => {
          var mySwiper = new Swiper(this.$refs.cur, {
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
          })
        })
      }
    }
  }
}
</script>

<style>

</style>