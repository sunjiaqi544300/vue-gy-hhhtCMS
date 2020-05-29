<template>
 <div class="allPath" id="allPath"> 
 </div>
</template>

<script type="text/ecmascript-6">
import gcoord from "gcoord"
import { TMap,coordinateFn  } from "js/qqMap"
export default {
   props: ["path", "marker"],
data() {
  return {
    color: {
      "居住场所": "#f3282b",
      "交通枢纽": "#FFDD00",
      "办公场所": "#0dccbb",
      "旅游景区": "#a532cc",
      "住宿场所": "#FF628C",
      "购物场所": "#018fcc",
      "教育文化": "#26cc3e",
      "医疗服务": "#00cbe6",
      "餐饮服务": "#FF9D00",
      "休闲娱乐": "#86C166"
    },
  }
},
components: { },
watch: {
  path: function() {
    this.drawMap()
  },
  marker: function() {
    this.drawMap()
  }
},
methods: {
    drawMap() {
       let vm = this
        TMap("H7KBZ-XMI66-4CXSJ-ERMEQ-UPCYZ-PABYG&libraries=convertor").then(
        qq => {
          let map = new qq.maps.Map(document.getElementById("allPath"), {
            // 地图的中心地理坐标。
            center: new qq.maps.LatLng(39.916527,116.397128),
            zoom: 11,
            disableDefaultUI: true})
          
          if (vm.path !== []) {
            for (let i = 0; i < vm.path.length; i++) {
              let innerPath = []
              innerPath.color = vm.path[i].func_area
              innerPath.name = vm.path[i].biz_dist
              for (let j = 0; j < vm.path[i].path.length; j++) {
                // 将BD坐标转换为QQ坐标
                let result = gcoord.transform(
                  // [ vm.path[i].path[j][1] - 0 + 0.000674, vm.path[i].path[j][0] - 0.000452 ],
                   coordinateFn(vm.path[i].path[j][1],vm.path[i].path[j][0]),
                  gcoord.BMap, gcoord.GCJ02 )
                innerPath.push(new qq.maps.LatLng(result[0], result[1]))
              }
              let polygon = new qq.maps.Polygon({
                    path: innerPath,
                    strokeColor: vm.color[innerPath.color] || "#cccccc",
                    strokeWeight: 1,
                    fillColor: qq.maps.Color.fromHex(vm.color[innerPath.color] || "#cccccc", 0.3),
                    map: map
                  })  
              //商圈点击事件
              polygon.name = innerPath.name
              qq.maps.event.addListener(polygon,"click",function(){
                  vm.$emit('pathClick',this.name)
              })     
               
            }
          }  
        })  
        
    }
  },
  mounted(){
    this.drawMap()
  }
}
</script>

<style scoped>
.allPath{
  width: 100%;
  height: 100%;
}

</style>
