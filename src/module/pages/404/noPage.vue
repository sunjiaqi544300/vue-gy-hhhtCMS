<template>
  <div class="content-w" id="content-wxx" v-loading="loading" :style="{height:windowHeight}">
    <div class="page-png" :style="{height: imageHeight}"></div>
    <div class="main-w">您还没有任何权限，请联系管理员添加</div>
  </div>
</template>

<script>
export default {
  name: "no-page",
  data () {
    return {
      windowHeight: '',
      imageHeight: ''
    }
  },
  mounted () {
    var windowH = document.documentElement.clientHeight
    this.windowHeight = windowH - 100 + 'px'
    this.imageHeight = (windowH - 100)/2 + 'px'
  }
}
</script>

<style scoped>
  .content-w{
    background: #FFFFFF;
  }
  .page-png{
    background: url("./images/no_page.png") no-repeat;
    background-position: center bottom;
    background-size: 160px;
  }
  .main-w{
    text-align: center;
    font-size: 18px;
    line-height: 74px;
  }
</style>
