<template>
  <div class="page">
    <div class="filterBox">
      <div class="selectBox">
        <b class="red">*</b>
        <span class="tit">市：</span>
        <el-select
          v-model="citys"
          clearable
          filterable
          size="mini"
          placeholder="请选择"
          @change="dsyprovinceChange"
        >
          <el-option v-for="(item, index) in cityslist" :key="index" :label="item" :value="item"></el-option>
        </el-select>
      </div>
      <div class="selectBox">
        <b class="red"></b>
        <span class="tit">区县：</span>
        <el-select v-model="dist" clearable filterable size="mini" placeholder="请选择">
          <el-option v-for="(item, index) in distlist" :key="index" :label="item" :value="item"></el-option>
        </el-select>
      </div>
      <div class="selectBox">
        <b class="red"></b>
        <span class="tit">业务员：</span>
        <el-select v-model="users" clearable filterable size="mini" placeholder="请选择">
          <el-option
            v-for="(item, index) in userslist"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </div>
      <div class="selectBox">
        <b class="red">*</b>
        <span class="tit">时间：</span>
        <div class="block" style="display:inline-block">
            <el-date-picker
              style="width:130px;"
              v-model="startTime"
              type="date"
              placeholder="选择日期时间"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptionsStart"
            ></el-date-picker>
          </div>
          <div class="block" style="display:inline-block">-</div>
          <div class="block" style="display:inline-block">
            <el-date-picker
              style="width:130px;"
              v-model="endTime"
              type="date"
              placeholder="选择日期时间"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptionsEnd"
            ></el-date-picker>
          </div>
      </div>
      <el-button size="mini" type="primary"  @click="filter">查询</el-button>
      <el-button size="mini" type="primary" class="export" @click="exportExcel">导出</el-button>
    </div>
    <div class="main">
      <el-table
        id="tb"
        :data="tableData"
        border
        style="width: 96%"
        height="650"
      >
        <el-table-column type="index" width="80" label="序号"></el-table-column>
        <el-table-column prop="taskname" label="拜访任务"></el-table-column>
        <el-table-column prop="userid" label="业务员"></el-table-column>
        <el-table-column prop="total" label="目标户"></el-table-column>
        <el-table-column prop="visitnum" label="拜访户"></el-table-column>
        <el-table-column prop="standard" label="达标户"></el-table-column>
        <el-table-column prop="standardrate" label="达标率%"></el-table-column>
        
      </el-table>

      <div class="block" style="margin-top: 20px" v-if="tableData.length>0">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          layout="total, prev, pager, next, jumper"
          :total="count"
          background
        ></el-pagination>
      </div>
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
    return {
      i:1,
      pageSize:10,
      provinceData: [],
      currentPage:1,
      license: "",
      count: null,
      surveys: "",
      surveyslist: [],
      dist: "", //区
      distlist: [],
      citys: "", //市
      cityslist: [],
      users: "", //业务员
      userslist: [],
      datas: "", //时间
      dataslist: [],
      tableData: [], // 当前list
      tableDatas: [], // 所有数据导出
      startTime: "", //开始时间
      endTime: "", //截止时间
      // 列表内容
      datelist: null,
      // 导出文件名称
      filename: "拜访统计",
      pickerOptionsStart: {
          disabledDate: time => {
            let endDateVal = this.endTime;
            if (endDateVal) {
              return time.getTime() > new Date(endDateVal).getTime();
            }
          }
        },
        pickerOptionsEnd: {
          disabledDate: time => {
            let beginDateVal = this.startTime;
            if (beginDateVal) {
              return (
                time.getTime() <
                new Date(beginDateVal).getTime()-86400000
              );
            }
          }
        },
    };
  },
  components: {},
  methods: {
    //省级change后，初始化市
    dsyprovinceChange(province) {
      // 重置初始化
      this.distlist = [];
      this.dist = '';
      this.userslist = [];
      this.users = '';
      let pData = this.provinceData;
      pData.forEach((value, key) => {
        if (pData[key].city == province) {
          this.distlist = pData[key].dist;
          this.userslist = pData[key].users;
        }
      });
    },
    // 查询
    filter() {
      let vm = this;
      let domain = hostType(2);
      if (vm.citys === "" || vm.startTime === "" || vm.endTime === "") {
        alert("请选择必选项");
        return;
      }
      let postData = {
          user: vm.users,
          dist: vm.dist,
          city: vm.citys,
          sdate: vm.startTime,
          edate: vm.endTime,
          p: 1
      };
      vm.$axios.post(`${domain}`+"/api/visit_stat/",postData).then(function(response) {
          console.log(response.data);
          vm.tableData = response.data.data;
          vm.count = response.data.count;
        });
      if(vm.i === 1){
        vm.i = 2
        vm.exportExcel()
      }
    },
    handleCurrentChange(event) {
      let vm = this;
      let postData = {
          user: vm.users,
          dist: vm.dist,
          city: vm.citys,
          sdate: vm.startTime,
          edate: vm.endTime,
          p: event
      };
      let domain = hostType(2);
       vm.$axios.post(`${domain}`+"/api/visit_stat/",postData).then(function(response) {
          console.log(response.data);
          vm.tableData = response.data.data;
          vm.currentPage = event;
        });
    },
    /*导出*/
    exportExcel (){
      let vm = this;
      let postData = {
          user: vm.users,
          dist: vm.dist,
          city: vm.citys,
          sdate: vm.startTime,
          edate: vm.endTime,
      };
      let domain = hostType(2);
      vm.$axios.post(`${domain}`+"/api/visit_stat/",postData).then(function(response) {
        console.log(response.data);
        vm.datelist = response.data.data;
      })
        const { export_json_to_excel } = require('@/vendor/Export2Excel');//注意这个Export2Excel路径
        const tHeader = ["序号", "拜访任务", "业务员", "目标户", "拜访户", "达标户", "达标率%"];   // 上面设置Excel的表格第一行的标题
        const filterVal = [
          "index",
          "taskname",
          "userid",
          "total",
          "visitnum",
          "standard",
          "standardrate",
         ]; 
        //改造元数据增加序号
        const list =  this.datelist;
        for (let i = 0; i < list.length; i++) {
          list[i].index = i+1
        }
        const data = this.formatJson(filterVal, list);
      // 获取表格数据
      require.ensure([], () => {
        
        export_json_to_excel(tHeader, data, this.filename);//最后一个是表名字
      }).catch(err => {
        console.log("导出失败")
      })
    },
     formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
    }
  },
  mounted() {
    let vm = this;
    let domain = hostType(2);
    vm.$axios.get(`${domain}` + "/api/visit_stat/").then(function(response) {
      let pData = response.data.city_dist;
      console.log(pData);
      vm.provinceData = pData;
      pData.forEach((value, key) => {
        vm.cityslist.push(pData[key].city);
      });
    });
  }
};
</script>

<style scoped>
.selectBox {
  display: inline-block;
  padding: 11px 5px 0 8px;
}

.main {
  padding: 10px 0 10px 20px;
}
.red {
  color: red;
}
.export {
  margin: 10px 25px 10px 15px;
}
</style>
