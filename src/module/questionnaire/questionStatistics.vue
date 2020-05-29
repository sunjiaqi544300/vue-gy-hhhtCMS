<template>
  <!-- 问卷管理-问卷统计 -->
  <div class="businessCircleAnalysis" id="businessCircleAnalysis">
    <div class="filterBox">
      <div class="selectBox">
        <span class="tit">
          <span class="must-span">*</span>问卷名称：
        </span>
        <el-select v-model="selectval1" clearable filterable size="mini" placeholder="请选择">
          <el-option
            v-for="(item, index) in selectlist1"
            :key="index"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>
      <div class="selectBox">
        <span class="tit">
          <span class="must-span">*</span>市：
        </span>
        <el-select v-model="city" clearable filterable size="mini" @change="distFn" placeholder="请选择">
          <el-option
            v-for="(item, index) in citylist"
            :key="index"
            :label="item.city"
            :value="item.city"
          ></el-option>
        </el-select>
      </div>
        <div class="selectBox">
        <span class="tit">
          <span class="must-span">*</span>区县：
        </span>
        <el-select v-model="dist" clearable filterable size="mini" placeholder="请选择">
          <el-option
            v-for="(item, index) in distlist"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </div>
      <el-button size="mini" type="primary" style="margin-left:2%" @click="filter">查询</el-button>
    </div>

    <el-button type="primary" class="tabtitle" @click="tabtitleFn">{{tabtitle}}</el-button>
    <el-button v-show="!boxechartshow" type="primary" class="tabtitle1" @click="exportExcel">导出</el-button>
    <div class="boxechart" v-show="boxechartshow">
      <div v-for="(item,index) in problemList" :key="item.question_id" class="echartlist">
        <p>
          {{index+1}}.{{item.question}}({{item.q_type}})
          <span v-if="item.q_type=='矩阵题'">{{item.sonquestion}}</span>
          <span v-else-if="item.q_type=='多项填空'">{{item.sonquestion}}</span>
        </p>
        <!-- <p v-show="item.q_type === '单选题'">999</p> -->
        <ve-pie
          v-show="item.q_type === '单选题'"
          :data="eval2('chartDataone'+index)"
          :extend="chartSettings"
        ></ve-pie>
        <ve-pie
          v-show="item.q_type === '问答题'"
          :data="eval2('chartDataone'+index)"
          :extend="chartSettings"
        ></ve-pie>
        <ve-pie
          v-show="item.q_type ==='单选填空'"
          :data="eval2('chartDataone'+index)"
          :extend="chartSettings"
        ></ve-pie>
        <ve-bar
          v-show="item.q_type === '多选题'"
          :data="eval2('chartDataone'+index)"
          :extend="chartSettingsbar"
        ></ve-bar>
        <div v-show="item.q_type === '矩阵题' ">
          <ve-pie :data="eval2('chartDataone'+index)" :extend="chartSettings"></ve-pie>
        </div>
        <div v-show="item.q_type === '多项填空' ">
          <ve-pie :data="eval2('chartDataone'+index)" :extend="chartSettings"></ve-pie>
        </div>
        <ve-pie
          v-show="item.q_type ==='评分题'"
          :data="eval2('chartDataone'+index)"
          :extend="chartSettings"
        ></ve-pie>
        <!-- 排序题 -->
        <ve-bar
          v-show="item.q_type ==='排序题'"
          :data="eval2('chartDataone'+index)"
          :extend="chartSettingssort"
        ></ve-bar>
      </div> 
    </div>
    <div v-show=" !boxechartshow" class="eltable">
      <!-- <el-table :data="headlist" height="600" border style="width: 98%"> -->
      <el-table :data="headlist" style="width: 100%" height="600" border>
        <template v-for="(col ,index) in cols">
          <el-table-column :key="index" :prop="col.prop" :label="col.label"></el-table-column>
        </template>
      </el-table>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { hostType } from "@/api/env.js";
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  name: "page",
  data() {
    this.chartSettings = {
      series: {
        type: "pie",
        barWidth: 20, //柱图 -- 条宽度
        radius: "50%",
        label: {}
      },
      legend: {
        top: "5%"
      },
      grid: {
        // 调整位置
        left: "3%",
        right: "4%",
        height: "60%"
      }
    };
    this.chartSettingssort = {
      stack: { //堆叠需要的参数
        xxx: [
         
        ]
      },
      xAxis: {
        axisLabel: {
          interval:20,
          formatter:function(value){  //获取X轴的文本信息
            return `${value}%` 
          } 
        },
      },
      legend: {
        top: "2%"
      },
      grid: {
        // 调整位置
        left: "3%",
        right: "4%",
        height: "60%"
      }
    };
    this.chartSettingsbar = {
      series: {
        type: "bar",
        barWidth: 20, //柱图 -- 条宽度
        radius: "50%",
        label: {}
      },
      legend: {
        top: "5%"
      },
      grid: {
        // 调整位置
        left: "3%",
        right: "4%",
        height: "60%"
      }
    };
    return {
      citylist: [],
      city: "",
      cols: [],
      distlist:[],
      dist:"",
      headlist: [],
      tabtitle: "问卷明细",
      flag: false,
      boxechartshow: true,
      selectval1: "",
      selectlist1: [],
      diatlist: [],
      county: "",
      infoList: {
        // chartDataone0: {columns: ["分类", "占比"],rows: []}
      },
      problemList: [],
      problemListchild: [],
      newArr: [],
      keyMap:[],
      rankarr:[]
      // chartDataone:[],
    };
  },
  components: {},
  created() {
    this.countlength();
  },
  mounted() {
    let vm = this;
    let domain = hostType(1);
    vm.$axios
      .get(`${domain}` + "/api/survey_stat/")
      .then(function(response) {
        console.log(response);
        vm.citylist = response.data.data.city;
        vm.selectlist1 = response.data.data.survey;
      });
  },
  methods: {
    distFn(){
      for (let index = 0; index < this.citylist.length; index++) {
        if(this.city =  this.citylist[index].city){
          this.distlist = this.citylist[index].dist
        }
        
      }
    },
    /*导出*/
    exportExcel() {
      const { export_json_to_excel } = require("@/vendor/Export2Excel"); //注意这个Export2Excel路径
      const tHeader = [];
      const filterVal = [];
      // console.log(this.cols)
      this.cols.forEach(v => {
        tHeader.push(v.label);
        filterVal.push(v.prop);
      });
      const list = this.headlist; //把要导出的数据tableData存到list
      const data = this.formatJson(filterVal, list);
      // 获取表格数据
      require
        .ensure([], () => {
          export_json_to_excel(tHeader, data, this.filename); //最后一个是表名字
        })
        .catch(err => {
          console.log("导出失败");
        });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    // 限制题数
    countlength() {
      for (let i = 0; i < 60; i++) {
        this.$set(this.infoList, "chartDataone" + i, {
          columns: ["分类", "占比"],
          rows: []
        });
      }
    },
    // countyFn() {//联动
    //   this.county = "";
    //   for (let index = 0; index < this.citylist.length; index++) {
    //     if (this.city == this.citylist[index].city) {
    //       this.diatlist = this.citylist[index].dist;
    //     }
    //   }
    // },
    filter() {
      console.log("筛选");
      if (this.selectval1 === ""||this.dist === ""||this.city === "") {
        this.$message({
          message: "请填写必选项",
          type: "warning"
        });
        return false;
      }
      let domain = hostType(1);
      this.$axios
        // .get(`${domain}` + "/api/survey_stat/?s_id="+this.selectval1)
        .get(`${domain}` + "/api/survey_stat/?s_id="+this.selectval1+"&dist="+ this.dist+ "&city="+ this.city)
        .then(res => {
          console.log(res);
          let data = res.data.data;
          for (let i = 0; i < data.length; i++) {
            eval(this.infoList["chartDataone" + i]).rows = [];
            if (data[i].q_type === "单选题") {
              // console.log(data[i].data)
              data[i].data.forEach(v => {
                eval(this.infoList["chartDataone" + i]).rows.push({
                  分类: v.answer,
                  占比: v.num
                });
                console.log(eval(this['chartDataone' + i]))
              });
              console.log(data[i]);
            } else if (data[i].q_type === "多选题") {
              eval(this.infoList["chartDataone" + i]).columns[1] = "数量";
              data[i].data.forEach(v => {
                // console.log(data[i], 11111)
                eval(this.infoList["chartDataone" + i]).rows.push({
                  分类: v.answer,
                  数量: v.num
                });
              });
            } else if (data[i].q_type === "单选填空") {
              // console.log(data[i], 11111)
              data[i].data.forEach(v => {
                eval(this.infoList["chartDataone" + i]).rows.push({
                  分类: v.answer,
                  占比: v.rate
                });
              });
            } else if (data[i].q_type === "问答题") {
              // console.log(data[i], 11111)
              data[i].data.forEach(v => {
                eval(this.infoList["chartDataone" + i]).rows.push({
                  分类: v.answer,
                  占比: v.rate
                });
              });
            } else if (data[i].q_type === "矩阵题") {
              data[i].data.forEach(v => {
                eval(this.infoList["chartDataone" + i]).rows.push({
                  分类: v.answer,
                  占比: v.rate
                });
              });
            } else if (data[i].q_type === "多项填空") {
              // console.log(data[i], 11111)
              data[i].data.forEach(v => {
                eval(this.infoList["chartDataone" + i]).rows.push({
                  分类: v.answer,
                  占比: v.rate
                });
              });
            } else if (data[i].q_type === "评分题") {
              // console.log(data[i], 11111)
              data[i].data.forEach(v => {
                eval(this.infoList["chartDataone" + i]).rows.push({
                  分类: v.answer,
                  占比: v.rate
                });
              });
            } else if (data[i].q_type === "排序题") {
              console.log(data[i], 11111);
              let arrkey = []
              eval(this.infoList["chartDataone" + i]).columns = [];
              data[i].data.forEach((v,k)=>{
                arrkey.push(v.answer)
                this.rankarr.push(`第${k+1}位`) //头信息
              })
              console.log(arrkey)
              this.chartSettingssort.stack.xxx = arrkey
              vm.keyMap = {
                answer: "选项",
                rank1: this.rankarr[0],
                rank2: this.rankarr[1],
                rank3: this.rankarr[2],
                rank4: this.rankarr[3],
                rank5: this.rankarr[4],
                rank6: this.rankarr[5],
                rank7: this.rankarr[6],
                rank8: this.rankarr[7],
                rank9: this.rankarr[8],
                rank10: this.rankarr[9]
              };
              data[i].data.forEach((v,k) => { //替换键
                let objs = Object.keys(v).reduce((newData, key) => {
                  let newKey = vm.keyMap[key] || key; //替换key 
                  newData[newKey] = v[key];                                                                                                                                                                                         
                  return newData;
                }, {});
                console.log(objs);
                eval(this.infoList["chartDataone" + i]).columns.push(`第${k+1}位`);
                eval(this.infoList["chartDataone" + i]).rows.unshift(objs);
              });
              eval(this.infoList["chartDataone" + i]).columns.unshift("选项");
              console.log(eval(this.infoList["chartDataone" + i]));
            }
          }

      

          this.problemList = data;
        });
      //  表格数据
      var vm = this;
      vm.headlist = [];
      vm.$axios
        // company    survey_id
        .get(
          `${domain}` + "/api/question_stat/?survey_id=" + vm.selectval1
        )
        .then(function(response) {
          vm.headlist = [];
          vm.cols = []
          vm.headlist = response.data.data.data;
          for (const key in vm.headlist[0]) {
            vm.cols.push({
              label: vm.headlist[0][key],
              prop: key
            });
          }
          // console.log(vm.cols)
          vm.headlist.shift();
        });
    },
    eval2(data) {
      return eval(this.infoList[data]);
    },
    tabtitleFn() {
      this.flag = !this.flag;
      if (this.flag) {
        this.tabtitle = "图表展示";
        this.boxechartshow = false;
      } else {
        this.tabtitle = "问卷明细";
        this.boxechartshow = true;
      }
    }
  }
};
</script>

<style scoped>
.selectBox {
  display: inline-block;
  padding: 11px 5px 0 8px;
}

.echartlist {
  padding: 10px;
  width: 50%;
  margin: auto;
  height: auto;
}

#businessCircleAnalysis {
  overflow-y: scroll;
  box-sizing: border-box;
}

.tabtitle {
  margin-left: 70%;
}

.tabtitle1 {
  margin: 0 10px;
}
.el-table {
  margin: 5px auto;
}

.eltable {
  width: 99%;
  /* border: solid 1px; */
  margin: 20px 5px;
}
</style>
