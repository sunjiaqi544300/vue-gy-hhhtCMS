<template>
  <div>
    <div class="addcontent">
      <span>活动列表</span>
      <div style="margin-right:50px">
        <span class="label"><b class="red">*</b>活动类型:</span>
        <el-select v-model="activityValue" size="mini" placeholder="请选择">
          <el-option
            v-for="item in activityType"
            :key="item.type_id"
            :label="item.type"
            :value="item.type"
          ></el-option>
        </el-select>
        <el-button type="primary" @click="query" style="margin-left:20px">查询</el-button>
      </div>
    </div>
    <el-table :data="tableData" max-height="500" border style="width: 100%;margin-top:20px">
      <el-table-column prop="id" label="活动ID" width="80"></el-table-column>
      <el-table-column prop="name" label="活动名称" width="180">
        <template slot-scope="scope">
          <span v-if="scope.row.edit===true">
            <el-input v-model="scope.row.name"></el-input>
          </span>
          <span v-if="scope.row.edit===false">{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="活动类型" width="180">
        <template slot-scope="scope">
          <span v-if="scope.row.edit===true">
            <!-- <el-input v-model="scope.row.tasktype"></el-input> -->
            <el-select v-model="scope.row.type" placeholder="请选择">
              <el-option
                v-for="item in activityType1"
                :key="item.value"
                :label="item.type"
                :value="item.type"
              ></el-option>
            </el-select>
          </span>
          <span v-if="scope.row.edit===false">{{scope.row.type}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="rule" label="活动规则">
        <template slot-scope="scope">
          <span v-if="scope.row.edit===true">
            <el-input v-model="scope.row.rule"></el-input>
          </span>
          <span v-if="scope.row.edit===false">{{scope.row.rule}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="begin_time" label="开始时间" width="170">
        <template slot-scope="scope">
          <span v-if="scope.row.edit===true">
            <el-input v-model="scope.row.begin_time"></el-input>
          </span>
          <span v-if="scope.row.edit===false">{{scope.row.begin_time}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="end_time" label="结束时间" width="170">
        <template slot-scope="scope">
          <span v-if="scope.row.edit===true">
            <el-input v-model="scope.row.end_time"></el-input>
          </span>
          <span v-if="scope.row.edit===false">{{scope.row.end_time}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="state" label="执行状态" width="100"></el-table-column>
      <!-- <el-table-column prop="state" label="是否有效">
        <template slot-scope="scope">
          <span v-if="scope.row.edit===true">
            <el-input v-model="scope.row.status"></el-input>
          </span>
          <span v-if="scope.row.edit===false">{{scope.row.status===0?"有效":"无效"}}</span>
        </template>
      </el-table-column> -->
      <el-table-column prop="address" label="操作" width="80">
        <template slot-scope="scope">
          <span v-if="scope.row.edit===true">
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
        <span>活动添加</span>
      </div>
      <div class="querycon">
        <div class="query">
          <div class="tasktype">
            <span>
              <b class="red">*</b>活动类型:
            </span>
            <el-select v-model="activityValue1" size="mini" placeholder="请选择">
              <el-option
                v-for="item in activityType1"
                :key="item.type_id"
                :label="item.type"
                :value="item.type_id"
              ></el-option>
            </el-select>
          </div>
          <div class="activityName">
            <span>
              <b class="red">*</b>活动名称:
            </span>
            <el-input v-model="activityName" style="width:150px" placeholder="请输入内容"></el-input>
          </div>
          <div class="tasktype">
            <span>
              <b class="red">*</b>品规:
            </span>
            <el-select v-model="productGaugeValue" size="mini" placeholder="请选择">
              <el-option
                v-for="item in productGauge"
                :key="item.product_id"
                :label="item.product_name"
                :value="item.product_id"
              ></el-option>
            </el-select>
          </div>
          <div class="taskproduct sttimes">
            <span>
              <b class="red">*</b>活动时间:
            </span>
            <div class="block">
              <el-date-picker
                style="width:135px;"
                v-model="startTime"
                type="datetime"
                placeholder="选择日期时间"
              ></el-date-picker>
            </div>
            <span style="margin:0 5px">-</span>
            <div class="block">
              <el-date-picker
                v-model="endTime"
                style="width:135px"
                type="datetime"
                placeholder="选择日期时间"
              ></el-date-picker>
            </div>
          </div>
        </div>
        <div class="query2">
          <div class="textarea">
            <span>活动规则:</span>
            <el-input
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
      activityType: [], //活动type
      activityValue: "",
      activityType1: [], //add活动type
      activityValue1: "",
      productGauge:[],
      productGaugeValue:"", //品规
      Timeoptions: [],
      Timevalue: "",
      tableData: [],   //数据源
      activityName: "", // 活动名称
      taskproduct: "",
      productoptions: [],
      startTime: "",
      endTime: "",
      textarea: "",  //活动规则
      status: "",
      monthlys: "" //月份
    };
  },
  methods: {
    refreshList(){
      this.activityType1.forEach(element => {
          if(element.type_id === this.activityValue1 || element.type === this.activityValue){
            return ture;
          }
      });
      return false;
    },
    addtask() {
       if (
        this.activityValue1 === "" ||
        this.activityName === "" ||
        this.productGaugeValue === "" ||
        this.startTime === "" ||
        this.endTime === ""
      ) {
        this.$message({
          message: "请选择必想选",
          type: "warning"
        });
        return;
      }
      if (start > end) {
        this.$message({
          message: "任务结束时间不能超过任务开始时间",
          type: "warning"
        });
        return false;
      }
      //添加问卷
      let firstDate = new Date();
      let oneday = firstDate.setDate(1); //当前月第一天
      let endDate = new Date(firstDate);
      endDate.setMonth(firstDate.getMonth() + 1);
      let endday = endDate.setDate(0); //当前月最后一天 //毫秒数
      let start = this.timechange(this.startTime).replace(
        new RegExp("-", "gm"),
        "/"
      );
      let end = this.timechange(this.endTime).replace(
        new RegExp("-", "gm"),
        "/"
      );
      // start.;
      start = new Date(start).getTime(); //开始时间
      end = new Date(end).getTime(); //结束时间
      
      let domain = hostType(1);
      console.log(this.activityValue1)
      this.$axios
        .post(`${domain}` + `/api/activity/`, {
          type_id: this.activityValue1,
          name: this.activityName,
          product_id: this.productGaugeValue,  //品规
          rule:this.textarea,
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
            if(this.refreshList){
              this.query()
            }
          }
          
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
      if (item.state === "执行中" || item.state === "待执行" || item.state === "已结束") {
        item.edit = true;
      } else {
        this.$message({
          message: "只有待执行活动才能编辑",
          type: "warning"
        });
      }
    },
    editinfo(item) {
      //编辑
      item.edit = false;
      // this.edit = true;
      console.log(item);
      let domain = hostType(1);
      if (item.state === "执行中" || item.state === "待执行" || item.state === "已结束") {
        this.$axios
          .put(`${domain}` + `/api/activity/${item.id}/`, {
            name: item.name,
            type_id: item.type_id,
            rule: item.rule,
            begin_time: `${item.begin_time}`,
            end_time: `${item.end_time}`,
            // status: item.status
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
        .get(`${domain}` + `/api/activity/?page_size=5000&act_type=${this.activityValue}`)
        .then(({ data }) => {
          console.log(data);

          for (let i = 0; i < data.results.length; i++) {
            data.results[i].edit = false;
          }
          // console.log(data);
          this.tableData = data.results;
        });
    },
    // current_change(page) {
    //   //分页功能
    //   let domain = hostType(1);
    //   this.$axios
    //     .get(`${domain}` + "/api/activity/?p=" + page + "")
    //     .then(({ data }) => {
    //       this.tableData = data.results;
    //       this.count = data.count;
    //     });
    // }
  },
  mounted() {
    let domain = hostType(1);
    this.$axios.get(`${domain}` + "/api/activity/").then(({ data }) => {
      console.log(data);
      this.activityType = data.types;
      this.activityType1 = data.types;
      this.productGauge = data.products;
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
}
.red {
  color: red;
}
.tasktype,
.activityName,
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