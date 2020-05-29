<template>
  <div class="nav_left">
    <!--logo-->
    <!--<div class="logo" :style="{width: toggleW ? '65px' : '200px'}"><img v-if="!toggleW" :src="img.logo" alt="logo"><img class="logo_s" v-else :src="img.logos" alt="logo"></div>-->
    <!--<el-menu default-active="/countyStrategy" class="el-menu-vertical-demo" :collapse="toggleW" background-color="#ebf1f6" router="true">-->
    <!--<el-menu :default-active="currentRouter" class="el-menu-vertical-demo" :collapse="toggleW" background-color="#ebf1f6" :router="true" active-text-color="#629ef6">-->
      <!--<template v-for="(item,index) in listData">-->
        <!--<el-submenu :index="index + '-'" v-if="item.sub_cat.length !== 0" :key="index">-->
          <!--<template slot="title">-->
            <!--<i class="el-icon-location"></i>-->
            <!--<span>{{item.funct_name}}</span>-->
          <!--</template>-->
          <!--<el-menu-item v-for="(option,index2) in item.sub_cat" index="/countyStrategy" :key="index2">{{option.funct_name}}</el-menu-item>-->
        <!--</el-submenu>-->
        <!--<el-menu-item v-else :key="index" :index="index + '-'">-->
          <!--<i class="el-icon-menu"></i>-->
          <!--<span slot="title">{{item.funct_name}}</span>-->
        <!--</el-menu-item>-->
      <!--</template>-->
    <!--</el-menu>-->
    <el-menu default-active="/countyStrategy" class="el-menu-vertical-demo" :collapse="toggleW" background-color="#ebf1f6" router="true">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item index="1-1">选项1</el-menu-item>
        <el-menu-item index="1-1">选项1</el-menu-item>
        <el-menu-item index="1-1">选项1</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'nav',
  data () {
    return {
      img: {
        logo: require('@/assets/images/logo.png'),
        logos: require('@/assets/images/logo_s.png')
      },
      currentRouter: '/countyStrategy', // 当前router
      toggleWidth: false,
      listData: []
    }
  },
  watch: {
  },
  props: [
    'toggleW'
  ],
  methods: {

  },
  mounted () {
    // console.log(this.$route)
    var vm = this
    this.$axios.get('/industry/api/permission/').then(res => {
      // console.log(res)
      vm.listData = res.data
    })
    // console.log(vm.toggleW)
  },
  components: {
  }
}
</script>

<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .nav_left{
    width: 100%;
    margin-top: 60px;
  }
  .logo{
    width: 100%;
    height: 60px;
    overflow: hidden;
    background: #2b63b6;
    border-right: 1px #FFFFFF solid;
    transition: 0.3s all ease-in-out;
  }
  .logo img{
    height: 60px;
    margin: 0 15px;
  }
  .logo .logo_s{
    float: right;
    height: 28px;
    margin: 16px;
  }
  .nav_all .nav_one{
    display: block;
    padding-left: 10px;
  }
  .nav_all .nav_two{
    display: block;
    padding-left: 20px;
  }
</style>
