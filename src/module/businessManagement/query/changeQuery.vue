<template>
  <div class="page" id="box">
    <dir class="page-title">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/changeQuery' }">
          <img style="vertical-align: middle;width:13px;margin-right:5px;" :src="img.maplogo" alt="" srcset="">
          <a> {{$route.meta.title}}</a>
        </el-breadcrumb-item>
      </el-breadcrumb>
      <!-- <button @click="nextTolevel2">跳转到二级路由</button> -->
    </dir>
    <div class="businessCircleAnalysis" id="businessCircleAnalysis">
      <div class="filterBox">
        <div class="selectBox">
          <span class="tit"><span class="must-span">*</span>时间：</span>
          <el-select v-model="time" clearable filterable size="mini" placeholder="请选择">
            <el-option v-for="(item, index) in mon_list" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </div>
        <div class="selectBox">
          <span class="tit"><span class="must-span">*</span>客户经理：</span>
          <el-select v-model="mrg" clearable filterable size="mini" placeholder="请选择">
            <el-option v-for="(item, index) in mar_list" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </div>
        <div class="selectBox">
          <span class="tit"><span class="must-span">*</span>户数变化：</span>
          <el-select v-model="house" clearable filterable size="mini" placeholder="请选择">
            <el-option v-for="(item, index) in  households" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </div>
        <el-button size="mini" type="primary" style="margin-left:2%" @click="filter">筛选</el-button>
      </div>

      <!-- 图片隐藏小标记 -->
      <div class="samlllogo" @click="logoshow" v-show="logoshows">
        <img :src="img.hide" alt="隐藏转换">
      </div>
      <div class="map">
        <qqmap :path="path" @pathClick="pathClick"></qqmap>
        <!-- 上升下降图 -->
        <div class="message4 left-message" v-show='imgsshow'>
          <p><img style="width:15px;height:15px;" :src="img.green" alt="上升"><span>上升</span></p>
          <p><img style="width:15px;height:15px;" :src="img.yellow" alt="上升"><span>持平</span></p>
          <p><img style="width:15px;height:15px;" :src="img.red" alt="上升"><span>下降</span></p>
        </div>
        <!-- 右侧弹框 -->
        <div class="right-message-div" v-loading="loading" v-show="rightdiv">
          <div class="right-message-1">
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
          <div class="message2 right-message-2" v-loading="loading" v-show="rightdiv">
            <p class="titles2">
              <span class="span1"></span>
              商圈经营信息变化
            </p>
            <!-- 折线图 -->
            <el-table class="tables" id="tbs" :data="tableData4" :row-class-name="tableRowClassName" height="200" border
              :row-style="rowstyles" :cell-style="cellstyle" :header-cell-style="headerStyle"
              style="width: 99%;text-align:center;font-size: 30px;white-space:nowrap">
              <el-table-column prop="target" width="180px" label="指标" ></el-table-column>
              <el-table-column prop="t_month" width="140px" align="center"  :label="t_month"></el-table-column>
              <el-table-column prop="l_month" width="140px" align="center"   :label="l_month"></el-table-column>
              <el-table-column prop="state" align="center" label="变化"></el-table-column>
              <el-table-column prop="rank" width="80px" align="center"   label="排名"></el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <!-- 表格 -->
    <div class="message3" v-show="message3show">
      <div style="display: flex;  justify-content: space-between;">
        <p class="titles2">
          <span class="span1"></span>
          商圈信息表
        </p>
        <p class="titles2-right">
          <span>共有<span class="list_num">{{num}}</span>条</span>
          <el-button size="mini" type="primary" @click="hide">隐藏</el-button>
          <el-button size="mini" type="primary" @click="exportExcel">导出</el-button>
        </p>
      </div>
      <el-table class="tables" id="tb" :data="tableData3" :row-class-name="tableRowClassName" v-loading='message3load'
        height="220" border :row-style="rowstyles" :cell-style="cellstyle" :header-cell-style="headerStyle"
        style="width: 99%;text-align:center;font-size: 30px">
        <el-table-column label="">
          <el-table-column prop="biz_dist"  width='170px'  align="center" label="商圈名称"></el-table-column>
          <el-table-column prop="func_area"  width='140px'  align="center" label="功能区"></el-table-column>
          <el-table-column prop="main_poi" width='140px'  align="center" label="主导环境因子"></el-table-column>
          <el-table-column prop="contact_win" align="center"   width='100px'  label="客户经理"></el-table-column>
          <el-table-column prop="avglevel" align="center"  width='100px'  label="平均档位"></el-table-column>
        </el-table-column>
        <el-table-column label="零售户数量">
          <el-table-column prop="l_allhouse" align="center" :label="l_month"></el-table-column>
          <el-table-column prop="allhouse" align="center" :label="t_month"></el-table-column>
          <el-table-column prop="allhouserank" align="center" label="排名"></el-table-column>
          <el-table-column prop="housestatedesc" align="center" label="变化"></el-table-column>
        </el-table-column>
        <el-table-column label="进货量(条)">
          <el-table-column prop="l_allqty" align="center" :label="l_month"></el-table-column>
          <el-table-column prop="allqty" align="center" :label="t_month"></el-table-column>
          <el-table-column prop="allqtyrank" align="center" label="排名"></el-table-column>
          <el-table-column prop="amtstatedesc" align="center" label="变化"></el-table-column>
        </el-table-column>
        <el-table-column label="进货额(万元)">
          <el-table-column prop="l_allamt" align="center" :label="l_month"></el-table-column>
          <el-table-column prop="allamt" align="center" :label="t_month"></el-table-column>
          <el-table-column prop="allamtrank" align="center" label="排名"></el-table-column>
          <el-table-column prop="amtstatedesc" align="center" label="变化"></el-table-column>
        </el-table-column>
        <el-table-column label="单箱结构(万元/箱)">
          <el-table-column prop="l_strip" align="center" :label="l_month"></el-table-column>
          <el-table-column prop="strip" align="center" :label="t_month"></el-table-column>
          <el-table-column prop="striprank" align="center" label="排名"></el-table-column>
          <el-table-column prop="stripstatedesc" align="center" label="变化"></el-table-column>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import eLine from "@/components/eCharts/eLine";
  import qqmap from "@/components/qqMap/changemap";
  import FileSaver from "file-saver";
  import XLSX from "xlsx";
  import {
    hostType
  } from '@/api/env.js'
  export default {
    name: "零售户变化查询",
    data() {
      return {
        rightmessage1data: null,
        id: {
          rightBottomBig: "rightBottomBig"
        },
        deadline: "",
        rightBottomData: {},
        time: "",
        rightdiv: false,
        times: [],
        imgsshow: false,
        dist: "",
        households: [
          "全部", '上升', '持平', '下降'
        ],
        path: [],
        num: "",
        house: '',
        name:'',
        mrg: '',
        ww: '222',
        messageshow: false,
        tableData4: [],
        message3show: false,
        loading: false,
        loadingmap: false,
        func_area: "",
        avglevel: "",
        allhouse: "",
        main_poi: "",
        mrg: "",
        pro_list: "",
        l_month:'',//上一个日期
        t_month:'',//上一个日期
        prolist: "",
        conditions: '',
        productID: "",
        message3load: false,
        logoshows: false,
        tableshow: false,
        headerStyle: {
          "text-align": "center",
          "color": "#404447",
          'background': '#f4f6fa',
          "font-weight": "700px"
        },
        mon_list: "",
        mar_list: "",
        rowstyles: {
          height: "0px"
        },
        cellstyle: {
          padding: "10px"
        },
        tableData3: [],
        img: {
          hide: require("@/assets/images/hidelogo.png"),
          red: require("@/assets/images/red.png"),
          yellow: require("@/assets/images/yellow.png"),
          green: require("@/assets/images/green.png"),
          gray: require("@/assets/images/gray.png"),
          maplogo: require("@/module/marketAnalysis/images/maplogo.png")
        }
      };
    },
    components: {
      qqmap,
      eLine
    },
    mounted: function () {
      this.getdata()
      this.getmargin()
    },
    beforeRouteLeave(to, from, next) {
      // ...
      if (to.path == "/policyQuery/level-2") {
        from.meta.keepAlive = true
      } else {
        from.meta.keepAlive = false
      }
      next()
    },
    activated() {
      this.getdata()
      this.getmargin()
    },
    methods: {
      getdata() {
        var windowH = document.documentElement.clientHeight - 100;
        document.getElementById("box").style.height = windowH + "px";
        let vm = this;
        let domain = hostType(1)
        vm.$axios
          .get(`${domain}` + "/ops_map/api/opsbizprotop/")
          .then(function (response) {
            // console.log(response.data.mon_list);
            // vm.tableshow = true
            vm.mon_list = response.data.mon_list;
            vm.pro_list = response.data.pro_list;
          });
      },
      getmargin() {
        let vm = this;
        let domain = hostType(1)
        vm.$axios
          .get(`${domain}` + "/ops_map/api/opsmrg/")
          .then(function (response) {
            // console.log(response.data.mon_list);
            // vm.tableshow = true
            vm.mar_list = response.data.mrg_list;
            // vm.pro_list = response.data.pro_list;
          });
      },
      // 商圈点击事件
      pathClick(name, center) {
        // console.log('88')
        let vm = this;
        vm.messageshow = true
        vm.loading = true
        vm.rightdiv = true
        vm.name = name
        let domain = hostType(1)
        vm.$axios
          .get(`${domain}` + "/ops_map/api/opsmrg/?monthly=" + vm.time + '&mrg=' + vm.mrg + '&biz_dist=' + name)
          .then(function (response) {
            // console.log(response.data);
            let data = response.data.data
            vm.rightmessage1data = []
            vm.rightmessage1data.push({
              label: "功能区：",
              value: data.func_area || "暂无",
            }, {
              label: "主导环境因子：",
              value: data.main_poi || "暂无",
            }, {
              label: "客户经理：",
              value: data.mrg || "暂无",
            }, {
              label: "零售户数量：",
              value: data.allhouse || "暂无",
            }, {
              label: "平均档位：",
              value: data.avglevel || "暂无",
            }, )
            vm.tableData4 = response.data.data_list
           
            
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
        // console.log("00");
        vm.message3show = true;
        vm.logoshows = false;
      },
      /*导出*/
      exportExcel() {
        /* generate workbook object from table */
        let wb = XLSX.utils.table_to_book(document.querySelector("#tb"));
        /* get binary string as output */
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

      nextTolevel2() {
        this.$router.push({
          path: "/strategyTableW/level-2"
        })
      },
      // 获取产品id
      obtainProductID(val) {
        var vm = this;
        // console.log(val);
        // console.log(vm.pro_list);
        for (var i = 0; i < vm.pro_list.length; i++) {
          if (vm.pro_list[i].product_name === val) {
            vm.productID = vm.pro_list[i].product_id;
          }
        }
      },
      // 筛选
      filter() {
        console.log("000");
        let vm = this;
         if (vm.time == '' && vm.mrg == ''&& vm.house=='') {
          // console.log('空')
          const h = vm.$createElement;
          vm.$notify({
            title: '提示信息',
            message: h('span', {
              style: 'color: teal'
            }, '时间是必选项。')
          });
          return
        }else{
           vm.message3show = true;
        vm.message3load = true;
        vm.imgsshow=true
        // vm.conditions = vm.value11 === '' ? '' : '"' + vm.value11.join('","') + '"'
        let domain = hostType(1) 
        vm.$axios
          .post(`${domain}` + '/ops_map/api/opsmrg/', {
            'monthly': vm.time,
            'mrg': vm.mrg,
            'state': vm.house
          })
          .then(function (response) {
            // vm.tableshow = true;
            vm.path = response.data.biz_list
            // console.log(response.data);
            vm.message3load = false;
            vm.tableData3 = response.data.data_list;
            vm.num = response.data.data_list.length;
             vm.l_month =  response.data.l_month
             vm.t_month =  response.data.t_month
            console.log(response.data.l_month);
          });
        }
       
      },
      cellClick(row, column, cell, event) {
        let vm = this
        vm.ros = row.first
        vm.$router.push({
          path: "/strategyTableW/level-2",
          query: {
            dist: row.func_area,
            time: vm.time,
            prolist: vm.prolist,
            productID: vm.productID,
            conditions: vm.conditions,
          }
        })
        // console.log(vm.$route)
      },
      tableRowClassName({
        row,
        rowIndex
      }) {
        // console.log({row, rowIndex})
        if (rowIndex % 2 !== 0) {
          return "table-color2n";
        }
      }
    }
  };

</script>

<style scoped>
  .right-message-div {
    position: absolute;
    right: 15px;
    width: 320px;
  }

  .left-message,
  .right-message-div {
    top: 10px;
  }

  .left-message {
    padding: 10px;
    width: auto;
  }

  .left-message h3 {
    font-size: 18px;
    text-align: center;
    color: #ffffff;
  }

  .left-message p {
    background: #ffffff;
    padding: 5px;
    margin: 3px 0;
  }

  .left-message p img {
    margin-right: 10px;
  }

  .left-message p span {
    display: inline-block;
  }

  .right-message-1 {
    padding: 10px 15px;
    background: #ffffff;
  }

  .right-message-1 .titles2 {
    margin: 0;
    margin-bottom: 10px;
  }

  .right-message-1 li {
    font-size: 15px;
    padding: 6px;
  }

  .right-message-1 li:nth-child(odd) {
    background: #f4f6fa;
  }

  .right-message-2 {
    position: relative;
    top: 10px;
    right: 0;
    padding: 6px 0 0 0;
    width: 100%;
  }

  .right-message-2 .titles2 {
    padding-left: 15px;
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
    margin-top: 5px;
  }

  .tables .cell {
    font-size: 30px;
  }

  .message3 {
    top: 70%;
  }

  .message3 .titles2 {
    padding-left: 15px;
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

</style>
