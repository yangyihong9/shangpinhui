<template>
  <div>
    <Header></Header>

    <!-- 路由占位符 -->
    <router-view></router-view>
    <!-- Footer 在 Home和 Search 需要显示，在 登录，注册隐藏  用 v-show 显示隐藏-->
    <!-- <Footer v-show="$route.path == '/home' || $route.path == '/search'" ></Footer> -->

    <!-- 还有一种办法，通过路由配置的 meta  -->
    <Footer v-show="$route.meta.show"></Footer>


  </div>
</template>

<script>
import Header from "@/components/Header/index.vue";
import Footer from "@/components/Footer/index.vue";
// import { mapActions } from "vuex";
export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  mounted() {
    //  派发一个 action || 获取商品分类的三级列表的数据
    this.$store.dispatch("home/categoryList");
  },

};
</script>

<style>

</style>
