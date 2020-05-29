<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <router-view/>
  </div>
</template>

<script>
import "element-ui/lib/theme-chalk/index.css";
import "@/assets/fontDemo/iconfont.css"
import "@/assets/css/public.css";
export default {
  name: "App",
  mounted() {
    if(document.getElementById("box")){
       var windowH = document.documentElement.clientHeight - 100;
        document.getElementById("box").style.height = windowH + "px"; 
    }
    if(document.getElementById("page")){
      var windowH = document.documentElement.clientHeight - 100;
      document.getElementById("page").style.height = windowH + "px";
    }    
  },
};
</script>

<style>
#app {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}

</style>
