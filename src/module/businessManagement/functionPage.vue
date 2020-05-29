<template>
  <div class="page">
    <div class="page_box">
      <div class="page_two">
        <div class="page_two_select">
          <b class="red">*</b>
          <span>时间：</span>
          <el-select size="medium" v-model="times" clearable placeholder="请选择">
            <el-option v-for="(item,index) in timesList" :key="index" :label="item.monthly" :value="item.monthly">
            </el-option>
          </el-select>
          <br />
        </div>
        <div class="page_two_select">
          <span>区县：</span>
          <el-select size="medium" v-model="Product "   class="selectlist"  clearable placeholder="请选择">
            <el-option v-for="(item,index) in ProductList" :key="index" :label="item.dist" :value="item.dist">
            </el-option>
          </el-select>
          <br />
        </div>
        <div class="groupscreen">
          <el-button class="but1" type="primary" @click="groupscreen">查询</el-button>
          <!-- <el-button class="but1" type="primary" @click="Previous">返回</el-button> -->
        </div>
      </div>
    </div>
    <div class="messageCustomer">
      <el-button class="Export" type="primary" @click="exportFn">导出</el-button>
      <el-table :data="tableData" 
        :cell-class-name="tableCellClassName"
        :header-cell-style="headerStyle"
        class="tables" id="tb" border style="width: 96%;text-align:center" height="700">
        <el-table-column prop="product_name" label="品规"></el-table-column>
        <el-table-column prop="holds" label="上柜户数"></el-table-column>
        <el-table-column prop="counterrate" label="上柜率(%)"></el-table-column>
        <el-table-column prop="footrate" label="订足率(%)"></el-table-column>
        <el-table-column prop="footsurface" label="订足面(%)"></el-table-column>
        <el-table-column prop="repeatrate" label="重购率(%)" ></el-table-column>
        <!-- <el-table-column prop="name" label="需求周转天数"></el-table-column> -->
        <el-table-column prop="name" label="市场维护建议" >
          <template slot-scope="scope">
            <span @click="Suggestion(scope)" class="cursor">{{scope.row.maintainadvise}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="投放策略建议">
          <template slot-scope="scope">
            <span @click="launch(scope)" class="cursor">{{scope.row.strategyadvise}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import {
    hostType
  } from '@/api/env.js'
  import FileSaver from "file-saver";
  import XLSX from "xlsx";
  export default {
    data() {
      return {
        times: "",
        timesList: [],
        Product: "",
        ProductList: [],
        tableData: [],
        headerStyle: {
          "text-align": "center",
          color: "#404447",
          "font-weight": "700px",
           'background':'#F4F6FA',
        },
      };
    },
    mounted() {
      let vm = this
      let domain = hostType(1)
      vm.$axios.get(`${domain}` + '/api/market_state/')
        .then(res => {
          // console.log(res.data.data)
          vm.timesList = res.data.data.monthly
          vm.ProductList = res.data.data.dist
        })
    },
    methods: {
       tableCellClassName ({row, column, rowIndex, columnIndex}) {
      console.log({row, column, rowIndex, columnIndex})
      // 第四列
      if (columnIndex === 7) {
        return 'color_blue'
      }
      if (columnIndex === 6) {
        return 'color_blue'
      }
       
    },
      beforeRouteLeave(to, from, next) {
        // ...
        if (to.path == "/functionPage") {
          from.meta.keepAlive = true
        } else {
          from.meta.keepAlive = false
        }
        next()
      },
      groupscreen() {
        if (this.times === "") {
          alert("请选择必选项");
          return;
        }
        let domain = hostType(1)
        this.$axios.get(`${domain}` + '/api/market_state/?dist=' + this.Product + '&monthly=' + this.times + '&time=' + new Date().getTime())
          .then(res => {
            console.log(res.data.data.data)
            this.tableData = res.data.data.data

          })

      },
      Previous() {
        this.$router.go(-1)
      },
      Suggestion(row) {
        console.log(row)
         let list = row.row
        this.$router.push({
          path: '/productQuery',
          query: {
            time: this.times,
            dist: this.Product,
            row:list
          }
        })

      },
      launch(row) {
         console.log(row.row)
         let list = row.row
        this.$router.push({
          path: '/cy6',
          query: {
            time: this.times,
            dist: this.Product,
            row:list,
            type:6
          }
        })
      },
      exportFn() {
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
            "市场状态 " + ".xlsx"
          );
        } catch (e) {
          if (typeof console !== "undefined") console.log(e, wbout);
        }
        return wbout;
      }
    }
  };

</script>

<style scoped>
  .tables {
    margin: 5px 0 0 10px;
  }

  .page {
    background: #fff;
    width: 98%;
    height: 100%;
  }

  .page_one_checkbox,
  .page_two_select,
  .page_three_input {
    margin-right: 80px;
    margin-left: 10px;
  }

  .page_two_select,
  .page_three_input {
    float: left;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .red {
    color: red;
  }

  .groupscreen {
    float: left;
    margin-top: 10px;
  }

  .messageCustomer {
    clear: both;
    width: 99%;
    height: auto;
    height: auto;
    background: white;
    border-radius: 1%;
  }

  .cursor {
    cursor: pointer;
  }

  .Export {
    margin-left: 90%;
  }
   .selectlist{
    width: 200px;
  }
</style>
