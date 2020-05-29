<template>
  <div>
    <div class="addcontent">
      <div class="addcontent2">
        <div class="tasktop">
          <span class="label">
            <b class="red">*</b>市:
          </span>
          <el-select clearable @change="cityarea" v-model="city" size="mini" placeholder="请选择">
            <el-option
              v-for="item in cityList"
              :key="item.city"
              :label="item.city"
              :value="item.city"
            ></el-option>
          </el-select>
        </div>
        <div class="tasktop">
          <span class="label">区县:</span>
          <el-select clearable v-model="area" size="mini" placeholder="请选择">
            <el-option v-for="item in areaList" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </div>
        <div class="tasktop">
          <b class="red">*</b>
          <span class="label">时间:</span>
          <div class="block" style="display:inline-block">
            <el-date-picker
              style="width:150px;"
              v-model="startTime"
              type="date"
              placeholder="选择日期时间"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptionsStart"
            ></el-date-picker>
          </div>
          <div class="block" style="display:inline-block">-</div>
          <div class="block" style="display:inline-block">
            <el-date-picker
              style="width:150px;"
              v-model="endTime"
              type="date"
              placeholder="选择日期时间"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptionsEnd"
            ></el-date-picker>
          </div>
        </div>
       
      </div>
      <div style="margin-right:50px">
        <el-button type="primary" @click="query" style="margin-left:20px">查询</el-button>
        <el-button type="primary" @click="exportinfo" style="margin-left:20px">导出</el-button>
      </div>
    </div>
    <el-table id="Workload" :data="tableData" border style="width: 100%;margin-top:20px">
      <el-table-column type="index" label="序号" width="80"></el-table-column>
      <el-table-column prop="userid" label="业务员"></el-table-column>
      <el-table-column prop="v_sdate" label="开始时间"></el-table-column>
      <el-table-column prop="v_edate" label="结束时间"></el-table-column>
      <el-table-column prop="nums" label="拜访户数"></el-table-column>
      <el-table-column prop="standard" label="达标户数"></el-table-column>
      <el-table-column prop="surnum" label="调研户数"></el-table-column>
      <el-table-column prop="valid" label="有效户数"></el-table-column>
      <el-table-column prop="actnums" label="活动户数"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import FileSaver from "file-saver";
import XLSX from "xlsx";
import { hostType } from "@/api/env.js";
export default {
  data() {
    return {
      city: "", //市
      cityList: [],
      area: "", //区
      areaList: [],
      startTime: "", //开始时间
      endTime: "", //截止时间
      tableData: [],
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
  methods: {
    cityarea() {
      for (let i = 0; i < this.cityList.length; i++) {
        if (this.city === this.cityList[i].city) {
          this.areaList = this.cityList[i].dist;
        }
      }
    },
    p(s) {
      //补零使用
      return s < 10 ? "0" + s : s;
    },
    exportinfo() {
      var fix = document.querySelector(".el-table__fixed");
      var wb;
      if (fix) {
        wb = XLSX.utils.table_to_book(
          document.querySelector("#out_table").removeChild(fix)
        );
        document.querySelector("#out_table").appendChild(fix);
      } else {
        wb = XLSX.utils.table_to_book(document.querySelector("#Workload"));
      }
      /* get binary string as output */
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], {
            type: "application/octet-stream"
          })
          ,'工作量统计.xlsx'
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
    query() {
      let domain = hostType(1);
      this.$axios
        .post(`${domain}` + "/api/work_load/", {
          city: this.city,
          dist: this.area?this.area:"",
          begin_time: this.startTime ,
          end_time: this.endTime
        })
        .then(({data}) => {
          console.log(data.data);
          this.tableData = data.data
        });
    }
  },
  mounted() {
    let domain = hostType(1);
    this.$axios.get(`${domain}` + "/api/work_load/").then(({ data }) => {
      console.log(data);
      this.cityList = data.city_dist;
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
.addcontent2 {
  display: flex;
  align-items: center;
}
.tasktop {
  margin-right: 20px;
}
.red {
  color: red;
}
/* .label {
  display: inline-block;
  height: 100%;
  min-width: 60px;
  text-align-last: right;
} */
</style>