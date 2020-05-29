<template>
  <div class="index">
    <!--侧边导航-->
    <div class="navLeft" :class="{'active':navToggle == false}">
      <h2 class="toggle_icon" @click="toggle" ><span v-show="navToggle">功能列表</span><img :src="img.iconToggle" alt="toggle" :style="{transform : navToggle ? 'scaleX(1)' : 'scaleX(-1)'}"></h2>
      <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" :collapse="!navToggle" background-color="#f5f6fa" router active-text-color="#629ef6">
        <Menu :listData="listData" :toggleW="!navToggle"></Menu>
      </el-menu>
    </div>
    <div id="main_right" class="right" :style="{marginLeft : navToggle ? '200px' : '65px'}">
      <div class="header">
        <span class="left logo" :style="{width: navToggle ? '200px' : '65px'}">
          <img :src="img.logo" alt="logo" v-if="navToggle">
          <img :src="img.logoMini" alt="logo" v-else>
          <!-- <img :src="img.logoT" alt="logo" :style="{marginTop: navToggle ? '0' : '20px'}"  v-if="navToggle"> -->
        </span>
        <span>
            <!-- <h1 class="page-title">作战地图工业系统</h1> -->
        </span>
        <img :src="img.advance" alt="" class="advance">
        <span class="right_f esc" @click="escLand"><img :src="img.esc" alt="退出">&nbsp;&nbsp;退出</span>
        <span class="right_f time"><img :src="img.time" alt="time">&nbsp;&nbsp;<i id="time"></i></span>
        <span class="right_f people">欢迎&nbsp;<i>{{userName}}</i>&nbsp;登录系统</span>
      </div>
        <transition name="fade-transverse">
            <keep-alive>
                <router-view class="main_outside" v-if="$route.meta.keepAlive"/>
           </keep-alive>
        </transition>
        <transition name="fade-transverse">
          <router-view class="main_outside" v-if="!$route.meta.keepAlive"/>
        </transition>
    </div>
  </div>
</template>


<script>
import {hostType} from '@/api/env.js'
export default {
  name: 'index',
  data () {
    return {
      navToggle: true,
      navWidth: '200px',
      navWidthToggle: '65px',
      tableHeight: '',
      table: [],
      img: {
        logo: require('@/assets/images/logosss.png'),
        logoMini: require('@/assets/images/logo_mini.png'),
        logos: require('@/assets/images/logo_s.png'),
        logoT: require('@/assets/images/logoT.png'),
        esc: require('@/assets/images/esc.png'),
        time: require('@/assets/images/time.png'),
        iconToggle: require('@/assets/images/toggle.png'),
        advance: require('@/assets/images/addlogo.png')
      },
      userName: '',
      listData:null,
      loading:true,
    }
  },
  methods: {
    activeIndex(){
       return this.$route.path.replace('/','')
        },
    toggle: function () {
      this.navToggle = !this.navToggle
    },
    escLand () {
      localStorage.removeItem('token')
      this.$router.push('/land')
    },
    leftdata(){
       // console.log(this.$route)
        var vm = this
          let domain = hostType(2)
          console.log('=======')
        // this.$axios.get('/user/api/permission_user/?time=' + new Date().getTime()).then(res => {
        this.$axios.get('/user/api/permission_user/?time=' + new Date().getTime()).then(res => {
          console.log('00000000=======')
          // console.log(res.data)
          vm.listData = res.data
          // vm.loading = false
          // console.log(vm.listData)
        })
        // console.log(vm.toggleW)
    }
  },
  mounted () {
    let vm = this
    var windowH = document.documentElement.clientHeight
    document.getElementById('main_right').style.height = windowH - 80 + 'px'
    var time = document.getElementById('time')
    // this.getTime(time)
    this.leftdata()
    vm.userName = localStorage.getItem('userName')
    window.setInterval(function () {
      var d = new Date();
      var year = d.getFullYear();
      var month = d.getMonth() + 1;
      var date = d.getDate();
      var hour = (d.getHours() < 10) ? ("0" + d.getHours()) : d.getHours();
      var min = (d.getMinutes() < 10) ? ("0" + d.getMinutes()) : d.getMinutes();
      var sec = (d.getSeconds() < 10) ? ("0" + d.getSeconds()) : d.getSeconds();
      var now = year + "/" + month + "/" + date + "/" + '   ' + hour + ":" + min + ":" + sec;
      time.innerHTML = now
    },1000)
  },
  components: {
    'Menu': () => import('@/components/nav/navW.vue'),
  }
}
</script>

<style scoped>
/* 杨万超新增标题文字 */
.page-title{
  font-size: 20px;
  display: inline-block;
}

/*end*/

.navLeft{
  transition: 0.3s all ease-in-out;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: #FFFFFF;
  overflow-y: auto;
  overflow-x: hidden;
  box-shadow: 0 3px 7px rgba(210, 226, 250, 0.75);
  max-width: 200px;
}
.navLeft .active{
  width: 20px;
}

.navLeft .toggle_icon{
  margin-top: 60px;
  height: 60px;
  line-height: 60px;
  border-bottom: 1px #cccccc solid;
  cursor: pointer;
}
.navLeft .toggle_icon span{
  margin-left: 20px;
}

.navLeft .toggle_icon img{
  float: right;
  margin-top: 24px;
  margin-right: 30px;
  width: 14px;
  height: 12px;
}
  .right{
    /*position: relative;*/
    transition: 0.3s all ease-in-out;
    margin-top: 80px;
    /*position: absolute;*/
    /*left: 0;*/
    /*top: 0;*/
    /*height: 100%;*/
    /*width: 100%;*/
  }
  .right .header{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 20;
    width: 100%;
    height: 60px;
    background: white;
    /* background: #2b63b6; */
    line-height: 60px;
    /*border-bottom: 1px #cfd7e5 solid;*/
    box-sizing: border-box;
    box-shadow: 0 3px 7px #e3f3f9;
  }
  .right .header span{
    font-size: 14px;
    color: black;
  }
  .right .header .title{
    font-family: MFJianHei;
    font-size: 24px;
    font-weight: bold;
    line-height: 70px;
    margin-left: 40px;
  }
  .right .header .toggle{
    cursor: pointer;
    width: 120px;
    float: left;
    text-align: center;
    font-size: 18px;
  }
  .right .header .left{
    float: left;
    margin-right: 20px;  /*杨万超新增标题右边距*/
  }
  .logo{
    width: 260px;
    height: 60px;
    overflow: hidden;
    background: #FFFFFF;
    border-right: 1px #FFFFFF solid;
    transition: 0.3s all ease-in-out;
  }
  .logo img{
    /*height: 57px;*/
    width: 100%;
    /*margin: 0 15px;*/
    height: 60px;
    /* width: 220px; */
    line-height: 60px;
    transition: 0.3s all ease-in-out;
    float: left;
  }
  .logo .logo_s{
    float: right;
    height: 28px;
    margin: 16px;
  }
  .el-menu-demo{
    height: 59px;
  }
  .right .header .right_f{
    float: right;
  }
  .right .header .esc {
    cursor: pointer;
    width: 120px;
    text-align: center;
    font-size: 14px;
  }
.right .header .esc img, .right .header .time img{
  position: relative;
  top: 3px;
  width: 16px;
}
.right .header .people{
    width: 200px;
    text-align: center;
  }
  .right .header .people i{
    /*text-decoration: underline;*/
    font-size: 15px;
  }
  .main_outside{
    border-radius: 5px;
    /* overflow: auto; */
     margin: 80px 20px 0 17px;
    /*position: absolute;*/
    /*top: 60px;*/
    /*right: 0;*/
    /*bottom: 0;*/
    /*left: 0;*/
    /*left: 25;*/
    position: relative;
    width: 100%;

  }


.slide-fade-enter-active {
  transition: all .5s ease;
}
.slide-fade-leave-active {
  transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

.slide-fadebig-enter-active {
  transition: all .5s ;
}
.slide-fadebig-leave-active {
  transition: all .5s ease;
}
.slide-fadebig-enter, .slide-fadebig-leave-to
.slide-fadebig-leave-active{
  transform: translateX(10px);
  opacity: 0;
}

/* @font-face{
	font-family: myFirstFont;
	src: url('../assets/fonts/MFJianHei-Regular.otf')
}
#advance{
  font-family: myFirstFont;
  font-weight: lighter;
  line-height: 60px;
} */
.advance{
  vertical-align: middle;
  margin-left: 20px;
}

</style>
