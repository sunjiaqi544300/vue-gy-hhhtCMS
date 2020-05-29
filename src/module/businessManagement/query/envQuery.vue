<template>
  <div class="page" id="box">
    <!-- 选户对比 -->
    <div class="businessCircleAnalysis" id="businessCircleAnalysis">
      <div class="filterBox">
        <div class="selectBox">
          <span class="tit">县区：</span>
          <el-select v-model="dist" clearable filterable size="mini" placeholder="请选择">
            <el-option v-for="(item, index) in distlist" :key="index" :label="item.dist" :value="item.dist">
            </el-option>
          </el-select>
        </div>
        <div class="selectBox">
          <span class="tit">档位：</span>
          <el-select v-model="groups" clearable filterable size="mini" placeholder="请选择">
            <el-option v-for="(item, index) in groupslist" :key="index" :label="item.groups+15" :value="item.groups">
            </el-option>
          </el-select>
        </div>
          <div class="selectBox">
          <span class="tit"> 市场类型：</span>
          <el-select v-model="loc_type" clearable filterable size="mini" placeholder="请选择">
            <el-option v-for="(item, index) in loc_typelist" :key="index" :label="item.loc_type" :value="item.loc_type">
            </el-option>
          </el-select>
        </div>
        <div class="selectBox">
          <span class="tit">经营业态：</span>
          <el-select v-model="shop_type" clearable filterable size="mini" placeholder="请选择">
            <el-option v-for="(item, index) in shop_typelist" :key="index" :label="item.shop_type"
              :value="item.shop_type"></el-option>
          </el-select>
        </div>
        <el-button size="mini" type="primary" style="margin-left:2%" @click="filter">筛选</el-button>
      </div>
      <div class="map">
        <qqmap :marker='marker' :point='point' @markerClick='markerClick'></qqmap>
        <!-- <div class="message4" >
          <p style="margin:15px;display:flex"><img style="width:15px;height:15px;margin-top:1px;" :src="img.green"
              alt="商圈选户"> &nbsp;&nbsp;&nbsp;<span>商圈选户</span></p>
          <p style="margin:15px;display:flex"><img style="width:15px;height:15px;margin-top:1px;" :src="img.yellow"
              alt="重合户">&nbsp;&nbsp;&nbsp; <span>重合户</span></p>
          <p style="margin:15px;display:flex"><img style="width:15px;height:15px;margin-top:1px;" :src="img.red"
              alt="档位选户">&nbsp;&nbsp;&nbsp;<span>档位选户</span></p>
        </div> -->
         <div class="right-message-div" v-show="messageshow">
          <div class="right-message-1" v-loading="loading">
            <p class="titles2">
              <span class="span1"></span>  
            </p>
            <ul>
              <li v-for="(item,index) in rightmessage1data" :key="index">
                <label>{{item.label}}</label>
                <span>{{item.value}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import "@/module/businessManager/css/public.css";
  import "@/assets/css/creat-assembly-w.css";
  import qqmap from "@/components/qqMap/householdsmap.vue";
  import {
    hostType
  } from '@/api/env.js'
  export default {
    name: "page",
    data() {
      return {
        pro_list: [],
        mon_list: [],
        point: [],
        distlist: [],
        groupslist: [],
        dist: '',
        groups: '',
        time: '',
        rightmessage1data:[],
        messageshow: true,
        loading: false,
        prolist: '',
        marker: [],
        shop_typelist: [],
        loc_type:'',
        loc_typelist: [],
        shop_type:'',
        showmarker: false,
        img: {
          red: require("@/module/marketAnalysis/images/1.png"),
          yellow: require("@/module/marketAnalysis/images/3.png"),
          green: require("@/module/marketAnalysis/images/2.png")
        },
      }
    },
    components: {
      qqmap
    },
    mounted() {
      let vm = this;
      let domain = hostType(2)
      vm.$axios
        .get(`${domain}` + "/ops_map/api/cluster_shop/")
        .then(function (response) {
          console.log(response.data.data);
          vm.distlist = response.data.data.dist;
          vm.groupslist = response.data.data.groups;
          vm.loc_typelist = response.data.data.loc_type;
          vm.shop_typelist = response.data.data.shop_type;
          // vm.pro_list = response.data.data.products;
        });
    },
    methods: {
      filterParams(obj) {
        var _newPar = {};
        for (let key in obj) {
          //如果对象属性的值不为空，就保存该属性（这里我做了限制，如果属性的值为0，保存该属性。如果属性的值全部是空格，属于为空。）
          if (
            (obj[key] === 0 || obj[key]) &&
            obj[key].toString().replace(/(^\s*)|(\s*$)/g, "") !== ""
          ) {
            //记录属性
            _newPar[key] = obj[key];
          }
        }
        //返回对象
        return _newPar;
      },
      // 零售户点击事件
      markerClick(item){
        console.log(item)
        let vm = this
         let data = item
            vm.rightmessage1data = []
            vm.rightmessage1data.push({
              label: "烟草证号：",
              value: data.license || "暂无",
            }, {
              label: "店名：",
              value: data.shop_name || "暂无",
            }, {
              label: " 地址：",
              value: data.shop_address || "暂无",
            }, {
              label: "区县：",
              value: data.dist || "暂无",
            }, {
              label: "客户经理：",
              value: data.contact_win || "暂无",
            }
            ,{
              label: "市场类型：",
              value: data.loc_type || "暂无",
            } ,{
              label: "经营业态：",
              value: data.shop_type || "暂无",
            },
            {
              label: "新档位：",
              value: data.groups || "暂无",
            },{
              label: "原档位：",
              value: data.level || "暂无",
            })
            // loc_type
      },
      filter() {
        let vm = this
        if (vm.dist == '' || vm.groups == '') {
          vm.$message.error('区县和档位必选');
        } else {
          console.log('000')
          vm.showmarker = true
          let domain = hostType(2)
           let obj = {
           dist: vm.dist,
           level: vm.groups,
           loc_type: vm.loc_type,
           shop_type:vm.shop_type
        };
        let params = vm.filterParams(obj);
          vm.$axios
            .post(`${domain}` + "/ops_map/api/cluster_shop/",params)
            .then(function (response) {
              console.log(response.data.data.data);
              vm.marker = response.data.data.data
              vm.point = response.data.data.data[0]
              console.log(vm.point)
           
            });

        }
      }
    }
  }

</script>

<style scoped>
  .selectBox {
    display: inline-block;
    padding: 11px 5px 0 8px;
    /* z-index: 3000; */
  }

  .right-message-div {
    position: absolute;
    right: 15px;
    top: 10px;
      z-index: 2001;
  }
 .right-message-1 {
    padding: 10px 15px;
    background: #ffffff;
  }
  .right-message-1 li {
    font-size: 15px;
    padding: 4px 6px;
  }

  .right-message-1 li:nth-child(odd) {
    background: #f4f6fa;
  }

</style>
