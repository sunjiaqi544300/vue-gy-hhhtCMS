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
        <el-select v-model="activityName" clearable filterable size="mini" placeholder="请选择" @change="activityChange">
          <el-option
            v-for="item in activityNameList"
            :key="item.activity_id"
            :label="item.name"
            :value="item.activity_id"
          ></el-option>
        </el-select>
      </div>
      <div class="selectBox">
        <b class="red"></b>
        <span class="tit">业务员：</span>
        <el-select v-model="users" clearable filterable size="mini" placeholder="请选择">
          <el-option
            v-for="(item, index) in userslist"
            :key="index"
            :label="item[1]"
            :value="item[1]"
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
        <el-table-column prop="user_name" label="业务员"></el-table-column>
        <el-table-column prop="activity_name" label="活动名称"></el-table-column>
        <el-table-column prop="license" label="烟草证号"></el-table-column>
        <el-table-column prop="shop_name" label="店铺名称"></el-table-column>
        <el-table-column prop="shop_type" label="经营业态"></el-table-column>
        <el-table-column prop="shop_level" label="档位"></el-table-column>
        <el-table-column prop="func_area" label="功能区"></el-table-column>
        <el-table-column prop="biz_dist" label="商圈"></el-table-column>
        <el-table-column prop="main_poi" label="主导环境因子"></el-table-column>
        <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <span
            class="delete"
            @click="deleteinfo(scope.row)"
          >删除</span>
        </template>
      </el-table-column>
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
      surveysData: [], // 活动名称列
      currentPage:1,
      count: null,
      dist: "", //区
      distlist: [],
      citys: "", //市
      cityslist: [], 
      activityNameList:[], //活动名称
      activityName:"",
      users: "", //业务员
      userslist: [],
      dataslist: [],
      tableData: [], // 当前list
      tableDatas: [], // 所有数据导出
      // 列表内容
      datelist: null,
      // 导出文件名称
      filename: "活动明细",
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
    //活动名称chenge后，初始化业务员
    activityChange(province) {
      this.userslist = [];
      this.users = '';
      let pData = this.surveysData;
      console.log(province)
      pData.forEach((value, key) => {
        if (pData[key].activity_id == province) {
          this.userslist = pData[key].users;
          return;
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
      vm.$axios.get(`${domain}`+"/api/activity_detail/?"
            +"username="+vm.users
            +"&dist="+ vm.dist
            +"&city="+ vm.citys
            +"&activity_id="+ vm.activityName
      // vm.$axios.get(`${domain}`+"/api/activity_detail/?activity_id=34&username=新城区&dist=新城区市场部&city=呼和浩特"
      ).then(function(response) {
          console.log(response.data);
          vm.tableData = response.data.results;
          vm.count = response.data.count;
          if(vm.i === 1){
            vm.i = 2
            vm.exportExcel()
          }
        });
      
    },
    handleCurrentChange(event) {
      let vm = this;
      let domain = hostType(2);
        vm.$axios.get(`${domain}`+"/api/activity_detail/?p="+ event +"&city="+ vm.citys
      ).then(function(response) {
          console.log(response.data);
          vm.tableData = response.data.results;
          vm.count = response.data.count;
          vm.currentPage = event;
        });
    },
    //删除
    deleteinfo(item) {
      console.log(item);
      let domain = hostType(1);
      this.$confirm("您要删除此信息吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios.delete(`${domain}` + "/api/activity_detail/" + item.id + '/').then(data => {
             if(data){
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            }
            this.handleCurrentChange(this.currentPage)
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "删除失败"
          });
        });
    },
    /*导出*/
    exportExcel (){
      let vm = this;
      let domain = hostType(2);
       vm.$axios.get(`${domain}`+"/api/activity_detail/?"
            +"username="+vm.users
            +"&dist="+ vm.dist
            +"&city="+ vm.citys
            +"&activity_id="+ vm.activityName
            +"&page_size="+ 5000
      ).then(function(response) {
        console.log(response.data);
        vm.datelist = response.data.results;
      })
        const { export_json_to_excel } = require('@/vendor/Export2Excel');//注意这个Export2Excel路径
        const tHeader = ["序号","业务员", "活动名称", "烟草证号", "店铺名称", "经营业态", "档位", "功能区", "商圈", "主导环境因子"];   // 上面设置Excel的表格第一行的标题
        const filterVal = [
          "index",
          "user_name",
          "activity_name",
          "license",
          "shop_name",
          "shop_type",
          "shop_level",
          "func_area",
          "biz_dist",
          "main_poi",
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
    vm.$axios.get(`${domain}` + "/api/activity_detail/").then(function(response) {
      let pData = response.data.citys;
      let pData1 = response.data.surveys;
      vm.provinceData = pData;
      vm.surveysData = pData1;
      pData.forEach((value, key) => {
        vm.cityslist.push(pData[key].city);
      });
      pData1.forEach((value, key) => {
        vm.activityNameList.push({ 'name' : pData1[key].name, 'activity_id' : pData1[key].activity_id});
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
