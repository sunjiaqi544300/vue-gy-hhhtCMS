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
          @change="distFn"
        >
          <el-option
            v-for="(item, index) in cityslist"
            :key="index"
            :label="item.city"
            :value="item.city"
          ></el-option>
        </el-select>
      </div>
      <div class="selectBox">
        <span class="tit">区县：</span>
        <el-select v-model="dist" clearable filterable size="mini" placeholder="请选择">
          <el-option v-for="(item, index) in distlist" :key="index" :label="item" :value="item"></el-option>
        </el-select>
      </div>
      <div class="selectBox">
        <b class="red">*</b>
        <span class="tit">问卷名称：</span>
        <el-select
          v-model="surveys"
          clearable
          filterable
          size="mini"
          placeholder="请选择"
          @change="usersFn"
        >
          <el-option
            v-for="(item, index) in surveyslists"
            :key="index"
            :label="item.name"
            :value="item.survey_id"
          ></el-option>
        </el-select>
      </div>
      <div class="selectBox">
        <b class="red">*</b>
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
      <div class="selectBox">
        <span class="tit">许可证号：</span>
        <el-input v-model="license" placeholder="请输入许可证号" style="width:150px"></el-input>
        <!-- <el-select v-model="level1" clearable filterable size="mini" placeholder="请选择">
          <el-option v-for="(item, index) in level" :key="index" :label="item.level" :value="item.level"></el-option>
        </el-select>-->
      </div>
      <el-button size="mini" type="primary" @click="filter">查询</el-button>
      <el-button size="mini" type="primary" class="export" @click="exportExcel">导出</el-button>
    </div>
    <div class="main">
      <el-table
        ref="multipleTable"
        id="tb"
        :data="tableData"
        tooltip-effect="dark"
        border
        style="width: 96%"
        height="650"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="index" width="85" label="序号"></el-table-column>
        <el-table-column prop="survey_name" label="问卷名称"></el-table-column>
        <el-table-column prop="user_name" label="业务员"></el-table-column>
        <el-table-column prop="license" label="许可证号"></el-table-column>
        <el-table-column prop="shop_name" label="店铺名称"></el-table-column>
        <el-table-column prop="shop_level" label="档位"></el-table-column>
        <el-table-column prop="shop_type" label="经营业态"></el-table-column>
        <el-table-column prop="biz_dist" label="功能区" show-overflow-tooltip></el-table-column>
        <el-table-column prop="func_area" label="商圈"></el-table-column>
        <el-table-column prop="main_poi" label="主导环境因子"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block" style="margin-top: 20px" v-if="tableData.length>0">
        <el-pagination
          @current-change="handleCurrentChange"
          :page-size="15"
          layout="total, prev, pager, next, jumper"
          :total="count"
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
      dialogVisible: false,
      time: "",
      license: "",
      count: "",
      surveys: "",
      level2: "",
      input4: "",
      userslist: [],
      surveyslist: [],
      surveyslists: [],  
      prolist: "",
      surver: "",
      dist: "",
      distlist: [],
      citys: "",
      cityslist: [],
      users: "",
      tableData: [],
      surverlist: [],
      multipleSelection: [],
      time1: "",
      downmass: "",
      upmass: "",
      shop_list: [],
      timeone: "",
      level1one: "",
      level2one: "",
      funcone: "",
      prolistone: "",
      submitall: false,
      newPar: {}
    };
  },
  components: {},
  methods: {
    // 查询
    filter() {
      let vm = this;
      let domain = hostType(2);
      if (vm.surveys === "" || vm.users === "" || vm.citys === "") {
        alert("请选择必选项");
        return;
      }
      vm.$axios
        .get(
          `${domain}` +
            "/api/survey_detail/?survey_id=" +
            vm.surveys +
            "&username=" +
            vm.users +
            "&dist=" +
            vm.dist +
            "&city=" +
            vm.citys +
            "&license=" +
            vm.license
        )
        .then(function(response) {
          console.log(response.data);
          vm.tableData = response.data.results;
          vm.count = response.data.count;
          vm.downmass = response.data.next;
          vm.upmass = response.data.previous;
        });
    },
    handleDelete(index, row) {
      console.log(index, row.id);
      var vm = this;
      let domain = hostType(2);
      vm.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          vm.$message({
            type: "success",
            message: "删除成功!"
          });
          vm.$axios
            .delete(`${domain}` + "/api/survey_detail/" + row.id + "/")
            .then(function(response) {
              console.log(response.data);
              vm.$axios
                .get(
                  `${domain}` +
                    "/api/survey_detail/?survey_id=" +
                    vm.surveys +
                    "&username=" +
                    vm.users +
                    "&dist=" +
                    vm.dist +
                    "&city=" +
                    vm.citys +
                    "&license=" +
                    vm.license
                )
                .then(function(response) {
                  console.log(response.data);
                  vm.tableData = response.data.results;
                  vm.count = response.data.count;
                  vm.downmass = response.data.next;
                  vm.upmass = response.data.previous;
                });
            });
        })
        .catch(() => {
          vm.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      var vm = this;
      let domain = hostType(2);
      vm.$axios
        .get(
          `${domain}` +
            "/api/survey_detail/?survey_id=" +
            vm.surveys +
            "&username=" +
            vm.users +
            "&dist=" +
            vm.dist +
            "&city=" +
            vm.citys +
            "&license=" +
            vm.license +
            "&p=" +
            `${val}`
        )
        .then(({ data }) => {
          console.log(data);
          // console.log(data)
          vm.tableData = data.results;
          vm.count = data.count;
          vm.downmass = data.next;
          vm.upmass = data.previous;
        });
    },
    // 提交
    submit() {
      this.dialogVisible = true;
      var vm = this;
      let date_value1 = "";
      var date1 = new Date(vm.time1);
      date_value1 = vm.dadeFn(date1);
      let domain = hostType(2);
      vm.$axios
        .get(`${domain}` + "/madmin/api/activity_list/")
        .then(function(response) {
          console.log(response.data);
          vm.surverlist = response.data.results;
        });
    },
    //确定
    sure() {
      this.dialogVisible = false;
      let date_value1 = "";
      var date1 = new Date(this.time1);
      date_value1 = this.dadeFn(date1);
      console.log(date_value1);
      console.log(this.surver);
      var vm = this;
      let domain = hostType(2);
      vm.shop_list = [];
      for (let index = 0; index < vm.multipleSelection.length; index++) {
        vm.shop_list.push({
          user_type: 1,
          s_id: vm.surver,
          license: vm.multipleSelection[index].license,
          closingdate: date_value1,
          begindate: date_value1
        });
      }
      if (vm.submitall == false) {
        vm.$axios
          .post(`${domain}` + "/madmin/api/bshop_list/", {
            shop_list: vm.shop_list,
            type: 2
          })
          .then(function(response) {
            console.log(response.data);
            vm.$message({
              message: "提交成功",
              type: "success"
            });
          });
      } else {
        console.log("999999999");

        let objs = {
          min_level: vm.level1one,
          max_level: vm.level2one,
          contact_win: vm.timeone,
          func_area: vm.funcone,
          shop_type: vm.prolistone
        };
        function filterParams(obj) {
          let _newPar = {};
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
          console.log(_newPar);
          vm.newPar = _newPar;
          console.log(vm.newPar);
          return _newPar;
        }

        filterParams(objs);
        vm.$axios
          .post(`${domain}` + "/madmin/api/shops/", {
            search_fields: vm.newPar,
            type: 1,
            s_id: vm.surver,
            user_type: 2,
            closingdate: date_value2,
            begindate: date_value1
          })
          .then(function(response) {
            console.log(response.data);
            vm.submitall = false;
            vm.$message({
              message: "提交成功",
              type: "success"
            });
          });
      }
    },
    downFn() {
      let vm = this;
      vm.$axios.get(`${vm.downmass}`).then(function(response) {
        console.log(response.data);
        vm.tableData = response.data.results;
        vm.downmass = response.data.next;
        vm.upmass = response.data.previous;
      });
    },
    upFn() {
      let vm = this;
      vm.$axios.get(`${vm.upmass}`).then(function(response) {
        console.log(response.data);
        vm.tableData = response.data.results;
        vm.downmass = response.data.next;
        vm.upmass = response.data.previous;
      });
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
    dadeFn(time) {
      var mymonth = time.getMonth() + 1;
      var myweekday = time.getDate();
      if (mymonth < 10) {
        mymonth = "0" + mymonth;
      }
      if (myweekday < 10) {
        myweekday = "0" + myweekday;
      }
      return time.getFullYear() + "-" + mymonth + "-" + myweekday;
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },
    // 区县联动
    distFn() {
      let vm = this;
      vm.dist = "";
      for (let index = 0; index < vm.cityslist.length; index++) {
        if (vm.citys == vm.cityslist[index].city) {
          vm.distlist = vm.cityslist[index].dist;
        }
      }
       for (let index = 0; index < vm.surveyslist.length; index++) {
        if (vm.citys == vm.surveyslist[index].city) {
          vm.surveyslists.push({
            name: vm.surveyslist[index].name,
            survey_id: vm.surveyslist[index].survey_id,
          }) 
        }
      }
      console.log(vm.surveyslists);
    },
    // 业务员联动
    usersFn() {
      let vm = this;
      vm.users = "";
      for (let index = 0; index < vm.surveyslist.length; index++) {
        if (vm.surveys == vm.surveyslist[index].survey_id && vm.citys == vm.surveyslist[index].city) {
          vm.userslist = vm.surveyslist[index].users;
        }
      }
    }
  },
  mounted() {
    let vm = this;
    let domain = hostType(2);
    vm.$axios.get(`${domain}` + "/api/survey_detail/").then(function(response) {
      console.log(response.data);
      vm.cityslist = response.data.citys;

      // vm.func_area = response.data.func_area
      // vm.shop_type = response.data.shop_type
      vm.surveyslist = response.data.surveys;
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
</style>
