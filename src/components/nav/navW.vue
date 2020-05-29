<template>
  <div class="navMenu"  :class="{'active':toggleW === true}">
    <!-- <el-menu :default-active="$route.path" class="el-menu-vertical-demo" :collapse="toggleW" background-color="#f5f6fa" router active-text-color="#629ef6"> -->
      <template v-for="(item,index) in listData">        
        <!-- 一级导航有下一级 -->
        <el-submenu v-if="item.sub_cat.length !== 0" :index="item.name" :key="index">
          <template slot="title">
                <i :class="item.icon" class="iconfont" style="color:#5593F8"></i>
                <!-- <i class="iconfont icon-map1" style="color:#5593F8"></i> -->
                <!-- <img :src="img.maplogos" alt=""  style="margin-right:7px;width:17px;height:16px"> -->
                <span style="vertical-align: middle" :class="{'active':toggleW == true}" >{{item.name}}</span>
          </template>
          <!-- <div class="ss2"> -->
            <Menu :listData="item.sub_cat"></Menu> 
          <!-- </div> -->
        </el-submenu>
                      <!--一级导航无下一级-->
        <el-menu-item v-else :key="index" :index="item.url === null ? item.url + '-' + index : item.url">
          <i :class="item.icon" class="iconfont"></i>
          <span slot="title">{{item.name}}</span>
        </el-menu-item>
      </template>
    <!-- </el-menu> --> 
  </div>
</template>

<script> 
export default {
  name: 'Menu',
  data () {
    return {
      img: {
        logo: require('@/assets/images/logo.png'),
        logos: require('@/assets/images/logo_s.png'),
        maplogos: require('@/assets/images/map_logo.png'),
      },
      currentRouter: '/countyStrategy', // 当前router
      toggleWidth: false,
      activeIndex:"1",
      isopen:false,
      loading:true, //杨万超  新增 loading加载图标
    }
  },
  props: [
    'toggleW',"listData",
  ],
  watch: {
    
  },
  methods: {
    openFn(){
      this.isopen = true
    },
    closeFn(){
      this.isopen = false
    }
  },
  computed:{
      currentIndex(){
        var url = this.$route.path
        if(url == "/"){
            this.$router.push({path:"/land"})
            return
        }else{
               // console.log(url)
              // console.log(url.match(/\w+/)[0])
              // console.log("/"+url.match(/\w+/)[0])
              // return "/"+url.match(/\w+/)[0]
        }
      }
  }
}
</script>

<style>
  .navMenu{
    width: 200px;
  }
  .navMenu .active{
        overflow: hidden;
  }
  .navMenu.active li{
    width: 70px;
  }
  .navMenu.active li span.active{
    margin-left: 200px;
  }

   .navMenu.active li i.el-submenu__icon-arrow,.el-icon-arrow-right{
        top:55%;
   }

  .navMenu .active span{
    margin-left: 100px;
  }
  .iconfont {
    margin-right: 5px;
  }
  .nav_left{
    width: 100%;
    /* padding-left: 15px; */
  }
  .nav_left .el-submenu .el-menu-item{
    /* padding-left: 25px!important; */
  }
  .nav_left .el-submenu.is-opened .el-submenu__title{
    /* border-left:4px solid #5593F8; */
    /* padding-left:55px !important; */
  }
 /* .nav_left .el-menu-vertical-demo .el-submenu .el-submenu__title{
     padding-left:55px !important;
 } */
  .nav_left .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    /* border-right: solid 1px white; */
    /* min-height: 330px; */
  }
  .ss2{
    padding-left: 6px;
    /* text-align: center; */
  }
  .nav_left .current{
    color: #5593F8;
    /* border-left:3px solid #5593F8; */
  }
  .nav_left .logo{
    width: 100%;
    height: 60px;
    overflow: hidden;
    background: #2b63b6;
    border-right: 1px #FFFFFF solid;
    transition: 0.3s all ease-in-out;
  }
  .nav_left .logo img{
    height: 60px;
  }
  .nav_left .logo .logo_s{
    float: right;
    height: 28px;
    margin: 16px;
  }
  .nav_left .nav_all .nav_one{
    display: block;
    padding-left: 10px;
  }
  .nav_left .nav_all .nav_two{
    display: block;
    padding-left: 60px;
  }
</style>
