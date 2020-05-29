<template>
  <div class="qqMap" :id="qqMap" ref="qqMap"></div>
</template>

<script type="text/ecmascript-6">
import gcoord from "gcoord";
import { TMap,coordinateFn } from "js/qqMap";
export default {
  name: "商圈地图",
  props: ["path", "marker", "point","isclick"],
  data() {
    return {
      color: {
        居住场所: "#f3282b",
        交通枢纽: "#FFDD00",
        办公场所: "#0dccbb",
        旅游景区: "#a532cc",
        住宿场所: "#FF628C",
        购物场所: "#018fcc",
        教育文化: "#26cc3e",
        医疗服务: "#00cbe6",
        餐饮服务: "#FF9D00",
        休闲娱乐: "#86C166",
        自身: "#FF4252",
        竞品: "#549CF2",
        "上升":'#33a853',
        '未上柜':'#acacac',
        '下降':'#eb4436',
        '均衡':'#fabc05',
         '持平':'#fabc05',
         '上升':'#33a853',
         '下降':'#eb4436',
         '监管户':'#eb4436',
         '核心价值户':'#eb4436',
         '潜力户':'#eb4436',
         '潜在流失户':'#eb4436',
         '连锁户':'#eb4436',
         
      },
      img: {
        red: require("@/assets/images/red2.png"),
        yellow: require("@/assets/images/yellow2.png"),
        green: require("@/assets/images/green2.png"),
        gray: require("@/assets/images/gray2.png"),
        blue: require("@/assets/images/blue.png"),
      },
        map: null,
      evt: null,
      info:null,
      qqMap:Math.random().toString(30).substr(2),
    };
  },
  components: {},
  watch: {
    path: function() {
      this.drawMap();
    },
    marker: function() {
      this.drawMap();
    },
    point: function() {
      this.drawMap();
    },
  },
  mounted: function() {
    var windowH = document.documentElement.clientHeight - 230;
    document.getElementById(this.qqMap).style.height = windowH + "px";
    this.$nextTick(function() {
        this.drawMap();
    });
  },
  destroyed() {
   this.map = null
    this.evt = null
    this.info = null
  },
  methods: {
    drawMap() {
      let vm = this;
      TMap("H7KBZ-XMI66-4CXSJ-ERMEQ-UPCYZ-PABYG&libraries=convertor").then( qq => {
          vm.map = new qq.maps.Map(document.getElementById(vm.qqMap), {
            // 地图的中心地理坐标。
            center: new qq.maps.LatLng(40.82,111.65),
            // center: new qq.maps.LatLng(vm.marker[0].add_lat,vm.marker[0].add_lng),
            zoom: 11,
            disableDefaultUI: true,
             zoomControlOptions: {
              style: qq.maps.ZoomControlStyle.SMALL
            },
            disableDoubleClickZoom: true    //设置是否可以双击放大
          });
           this.info = new qq.maps.InfoWindow({
                map: vm.map
            });
          if (vm.path !== []) {
            if (vm.path != undefined) {
              for (let i = 0; i < vm.path.length; i++) {
                let innerPath = [];
                innerPath.color = vm.path[i].state || "";
                innerPath.name = vm.path[i].biz_dist || "";
                innerPath.center = vm.path[i].center || "";
                for (let j = 0; j < vm.path[i].path.length; j++) {
                  // 将BD坐标转换为QQ坐标
                  let result = gcoord.transform(
                    // [
                    //   vm.path[i].path[j][1] - 0 + 0.000674,
                    //   vm.path[i].path[j][0] - 0.000452
                    // ],
                    coordinateFn(vm.path[i].path[j][1],vm.path[i].path[j][0]),
                    gcoord.BMap,
                    gcoord.GCJ02
                  );
                  innerPath.push(new qq.maps.LatLng(result[0], result[1]));
                }
                let polygon = new qq.maps.Polygon({
                  path: innerPath,
                  strokeColor: vm.color[innerPath.color] || "#cccccc",
                  strokeWeight: 1,
                  fillColor: qq.maps.Color.fromHex(
                    vm.color[innerPath.color] || "#cccccc",
                    0.3
                  ),
                  map: vm.map
                });
                //商圈点击事件
                polygon.name = innerPath.name;
                polygon.center = innerPath.center;
                // if(vm.isclick){
                   qq.maps.event.addListener(polygon, "click", function(evt) {
                    vm.$emit("pathClick", vm.path[i].biz_dist, vm.path[i]);
                     vm.evt = evt;
                  });
                // }
              }
              if(vm.path.length > 0){
                console.log(2)
                   vm.map.panTo(new qq.maps.LatLng(vm.path[0].path[0][1],vm.path[0].path[0][0]));
              }
            }
          }
          if (vm.marker !== []) {
            let markers = new qq.maps.MVCArray();
            if (vm.marker != undefined) {
              
              for (let i = 0; i < vm.marker.length; i++) {
                // 将BD坐标转换为QQ坐标
                let result = [vm.marker[i].add_lat,vm.marker[i].add_lng]

                let latLng = new qq.maps.LatLng(result[0], result[1]);
                // if (vm.marker[i]) {
                  let anchor = new qq.maps.Point(10, 20),
                    size = new qq.maps.Size(24, 24),
                    origin = new qq.maps.Point(0, 0),
                    icon1 = new qq.maps.MarkerImage(
                      vm.img.red,
                      size,
                      origin,
                      anchor
                    ),
                    
                    icon2 = new qq.maps.MarkerImage(
                      vm.img.yellow,
                      size,
                      origin,
                      anchor
                    ),
                    icon3 = new qq.maps.MarkerImage(
                      vm.img.green,
                      size,
                      origin,
                      anchor
                    ),
                    icon4 = new qq.maps.MarkerImage(
                      vm.img.gray,
                      size,
                      origin,
                      anchor
                    ),
                    icon5 = new qq.maps.MarkerImage(
                      vm.img.blue,
                      size,
                      origin,
                      anchor
                    );
                    // let icon;
                  //  icon = vm.marker[i].statedesc === "交通枢纽" ? icon1 : vm.marker[i].statedesc === '休闲娱乐' ?
                  //       icon2 : vm.marker[i].type1 === '住宿场所' ? icon3 : vm.marker[i].type1 === '办公场所' ?
                  //       icon4 : vm.marker[i].type1 === '医疗服务' ? icon5 : vm.marker[i].type1 === '居住场所' ?
                  //       icon6 : vm.marker[i].type1 === '教育文化' ? icon7 : vm.marker[i].type1 === '旅游景区' ?
                  //       icon8 : vm.marker[i].type1 === '购物场所' ? icon9 : icon10
                   
                  // if (typeof vm.marker[i].shop_cat === "number") {
                  //   icon =
                  //     vm.marker[i].color === 1
                  //       ? icon1
                  //       : vm.marker[i].color === 2
                  //       ? icon2
                  //       : icon3;
                  // } else if (typeof vm.marker[i].shop_cat === "string") {
                  //   icon =
                  //     vm.marker[i].shop_cat === "一般客户"
                  //       ?  vm.img.red
                  //       : vm.marker[i].shop_cat === "潜力客户"
                  //       ?  vm.img.red
                  //       : vm.marker[i].shop_cat === "核心客户"
                  //       ?  vm.img.red:  vm.img.red
                       
                  // }
                  // let  icon =
                      // vm.marker[i].shop_cat == "一般客户"
                      //   ?  vm.img.red
                      //   : vm.marker[i].shop_cat == "潜力客户"
                      //   ?  vm.img.yellow
                      //   : vm.marker[i].shop_cat == "核心客户"
                      //   ?  vm.img.green:vm.img.red
                  // console.log(vm.marker)
                  var marker = new qq.maps.Marker({
                    icon:  vm.marker[i].shop_cat == "一般客户"
                        ?  vm.img.red
                        : vm.marker[i].shop_cat == "潜力客户"
                        ?  vm.img.yellow
                        : vm.marker[i].shop_cat == "核心客户"
                        ?  vm.img.green:vm.img.blue, // vm.marker[i].color === 1?icon1:vm.marker[i].color === 2?icon2:icon3,
                    map: vm.map,
                    position: latLng,
                   
                  });
                  marker.code = vm.marker[i].license;
                  // marker.color = vm.marker[i].state;
                  marker.name = vm.marker[i].shop_name;
                  marker.add = result;
                  //marker点击事件
                  qq.maps.event.addListener(marker, "click", function() {
                    vm.$emit("markerClick", vm.marker[i].license,vm.marker[i].shop_name,vm.marker[i]);
                  });
                // } else {
                //   marker = new qq.maps.Marker({ position: latLng, map: vm.map });
                // }
                markers.push(marker);
              }
              // if(vm.marker.length > 0){
              //      vm.map.panTo(new qq.maps.LatLng(vm.marker[0].add[1],vm.marker[0].add[0]));
              // }
            }

            let markerClusterer = new qq.maps.MarkerCluster({
              map: vm.map,
              minimumClusterSize: 5, //默认2
              markers: markers,
              zoomOnClick: true, //默认为true
              gridSize: 10, //默认60
              averageCenter: true, //默认false
              maxZoom: 18 //默认18
            });
          }
          //改变地图中心及缩放等级
          if (vm.point != undefined) {
            if (vm.point.length !== 0) {
              let result = gcoord.transform(
                // [vm.point[1] - 0 + 0.000674, vm.point[0] - 0.000452],
                coordinateFn(vm.point[1],vm.point[0]),
                gcoord.BMap,
                gcoord.GCJ02
              );
              vm.map.panTo(new qq.maps.LatLng(result[0], result[1]));
              vm.map.zoomTo(16);
            } else if (vm.point.length === 0) {
              vm.map.zoomTo(11);
            }
          }

        });
    }
  }
};
</script>

<style scoped>
.qqMap {
  width: 100%;
  height: 100%;
}
</style>
