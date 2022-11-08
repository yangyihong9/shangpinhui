<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">上一页</button>
    <button v-if="startNumAndEndNum.start > 1" @click="$emit('getPpageNo', 1)" :class="{ active: pageNo == 1 }">1</button>
    <button v-if="startNumAndEndNum.start > 2">···</button>

    <!-- 中间连续页码的地方:v-for、数组、对象、数字、字符串 -->
    <button v-for="page in startNumAndEndNum.end" :key="page" v-if="page >= startNumAndEndNum.start"
      @click="$emit('getPageNo', page)" :class="{ active: pageNo == page }">{{ page }}</button>

    <button v-if="startNumAndEndNum.end < totalPage - 1">···</button>
    <button v-if="startNumAndEndNum.end < totalPage" @click="$emit('getPageNo', totalPage)"
      class="active:pageNo==totalPage">{{ totalPage }}</button>
    <button :disabled="pageNo == totalPage" @click="$emit('getPageNo', pageNo + 1)">下一页</button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  // 父组件传给字符串的数据：当前页、每一页展示多少条数据、数据总个数、连续页码数
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    // 计算总共有多少页
    totalPage() {
      // 向上取整
      return Math.ceil(this.total / this.pageSize);
    },
    // 计算连续页码的其实数字和结束数字【连续页码的数字至少是5】
    startNumAndEndNum() {
      // 先定义两个变量存储起始数字与结束数字
      let start = 0, end = 0;
      // 连续页码（continues）是 5 ,说明至少五页，但是也有不正常的少于五页的
      if (this.continues > this.totalPage) {
        start = 1;
        end = this.totalPage;
      } else {
        // 正常现象
        start = this.pageNo - parseInt(this.continues % 2),
          end = this.pageNo + parseInt(this.continues % 2)
        if (start < 1) {
          start = 1,
            end = this.continues
        }
        if (end > this.totalPage) {
          end = this.totalPage,
            start = this.totalPage - this.continues + 1

        }
      }
      return { start, end }
    }
  }
};
</script>

<style lang="less" scoped>
.pagination {
  button {
    text-align: center;
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
.active{
  background-color: skyblue;
}
</style>