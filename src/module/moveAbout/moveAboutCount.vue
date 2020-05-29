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
        <span class="tit">活动名称：</span>
        <el-select v-model="activityName" clearable filterable size="mini" placeholder="请选择">
          <el-option
            v-for="item in activityNameList"
            :key="item.id"
            :label="item.actname"
            :value="item.id"
          ></el-option>
        </el-select>
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
        <el-table-column type="index" label="序号" width="80"></el-table-column>
        <el-table-column prop="act_type" label="活动类型"></el-table-column>
        <el-table-column prop="name" label="活动名称"></el-table-column>
        <el-table-column prop="username" label="业务员"></el-table-column>
        <el-table-column prop="allnum" label="总户数"></el-table-column>
        <el-table-column prop="actnum" label="参与户数"></el-table-column>
        
      </el-table>

      <div class="block" style="margin-top: 20px" v-if="tableData !== 'undefined' && tableData.length > 0">
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
      count: null,
      dist: "", //区
      distlist: [],
      citys: "", //市
      cityslist: [], 
      activityName: "",
      activityNameList:[],
      tableData: [], // 当前list
      // 列表内容
      datelist: null,
      // 导出文件名称
      filename: "活动统计",
    };
  },
  components: {},
  methods: {
    //省级change后，初始化市
    dsyprovinceChange(province) {
      // 重置初始化
      this.distlist = [];
      this.dist = '';
      let pData = this.provinceData;
      pData.forEach((value, key) => {
        if (pData[key].city == province) {
          this.distlist = pData[key].dist;
        }
      });
    },
    // 查询
    filter() {
      let vm = this;
      let domain = hostType(2);
      if (vm.citys === "") {
        alert("请选择必选项");
        return;
      }
      vm.$axios.get(`${domain}`+"/api/activity_stat/?dist="+ vm.dist
            +"&city="+ vm.citys
            +"&activity_id="+ vm.activityName
            +"&p="+ 1
      ).then(function(response) {
          console.log(response.data);
          if(response.data.data.length>0){
            vm.tableData = response.data.data;
            vm.count = response.data.count;
          }else{
            vm.tableData = [];
            vm.count = 0;
          }
          if(vm.i === 1){
            vm.i = 2
            vm.exportExcel()
          }
        });
    },
    handleCurrentChange(event) {
      let vm = this;
      let domain = hostType(2);
        vm.$axios.get(`${domain}`+"/api/activity_stat/?dist="+ vm.dist
            +"&city="+ vm.citys
            +"&activity_id="+ vm.activityName
            +"&p="+ event
      ).then(function(response) {
          console.log(response.data);
          vm.tableData = response.data.data;
          vm.count = response.data.count;
          vm.currentPage = event;
        });
    },
    /*导出*/
    exportExcel (){
      let vm = this;
      let domain = hostType(2);
      vm.$axios.get(`${domain}`+"/api/activity_stat/?dist="+ vm.dist
            +"&city="+ vm.citys
            +"&activity_id="+ vm.activityName
            +"&page_size="+ 5000
      ).then(function(response) {
        console.log(response.data);
        vm.datelist = response.data.data;
      })
        const { export_json_to_excel } = require('@/vendor/Export2Excel');//注意这个Export2Excel路径
        const tHeader = ["序号", "活动类型", "活动名称","总户数", "参与户数", "业务员"];   // 上面设置Excel的表格第一行的标题
        const filterVal = [
          "index",
          "act_type",
          "name",
          "allnum",
          "actnum",
          "username",
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
    vm.$axios.get(`${domain}` + "/api/activity_stat/").then(function(response) {
      let pData = response.data.city_dist;
      vm.provinceData = pData;
      pData.forEach((value, key) => {
        vm.cityslist.push(pData[key].city);
      });
      vm.activityNameList = response.data.activity
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
  margin: 10px 100px 10px 15px;
}
.tuClass {
  margin: 0 6px;
}
.delete {
  cursor: pointer;
  color: #3d8cff;
}
.nodelete {
  color: #bbbbbb;
}
</style>
