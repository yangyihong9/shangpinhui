<template>
  <div>
    <!-- 三级联动全局组件 -->
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommand></Recommand>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="(floor, index) in floorList" :key="floor.id" :list="floor" />
    <Brand />
  </div>
</template>

<script>
import ListContainer from "@/pages/Home/ListContainer/index.vue";
import Recommand from '@/pages/Home/Recommand/index.vue'
import Rank from '@/pages/Home/Rank/index.vue'
import Like from '@/pages/Home/Like/index.vue'
import Floor from '@/pages/Home/Floor/index.vue'
import Brand from '@/pages/Home/Brand/index.vue'
import { mapState } from "vuex";

export default {
  name: "",
  // 注册组件
  components: {
    ListContainer,
    Recommand,
    Rank,
    Like,
    Floor,
    Brand
  },
  // getfloorList 这个 actions 在哪里触发，是需要在 Home 路由组件当中触发的，因为他要 v-for 遍历两个 <Floor/>,所以不能再 Floor 组件里面触发
  mounted() {
    // 派发 actions ，获取 floor 组件的数据
    this.$store.dispatch(`home/getFloorList`)
    
  },
  computed: {
    ...mapState({
      floorList: state => state.home.floorList
    })
  }
};
</script>

<style lang="less" scoped>

</style>