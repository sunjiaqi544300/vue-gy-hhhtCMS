<template>
  <div>
    <div class="taskDetailed">
      <div class="addcontent2">
        <div class="tasktop">
          <span class="label">
            <b class="red">*</b>任务:
          </span>
          <el-select clearable v-model="taskvalue" size="mini" placeholder="请选择">
            <el-option
              v-for="item in taskoptions"
              :key="item.taskid"
              :label="item.taskname"
              :value="item.taskid"
            ></el-option>
          </el-select>
        </div>
        <div class="tasktopfile">
          <span class="label">文件:</span>
          <el-input v-model="filename" clearable style="width:150px" placeholder></el-input>
          <el-upload
            style="display:inline-block"
            :limit="1"
            class="upload-demo"
            ref="upload"
            accept=".xls, .xlsx"
            action="/api/task_detail/"
            :file-list="fileList"
            :http-request="uploadSectionFile"
            :auto-upload="true"
          >
            <el-button type="primary" @click="fileimport"  style="margin-left: 10px;">导入</el-button>
            <!-- <el-button style="margin-left: 10px;" size="small" type="primary" @click="fileimport">导入</el-button> -->
          </el-upload>
        </div>
      </div>
      <div class="addcontent3">
        <div class="tasktop">
          <span class="label">
            <b class="red">*</b>市:
          </span>
          <el-select clearable v-model="city" @change="citychange" size="mini" placeholder="请选择">
            <el-option
              v-for="(item,index) in cityList"
              :key="index"
              :label="item.city"
              :value="item.city"
            ></el-option>
          </el-select>
        </div>
        <div class="tasktop">
          <span class="label">区县:</span>
          <el-select clearable v-model="area" size="mini" placeholder="请选择">
            <el-option v-for="(item,index) in areaList" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </div>
        <div class="tasktop">
          <span class="label">任务:</span>
          <el-select
            clearable
            @change="taskchange"
            v-model="taskvalue2"
            size="mini"
            placeholder="请选择"
          >
            <el-option
              v-for="(item,index) in taskoptions2"
              :key="index"
              :label="item.taskname"
              :value="item.taskid"
            ></el-option>
          </el-select>
        </div>
        <div class="tasktop">
          <span class="label">业务员:</span>
          <el-select clearable v-model="Salesman" size="mini" placeholder="请选择">
            <el-option
              v-for="(item,index) in SalesmanList"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </div>
        <div class="tasktop">
          <span class="label">许可证号:</span>
          <el-input v-model="license" size="mini" style="width:150px" placeholder="请输入许可证号"></el-input>
        </div>
        <el-button type="primary" @click="query">查询</el-button>
      </div>
    </div>
    <el-table :data="tableData" border style="width: 100%;margin-top:20px">
      <el-table-column type="index" label="序号" width="60px"></el-table-column>
      <el-table-column prop="task_taskname" label="任务名称"></el-table-column>
      <el-table-column prop="task_type" label="任务类型"></el-table-column>
      <el-table-column prop="userid" label="业务员"></el-table-column>
      <el-table-column prop="license" label="许可证号"></el-table-column>
      <el-table-column prop="shop_name" label="店铺名称"></el-table-column>
      <el-table-column prop="shop_level" label="档位"></el-table-column>
      <el-table-column prop="shop_type" label="经营业态"></el-table-column>
      <el-table-column prop="func_area" label="功能区"></el-table-column>
      <el-table-column prop="biz_dist" label="商圈"></el-table-column>
      <el-table-column prop="main_poi" label="主导环境因子"></el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <span
            :class="[scope.row.is_going===1?'delete':'nodelete']"
            @click="deleteinfo(scope.row)"
          >删除</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="fy" v-if="tableData.length>0">
      <el-pagination
        layout="total,  prev, pager, next, jumper"
        page-size="10"
        @current-change="current_change"
        :total="count"
        background
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { hostType } from "@/api/env.js";
export default {
  data() {
    return {
      taskvalue: "", //任务1
      taskoptions: [],
      filevalue: "", //文件
      filevalueList: [],
      fileList: [],
      city: "", //市
      cityList: [],
      area: "", //区县
      areaList: [],
      Salesman: "", //业务员
      SalesmanList: [],
      taskvalue2: "", //任务2
      taskoptions2: [],
      tableData: [],
      count: "",
      filename: "",
      license:"",//许可证号
    };
  },
  mounted() {
    let domain = hostType(1);
    this.$axios.get(`${domain}` + "/api/task_detail/").then(({ data }) => {
      this.taskoptions = data.tasks;
      this.taskoptions2 = data.tasks;
      this.cityList = data.citys;

      console.log(data);
    });
  },
  methods: {
    citychange() {
      //市区联动
      for (let index = 0; index < this.cityList.length; index++) {
        if (this.city == this.cityList[index].city) {
          this.areaList = this.cityList[index].dist;
        }
      }
    },
    taskchange() {
      //任务业务员联动
      for (let index = 0; index < this.taskoptions2.length; index++) {
        if (this.taskvalue2 == this.taskoptions2[index].taskid) {
          this.SalesmanList = this.taskoptions2[index].salesman;
        }
      }
    },
    uploadSectionFile(param) {
      if (this.taskvalue === "") {
        this.$message({
          type: "warning",
          message: "请选择必选项"
        });
        return false;
      }
      console.log(this.taskvalue);
      console.log(param);
      this.filename = param.file.name;
      let domain = hostType(1);
      var fileObj = param.file;
      let formData = new FormData();
      formData.set("file", param.file);
      formData.set("task_id", this.taskvalue);
      console.log(formData);
      this.$axios
        .post(`${domain}` + "/api/task_detail/", formData, {
          headers: {
            "Content-type": "multipart/form-data"
          }
        })
        .then(data => {
          console.log(data);
          if (data.status === 200) {
            this.$message({
              type: "success",
              message: "上传成功"
            });
            // this.filename = ""
            this.fileList = [];
          } else {
            this.$message({
              type: "error",
              message: "上传失败"
            });
            this.fileList = [];
          }
        });
    },
    fileimport() {
      // if (this.taskvalue === "") {
      //   this.$message({
      //     showClose: true,
      //     message: "请选择任务",
      //     type: "warning"
      //   });
      //   return false;
      // }
    },
    query() {
      let domain = hostType(1);
      if (this.city === "") {
        this.$message({
          message: '请选择必选项',
          type: 'warning'
        });
        return false;
      }
      // this.$axios
      //   .get(`${domain}` +`/api/task_detail/?taskid=${this.taskvalue2?this.taskvalue2:""}
      //     &userid=${this.Salesman?this.Salesman:""}
      //     &dist=${this.area?this.area:""}&city=${this.city}`).then(({data})=>{
      //     console.log(data)
      //   })

      this.$axios
        .get(
          `${domain}` +
            "/api/task_detail/?taskid=" +
            (this.taskvalue2 ? this.taskvalue2 : "") +
            "&userid=" +
            (this.Salesman ? this.Salesman : "") +
            "&dist=" +
            (this.area ? this.area : "") +
            "&city=" +
            this.city +
            "&license="+
            (this.license ? this.license : "")
            
        )
        .then(({ data }) => {
          console.log(data);
          this.tableData = data.results;
          this.count = data.count;
        });
      console.log(this.taskvalue2, this.area, this.city, this.Salesman);
    },
    current_change(page) {
      let domain = hostType(1);
      console.log(page);
      this.$axios
        .get(`${domain}` + "/api/task_detail/?p=" + page + "")
        .then(({ data }) => {
          console.log(data);
          this.tableData = data.results;
          this.count = data.count;
        });
      // this.$axios.get("/hd/api/info_manage/?p=" + page).then(({ data }) => {
      // console.log(data)
      // this.count = data.count;
      // this.next = data.next;
      // this.previous = data.previous;
      // this.$store.state.tableinfo = data.results;
      // this.$store.state.tableinfo = data;
      // });
    },
    deleteinfo(item) {
      console.log(item);
      let domain = hostType(1);
      if (item.is_going === 1) {
        this.$confirm("您要删除此信息吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$axios.delete(`${domain}` + "/api/task_detail/" + item.id + "/").then(data => {
              console.log(data);
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      }else{
        return false;
      }
    }
  }
};
</script>

<style scoped>
.fy {
  margin-top: 20px;
}
.label {
  display: inline-block;
  height: 100%;
  min-width: 40px;
  text-align-last: right;
}
.taskDetailed {
  background: #fff;
  box-shadow: 0 3px 7px #ccc;
  padding: 20px 20px;
}
.addcontent2 {
  display: flex;
  align-items: center;
}
.tasktop,
.tasktopfile {
  margin-right: 10px;
  /* display: flex;
  align-items: center; */
}
.addcontent3 {
  display: flex;
  margin-top: 20px;
}
.red {
  color: red;
}
.delete {
  cursor: pointer;
  color: #3d8cff;
}
.nodelete {
  color: #bbbbbb;
}
</style>