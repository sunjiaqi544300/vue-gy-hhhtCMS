<template>
  <div class="page">
    <div class="page_box">
      <div class="page_two">
        <div class="page_two_select">
          <b class="red">*</b>
          <span>时间：</span>
          <el-select size="medium" v-model="times" clearable :disabled='disabledtr' placeholder="请选择">
            <el-option v-for="(item,index) in timesList" :key="index" :label="item" :value="item"></el-option>
          </el-select>
          <br />
        </div>
        <div class="page_two_select">
          <span>区县：</span>
          <el-select size="medium" v-model="dist " class="selectlist" clearable :disabled='disabledtr' placeholder="请选择">
            <el-option v-for="(item,index) in ProductList" :key="index" :label="item" :value="item"></el-option>
          </el-select>
          <br />
        </div>
          <div class="page_two_select">
          <span>品规：</span>
          <el-select size="medium" v-model="Product "  class="selectlist" clearable :disabled='disabledtr' placeholder="请选择">
            <el-option v-for="(item,index) in ProductList" :key="index" :label="item" :value="item"></el-option>
          </el-select>
          <br />
        </div>
        <div class="groupscreen">
          <el-button class="but1" type="primary"  disabled  @click="groupscreen">筛选</el-button>
          
        </div>
         <el-button size="mini" class="groupscreen" type="primary" style="margin-left:2%" @click="backtrack">返回</el-button>
      </div>
    </div>
     <div class="messageCustomer">
      <!-- <el-button class="Export" type="primary" @click="exportFn">导出</el-button> -->
      <el-table :data="tableData" 
        :header-cell-style="headerStyle"
        class="tables" id="tb" border style="width: 96%;text-align:center" height="700">
        <el-table-column>
        <el-table-column prop="level" label="档位"></el-table-column>
      </el-table-column>
      <el-table-column label="市场表现">
          <el-table-column prop="levelnums" label='总户数' ></el-table-column>
          <el-table-column prop="counterrate" label='上柜率(%)'></el-table-column>
          <el-table-column prop="qtyrate" label='销量占比(%)'></el-table-column>
          <el-table-column prop="footrate" label='订足率(%)'></el-table-column>
          <el-table-column prop="footsurface" label='订足面(%)'></el-table-column>
          <el-table-column prop="repeatrate" label='重购率(%)'></el-table-column>
          <!-- <el-table-column prop="name" label='需求满足率'></el-table-column> -->
          <el-table-column prop="strategy" label='本月投放策略'></el-table-column>
            
      </el-table-column>
      <el-table-column label='档位投放'>
          <el-table-column prop="strategyadvise" label='下期建议策略'></el-table-column>
          <el-table-column prop="predqty" label='预计销量'></el-table-column>
            
      </el-table-column>
         <el-table-column label="档位+扩展策略建议">
           <el-table-column prop="hunhe" label='混合'></el-table-column>
          <el-table-column prop="shangwu" label='商务'></el-table-column>
          <el-table-column prop="xiangcun" label='乡村'></el-table-column>
          <el-table-column prop="quwei" label='区位'></el-table-column>
          <el-table-column prop="shangye" label='商业'></el-table-column>
          <el-table-column prop="zhuzhai" label='住宅'></el-table-column>
          <el-table-column prop="jiaotong" label='交通'></el-table-column>
      </el-table-column>
      </el-table>
    </div>
  
  </div>
</template>

<script>
 import {
    hostType
  } from '@/api/env.js'
export default {
  data() {
    return {
      times: "",
      dist: "",
      disabledtr:false,
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
  mounted(){
    if(this.$route.query.type == 6){
        console.log('跳转过来')
        this.disabledtr = true
        this.times = this.$route.query.time
        this.dist = this.$route.query.dist
        this.Product = this.$route.query.row.product_name
        console.log(this.$route.query.row)
         let domain = hostType(1)
        // this.$axios.get(`${domain}` + '/api/strategy_opt/?dist=' + this.dist + '&monthly=' + this.times+'&product_id=53010222')
        this.$axios.get(`${domain}` + '/api/strategy_opt/?dist=' + this.dist + '&monthly=' + this.times+'&product_id='+this.$route.query.row.product_id)
          .then(res => {
            console.log(res.data.data.data)
            this.tableData = res.data.data.data

          })

    }else{
       console.log('不是跳转-----------')
    }
  },
  methods: {
    groupscreen() {},
     backtrack(){
          this.$router.go(-1);
      },
  }
};
</script>

<style scoped>
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
  margin-bottom: 10px;
}
.messageCustomer {
    clear: both;
    width: 99%;
    height: auto;
    height: auto;
    
    background: white;
    border-radius: 1%;
  }
 .Export {
    margin-left: 80%;
    margin-bottom: 10px;
  }
   .tables {
    margin: 5px 0 0 20px;
  }
  .selectlist{
    width: 200px;
  }
</style>