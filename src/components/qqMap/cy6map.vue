<template>
  <div>
       <div class="qqMap" id="cy6map" ref="qqMap"></div>
  </div>
</template>

<script type="text/ecmascript-6">
import gcoord from "gcoord";
import { TMap ,coordinateFn } from "js/qqMap";
export default {
  name: "qqMap",
  // props: ["path", "marker", "point","draggable","changezoom","licenseData","resetdata","mapclose"],
  props: ["path", "marker", "point","licenseData"],
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
        防御战:"#37a657",
        主攻站:"#f8bf00",
        侧翼战:"#f73f37",
        游击战:"#a9a9a9"
      },
      img: {
        red: require("@/module/marketAnalysis/images/1.png"),
        yellow: require("@/module/marketAnalysis/images/2.png"),
        green: require("@/module/marketAnalysis/images/3.png"),
        blue: require("@/module/marketAnalysis/images/maplogo.png")
      },
      map: null,
      evt: null,
      info:null,
      markers:null,
      markerClusterer:null,
      markersArray:[],
      flage:false
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
      this.zoomFn();
    },
    // draggable:function(){
    //     // this.markerFnclear();
    // },
    // changezoom(){
    //     // this.markerFnclear();
    // },
    licenseData(){
        this.markerFnclear();
    },
 
      // handler: function(newVal, oldVal) {
      //    setTimeout(function(){
      //       this.info.close();
      // },3000)
      //     this.alertFn(this.evt)
      // }
     alertObj: {
      deep: true,
      handler: function(newVal, oldVal) {
        this.info.close();
        this.alertFn(this.evt);
      }
    },
    // resetdata(){
    //   //  this.markerFnclear();
    // },
  },
  mounted: function() {
    var windowH = document.documentElement.clientHeight - 230;
    document.getElementById("cy6map").style.height = windowH + "px";
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
    alertFn(evt) {
        // console.log(evt)
      // let vm = this;
      //添加到提示窗
      this.info.open();
      // info.open();
       this.info.setContent(
       '我原来在这'
      );
       this.info.setPosition(evt.latLng);
      
    },
    drawMap() {
      let vm = this;
      TMap("H7KBZ-XMI66-4CXSJ-ERMEQ-UPCYZ-PABYG&libraries=convertor").then( qq => {
          vm.map = new qq.maps.Map(document.getElementById("cy6map"), {
            // 地图的中心地理坐标。
            center: new qq.maps.LatLng(25.0491531005,102.714601139),
              // center: new qq.maps.LatLng(39.11221,117.23429),
            zoom: 14,
            disableDefaultUI: true,
             zoomControlOptions: {
              style: qq.maps.ZoomControlStyle.SMALL
            }
          });
          // this.info = new qq.maps.InfoWindow({
          //       map: vm.map
          // });
          // vm.map = map;
            this.info = new qq.maps.InfoWindow({
                map: vm.map
            });
          vm.pathFn()
          vm.markerFn()
          
        });
    },
    pathFn(){
       let vm = this;
        if (vm.path !== []) {
            if (vm.path != undefined) {
              for (let i = 0; i < vm.path.length; i++) {
                let innerPath = [];
                innerPath.color = vm.path[i].func_area || "";
                innerPath.name = vm.path[i].biz_dist || "";
                innerPath.center = vm.path[i].center || "";
                for (let j = 0; j < vm.path[i].path.length; j++) {
                  // 将BD坐标转换为QQ坐标
                  // let result = gcoord.transform(
                  //   // [
                  //   //   vm.path[i].path[j][1] - 0 + 0.000674,
                  //   //   vm.path[i].path[j][0] - 0.000452
                  //   // ],
                  //    coordinateFn(vm.path[i].path[j][1],vm.path[i].path[j][0]),
                  //   gcoord.BMap,
                  //   gcoord.GCJ02

                  // );
                   let result=[vm.path[i].path[j][1],vm.path[i].path[j][0]]
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

                //添加到提示窗
                // var info = new qq.maps.InfoWindow({
                //   map: vm.map
                // });
                qq.maps.event.addListener(polygon, "click", function(evt) {
                  //杨万超 - 3-20-地图标记弹框
                  vm.$emit("pathClick", vm.path[i].biz_dist, vm.path[i].center);
                  vm.evt = evt;
                  //end
                });
                // qq.maps.event.addListener(polygon, "dblclick", function() {
                //   vm.$emit("pathClick2", this.name, this.center);
                // });
              }
              if(vm.marker.length > 0){
                   vm.map.panTo(new qq.maps.LatLng(vm.marker[0].add[1],vm.marker[0].add[0]));
              }
            }
          }
    },
    markerFnclear(){
       let vm = this;
        if (this.markersArray) {
          for (let index = 0; index < this.markersArray.length; index++) {
             this.markersArray[index].setMap(null);
          }
        }
        this.markerFn()  
    },
    markerFn(){
       let vm = this;
      if (vm.marker !== []) {
            // let markers = new qq.maps.MVCArray();
            if (vm.marker != undefined && vm.marker.length > 0) {
            // console.log("开始执行重置")
              vm.markers = new qq.maps.MVCArray()
              for (let i = 0; i < vm.marker.length; i++) {
                // 将BD坐标转换为QQ坐标
                // let result = gcoord.transform(
                //   // [
                //   //   vm.marker[i].add[1] - 0 + 0.000674,
                //   //   vm.marker[i].add[0] - 0.000452
                //   // ],
                //   coordinateFn(vm.marker[i].add[1],vm.marker[i].add[0]),
                //   gcoord.BMap,
                //   gcoord.GCJ02
                // );
                let result=[vm.marker[i].add[1],vm.marker[i].add[0]]
                // console.log(vm.marker[i])
                // console.log(vm.license)
                let latLng = new qq.maps.LatLng(result[0], result[1]);
                if (vm.marker[i].color) {
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
                      vm.img.blue,
                      size,
                      origin,
                      anchor
                    ),
                    icon3 = new qq.maps.MarkerImage(
                      vm.img.green,
                      size,
                      origin,
                      anchor
                    );
                  let icon;
                  if (typeof vm.marker[i].color === "number") {
                    icon =
                      vm.marker[i].color === 1
                        ? icon1
                        : vm.marker[i].color === 2
                        ? icon2
                        : icon3;
                  } else if (typeof vm.marker[i].color === "string") {
                    icon =
                      vm.marker[i].color === "orange"
                        ? icon1
                        : vm.marker[i].color === "red"
                        ? icon1
                        : vm.marker[i].color === "yellow"
                        ? icon2
                        : icon3;
                  }
                  // console.log(vm.marker[i].ischange==null)
                  var marker = new qq.maps.Marker({
//                    icon: icon, // vm.marker[i].color === 1?icon1:vm.marker[i].color === 2?icon2:icon3,
                    icon:  vm.marker[i].license === vm.licenseData ? icon3:vm.marker[i].ischange=='1'?icon2:icon1,
                    // icon:  vm.marker[i].license === vm.licenseData ? icon3:icon1,
                    map: vm.map,
                    position: latLng,
                    draggable: vm.marker[i].license === vm.licenseData ? true : false,
                    animation:
                      vm.point !== [] && vm.point === vm.marker[i].add
                        ? qq.maps.MarkerAnimation.BOUNCE
                        : null
                  });
                  // vm.marker = marker
                  marker.code = vm.marker[i].license;
                  marker.color = vm.marker[i].color;
                  marker.name = vm.marker[i].shop_name;
                  marker.add = result;
                  //marker点击事件
                  // if(vm.marker[i].flag == false){
           
                      marker.selected = false;
                      marker.selectedcode = '';
                      marker.selectedcode_old = '';
                      qq.maps.event.addListener(marker, "click", function(evt) {
                        //  alert(i); 
                                                vm.markerFnclear()
                                                
                       vm.markersArray[i].setMap(null); 
                         
                           marker.selected = true
                          // marker.color=3
                          
                          // console.log(vm.marker[i])
                                  
                          marker.selectedcode_old = marker.selectedcode
                          marker.selectedcode = vm.marker[i].license
                          
                          marker.selected =!marker.selected
                          if (marker.selectedcode!==marker.selectedcode_old){
                            var  marker2 ='';
                            
                            marker2 = new qq.maps.Marker({ 
                              icon:icon3,
                              map: vm.map,
                              position: latLng,
                              draggable: vm.marker[i].license === vm.licenseData ? true : false,
                              animation:
                                vm.point !== [] && vm.point === vm.marker[i].add
                                  ? qq.maps.MarkerAnimation.BOUNCE
                                  : null
                            });
                          };
                           // marker.setIcon(marker.selected ? icon2 : icon1)
                          

                        vm.$emit("markerClick", vm.marker[i]);
                           vm.evt = evt;
                             vm.alertFn(evt);
                      });
                  // }
                  // if(vm.marker[i].flag == false){
                       qq.maps.event.addListener(marker,"dragend", function(evt) {
                    //         marker.selected = !marker.selected
                    // marker.setIcon(marker.selected ? icon2 : icon1)
                            vm.$emit("changeMap",evt);
                        });
                  // }
                  // console.log(marker)
                  vm.markersArray.push(marker)
              // console.log(vm.markersArray)
                  // if(vm.marker[i].license === vm.license){
                        
                  // }
                } else {
                    marker = new qq.maps.Marker({ position: latLng, map: vm.map });
                }
                vm.markers.push(marker);
                // console.log(vm.markers)
              }
              //  let markerClusterer = new qq.maps.MarkerCluster({
              //     map: vm.map,
              //     minimumClusterSize: 5, //默认2
              //     markers: vm.markers,
              //     zoomOnClick: true, //默认为true
              //     gridSize: 30, //默认60
              //     averageCenter: true, //默认false
              //     maxZoom: 18 //默认18
              //   });
            }
          }
    },
    zoomFn(){
       //改变地图中心及缩放等级
        let vm = this
          if (vm.point != undefined) {
            if (vm.point.length !== 0) {
              // let result = gcoord.transform(
              //   coordinateFn(vm.point.center[0],vm.point.center[1]),
              //   gcoord.BMap,
              //   gcoord.GCJ02
              // );
                              let result = [vm.point[1],vm.point[0]]
              vm.map.panTo(new qq.maps.LatLng(result[0], result[1]));
              if(vm.point.length > 0 && vm.path.length > 0 && vm.marker.length > 0){
                    vm.map.zoomTo(16);
              }else{
                  vm.map.zoomTo(16);
              }
            } else if (vm.point.length === 0) {
              // vm.map.zoomTo(16);
              vm.map.zoomTo(16);
            }
          }
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
