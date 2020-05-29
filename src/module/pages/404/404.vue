<template>
  <div class="content-w" id="content-wxx" v-loading="loading">
    <div class="page-png" :style="{height: mainHeight}"></div>
    <!-- <div class="main-w">抱歉！您所要访问的页面正在开发中。。。</div> -->
  </div>
</template>

<script>
export default {
  name: "404",
  data () {
    return {
      mainHeight: '',
      loading: false
    }
  },
  watch: {
    '$route': function () {
      var vm = this
      vm.loading = true
      setTimeout(function () {
        vm.loading = false
      },500)
    }
  },
  mounted () {
    var windowH = document.documentElement.clientHeight
    // console.log(windowH)
    document.getElementById('content-wxx').style.height = windowH - 100 + 'px'
    this.mainHeight = (windowH - 100)+ 'px'
  }
}
</script>

<style scoped>
.content-w{
  height: 100%;
  background: #FFFFFF;
}
.page-png{
  background: url("./images/404.jpg") no-repeat;
  background-position: center;
  background-size: contain;
  box-shadow: 0 3px 7px #ccc;
}
.main-w{
  text-align: center;
  font-size: 18px;
  line-height: 74px;
}
</style>
