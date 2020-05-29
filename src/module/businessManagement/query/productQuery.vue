<template>
  <div class="page" id="box">
    <div class="businessCircleAnalysis" id="businessCircleAnalysis">
      <div class="filterBox">
        <div class="selectBox">
          <span class="tit"><span class="must-span">*</span>时间：</span>
          <el-select v-model="selectval1" clearable filterable size="mini" disabled  placeholder="请选择">
            <el-option v-for="(item, index) in selectlist1" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </div>
        
        <div class="selectBox">
          <span class="tit"><span class="must-span">*</span>区县：</span>
          <el-select v-model="selectval3" clearable filterable size="mini"  class="selectlist" disabled placeholder="请选择" >
            <el-option v-for="(item, index) in selectlist3" :key="index" :label="item.product_name" :value="item.product_name"></el-option>
          </el-select>
        </div>
        <el-button size="mini" type="primary" style="margin-left:2%" disabled>筛选</el-button>
        <el-button size="mini" type="primary" style="margin-left:2%" @click="backtrack">返回</el-button>
      </div>
      <div class="map">
            <qqmap  :marker="shop" @markerClick="pathClick"   :point='point' :isclick="true"></qqmap>
             <div class="message4 messageshowleft" v-show="messageshowleft">
                  <div  v-loading="loading">
                          <p v-for="(item,index) in leftlist" :key="index" @click="selectFn(item)">
                            <i></i>
                            <a :class="{'active':item.select == true}">{{item.label}}&nbsp;({{item.num}})</a>
                          </p>
                  </div>
            </div> 
             <!-- 右侧弹框 -->
             <div class="right-message-div"  v-show="messageshow">
                 <div class="right-message-1"  v-loading="loading">
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
             </div>
        </div>
    </div>
     <!-- 表格 -->
      <div class="message3">
        <div style="display: flex;  justify-content: space-between;">
          <p class="titles2">
            <span class="span1"></span>
           {{product_name}} - 维护零售户
          </p>
          <p class="titles2-right">
            <span>共有<span class="list_num">{{num}}</span>条</span>
            <el-button size="mini" type="primary" @click="hide">隐藏</el-button>
            <el-button size="mini" type="primary" @click="exportExcel">导出</el-button>
          </p>
        </div>
        <el-table class="tables" id="tb" v-loading="loading" :data="tableData3" :row-class-name="tableRowClassName"
          height="210" border :row-style="rowstyles" :cell-style="cellstyle" :header-cell-style="headerStyle" style="width: 99%;text-align:center;font-size: px"> 
              <el-table-column type="index"  align="center"  width="80" label="序号"></el-table-column>
               <el-table-column prop="license"  align="center"  label="客户编码"></el-table-column>
              <el-table-column prop="shop_name"   align="center" label="客户名称"></el-table-column>
              <el-table-column prop="main_poi"  align="center" label="主导环境因子"></el-table-column>
              <el-table-column prop="func_area"  align="center" label="功能区"></el-table-column>
              <el-table-column prop="biz_dist"  align="center" label="所属商圈"></el-table-column>
              <el-table-column prop="level"   align="center" label="档位"></el-table-column>
              <el-table-column prop="strip"  align="center" label="单箱结构(万元/箱)"></el-table-column>
              <el-table-column prop="license_type"  align="center" label="客户类型"></el-table-column>
              <el-table-column prop="targettype"  align="center" label="维护目标"></el-table-column>
              <el-table-column prop="targetnum"  align="center" label="目标进货量"></el-table-column>
             
          </el-table>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import eLine from "@/components/eCharts/pie";
  import qqmap from "@/components/qqMap/businessMap";
  import {hostType} from '@/api/env.js'
  import FileSaver from "file-saver";
  import XLSX from "xlsx";
  export default {
    name: "品规查询",
    data() {
      return {
        biz_dist:"",
        messageshowleft:false,
        selectlist1:[],
        point:[],
        selectlist2:[],
        selectlist3:[],
        selectval1:"",
        selectval2:"",
        selectval3:"",
        leftlist:[{
          label:"",
          type:1,
        },{
          label:"",
          type:2,
        }],
        comproduct_id:"",
        rightmessage1data:null,  
        id: {
          rightBottomBig: "rightBottomBig"
        },
        deadline: "",
        pieData: {},
        time: "",
        times: [],
        shop: [],
        imgsshow:false,
        dist: "",
        path: [],
        num: "",
        messageshow: false,
        message3show: false,
        loading: false,
        loadingmap: false,
        alertObj: {
          biz_dist: "", //商圈
          main_poi: "", //环境因子
          func_area: "", //功能区
          avglevel: "", //平均档位
          strip: "", //单箱结构
          strip: "", //零售户数量
          holds: "", //上柜户数
          qty: "" //qty
        },
        prolist: "",
        conditions:'',
        productID: "",
        message3load:false,
        logoshows: false,
        tableshow: false,
        headerStyle: {
          "text-align": "center",
          color: "#404447",
          "font-weight": "700px"
        },
        mon_list: "",
        product_name: "",
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
          green: require("@/assets/images/smallbule.png"),
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
      this.product_name = this.$route.query.row.product_name
      this.selectval1 = this.$route.query.time
      this.selectval3 = this.$route.query.dist
      console.log(this.$route.query.time,this.$route.query.dist)
    },
    beforeRouteLeave (to, from, next) {
      // ...
      if(to.path == "/policyQuery/level-2"){
          from.meta.keepAlive = true
      }else{
          from.meta.keepAlive = false
      }
      next()
    },
    activated(){
        this.getdata()
    },
    methods: {
      backtrack(){
          this.$router.go(-1);
      },
      getdata(){
          let vm = this;
            let domain = hostType(1)
          vm.$axios
            .post(`${domain}`+"/api/market_state/",{
                 "monthly": vm.$route.query.time,
             "product_id":vm.$route.query.row.product_id,
             "county": vm.$route.query.dist,
              // "targettype": vm.$route.query.row.maintainadvise
            })
            .then(function (response) {
             console.log(response.data.data.dist)
             vm.shop = response.data.data.dist
             vm.tableData3 = response.data.data.dist
             vm.num = response.data.data.dist.length

             vm.point = [response.data.data.dist[0].add_lat,response.data.data.dist[0].add_lng]
            //  console.log()
            });
      },
    
    // 零售户点击事件
       pathClick(name, obj,item) {
         console.log(item)
        let vm = this;
        vm.messageshow = true
        // vm.loading = true
        vm.name = item.shop_name
        let domain = hostType(1)
          let data = item
           vm.rightmessage1data = []
               vm.rightmessage1data.push({
                                label:"所属商圈：",
                                value:data.biz_dist || "暂无",
                              },{
                                label:"功能区：",
                                value:data.func_area || "暂无",
                              },{
                                label:"主导环境因子：",
                                value:data.main_poi || "暂无",
                              },{
                                label:"档位：",
                                value:data.level || "暂无",
                              },{
                                label:"单箱结构：",
                                value:data.strip+'万元/箱'|| "暂无",
                              },)
            // vm.loading = false
        
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
      // 筛选
      filter() {
        // console.log("000");
        let vm = this;
         if(vm.selectval1 == ""){
            vm.$message({
              message: '请选择时间',
              type: 'warning'
            });
            return false
        }else if(vm.selectval2 == ""){
           vm.$message({
              message: '请选择品规',
              type: 'warning'
            });
            return false
        }else if(vm.selectval3 == ""){
           vm.$message({
              message: '请选择参考禁品',
              type: 'warning'
            });
            return false
        }

        vm.messageshowleft = true
        vm.message3show = true;
        vm.loading = true;
        let domain = hostType(1)
        vm.$axios
        .post(`${domain}`+'/ops_map/api/opsbizpro/',{
            monthly:vm.selectval1,
            product_id :vm.productID,
            comproduct_id:vm.comproduct_id
        }).then(function (response) {
          if(response){
              let newarray = []
              let array = vm.leftlist
              for (let index = 0; index < array.length; index++) {
                  newarray.push( Object.assign({},array[index],{
                    label:index === 0 ? response.data.count_list[0].product_name +"上柜商圈" : response.data.count_list[1].product_name +"上柜商圈",
                    select:false,
                    num:index === 0 ? response.data.count_list[0].num : response.data.count_list[1].num,
                  }))
              }
              vm.leftlist = newarray
              vm.path= response.data.biz_list
              vm.loading = false;
              vm.tableData3 = response.data.data_list;
              vm.num=response.data.data_list.length
            }
          });
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
  .messageshowleft{
    width: auto;
    top:15px;
  }
  .messageshowleft i{
    width: 8px;
    height: 8px;
    display: inline-block;
    vertical-align: middle;
    margin-right: 5px;
    border-radius: 50%;
    background: #409EFF;
  }
  .messageshowleft a{
    display: inline-block;
    vertical-align: middle;
  }
   .messageshowleft p{
     cursor: pointer;
   }

   .messageshowleft a.active{
     color: #409EFF;
   }

  .message3 .titles2{
    padding-left: 15px;
  }
  .right-message-div{
      position: absolute;
      right:15px;
  }  
  .left-message,.right-message-div{
      top:10px;
  } 

    .left-message{
      background: rgba(196, 195, 193, 0.7);
      padding: 10px;
      width: auto;
    }
  .left-message h3{
    font-size: 18px;
    text-align: center;
    color: #ffffff;
  }
  .left-message p{
    background: #ffffff;
    padding:8px 10px;
    border-radius:10px;
    margin: 10px;
    color: #666666;
  }
  .left-message p span{
    display: inline-block;
  } 

  .right-message-1{
      width: 250px;
      padding: 10px 15px;
      background: #ffffff;
  }
  .right-message-1 .titles2{
    margin: 0;
    margin-bottom: 10px;
  }
  .right-message-1 li{
    font-size: 15px;
    padding: 4px 6px;
  }
  .right-message-1 li:nth-child(odd){
      background: #f4f6fa;
  }
  .right-message-2{
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
