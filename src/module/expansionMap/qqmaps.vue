<template>
  <div>
    <!-- wwwwwwwwwwwwwwwwwwwww -->
    <div :id="maps" class="maps"></div>
    <div class="mapInform" v-if="mapInform">
      <h2>商户信息<i class="el-icon-close" @click="mapInform = false"></i></h2>
      <div class="clearboth"><span>客户名称：</span><span v-text="shop_name">北京七星相连烟酒商店</span></div>
      <div class="clearboth"><span>许可证号：</span><span v-text="license">110105100015</span></div>
      <div class="clearboth"><span>所属商圈：</span><span v-text="biz_dist">光熙门A</span></div>
      <div class="clearboth"><span>功能区：</span><span v-text="func_area">交通枢纽</span></div>
      <div class="clearboth"><span>地理位置：</span><span v-text="main_poi">地铁</span></div>
      <div class="clearboth"><span>区县公司：</span><span v-text="dist">朝阳区</span></div>
      <div class="clearboth"><span>档位：</span><span v-text="level">123</span></div>
    </div>
    <!--功能区-->
    <div class="mapFunc" v-if="mapFunc">
      <h2>功能区</h2>
      <div class="clearboth" v-for="(item,index) in path" @click="funcShow(item.name, '#'+ color[index], index), funTableData(item.name)">
        <span v-bind:style="{background: '#'+ color[index]}"><img :src="iconChange(item.name)" :alt="item.name"></span>
        <span :class="{'toggle_color': toggle_color === index}">{{item.name}}</span>
        <span>({{item.num}})</span>
      </div>
    </div>
  </div>
</template>

<script>
import bus from 'js/evenBus'
import { TMap,coordinateFn} from "js/qqMap";
import gcoord from 'gcoord'
export default {
  name: 'qqMap',
  data () {
    return {
      toggle_color: '',
      mapFunc: false,
        maps: Math.random()
        .toString(36)
        .substr(2),
      img: {
        markerIcon: require('img/marker-red.png'),
        green12: require('img/green12.png'),
        red12: require('img/red12.png'),
      },
      icon: {
        iconBg: {
          name: '办公场所',
          url: require('img/icon_func_bg.png')
        },
        iconYl: {
          name: '医疗服务',
          url: require('img/icon_func_yl.png')},
        iconJz: {
          name: '居住场所',
          url: require('img/icon_func_jz.png')},
        iconZs: {
          name: '住宿场所',
          url: require('img/icon_func_jz.png')},
        iconLy: {
          name: '旅游景区',
          url: require('img/icon_func_ly.png')},
        iconJy: {
          name: '教育文化',
          url: require('img/icon_func_jy.png')},
        iconGw: {
          name: '购物场所',
          url: require('img/icon_func_gw.png')},
        iconCy: {
          name: '餐饮场所',
          url: require('img/icon_func_cy.png')},
        iconXx: {
          name: '休闲娱乐',
          url: require('img/icon_func_xx.png')},
        iconJt: {
          name: '交通枢纽',
          url: require('img/icon_func_jt.png')},
        iconJm: {
          name: '办公场所',
          url: require('img/icon_func_jm.png')}
      },
      color: [ // 功能区的颜色
        'FFDD00',
        '0dccbb',
        'a532cc',
        'FF628C',
        '018fcc',
        '26cc3e',
        '00cbe6',
        'FF9D00',
        '86C166'
      ],
      path: [], // 点击筛选传过来的所有数据
      pathAll: {},
      clickTabelData: '',
      map: '',
      mapInform: false,
      shop_name: '',
      license: '',
      biz_dist: '',
      func_area: '',
      main_poi: '',
      dist: '',
      adva_indu: '',
      level: '',
      adva_pricecat: '',
      activ_degree: '',
      envi_value: ''
    }
  },
  props: [
    'mapAll',
    'mapStartPath'
  ],
  watch: {
    // 传过来的地图数据
    mapAll: function () {
      var vm = this
      vm.mapFunc = true
      // console.log(vm.mapAll)
      vm.path = []
      for (var key in vm.mapAll.func_count[0]) {
        vm.path.push({
          name: key,
          num: vm.mapAll.func_count[0][key],
          path: [],
          LatLng: []
        })
      }
      // 传一份数据给table做数据筛选
      bus.$emit('dataPath', vm.path)
      // path中添加数据
      for (var i = 0; i < vm.path.length; i++) {
        // 商圈按功能区分开
        for (var j = 0; j < vm.mapAll.path.length; j++) {
         
          if (vm.path[i].name === vm.mapAll.path[j].func_area) {
            vm.path[i].path.push(vm.mapAll.path[j].path)
            //  console.log(vm.mapAll.path[j].path)
          }
        }
        // 商户标注按功能区分开
        for (var f = 0; f < vm.mapAll.result.length; f++) {
          if (vm.mapAll.result[f].func_area === vm.path[i].name) {
            vm.path[i].LatLng.push({
              lat: vm.mapAll.result[f].add_lat,
              lng: vm.mapAll.result[f].add_lng,
              shop_name: vm.mapAll.result[f].shop_name,
              license: vm.mapAll.result[f].license,
              biz_dist: vm.mapAll.result[f].biz_dist,
              func_area: vm.mapAll.result[f].func_area,
              main_poi: vm.mapAll.result[f].main_poi,
              dist: vm.mapAll.result[f].dist,
              adva_indu: vm.mapAll.result[f].adva_indu,
              level: vm.mapAll.result[f].level,
              adva_pricecat: vm.mapAll.result[f].adva_pricecat,
              activ_degree: vm.mapAll.result[f].activ_degree,
              envi_value: vm.mapAll.result[f].envi_value
            })
          }
        }
      }
     
      // console.log(vm.path)
      // 地图绘制
      TMap('4FOBZ-P3K3U-ACPVN-2WJGK-LNZLS-YOFZT').then(qq => {
        vm.map = new qq.maps.Map(document.getElementById(this.maps), {
          // 地图的中心地理坐标。
          // center: new qq.maps.LatLng(39.908419, 116.397400),
          // center: new qq.maps.LatLng(39.916527, 116.397128),
               center: new qq.maps.LatLng(39.13, 117.2),
          zoom: 12
        })
        // 地图商圈，商户绘制
        for (var i = 0; i < vm.path.length; i++) {
          // 商圈绘制 vm.path[i].path.length
          for (var j = 0; j < vm.path[i].path.length; j++) {
            var maplist = []
            // console.log(vm.path[i].path)
            for (var t = 0; t < vm.path[i].path[j].length; t++) {
              //  console.log(vm.path[i].path[j].length)
              var point = gcoord.transform(
             coordinateFn(vm.path[i].path[j][t][1], vm.path[i].path[j][t][0]),
                gcoord.BMap, gcoord.GCJ02
              )
              maplist.push(new qq.maps.LatLng(point[0], point[1]))
            }
            var polygon = new qq.maps.Polygon({
              path: maplist,
            //  strokeColor: "#ccc",
             strokeColor: '#' + vm.color[i],
              strokeWeight: 2,
              fillColor: new qq.maps.Color.fromHex('#' + vm.color[i], 0.5),
              map: vm.map
            })
          }
        }
      })
    }
  },
  methods: {
    // 点击功能区
    funcShow (name, color, index) {
      this.toggle_color = index
      // 地图重绘
      var vm = this
      TMap('4FOBZ-P3K3U-ACPVN-2WJGK-LNZLS-YOFZT').then(qq => {
        // msg.shop_name === vm.path[i].LatLng[f].shop_name
        vm.map = new qq.maps.Map(document.getElementById(this.maps), {
          // 地图的中心地理坐标。
          // center: new qq.maps.LatLng(39.916527, 116.397128),
             center: new qq.maps.LatLng(39.13, 117.2),
          // center: new qq.maps.LatLng(39.916527, 116.397128),
          zoom: 12
        })
        for (var i = 0; i < vm.path.length; i++) {
          if (vm.path[i].name === name) {
            // 标注绘制
            for (var f = 0; f < vm.path[i].LatLng.length; f++) {
              var maplist = ''
              // console.log(point[0], point[1])
              var point = gcoord.transform(
               coordinateFn(vm.path[i].LatLng[f].lat, vm.path[i].LatLng[f].lng),
                gcoord.BMap, gcoord.GCJ02
              )
              maplist = new qq.maps.LatLng(point[0], point[1])
              var marker = new qq.maps.Marker({
                icon: vm.img.green12,
                map: vm.map,
                position: maplist
              })
              marker.shop_name = vm.path[i].LatLng[f].shop_name
              marker.license = vm.path[i].LatLng[f].license
              marker.biz_dist = vm.path[i].LatLng[f].biz_dist
              marker.func_area = vm.path[i].LatLng[f].func_area
              marker.main_poi = vm.path[i].LatLng[f].main_poi
              marker.dist = vm.path[i].LatLng[f].dist
              marker.adva_indu = vm.path[i].LatLng[f].adva_indu
              marker.level = vm.path[i].LatLng[f].level
              marker.adva_pricecat = vm.path[i].LatLng[f].adva_pricecat
              marker.activ_degree = vm.path[i].LatLng[f].activ_degree
              marker.envi_value = vm.path[i].LatLng[f].envi_value
              qq.maps.event.addListener(marker, 'click', function () {
                vm.mapInform = true
                vm.shop_name = this.shop_name
                vm.license = this.license
                vm.biz_dist = this.biz_dist
                vm.func_area = this.func_area
                vm.main_poi = this.main_poi
                vm.dist = this.dist
                vm.level = this.level
              })
            }
            // 商圈绘制
            for (var j = 0; j < vm.path[i].path.length; j++) {
              var maplist = []
              for (var t = 0; t < vm.path[i].path[j].length; t++) {
                var point = gcoord.transform(
                  coordinateFn(vm.path[i].path[j][t][1], vm.path[i].path[j][t][0]),
                  gcoord.BMap, gcoord.GCJ02
                )
                maplist.push(new qq.maps.LatLng(point[0], point[1]))
              }
              var polygon = new qq.maps.Polygon({
                path: maplist,
                strokeColor: color,
                strokeWeight: 2,
                fillColor: new qq.maps.Color.fromHex(color, 0.5),
                map: vm.map
              })
            }
            return false
          }
        }
      })
    },
    funTableData (funName) {
      bus.$emit('funNameTable', funName)
      this.$emit('funName', funName)
    },
    // 判断icon
    iconChange (name) {
      // console.log(name)
      var vm = this
      for (var item in vm.icon) {
        if (vm.icon[item].name === name) {
          return vm.icon[item].url
        }
      }
    }
  },
  mounted () {
    var vm = this
    // 表格的点击事件
    bus.$on('row', function (msg) {
      // console.log(msg)
      // 地图重绘
      TMap('4FOBZ-P3K3U-ACPVN-2WJGK-LNZLS-YOFZT').then(qq => {
        var point = gcoord.transform(
          coordinateFn(msg.add_lat, msg.add_lng),
          gcoord.BMap, gcoord.GCJ02
        )
        vm.map = new qq.maps.Map(document.getElementById(this.maps), {
          // 地图的中心地理坐标。
          center: new qq.maps.LatLng(point[0], point[1]),
          zoom: 14
        })
        for (var i = 0; i < vm.path.length; i++) {
          // 标注绘制
          for (var f = 0; f < vm.path[i].LatLng.length; f++) {
            var maplist = ''
            // console.log(point[0], point[1])
            var point = gcoord.transform(
               coordinateFn(vm.path[i].LatLng[f].lat, vm.path[i].LatLng[f].lng),
              gcoord.BMap, gcoord.GCJ02
            )
            maplist = new qq.maps.LatLng(point[0], point[1])
            if (msg.shop_name === vm.path[i].LatLng[f].shop_name) {
              var marker = new qq.maps.Marker({
                map: vm.map,
                position: maplist,
                icon: vm.img.red12,
                animation: qq.maps.MarkerAnimation.BOUNCE
              })
            } else {
              var marker = new qq.maps.Marker({
                icon: vm.img.green12,
                map: vm.map,
                position: maplist
              })
            }
            marker.shop_name = vm.path[i].LatLng[f].shop_name
            marker.license = vm.path[i].LatLng[f].license
            marker.biz_dist = vm.path[i].LatLng[f].biz_dist
            marker.func_area = vm.path[i].LatLng[f].func_area
            marker.main_poi = vm.path[i].LatLng[f].main_poi
            marker.dist = vm.path[i].LatLng[f].dist
            marker.adva_indu = vm.path[i].LatLng[f].adva_indu
            marker.level = vm.path[i].LatLng[f].level
            marker.adva_pricecat = vm.path[i].LatLng[f].adva_pricecat
            marker.activ_degree = vm.path[i].LatLng[f].activ_degree
            marker.envi_value = vm.path[i].LatLng[f].envi_value
            qq.maps.event.addListener(marker, 'click', function () {
              vm.mapInform = true
              vm.shop_name = this.shop_name
              vm.license = this.license
              vm.biz_dist = this.biz_dist
              vm.func_area = this.func_area
              vm.main_poi = this.main_poi
              vm.dist = this.dist
              vm.level = this.level
            })
          }
          // 商圈绘制
          for (var j = 0; j < vm.path[i].path.length; j++) {
            var maplistPath = []
            for (var t = 0; t < vm.path[i].path[j].length; t++) {
              var pointPath = gcoord.transform(
                coordinateFn(vm.path[i].path[j][t][1], vm.path[i].path[j][t][0]),
                gcoord.BMap, gcoord.GCJ02
              )
              maplistPath.push(new qq.maps.LatLng(pointPath[0], pointPath[1]))
            }
            var polygon = new qq.maps.Polygon({
              path: maplistPath,
              strokeColor: '#' + vm.color[i],
              strokeWeight: 2,
              fillColor: new qq.maps.Color.fromHex('#' + vm.color[i], 0.5),
              map: vm.map
            })
          }
          // 商圈绘制，旧的
          // if (msg.shop_name === vm.mapAll.result[i].shop_name) {
          //   var marker = new qq.maps.Marker({
          //     map: vm.map,
          //     position: maplist[i],
          //     icon: vm.img.markerIcon,
          //     animation: qq.maps.MarkerAnimation.BOUNCE
          //   })
          // } else {
          //   var marker = new qq.maps.Marker({
          //     map: vm.map,
          //     position: maplist[i]
          //   })
          // }
          // console.log(vm.mapAll)
        }
      })
    })
    // 初始化地图
    TMap('4FOBZ-P3K3U-ACPVN-2WJGK-LNZLS-YOFZT').then(qq => {
      vm.map = new qq.maps.Map(document.getElementById(this.maps), {
        // 地图的中心地理坐标。
        // center: new qq.maps.LatLng(39.908419, 116.397400),
               center: new qq.maps.LatLng(39.13, 117.2),
        zoom: !vm.mapStartPath ? 12 : 11
      })
      if (vm.mapStartPath) {
        if (vm.mapStartPath) {
          var path1 = [],
            path2 = [],
            path3 = [],
            pathCY = [
              [116.500000, 39.816080], [116.490050, 39.818910], [116.489830, 39.818950], [116.485500, 39.813520], [116.485500, 39.812880], [116.474920, 39.809730], [116.474330, 39.809560], [116.453830, 39.822770], [116.453760, 39.822820], [116.445590, 39.820710], [116.444110, 39.820370], [116.443390, 39.827700], [116.441580, 39.828990], [116.439150, 39.827380], [116.437480, 39.827380], [116.437480, 39.829890], [116.437420, 39.829970], [116.425580, 39.831950], [116.425160, 39.831940], [116.431320, 39.832550], [116.431400, 39.832550], [116.435300, 39.839320], [116.436440, 39.841140], [116.446920, 39.841350], [116.447090, 39.841320], [116.446590, 39.848270], [116.446880, 39.848430], [116.454090, 39.850490], [116.454120, 39.850760], [116.460070, 39.848460], [116.460490, 39.848510], [116.466210, 39.854370], [116.466230, 39.854420], [116.457420, 39.860580], [116.457340, 39.860640], [116.445530, 39.862630], [116.445260, 39.862640], [116.443990, 39.865910], [116.443110, 39.865920], [116.444570, 39.886390], [116.444210, 39.888920], [116.450880, 39.890470], [116.450880, 39.890610], [116.447550, 39.893790], [116.447260, 39.894130], [116.448350, 39.902320], [116.448540, 39.902930], [116.436240, 39.903170], [116.436140, 39.903340], [116.434040, 39.928080], [116.434030, 39.928310], [116.441730, 39.928690], [116.443680, 39.928700], [116.447580, 39.944830], [116.447580, 39.944890], [116.438490, 39.946330], [116.438370, 39.946410], [116.440210, 39.950870], [116.440020, 39.952250], [116.432400, 39.950100], [116.430140, 39.950130], [116.430550, 39.957170], [116.430510, 39.959460], [116.425270, 39.959340], [116.425190, 39.959340], [116.425220, 39.961720], [116.425200, 39.962180], [116.414740, 39.962010], [116.414080, 39.961990], [116.409390, 39.973340], [116.409350, 39.974090], [116.408050, 39.963370], [116.408090, 39.962030], [116.390510, 39.963060], [116.389970, 39.963050], [116.389610, 39.961020], [116.387500, 39.960930], [116.394190, 39.972810], [116.394180, 39.973030], [116.381520, 39.972600], [116.381340, 39.972610], [116.380830, 39.987580], [116.380830, 39.987760], [116.356520, 40.023730], [116.356490, 40.023770], [116.351790, 40.025980], [116.351120, 40.026820], [116.394060, 40.032580], [116.395090, 40.032860], [116.390950, 40.039990], [116.390950, 40.041220], [116.395310, 40.036540], [116.395350, 40.036520], [116.403350, 40.038260], [116.404170, 40.038440], [116.408580, 40.042760], [116.408630, 40.042830], [116.406250, 40.047590], [116.406260, 40.049420], [116.409580, 40.054920], [116.409490, 40.055530], [116.425060, 40.060320], [116.425250, 40.060430], [116.424900, 40.064480], [116.424900, 40.064740], [116.447410, 40.059590], [116.448720, 40.058830], [116.459000, 40.060890], [116.460290, 40.061370], [116.459890, 40.067830], [116.459800, 40.074360], [116.462330, 40.080160], [116.461730, 40.080640], [116.466120, 40.081860], [116.466240, 40.081910], [116.466900, 40.089610], [116.466740, 40.090170], [116.483650, 40.081600], [116.483900, 40.081410], [116.495960, 40.080350], [116.499700, 40.080080], [116.508460, 40.073250], [116.512050, 40.070940], [116.529780, 40.070190], [116.530420, 40.069980], [116.541570, 40.060850], [116.543660, 40.059310], [116.547930, 40.062630], [116.548200, 40.062580], [116.550410, 40.056530], [116.552040, 40.053910], [116.551260, 40.051610], [116.545890, 40.050180], [116.548370, 40.047460], [116.551040, 40.045360], [116.561740, 40.041110], [116.565930, 40.038770], [116.575610, 40.030480], [116.577200, 40.029550], [116.574280, 40.033180], [116.578660, 40.033300], [116.577850, 40.029170], [116.576810, 40.028190], [116.597630, 40.016040], [116.599000, 40.015080], [116.616700, 40.012240], [116.619450, 40.011930], [116.626720, 40.006190], [116.625370, 40.004430], [116.633430, 40.002950], [116.635500, 40.004110], [116.642610, 39.997070], [116.643780, 39.993820], [116.643970, 39.989920], [116.641930, 39.990240], [116.639990, 39.990530], [116.639350, 39.987550], [116.639050, 39.986560], [116.637160, 39.986740], [116.633050, 39.986060], [116.633630, 39.984070], [116.632450, 39.983980], [116.639660, 39.982830], [116.639900, 39.982870], [116.639370, 39.981010], [116.640810, 39.980860], [116.643570, 39.951200], [116.645270, 39.945950], [116.635150, 39.949840], [116.632840, 39.950340], [116.631200, 39.947230], [116.630350, 39.947130], [116.633560, 39.940150], [116.633500, 39.939820], [116.625640, 39.930430], [116.625480, 39.929170], [116.630960, 39.923210], [116.630740, 39.921800], [116.621780, 39.919540], [116.619840, 39.919280], [116.623150, 39.916670], [116.623690, 39.913940], [116.621010, 39.913780], [116.620410, 39.913730], [116.621970, 39.902040], [116.622020, 39.901930], [116.618260, 39.899770], [116.617870, 39.899270], [116.619750, 39.897860], [116.619660, 39.897760], [116.614460, 39.896560], [116.614430, 39.896350],
              [116.616000, 39.891940], [116.616080, 39.889620], [116.625000, 39.890240], [116.627840, 39.890370], [116.629890, 39.885060], [116.629940, 39.884960], [116.620310, 39.868670],
              [116.620270, 39.868510], [116.626480, 39.860980], [116.626770, 39.860590], [116.612740, 39.850060], [116.604500, 39.850060], [116.605210, 39.846030], [116.606880, 39.845390], [116.601710, 39.841120], [116.601520, 39.840970], [116.602580, 39.832330], [116.602730, 39.831720], [116.599740, 39.829340], [116.600100, 39.825270], [116.583210, 39.823610], [116.583010, 39.823620], [116.577760, 39.827850], [116.577700, 39.830680], [116.547320, 39.834930], [116.546600, 39.835290], [116.543300, 39.830230], [116.542580, 39.829630], [116.533760, 39.832410], [116.533670, 39.832440], [116.537730, 39.828590], [116.538420, 39.828330], [116.534900, 39.825130], [116.534850, 39.824690], [116.526500, 39.826920], [116.526210, 39.829420], [116.514350, 39.828820], [116.514320, 39.828810], [116.510090, 39.823350], [116.509600, 39.823250], [116.510170, 39.816600], [116.510230, 39.816510], [116.500210, 39.816110]],
            pathCY2 = [[116.590110,  40.053960],  [116.587530,  40.068650],  [116.587400,  40.069450],  [116.582690,  40.069740],  [116.583070,  40.064920],  [116.581780,  40.064710],  [116.574780,  40.104320],  [116.574160,  40.108730],  [116.579310,  40.102830],  [116.581260,  40.091380],  [116.596010,  40.092260],  [116.596440,  40.092260],  [116.599540,  40.099160],  [116.598980,  40.103350],  [116.602320,  40.093920],  [116.604260,  40.093990],  [116.607160,  40.069830],  [116.608620,  40.060920],  [116.606110,  40.051980],  [116.606670,  40.046800],  [116.603600,  40.052140],  [116.603230,  40.052410],  [116.600200,  40.051050],  [116.600140,  40.051030],  [116.604850,  40.046740],  [116.605010,  40.046680],  [116.602380,  40.043570],  [116.601530,  40.042090],  [116.592690,  40.043460],  [116.592630,  40.043460],  [116.590130,  40.053910]]
            // pathDC = [
            // [116.434580,  39.916670],  [116.436240,  39.903170],  [116.436350,  39.903000],  [116.448090,  39.902920],  [116.448540,  39.902930], [116.447130, 39.895650], [116.447260, 39.894130], [116.450880,39.890300],[116.450870,39.890210],[116.444490,39.889020],[116.444210,39.888920],[116.444020,39.874640],[116.443490,39.872230],[116.413750,39.871910],[116.413440,39.871890],[116.415970,39.867000],[116.416710,39.867020],[116.414070,39.859230],[116.414080,39.859110],[116.395870,39.858830],[116.395510,39.858840],[116.391250,39.864740],[116.391250,39.865260],[116.381240,39.868190],[116.381210,39.868390],[116.381260,39.871010],[116.381250,39.871140],[116.396460,39.871900],[116.398470,39.872110],[116.397980,39.898730],[116.397980,39.898770],[116.395710,39.907590],[116.395710,39.907680],[116.391970,39.907570],[116.391880,39.907570],[116.390900,39.922290],[116.390900,39.922330],[116.399320,39.923400],[116.399660,39.923410],[116.399470,39.927590],[116.399450,39.927890],[116.397240,39.928410],[116.396530,39.928400],[116.393500,39.956560],[116.393500,39.957090],[116.387360,39.956740],[116.387210,39.959790],[116.389610,39.961020],[116.389970,39.963050],[116.407960,39.962030],[116.408090,39.962030],[116.407740,39.973330],[116.407710,39.974100],[116.414080,39.962080],[116.414080,39.961990],[116.425120,39.962190],[116.425200,39.962180],[116.425190,39.959440],[116.425190,39.959340],[116.430270,39.959360],[116.430510,39.959460],[116.430150,39.950350],[116.430140,39.950130],[116.438080,39.952210],[116.440020,39.952250],[116.438720,39.946770],[116.438370,39.946410],[116.447540,39.944920],[116.447580,39.944890],[116.443680,39.928980],[116.443680,39.928700],[116.434180,39.928320],[116.434030,39.928310], [116.434600,39.917110]]
          for (var i = 0; i < pathCY.length; i++) {
            path1.push(new qq.maps.LatLng(pathCY[i][1],pathCY[i][0]))
          }
          for (var i = 0; i < pathCY2.length; i++) {
            path2.push(new qq.maps.LatLng(pathCY2[i][1],pathCY2[i][0]))
          }
          // for (var i = 0; i < pathDC.length; i++) {
          //   path3.push(new qq.maps.LatLng(pathDC[i][1],pathDC[i][0]))
          // }
          var polygon = new qq.maps.Polygon({
            path: path1,
            strokeColor: '#446acc',
            strokeWeight: 2,
            fillColor: new qq.maps.Color.fromHex('#446acc', 0.5),
            map: vm.map
          })
          var polygon2 = new qq.maps.Polygon({
            path: path2,
            strokeColor: '#446acc',
            strokeWeight: 2,
            fillColor: new qq.maps.Color.fromHex('#446acc', 0.5),
            map: vm.map
          })
        }
      }
    })
  }
}
</script>

<style>
.maps {
  position: absolute;
  top: 0;
  width: 98%;
  height: 100%;
}
  .mapInform{
    width: 300px;
    /*padding: 0 10px 20px 10px;*/
    position: absolute;
    top: 120px;
    right: 60px;
    z-index: 10;
    background: #FFFFFF;
    border: 1px #464c5b solid;
    border-radius: 3px;
    padding-bottom: 6px;
  }
  .mapInform h2{
    padding: 0 8px;
    line-height: 30px;
    color: #FFFFFF;
    background: #464c5b;
  }
  .mapInform h2 i{
    float: right;
    line-height: 30px;
    cursor: pointer;
  }
  .mapInform div{
    margin-top: 6px;
  }
  .mapInform div span{
    line-height: 30px;
    display: block;
    float: left;
    font-size: 14px;
    color: #8e8e8e;
  }
  .mapInform div span:nth-child(1){
    width: 90px;
    text-align: right;
  }
  .mapInform div span:nth-child(2){
    width: 200px;
    overflow: hidden;
    background: #e6edf9;
    border-radius: 3px;
  }

.mapFunc{
  width: 255px;
  /*padding: 0 10px 20px 10px;*/
  position: absolute;
  top: 120px;
  right: 60px;
  background: rgba(126,126,126,0.4);
  border-radius: 3px;
  padding-bottom: 6px;
}
.mapFunc h2{
  line-height: 40px;
  text-align: center;
  color: #FFFFFF;
  font-size: 20px;
}
.mapFunc div{
  margin: 8px 4px;
  background: #FFFFFF;
  border-radius: 4px;
  cursor: pointer;
}
.mapFunc div:hover span{
  color: red;
}
.mapFunc div span{
  line-height: 26px;
  display: inline-block;
  float: left;
}
.mapFunc div span:nth-child(1){
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 20px;
  margin: 3px 6px 0 18px;
  text-align: center;
  line-height: 20px;
}
.mapFunc div span:nth-child(2){
  margin-left: 20px;
}
.toggle_color{
    color: red;
  }
</style>
