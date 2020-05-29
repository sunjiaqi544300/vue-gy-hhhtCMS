<template>
  <div>
    <div class="qqMap" id="qqMap" ref="qqMap"></div>
  </div>
</template>

<script type="text/ecmascript-6">
import gcoord from "gcoord";
import { TMap,coordinateFn} from "js/qqMap";
export default {
  name: "qqMap",
  props: ["path", "marker", "point", "alertObj"],
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
        上升:'#33a853',
        未上柜:'#acacac',
        下降:'#eb4436',
        均衡:'#fabc05',
        1:'#eb4436',
        2:'#fabc05'
      },
      img: {
        red: require("@/module/marketAnalysis/images/1.png"),
        yellow: require("@/module/marketAnalysis/images/2.png"),
        green: require("@/module/marketAnalysis/images/3.png"),
        gray: require("@/module/marketAnalysis/images/4.png")
      },
      map: null,
      evt: null,
      info: null,
      qqMap: Math.random()
        .toString(36)
        .substr(2),
      timerclick: null,
    };
  },
  components: {
        
  },
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
      alertObj: {
      deep: true,
      handler: function(newVal, oldVal) {
          // this.info.close()
          this.alertFn(this.evt)
      }
    }
  },
  created() {

  },
  mounted: function() {
    // console.log(document.getElementById('hhhh333'))
    var windowH = document.documentElement.clientHeight - 230;
    document.getElementById("qqMap").style.height = windowH + "px";
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
      let vm = this;
      //添加到提示窗
      // this.info = info;
      this.info.open();
      // info.open();
        this.info.setContent(
        `<div style="width:200px;">
                          <h3 style="font-size:16px;">${vm.alertObj.shop_name!= undefined ? vm.alertObj.shop_name : "暂时无法获取当前位置"}</h3>
                          <ul class="alertCont">
                              <li style="display: flex;justify-content: space-between;background:#f5f6fa;padding:3px">
                                  <span style="font-size:13px;"> 主导环境因子</span>
                                  <span style="font-size:13px;">${
                                    vm.alertObj.main_poi != ""
                                      ? vm.alertObj.main_poi
                                      : "暂无"
                                  } </span>
                              </li>
                              <li style="display: flex;justify-content: space-between;padding:3px">
                                  <span style="font-size:13px;">功能区</span>
                                  <span style="font-size:13px;">${
                                    vm.alertObj.func_area != ""
                                      ? vm.alertObj.func_area
                                      : "暂无"
                                  }</span>
                              </li>
                              <li style="display: flex;justify-content: space-between;background:#f5f6fa;padding:3px">
                                  <span style="font-size:13px;">所属商圈</span>
                                  <span style="font-size:13px;">${
                                    vm.alertObj.biz_dist != ""
                                      ? vm.alertObj.biz_dist
                                      : "暂无"
                                  }</span>
                              </li>
                              <li style="display: flex;justify-content: space-between;padding:3px" >
                                  <span style="font-size:13px;">档位</span>
                                  <span style="font-size:13px;">${
                                    vm.alertObj.level != ""
                                      ? vm.alertObj.level
                                      : "暂无"
                                  }</span>
                              </li>
                              <li style="display: flex;justify-content: space-between;background:#f5f6fa;padding:3px" >
                                  <span style="font-size:13px;">单箱结构</span>
                                  <span style="font-size:13px;">${
                                    vm.alertObj.strip != ""
                                      ? vm.alertObj.strip
                                      : "暂无"
                                  }万元/箱</span>
                              </li>
                          </ul>
                    </div>`
      );
       this.info.setPosition(evt.latLng);

    },
    drawMap() {
      let vm = this;
      TMap("H7KBZ-XMI66-4CXSJ-ERMEQ-UPCYZ-PABYG&libraries=convertor").then(
        qq => {
          vm.map = new qq.maps.Map(document.getElementById("qqMap"), {
            // 地图的中心地理坐标。
            center: new qq.maps.LatLng(39.11221,117.23429),
            zoom: 11,
            disableDefaultUI: true,
            minimumClusterSize:5,
              zoomControlOptions: {
              style: qq.maps.ZoomControlStyle.SMALL
            },
          });
           this.info = new qq.maps.InfoWindow({
                map: vm.map
            });
          if (vm.path !== []) {
            if (vm.path != undefined) {
              for (let i = 0; i < vm.path.length; i++) {
                let innerPath = [];
                innerPath.color = vm.path[i].statedesc || "";
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
                qq.maps.event.addListener(polygon, "click", function() {
                  vm.$emit("pathClick", this.name, this.center);
                  vm.alertFn(evt);
                  vm.evt = evt;
                });
                  qq.maps.event.addListener(polygon, "dblclick", function(evt) {
                  vm.$emit("pathClick2", this.name, this.center);
                });
              }
            }
          }
          if (vm.marker !== []) {
            let markers = new qq.maps.MVCArray();
            if (vm.marker != undefined) {
              for (let i = 0; i < vm.marker.length; i++) {
                // 将BD坐标转换为QQ坐标
                let result = gcoord.transform(
                        // [
                        //   vm.marker[i].add[1] - 0 + 0.000674,
                        //   vm.marker[i].add[0] - 0.000452
                        // ],
                        coordinateFn(vm.marker[i].add[1],vm.marker[i].add[0]),
                        gcoord.BMap,
                        gcoord.GCJ02
                    );
                let latLng = new qq.maps.LatLng(result[0], result[1]);
                if (vm.marker[i].statedesc) {
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
                    );
                  let icon;
                  //  icon = vm.marker[i].statedesc === "未上柜" ? icon4 : vm.marker[i].statedesc === '上升' ?
                  //       icon1 : vm.marker[i].statedesc === '下降' ? icon3 : icon2
                   
                  if (typeof vm.marker[i].color === "number") {
                    icon =
                      vm.marker[i].color === 1
                        ? icon1
                        : vm.marker[i].color === 2
                        ? icon2
                        : icon3;
                  } else if (typeof vm.marker[i].statedesc === "string") {
                    icon =
                      vm.marker[i].statedesc === "未上柜"
                        ? icon4
                        : vm.marker[i].statedesc === "上升"
                        ? icon3
                        : vm.marker[i].statedesc === "下降"
                        ? icon1
                        : icon2;
                  }
                  var marker = new qq.maps.Marker({
                    icon: icon,
                    // vm.marker[i].color === 1?icon1:vm.marker[i].color === 2?icon2:icon3,
                    map: vm.map,
                    position: latLng,
                    animation:
                      vm.point !== [] && vm.point === vm.marker[i].add
                        ? qq.maps.MarkerAnimation.BOUNCE
                        : null
                  });
                  marker.code = vm.marker[i].license;
                  marker.color = vm.marker[i].statedesc;
                  marker.name = vm.marker[i].shop_name;
                  marker.add = result;
                    

               qq.maps.event.addListener(marker, "click", function(evt) {
                    
                    vm.$emit("markerClick", this.code, this.name, this.add);
                      vm.evt = evt;
                      vm.alertFn(evt);
                  });

                } else {
                  marker = new qq.maps.Marker({
                    position: latLng,
                    map: vm.map
                  });
                  //marker点击事件
                 
                }
                markers.push(marker);
              }
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
                coordinateFn(vm.point[1], vm.point[0]),
                gcoord.BMap,
                gcoord.GCJ02
              );
              vm.map.panTo(new qq.maps.LatLng(result[0], result[1]));
              vm.map.zoomTo(16);
            } else if (vm.point.length === 0) {
              vm.map.zoomTo(11);
            }
          }
        }
      );
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
