<template>
  <div>
    <div class="taskDetailed">
      <div class="addcontent3">
        <div class="tasktop">
          <span class="label">
            <b class="red">*</b>市:
          </span>
          <el-select
            clearable
            v-model="cityvalue"
            @change="citychange"
            size="mini"
            placeholder="请选择"
          >
            <el-option
              v-for="(item,index) in citydata"
              :key="index"
              :label="item.city"
              :value="item.city"
            ></el-option>
          </el-select>
        </div>
        <div class="tasktop">
          <span class="label">
            <b class="red">*</b>业务员:
          </span>
          <el-select clearable v-model="userid" size="mini" placeholder="请选择">
            <el-option
              v-for="(item,index) in userdata"
              :key="index"
              :label="item[1]"
              :value="item[0]"
            ></el-option>
          </el-select>
        </div>
        <div style="margin-right:50px">
          <span class="label">
            <b class="red">*</b>时间：
          </span>
          <el-date-picker
            v-model="Timevalue"
            type="datetime"
            placeholder="选择日期时间"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy/MM/dd HH:mm:ss"
          ></el-date-picker>
        </div>
        <el-button type="primary" @click="query">查询</el-button>
      </div>
    </div>
    <div class="content">
      <div id="maps" class="maps" ref="qqMap"></div>
    </div>
  </div>
</template>

<script>
import { hostType , mapType} from "@/api/env.js";
import { TMap } from "js/qqMap";
export default {
  data() {
    return {
      Data: [],
      citydata: [], //市
      cityvalue: "",
      Timevalue: "", //时间
      userdata: [], //业务员
      userid: "",
      maps: null,
      qqMap:Math.random().toString(36).substr(2)
    };
  },
  mounted() {
    let domain = hostType(1);
    this.$axios.get(`${domain}` + "/api/user_locus/").then(({ data }) => {
      this.citydata = data.users;
    });
    this.funct()
  },
  methods: {
    citychange() {
      this.userdata = [];
      this.userid = "";
      //市联动业务员
      for (let index = 0; index < this.citydata.length; index++) {
        if (this.cityvalue == this.citydata[index].city) {
          this.userdata = this.citydata[index].users;
        }
      }
      console.log(this.userdata);
    },
    query() {
      let domain = hostType(1);
      if (
        this.cityvalue === "" ||
        this.userid === "" ||
        this.Timevalue === ""
      ) {
        this.$message({
          message: "请选择必选项",
          type: "warning"
        });
        return false;
      }
      this.$axios
        .get(
          `${domain}` +
            "/api/user_locus/?userid=" +
            this.userid +
            "&times=" +
            this.Timevalue
        )
        .then(({ data }) => {
          console.log(data);
          this.Data = data;
          if(data.length){
            this.funct([data[0].lat,data[0].lng],)
          }else{
             this.$message({
              message: "当前业务员没有行动轨迹",
              type: "warning"
            });
          }
        });
    },
    funct(w){
      // console.log(W)
      TMap('H7KBZ-XMI66-4CXSJ-ERMEQ-UPCYZ-PABYG&libraries=convertor').then(qq => {
        var map = new qq.maps.Map(document.getElementById("maps"), {
            // 地图的中心地理坐标。
            center: new qq.maps.LatLng(w?w[0]:mapType()[0], w?w[1]:mapType()[1]),
              zoom: 11
        });
        var path = []
        this.Data.forEach(function(c,index,arr){
          path.push(new qq.maps.LatLng(c.lat,c.lng))
        })
        var polyline = new qq.maps.Polyline({
            path: path,
            strokeColor: '#5f9bf8',
            strokeWeight: 3,
            editable: false,
            map: map
        });
      })   
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
.content{
  margin: 20px 0 0 0;
  width: 100%;
  background: #fff;
  min-height: 640px;
  padding: 20px;
}
.maps {
  width: 95%;
  height: 600px;
}
</style>