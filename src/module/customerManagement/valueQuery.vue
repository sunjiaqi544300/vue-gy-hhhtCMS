<template>
  <div class="page" id="box">
    <div class="businessCircleAnalysis" id="businessCircleAnalysis">
      <div class="filterBox">
        <div class="selectBox">
          <span class="tit"><span class="must-span">*</span>时间：</span>
          <el-select v-model="selectval1" clearable filterable size="mini" placeholder="请选择">
            <el-option v-for="(item, index) in selectlist1" :key="index" :label="item.monthly" :value="item.monthly">
            </el-option>
          </el-select>
        </div>
        <!-- 省市区 province  city area-->
        <!-- <div class="filterBox">
          <div class="selectBox">
            <span class="tit"><span class="must-span"></span>省：</span>
            <el-select v-model="province" clearable filterable  placeholder="请选择" @change="dsyprovinceChange">
              <el-option v-for="(item, index) in provinceList" :key="index" :label="item" :value="item">
              </el-option>
            </el-select>
          </div> -->
          <div class="selectBox">
            <span class="tit"><span class="must-span"></span>市：</span>
            <el-select v-model="city" clearable filterable placeholder="请选择" @change="dsyprovinceChange">
              <el-option v-for="(item, index) in cityList" :key="index" :label="item"
                :value="item"></el-option>
            </el-select>
          </div>
          <div class="selectBox">
          <span class="must-span">*</span> <span class="tit">区：</span>
              <el-select v-model="area" clearable filterable size="mini" placeholder="请选择">
                <el-option v-for="(item, index) in areaList" :key="index" :label="item" :value="item"></el-option>
            </el-select>
          </div>
        <!-- <div class="selectBox">
          <span class="tit"><span class="must-span">*</span>公司：</span>
          <el-select v-model="county" clearable filterable  class="selectlist"  size="mini" placeholder="请选择">
            <el-option v-for="(item, index) in countylist" :key="index" :label="item.dist+'公司'" :value="item.dist">
            </el-option>
          </el-select>
        </div> -->
        <div class="selectBox">
          <span class="must-span">*</span> <span class="tit">零售户类型：</span>
          <el-select v-model="selectval2" clearable filterable size="mini" placeholder="请选择">
            <el-option v-for="(item, index) in selectlist2" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </div>
        <el-button size="mini" type="primary" style="margin-left:25px" @click="filter">查询</el-button>
      </div>
      <div class="message4  left-message" v-show='imgsshow'>
        <p><img style="width:12px;height:14px;" :src="img.maplogo" alt="上升"><span>价值客户</span></p>
        <p><img style="width:12px;height:14px;" :src="img.green" alt="上升"><span>核心客户</span></p>
        <p><img style="width:12px;height:14px;" :src="img.yellow" alt="上升"><span>潜力客户</span></p>
        <p><img style="width:12px;height:14px;" :src="img.red" alt="上升"><span></span>一般客户</p>

        <!-- <p><img style="width:12px;height:14px;" :src="img.gray" alt="上升"><span>潜在流失户</span></p> --> 

      </div>
      <!-- 图片隐藏小标记 -->
      <div class="samlllogo" @click="logoshow" v-show="logoshows">
        <img :src="img.hide" alt="隐藏转换">
      </div>
      <div class="map">
        <qqmap :path="path" :marker="shop" @markerClick="pathClick" :isclick="true" :point="point"></qqmap>
        <!-- 右侧弹框 -->
        <div class="right-message-div" v-show="messageshow">
          <div class="right-message-1" v-loading="loading">
            <p class="titles2">
              <span class="span1"></span>
              {{name}}
            </p>
            <ul>
              <li v-for="(item,index) in rightmessage1data" :key="index">
                <label>{{item.label}}</label>
                <span>{{item.value}}</span>
              </li>
            </ul>
          </div>
          <!--饼状图-->
          <!-- <div class="message2" v-show="messageshow" v-loading="loading"> -->
          <div class="message2 right-message-2" v-loading="loading">
            <p class="titles2">
              <span class="span1"></span>
              客户价值雷达图
            </p>
            <!-- 折线图 -->
            <e-line class="eline" :id="id.rightBottomBig" :lData="pieData"></e-line>
          </div>
        </div>
      </div>
    </div>
    <!-- 表格 -->
    <div class="message3" v-show="message3show">
      <div style="display: flex;  justify-content: space-between;">
        <p class="titles2">
          <span class="span1"></span>
          零售户信息表
        </p>
        <p class="titles2-right">
          <span>共有<span class="list_num">{{num}}</span>条</span>
          <el-button size="mini" type="primary" @click="hide">隐藏</el-button>
          <el-button size="mini" type="primary" @click="exportExcel">导出</el-button>
        </p>
      </div>
      <el-table class="tables" id="tb" v-loading="message3load" :data="tableData3" :row-class-name="tableRowClassName"
        height="190" border :row-style="rowstyles" :cell-style="cellstyle" :header-cell-style="headerStyle"
        style="width: 99%;text-align:center;font-size: px">
        <el-table-column prop="license" align="center"  width="140" label="客户编码"></el-table-column>
        <el-table-column prop="shop_name" align="center" width="250"  label="客户名称"></el-table-column>
        <el-table-column prop="shop_address" align="center" width="250"  label="客户地址"></el-table-column>
        <el-table-column prop="biz_dist" align="center" label="所属商圈"></el-table-column>
        <el-table-column prop="func_area" align="center" label="功能区"></el-table-column>
        <el-table-column prop="main_poi" align="center" label=" 主导环境因子"></el-table-column>
        <el-table-column prop="level" align="center" label="档位"></el-table-column>
        <el-table-column prop="strip" align="center" label="单箱结构(万元/箱)"></el-table-column>
        <el-table-column prop="allqty" align="center" label="进货量(条)"></el-table-column>
        <el-table-column prop="shop_cat" align="center" label="零售户类型"></el-table-column>
        <el-table-column prop="envi_value" align="center" label="综合价值"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import eLine from "@/components/eCharts/Radar";
  import qqmap from "@/components/qqMap/valuemap";
  import {
    hostType
  } from '@/api/env.js'
  import FileSaver from "file-saver";
  import XLSX from "xlsx";
  export default {
    name: "valueQuery",
    data() {
      return {
        provinceData:[],
        //province: '',  //省
        city: '',  //市
        area: '',  //区
        //provinceList: [],
        cityList: [],
        areaList: [],
        shop: "",
        point: "",
        selectlist1: [],
        selectlist2: ["全部", "价值客户", "核心客户", "潜力客户", "一般客户"],
        selectlist3: [],
        selectval1: "",
        selectval2: "",
        name: '',
        selectval3: "",
        leftlist: [],
        rightmessage1data: null,
        id: {
          rightBottomBig: "rightBottomBig"
        },
        deadline: "",
        pieData: {},
        time: "",
        times: [],
        imgsshow: false,
        dist: "",
        path: [],
        num: "",
        messageshow: false,
        message3show: false,
        loading: false,
        loadingmap: false,
        prolist: "",
        conditions: '',
        productID: "",
        message3load: false,
        logoshows: false,
        tableshow: false,
        headerStyle: {
          "text-align": "center",
          color: "#404447",
          "font-weight": "700px"
        },
        mon_list: "",
        rowstyles: {
          height: "0px"
        },
        cellstyle: {
          padding: "10px"
        },
        tableData3: [],
        img: {
          hide: require("@/assets/images/hidelogo.png"),
          red: require("@/assets/images/red2.png"),
          yellow: require("@/assets/images/yellow2.png"),
          green: require("@/assets/images/green2.png"),
          gray: require("@/assets/images/gray2.png"),
          maplogo: require("@/assets/images/blue.png")
        },
        countylist: [],
        county: '',
      };
    },
    components: {
      qqmap,
      eLine
    },
    mounted: function () {
      this.dsyprovince()
    },
    created() {
      this.dsyprovince()
    },
    methods: {
      //省市区请求接口
      dsyprovince() {
        var vm = this
        let domain = hostType(1)
        this.$axios.get(`${domain}` + '/api/top_screen/')
          .then(res => {
            vm.selectlist1 = res.data.data.mon_list;
            let pData = res.data.data.dist;
            vm.provinceData = pData;
            // cityList  areaList
            //处理区域数据
            vm.cityList = []
            pData.forEach((value,key) => {
              vm.cityList.push(pData[key].city)
            })
          })
      },
      //省级change后，初始化市
      dsyprovinceChange(province){
        console.log(province);
        this.areaList = []
        this.area = ''
        let pData = this.provinceData;
        pData.forEach((value,key) => {
          if(pData[key].city == province){
            this.areaList = pData[key].dist
          }
        })
      },
      // 零售户点击事件
      pathClick(license, name) {
        let vm = this;
        vm.messageshow = true
        vm.loading = true
        vm.name = name
        let domain = hostType(1)
        vm.$axios
          .get(`${domain}` + "/api/cvm_ana/?monthly=" + vm.selectval1 + "&license=" + license + "&time=" + new Date().getTime())
          .then(function (response) {
            console.log(response.data.data)
            let data = response.data.data.data[0]
            let radar_list = response.data.data.radar_list
            vm.rightmessage1data = []
            vm.prolist = data.biz_dist
            vm.rightmessage1data.push({
              label: "所属商圈：",
              value: data.biz_dist || "暂无",
            }, {
              label: "功能区：",
              value: data.func_area || "暂无",
            }, {
              label: " 主导环境因子：",
              value: data.main_poi || "暂无",
            }, {
              label: "档位：",
              value: data.level || "暂无",
            }, {
              label: "单箱结构：",
              value: data.strip + "万元/箱" || "暂无",
            }, {
              label: "进货量：",
              value: data.allqty + "条" || "暂无",
            }, {
              label: "零售户类型：",
              value: data.shop_cat || "暂无",
            }, {
              label: "单箱结构排名：",
              value: data.striprank || "暂无",
            }, {
              label: "进货量排名：",
              value: data.qtyrank || "暂无",
            })
            vm.pieData = radar_list
            vm.loading = false
          });
      },
      // 点击隐藏
      hide() {
        var vm = this;
        vm.message3show = false;
        vm.logoshows = true;
      },
      logoshow() {
        var vm = this;
        vm.message3show = true;
        vm.logoshows = false;
      },
      /*导出*/
      exportExcel() {
        let wb = XLSX.utils.table_to_book(document.querySelector("#tb"));
        let wbout = XLSX.write(wb, {
          bookType: "xlsx",
          bookSST: true,
          type: "array"
        });
        try {
          FileSaver.saveAs(
            new Blob([wbout], {
              type: "application/octet-stream"
            }),
            this.$route.meta.title + ".xlsx"
          );
        } catch (e) {
          if (typeof console !== "undefined") console.log(e, wbout);
        }
        return wbout;
      },
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
      // 筛选
      filter() {
        let vm = this;
        if (vm.selectval1 == "" || vm.city == '' || vm.area == '' || vm.selectval2 == "") {
          vm.$message({
            message: '时间公司和零售户类型是必选项',
            type: 'warning'
          });
          return false
        }
        vm.messageshow = false
        vm.loading = false
        vm.message3show = true;
        vm.message3load = true;
        let domain = hostType(1)
        let obj = {
          monthly: vm.selectval1,
          shop_type: vm.selectval2,
          county:vm.area,
          city:vm.city,
        };
        console.log(obj)
        let params = vm.filterParams(obj);
        vm.$axios
          .post(`${domain}` + '/api/cvm_ana/', params).then(function (response) {
            
            vm.shop = response.data.data.shop_list.map((val) => {
              return {
                add_lat: val.add_lat,
                add_lng: val.add_lng,
                license: val.license,
                shop_name: val.shop_name,
                shop_cat:val.shop_cat
              }
            })
            vm.message3load = false;
            vm.imgsshow = true
            vm.tableData3 = response.data.data.data_list;
            vm.num = response.data.data.data_list.length
          });
      },
      tableRowClassName({
        row,
        rowIndex
      }) {
        if (rowIndex % 2 !== 0) {
          return "table-color2n";
        }
      }
    }
  };

</script>

<style scoped>
  .message3 .titles2 {
    padding-left: 15px;
  }

  .right-message-div {
    position: absolute;
    right: 15px;
  }

  .right-message-div {
    top: 10px;
  }

  .left-message {
    width: 140px;
    top: 10%;
    left: 5%;
  }

  .left-message h3 {
    font-size: 18px;
    text-align: center;
    color: #ffffff;
  }

  .left-message p {
    background: #ffffff;
    padding: 2px 10px;
    border-radius: 10px;
    margin: 10px;
    color: #666666;
  }

  .left-message p span {
    display: inline-block;
  }

  .right-message-1 {
    padding: 10px 15px;
    background: #ffffff;
    border-radius: 4%;
  }

  .right-message-1 .titles2 {
    margin: 0;
    margin-bottom: 10px;
  }

  .right-message-1 li {
    font-size: 15px;
    padding: 4px 6px;
  }

  .right-message-1 li:nth-child(odd) {
    background: #f4f6fa;
  }

  .right-message-2 {
    position: relative;
    top: 10px;
    right: 0;
    padding: 6px 15px;
  }

  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }

  .page {
    position: relative;
    width: 100%;
    height: 100%;
  }


  .tops {
    position: absolute;
    top: 15px;
    left: 15px;
    z-index: 300;
    width: 36%;
    background: white;
    height: 6%;
  }

  .selectBox {
    display: inline-block;
    padding: 11px 5px 0 8px;
    /* z-index: 3000; */
  }

  .tables {
    width: 100%;
    margin: 5px 0 0 10px;
  }

  .tables .cell {
    font-size: 30px;
  }

  .details {
    margin: 3% 0 0 9%;
  }

  .span1 {
    display: inline-block;
    margin: 0 10px 0 0;
    height: 20px;
    border: solid 1.5px#409EFF;
    line-height: 20px;
  }
   .selectlist{
    width: 200px;
  }
</style>
