<template>
  <div>
    <div class="item">
      <span><i class="el-icon-document"></i></span>
      <div class="hover"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "el-item",
  props: [
    'listData'
  ],
  mounted () {
    // console.log(this.listData)
  }
}
</script>

<style scoped>
  .item{
    position: relative;
    padding-left: 10px;
  }
  .item .hover{
    position: absolute;
    left: 65px;
  }
</style>
