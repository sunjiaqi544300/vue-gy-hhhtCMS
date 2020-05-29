<template>
  <div>
    <div class="addcontent">
      <div>
        <span>任务列表</span>
      </div>
      <div style="margin-right:50px">
        <span class="label">
          时间：
        </span>
        <el-select v-model="Timevalue" clearable size="mini" placeholder="请选择">
          <el-option
            v-for="item in Timeoptions"
            :key="item.value"
            :label="item.monthly"
            :value="item.monthly"
          ></el-option>
        </el-select>
        <el-button type="primary" @click="query" style="margin-left:20px">查询</el-button>
      </div>
    </div>
    <el-table :data="tableData" max-height="500" border style="width: 100%;margin-top:20px">
      <el-table-column prop="id" label="ID" width="180"></el-table-column>
      <el-table-column prop="taskname" label="任务名称" width="180">
        <template slot-scope="scope">
          <span v-if="scope.row.edit===true">
            <el-input v-model="scope.row.taskname" clearable></el-input>
          </span>
          <span v-if="scope.row.edit===false">{{scope.row.taskname}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="tasktype" label="任务类型">
        <template slot-scope="scope">
          <span v-if="scope.row.edit===true">
            <!-- <el-input v-model="scope.row.tasktype"></el-input> -->
            <el-select clearable v-model="scope.row.tasktype" placeholder="请选择">
              <el-option
                v-for="item in taskoptions"
                :key="item.value"
                :label="item.tasktype"
                :value="item.tasktype"
              ></el-option>
            </el-select>
          </span>
          <span v-if="scope.row.edit===false">{{scope.row.tasktype}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="taskdesc" label="备注">
        <template slot-scope="scope">
          <span v-if="scope.row.edit===true">
            <el-input v-model="scope.row.taskdesc" clearable></el-input>
          </span>
          <span v-if="scope.row.edit===false">{{scope.row.taskdesc}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="begin_time" label="开始时间">
        <template slot-scope="scope">
          <span v-if="scope.row.edit===true">
            <el-input v-model="scope.row.begin_time" clearable></el-input>
          </span>
          <span v-if="scope.row.edit===false">{{scope.row.begin_time}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="end_time" label="结束时间" >
        <template slot-scope="scope">

          <span v-if="scope.row.edit2===true">
            <el-input clearable v-model="scope.row.end_time"></el-input>
          </span>
          <span v-if="scope.row.edit2===false">{{scope.row.end_time}}</span>

          <!-- <span v-if="scope.row.edit2===true">
            <el-input v-model="scope.row.end_time"></el-input>
          </span> -->
          <!-- <span v-if="scope.row.edit2===false">{{scope.row.end_time}}</span> -->
          
        </template>
      </el-table-column>
      <el-table-column prop="state" label="执行状态"></el-table-column>
      <el-table-column prop="status" label="是否有效">
        <template slot-scope="scope">
          <!-- <span>{{scope.row.status===0?"有效":"无效"}}</span> -->
          <span v-if="scope.row.edit2===true">
            <el-input clearable v-model="scope.row.status" placeholder="输入0(有效)或1(无效)"></el-input>
          </span>
          <span v-if="scope.row.edit2===false">{{scope.row.status==1?"有效":"无效"}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <!-- <span class="editinfo" @click="editinfo(scope.row)">编辑</span> -->
          <span v-if="scope.row.edit2===true">
            <el-button type="text" size="medium" @click="editinfo(scope.row)">
              <i class="el-icon-check" aria-hidden="true"></i>
            </el-button>
          </span>
          <span v-else>
            <el-button type="text" size="medium" @click="editchange(scope.row)">
              <i class="el-icon-edit" aria-hidden="true"></i>
            </el-button>
          </span>
        </template>
      </el-table-column>
    </el-table>
    <div class="addquery">
      <div class="addcontenttwo">
        <span>任务添加</span>
      </div>
      <div class="querycon">
        <div class="query">
          <div class="tasktype">
            <span>
              <b class="red">*</b>任务类型:
            </span>
            <el-select clearable v-model="taskvalue" size="mini" placeholder="请选择">
              <el-option
                v-for="item in taskoptions"
                :key="item.value"
                :label="item.tasktype"
                :value="item.tasktype"
              ></el-option>
            </el-select>
          </div>
          <div class="taskname">
            <span>
              <b class="red">*</b>任务名称:
            </span>
            <el-input v-model="taskname" clearable style="width:150px" placeholder="请输入内容"></el-input>
          </div>
          <div class="taskproduct">
            <span>月份:</span>
            <el-input v-model="monthlys" clearable onkeyup="this.value=this.value.replace(/[^\d.]/g,'');" maxlength="6"  @change="monthyz" style="width:150px" placeholder="请输入月份(202012)"></el-input>
            <!-- <el-select v-model="taskproduct" size="mini" placeholder="请输入月份">
              <el-option
                v-for="item in productoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>-->
          </div>
          <div class="taskproduct sttimes">
            <span style="display:inline-block'width:65px">
              <b class="red">*</b>任务时间:
            </span>
            <div class="block">
              <el-date-picker
              clearable
                style="width:125px;"
                v-model="startTime"
                type="datetime"
                placeholder="选择日期"
              ></el-date-picker>
            </div>
            <span style="margin:0 10px">-</span>
            <div class="block">
              <el-date-picker
              clearable
                v-model="endTime"
                style="width:125px"
                type="datetime"
                placeholder="选择日期"
              ></el-date-picker>
            </div>
          </div>
        </div>
        <div class="query2">
          <div class="textarea">
            <span style="margin-left:39px">备注:</span>
            <el-input
            clearable
              style="width:400px"
              type="textarea"
              :autosize= "{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容"
              v-model="textarea"
              maxlength="100"
              show-word-limit
            ></el-input>
          </div>
          <div class="addtask">
            <el-button type="primary" @click="addtask">添加</el-button>
          </div>
        </div>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
import { hostType } from "@/api/env.js";
export default {
  data() {
    return {
      Timeoptions: [],
      Timevalue: "",
      tableData: [],
      taskoptions: [], //任务类型
      taskvalue: "",
      taskname: "",
      taskproduct: "",
      productoptions: [],
      startTime: "",
      endTime: "",
      textarea: "",
      status: "",
      monthlys: "" //月份
    };
  },
  methods: {
    monthyz(){
      // if(this.monthlys.length>=0){

      // }
    },
    addtask() {
      //添加问卷
      if (
        this.taskvalue === "" ||
        this.taskname === "" ||
        this.startTime === "" ||
        this.endTime === ""
      ) {
        this.$message({
          message: "请选择必选项",
          type: "warning"
        });
        return false;
      }
      let start2 = this.timechange(this.startTime).
        replace(new RegExp("-", "gm"), "/");
      let end2 = this.timechange(this.endTime)
        .replace(new RegExp("-", "gm"), "/");
      start2 = new Date(start2).getTime(); //任务开始时间
      end2 = new Date(end2).getTime(); //任务结束时间
      if (start2 > end2) {
        this.$message({
          message: "任务结束时间不能超过任务开始时间",
          type: "warning"
        });
        return false;
      }
      let start = this.timechange(this.startTime).substring(5,7) //跨月 截取月份的时间
      let end = this.timechange(this.endTime).substring(5,7)
      console.log(start,end)
      if (end !== start) { 
        this.$message({
          message: "不能跨月选择",
          type: "warning"
        });
        return false;
      }
      let domain = hostType(1);
      this.$axios
        .post(`${domain}` + `/api/tasks/`, {
          taskname: this.taskname,
          tasktype: this.taskvalue,
          taskdesc: this.textarea,
          monthly: this.monthlys,
          begin_time: this.timechange(this.startTime),
          end_time: this.timechange(this.endTime)
        })
        .then(data => {
          console.log(data);
          if (data.status == 201) {
            this.$message({
              message: "添加成功",
              type: "success"
            });
            this.query()
          }
          // this.tableData = [data.data];
          // console.log(this.tableData );
        });
    },
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
    editchange(item) {
      if (item.state === "待执行") {
        item.edit = true;
        item.edit2 = true
      } else if (item.state === "执行中" || item.state === "进行中") {
        item.edit2 = true;
      } else {
        this.$message({
          message: "只有待执行活动才能编辑",
          type: "warning"
        });
      }
    },
    editinfo(item) {
      //编辑
      // this.edit = true;
      console.log(item.state === "执行中");
      let domain = hostType(1);
      if (item.state === "待执行") {
        item.edit = false;
        item.edit2 = false
        this.$axios
          .put(`${domain}` + `/api/tasks/${item.id}/`, {
            taskname: item.taskname,
            tasktype: item.tasktype,
            taskdesc: item.taskdesc,
            begin_time: `${item.begin_time} 00:00:00`,
            end_time: `${item.end_time} 00:00:00`,
            status: item.status
          })
          .then(data => {
            if (data.status == 200) {
              this.$message({
                message: "修改成功",
                type: "success"
              });
              // this.flg = false;
            }
            console.log(data);
          });
      } else if (item.state === "执行中" || item.state === "进行中") {
        console.log(item.state)
        item.edit2 = false
        this.$axios
          .put(`${domain}` + `/api/tasks/${item.id}/`, {
            taskname: item.taskname,
            tasktype: item.tasktype,
            taskdesc: item.taskdesc,
            begin_time: `${item.begin_time} 00:00:00`,
            end_time: `${item.end_time} 00:00:00`,
            status: item.status
          })
          .then(data => {
            if (data.status == 200) {
              this.$message({
                message: "修改成功",
                type: "success"
              });
              // this.flg = false;
            }
            console.log(data);
          });
        // item.edit2 = false
        // alert(123)
      } else {
        this.$message({
          message: "该信息不能编辑",
          type: "warning"
        });
      }
    },
    query() {
      //查询
      let domain = hostType(1);
      this.$axios
        .get(`${domain}` + `/api/tasks/?search=${this.Timevalue}`)
        .then(({ data }) => {
          // console.log(data);
          for (let i = 0; i < data.length; i++) {
            data[i].edit = false; //待执行活动需要参数
            data[i].edit2 = false; //进行中或者执行中的需要的参数
          }
          console.log(data);
          this.tableData = data;
        });
    }
    // current_change(page) {//分页功能
    //   let domain = hostType(1);
    //   this.$axios
    //     .get(`${domain}` + "/api/task_detail/?p=" + page + "")
    //     .then(({ data }) => {
    //       this.tableData = data.results;
    //       this.count = data.count;
    //     });
    // }
  },
  mounted() {
    let domain = hostType(1);
    this.$axios.get(`${domain}` + "/api/tasks/").then(({ data }) => {
      console.log(data);
      this.Timeoptions = data.monthly;
      this.taskoptions = data.tasktype;
    });
  }
};
</script>

<style scoped>
.addcontent {
  background: #fff;
  box-shadow: 0 3px 7px #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 50px;
}
.addcontenttwo {
  background: #fff;
  box-shadow: 0 3px 7px #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  margin-top: 20px;
  height: 50px;
  border-bottom: 1px solid #f3f3f3;
}
.label {
  display: inline-block;
  height: 100%;
  min-width: 60px;
  text-align-last: right;
}
.querycon {
  background: #fff;
  padding: 10px 20px;
}
.query {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.red {
  color: red;
}
.tasktype,
.taskname,
.taskproduct,
.taskproduct,
.textarea,
.addtask {
  margin-right: 20px;
}
.textarea {
  display: flex;
  align-items: center;
  margin-top: 20px;
}
.editinfo {
  cursor: pointer;
  color: #3d8cff;
}
.query2 {
  display: flex;
  align-items: center;
}
.sttimes {
  display: flex;
  line-height: 28px;
}
</style>