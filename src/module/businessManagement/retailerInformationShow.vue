<template>
  <div class="page" id="box">
    <div class="businessCircleAnalysis" id="businessCircleAnalysis">
      <div class="filterBox">
        <div class="selectBox">
          <span class="tit">
            <span class="must-span">*</span>时间：
          </span>
          <el-select v-model="selectval1" clearable filterable placeholder="请选择">
            <el-option
              v-for="(item, index) in selectlist1"
              :key="index"
              :label="item.monthly"
              :value="item.monthly"
            ></el-option>
          </el-select>
        </div>
        <div class="selectBox">
          <span class="tit">
            <span class="must-span"></span>市：
          </span>
          <el-select v-model="city" clearable filterable placeholder="请选择" >
            <el-option v-for="(item, index) in cityList" :key="index" :label="item.city" :value="item.city"></el-option>
          </el-select>
        </div>
        <div class="selectBox">
          <span class="tit">
            <span class="must-span">*</span>品规：
          </span>
          <el-select v-model="county" clearable class="selectlist" filterable placeholder="请选择">
            <el-option
              v-for="(item, index) in countylist"
              :key="index"
              :label="item.product_name"
              :value="item.product_id"
            ></el-option>
          </el-select>
        </div>
        <!-- <div class="selectBox">
         <span class="must-span">*</span> <span class="tit">零售户类型：</span>
            <el-select v-model="selectval2" clearable filterable size="mini" placeholder="请选择">
              <el-option v-for="(item, index) in selectlist2" :key="index" :label="item" :value="item"></el-option>
           </el-select>
        </div>-->
        <el-button size="mini" type="primary" style="margin-left:2%" @click="filter">查询</el-button>
      </div>
      <div class="message4 left-message" v-show="imgsshow">
        <p class="titles3">
          <span class="span2"></span>
          {{product_name}}
        </p>
        <el-table
          class="tables"
          id="tb2"
          :data="tableDatalaist"
          :row-class-name="tableRowClassName"
          height="350"
          border
          :row-style="rowstyles"
          :cell-style="cellstyle"
          :header-cell-style="headerStyle"
          style="width: 99%;text-align:center;font-size: px"
        >
          <el-table-column prop="main_poi" align="center" label="主导环境">
            <template slot-scope="scope">
              <span @click="Suggestion(scope)" class="cursor">{{scope.row.main_poi}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="qty" align="center" label="销量"></el-table-column>
          <el-table-column prop="qtyrate" align="center" label="销量占比(%)"></el-table-column>
          <el-table-column prop="holds" align="center" label="上柜户数"></el-table-column>
          <el-table-column prop="holdsrate" align="center" label="户数占比(%)"></el-table-column>
          <el-table-column prop="shopavgqty" align="center" label=" 户均进货条数"></el-table-column>
          <el-table-column prop="counterrate" align="center" label="上柜率(%)"></el-table-column>
          <el-table-column prop="footrate" align="center" label="订足率(%)"></el-table-column>
          <el-table-column prop="footsurface" align="center" label="订足面(%)"></el-table-column>
          <el-table-column prop="repeatrate" align="center" label="重购率(%)"></el-table-column>
        </el-table>
      </div>
      <!-- 图片隐藏小标记 -->
      <div class="samlllogo" @click="logoshow" v-show="logoshows">
        <img :src="img.hide" alt="隐藏转换" />
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
              {{product_name}}
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
          <span>
            共有
            <span class="list_num">{{num}}</span>条
          </span>
          <el-button size="mini" type="primary" @click="hide">隐藏</el-button>
          <el-button size="mini" type="primary" @click="exportExcel">导出</el-button>
        </p>
      </div>
      <el-table
        class="tables"
        id="tb"
        v-loading="message3load"
        :data="tableData3"
        :row-class-name="tableRowClassName"
        height="190"
        border
        :row-style="rowstyles"
        :cell-style="cellstyle"
        :header-cell-style="headerStyle"
        style="width: 99%;text-align:center;font-size: px"
      >
        <el-table-column prop="license" align="center" label="客户编码"></el-table-column>
        <el-table-column prop="shop_name" align="center" label="客户名称"></el-table-column>
        <el-table-column prop="main_poi" align="center" label=" 主导环境因子"></el-table-column>
        <el-table-column prop="func_area" align="center" label="功能区"></el-table-column>
        <!-- <el-table-column prop="shop_address"  align="center"  label="客户地址"></el-table-column> -->
        <el-table-column prop="biz_dist" align="center" label="所属商圈"></el-table-column>
        <el-table-column prop="level" align="center" label="档位"></el-table-column>
        <el-table-column prop="strip" align="center" label="单箱结构(万元/箱)"></el-table-column>
        <el-table-column prop="qty" align="center" label="进货量(条)"></el-table-column>
        <el-table-column prop="frequency" align="center" label="进货频次"></el-table-column>
        <!-- <el-table-column prop="envi_value"  align="center" label="综合价值"></el-table-column> -->
      </el-table>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import eLine from "@/components/eCharts/eLine";
import qqmap from "@/components/qqMap/valuemap";
import { hostType } from "@/api/env.js";
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  name: "valueQuery",
  data() {
    return {
      city: '',  //市
      cityList: [],
      shop: "",
      point: "",
      product_name: "",
      selectlist1: [],
      selectlist2: [
        "全部",
        "连锁户",
        "监管户",
        "潜力户",
        "核心价值户",
        "潜在流失户"
      ],
      selectlist3: [],
      tableDatalaist: [],
      selectval1: "",
      selectval2: "",
      name: "",
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
      conditions: "",
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
      county: ""
    };
  },
  components: {
    qqmap,
    eLine
  },
  mounted: function() {
    this.getdata();
  },

  activated() {
    this.getdata();
  },
  methods: {
    getdata() {
      var windowH = document.documentElement.clientHeight - 100;
      document.getElementById("box").style.height = windowH + "px";
      let vm = this;
      let domain = hostType(1);
      vm.$axios.get(`${domain}` + "/api/consume_env/").then(function(response) {
        console.log(response.data);
        vm.selectlist1 = response.data.data.monthly;
        vm.countylist = response.data.data.products;
        vm.cityList = response.data.data.city;
      });
    },
    Suggestion(row) {
      console.log(row.row);
      let vm = this;
      let domain = hostType(1);
      let obj = {
        monthly: vm.selectval1,
        product_id: vm.county,
        city: vm.city,
        main_poi: row.row.main_poi
      };
      // let params = vm.filterParams(obj);
      console.log(obj);
      console.log(vm.county);
      vm.$axios
        .post(`${domain}` + "/api/consume_env/", obj)
        .then(function(response) {
          // console.log(response.data.data.data)
          vm.imgsshow = false;
          vm.message3show = true;
          vm.tableData3 = response.data.data.data;
          vm.shop = response.data.data.data;
          vm.num = response.data.data.data.length;
        });
    },
    // 零售户点击事件
    pathClick(license, name, item) {
      let vm = this;
      console.log(item);
      vm.messageshow = true;
      vm.loading = true;
      vm.name = name;
      let domain = hostType(1);
      // vm.$axios
      //   .get(`${domain}`+"/api/cvm_ana/?monthly="+vm.selectval1 + "&license=" + license)
      //   .then(function (response) {
      // console.log(response.data.data)
      let data = item;
      // let radar_list = []
      vm.pieData = {
        this: item.bar.frequency,
        yOy: item.bar.qty,
        x: item.bar.monthly,
        color: ["#387CE1", "#6ADD92"],
        length: [`销量(条)`, "进货频次"]
      };
      vm.rightmessage1data = [];
      vm.prolist = data.biz_dist;
      vm.rightmessage1data.push(
        {
          label: "所属商圈：",
          value: data.biz_dist || "暂无"
        },
        {
          label: "功能区：",
          value: data.func_area || "暂无"
        },
        {
          label: " 主导环境因子：",
          value: data.main_poi || "暂无"
        },
        {
          label: "档位：",
          value: data.level || "暂无"
        },
        {
          label: "单箱结构：",
          value: data.strip + "万元/箱" || "暂无"
        }
      );
      // vm.pieData = radar_list
      vm.loading = false;
      // });
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
      // console.log("000");
      let vm = this;
      if (vm.selectval1 == "") {
        vm.$message({
          message: "时间公司和零售户类型是必选项",
          type: "warning"
        });
        return false;
      }
      vm.messageshow = false;
      vm.loading = false;
      vm.message3show = false;
      vm.message3load = true;
      let domain = hostType(1);
      //  let obj = {
      //      monthly:vm.selectval1,
      //     shop_type:vm.selectval2,
      //     county:vm.county
      //   };
      //   let params = vm.filterParams(obj);
      vm.$axios
        .get(
          `${domain}` +
            "/api/consume_env/?monthly=" +
            vm.selectval1 +
            "&product_id=" +
            vm.county +
            "&city=" +
            vm.city 
        )
        .then(function(response) {
          console.log(response.data.data.data);
          // vm.point = response.data.shop_list
          vm.message3load = false;
          vm.imgsshow = true;

          vm.tableDatalaist = response.data.data.data;
          for (let index = 0; index < vm.countylist.length; index++) {
            if (vm.county == vm.countylist[index].product_id) {
              vm.product_name = vm.countylist[index].product_name;
            }
          }

          // }
        });
    },
    tableRowClassName({ row, rowIndex }) {
      // console.log({row, rowIndex})
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
  width: 90%;
  top: 10%;
  left: 3%;
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

.span2 {
  display: inline-block;
  /* margin: 0 10px 0 0; */
  height: 20px;
  /* border: solid 1.5px#409EFF ; */
  line-height: 20px;
}

.message4 {
  background: white;
  border-radius: 0%;
}

.cursor {
  cursor: pointer;
}
.selectlist {
  width: 200px;
}
</style>
