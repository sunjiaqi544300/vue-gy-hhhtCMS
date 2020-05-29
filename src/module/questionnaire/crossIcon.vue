<template>
  <div>
    <div class="taskDetailed">
      <div class="addcontent3">
        <div class="tasktop">
          <span class="label">
            <b class="red">*</b>问卷名称:
          </span>
          <el-select
            clearable
            v-model="questionnairevalue"
            @change="citychange"
            size="mini"
            placeholder="请选择"
          >
            <el-option
              v-for="(item,index) in questionnaireMap"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <div class="tasktop">
          <span class="label">
            <b class="red">*</b>自定义行:
          </span>
          <el-select clearable v-model="subjectonevalue" size="mini" placeholder="请选择">
            <el-option
              v-for="(item,index) in subjectone"
              :key="index"
              :label="item.question"
              :value="item.q_id"
            ></el-option>
          </el-select>
        </div>
        <div class="tasktop">
          <span class="label">
            <b class="red">*</b>自定义行:
          </span>
          <el-select clearable v-model="subjecttowvalue" size="mini" placeholder="请选择">
            <el-option
              v-for="(item,index) in subjecttow"
              :key="index"
              :label="item.question"
              :value="item.q_id"
            ></el-option>
          </el-select>
        </div>
        <el-button type="primary" @click="query">查询</el-button>
      </div>
    </div>
    <div class="content">
      <ve-bar :data="chartData" :settings="chartSettings"></ve-bar>
    </div>
  </div>
</template>

<script>
import { hostType } from "@/api/env.js";
export default {
  data() {
    this.chartSettings = {
      stack: {
        // xxx: ["增强", "持平", "减弱"]
        'xxx': []
      },
      xAxisName: '比率',
      xAxisNameLocation: 'end' 
  
    };
    return {
      Data: [],
      questionnaireMap: [], //问卷
      questionnairevalue: "",
      subjectone: [], //题1
      subjectonevalue: "",
      subjecttow: [], //题2
      subjecttowvalue: "",
      keyMap: [],
      rankarr: [],
      chartData: {
        columns: [
          // "answer2", "增强", "持平", "减弱"
          ],
        rows: [
          // { 
          //   answer2: "库存较少，不够卖", 
          //   增强: 30,
          //   持平: 50,
          //   减弱: 20 
          // },
          // {
          //   answer2: "库存合理，能维持正常销售",
          //   增强: 18,
          //   持平: 32,
          //   减弱: 50
          // },
          // {
          //   answer2: "库存较高，消化有压力（是正常库存2倍以上）",
          //   增强: 49,
          //   持平: 39,
          //   减弱: 12
          // },
          // {
          //   answer2: "库存偏高（是正常库存1-2倍之间）",
          //   增强: 16,
          //   持平: 44,
          //   减弱: 40
          // }
        ]
      }
    };
  },
  mounted() {
    let domain = hostType(2);
    this.$axios.get(`${domain}` + "/api/cross_ana/").then(data => {
      this.Data = data.data.data.survey;
      this.questionnaireMap = data.data.data.survey;
    });
  },
  methods: {
    citychange() {
      this.subjectone = [];
      this.subjectonevalue = "";
      this.subjecttow = [];
      this.subjecttowvalue = "";

      for (let index = 0; index < this.Data.length; index++) {
        if (this.questionnairevalue == this.Data[index].id) {
          this.subjectone = this.Data[index].question;
          this.subjecttow = this.Data[index].question;
        }
      }
      // console.log(this.userdata);
    },
    query() {
      let domain = hostType(1);
      if (
        this.questionnairevalue === "" ||
        this.subjectonevalue === "" ||
        this.subjecttowvalue === ""
      ) {
        this.$message({
          message: "请选择必选项",
          type: "warning"
        });
        return false;
      } else if (this.subjectonevalue == this.subjecttowvalue) {
        this.$message({
          message: "不能选择同一题",
          type: "warning"
        });
      } else {
        this.$axios
          .get(
            `${domain}` +
              "/api/cross_ana/?s_id=" + this.questionnairevalue +
              "&f_id=" + this.subjectonevalue +
              "&t_id=" + this.subjecttowvalue
              // "/madmin/api/cross_ana/?s_id=" +28 +"&f_id=" +126 + "&t_id=" +127
          )
          .then(({ data }) => {
           console.log(data)
           this.chartSettings.stack.xxx = data.data.columns.slice(1)
           console.log(this.chartSettings.stack.xxx)
           this.chartData.rows = data.data.rows;
           this.chartData.columns = data.data.columns
          });
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
.content {
  margin: 20px 0 0 0;
  width: 94%;
  background: #fff;
  min-height: 640px;
  padding: 20px;
}
</style>