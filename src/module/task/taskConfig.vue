<template>
  <div>
    <div class="taskDetailed">
      <div class="addcontent2">
        <div class="tasktop">
          <span class="label"><b class="red">*</b>任务名称:</span>
          <el-select clearable v-model="taskvalue" size="mini" placeholder="请选择">
            <el-option
              v-for="item in taskoptions"
              :key="item.taskid"
              :label="item.taskname"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <div class="tasktop">
          <span class="label"><b class="red">*</b>零售户类型:</span>
          <el-select clearable v-model="licensevalue" size="mini" placeholder="请选择">
            <el-option
              v-for="(item,index) in licensetype"
              :key="index"
              :label="item.license_type"
              :value="item.license_type"
            ></el-option>
          </el-select>
        </div>
        <div class="tasktop">
          <span class="label">零售户标签:</span>
          <el-select clearable v-model="licenselabel" size="mini" placeholder="请选择">
            <el-option
              v-for="(item,index) in licenselabelList"
              :key="index"
              :label="item.license_label"
              :value="item.license_label"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="query">
        <el-button type="primary" @click="query">查询</el-button>
      </div>
    </div>
    <el-table :data="tableData" border style="width: 100%;margin-top:20px">
      <el-table-column type="index" label="序号" width="60px"></el-table-column>
      <el-table-column prop="task_taskname" label="任务名称"></el-table-column>
      <el-table-column prop="license" label="许可证号"></el-table-column>
      <el-table-column prop="shop_name" label="零售户名称"></el-table-column>
      <el-table-column prop="shop_address" label="地址"></el-table-column>
      <el-table-column prop="phone_no" label="联系方式"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <span class="delete" @click="deleteinfo(scope.row.id)">删除</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="btn">
      <el-button type="primary" @click="dialogVisible = true ">全部配置活动</el-button>
      <el-button type="primary" @click="dialogVisible2 = true">全部配置问卷</el-button>
    </div>
    <div class="fy" v-if="tableData.length>0">
      <el-pagination
        layout="total,  prev, pager, next, jumper"
        @current-change="current_change"
        :total="count"
        background
      ></el-pagination>
    </div>
    <el-dialog title="活动配置" :visible.sync="dialogVisible" width="25%">
      <div class="tasktop active">
        <span>活动名称:</span>
        <el-select clearable v-model="activevalue" size="mini" placeholder="请选择">
          <el-option
            v-for="item in activeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="configureact">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="问卷配置" :visible.sync="dialogVisible2" width="25%">
      <div class="tasktop active">
        <span>问卷名称:</span>
        <el-select clearable v-model="qusvalue" size="mini" placeholder="请选择">
          <el-option v-for="item in qusList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </div>
      <div class="tasktop active qusleft">
        <span>截止日期:</span>
        <el-date-picker
          style="width:150px"
          v-model="endTime"
          type="datetime"
          placeholder="选择日期时间"
        ></el-date-picker>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="configureqst">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { hostType } from "@/api/env.js";
export default {
  data() {
    return {
      taskvalue: "", //任务名称
      taskoptions: [],
      licensevalue: "", //零售户类型
      licensetype: [],
      licenselabel: "", //零售户标签
      licenselabelList: "",
      tableData: [], //表格数据
      dialogVisible: false,
      dialogVisible2: false,
      activevalue: "", //活动名称
      activeList: [],
      qusvalue: "", //问卷名称
      qusList: [],
      endTime: "", //截至日期
      startTimeList: [],
      count: "" //分页总页数
    };
  },
  methods: {
    timechange(time) {
      //转时间格式
      const d = time;
      const resDate =
        d.getFullYear() +
        "-" +
        this.p(d.getMonth() + 1) +
        "-" +
        this.p(d.getDate());
      const resTime =
        this.p(d.getHours()) +
        ":" +
        this.p(d.getMinutes()) +
        ":" +
        this.p(d.getSeconds());
      return `${resDate} ${resTime}`;
      // console.log(resTime)
    },
    p(s) {
      //补零使用
      return s < 10 ? "0" + s : s;
    },
    query() {
      if(this.taskvalue==="" || this.licensevalue===""){
        this.$message({
          message: '请选择必选项',
          type: 'warning'
        });
        return false
      }
      // /api/task_config/?taskid=&license_type=&license_label=
      let domain = hostType(1);
      this.$axios
        .get(
          `${domain}` +
            `/api/task_config/?taskid=${
              this.taskvalue ? this.taskvalue : ""
            }&license_type=${
              this.licensevalue ? this.licensevalue : ""
            }&license_label${this.licenselabel ? this.licenselabel : ""}`
        )
        .then(({ data }) => {
          this.count = data.count;
          this.tableData = data.results;
        });
    },
    deleteinfo(id) {
      let domain = hostType(1);
      this.$confirm("您要删除此信息吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .delete(`${domain}` + "/api/task_config/" + id + "/")
            .then(data => {
              this.query()
              console.log(data);
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            });
        })
        .catch((err) => {
          console.log(err)
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    configureact() {
      let domain = hostType(1);
      this.dialogVisible = false;
      this.$axios
        .post(`${domain}` + "/api/task_config/", {
          task_id: this.taskvalue,
          license_type: this.licensevalue,
          license_label: this.licenselabel?this.licenselabel:"",
          p_type: 0,
          activity_id: this.activevalue
          // survey_id: "",
          // end_time: null
        })
        .then(data => {
          if (data.status === 201) {
            this.$message({
              type: "success",
              message: "配置成功!"
            });
          }
          console.log(data);
        });
    },
    configureqst() {
      let domain = hostType(1);
      console.log(this.timechange(this.endTime))
      this.dialogVisible2 = false;
      this.$axios
        .post(`${domain}` + "/api/task_config/", {
          task_id: this.taskvalue,
          license_type: this.licensevalue,
          license_label: this.licenselabel?this.licenselabel:"",
          p_type: 1,
          // activity_id: this.activevalue
          survey_id: this.qusvalue,
          end_time: this.timechange(this.endTime)
        })
        .then(data => {
          if (data.status === 201) {
            this.$message({
              type: "success",
              message: "配置成功!"
            });
          }
          console.log(data);
        });
    },
    current_change(page) {
      let domain = hostType(1);
      this.$axios
        .get(`${domain}` + "/api/task_config/?p=" + page + "")
        .then(({ data }) => {
          this.tableData = data.results;
          this.count = data.count;
        });
    }
  },
  mounted() {
    let domain = hostType(1);
    this.$axios.get(`${domain}` + "/api/task_config/").then(({ data }) => {
      this.taskoptions = data.tasks;
      this.licensetype = data.shop_type;
      this.licenselabelList = data.shop_label;
      this.activeList = data.activitys;
      this.qusList = data.surveys;
      console.log(data);
    });
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
  min-width: 60px;
  text-align-last: right;
}
.taskDetailed {
  background: #fff;
  box-shadow: 0 3px 7px #ccc;
  padding: 20px 20px;
  display: flex;
}
.query {
  margin-left: 20px;
}
.addcontent2 {
  display: flex;
  align-items: center;
}
.tasktop,
.tasktopfile {
  margin-right: 20px;
}
.active {
  margin-left: 40px;
}
.qusleft {
  margin-top: 20px;
}
.btn {
  margin: 20px;
}
.delete {
  cursor: pointer;
  color: #3d8cff;
}
.red{
  color: red;
}
</style>