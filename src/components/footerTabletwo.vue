<template>
  <div id="footer" class="footer">
    <div class="footer_top">
      <div class="left">
      <el-input
        class="file_search"
        placeholder="请输入内容"
        v-model="search"
        size="mini">
        <el-button  size="mini" slot="append" icon="el-icon-search" @click="clickSearch"></el-button>
      </el-input>
      </div>
      <div class="left button">
        <!--<el-button type="success" @click="onlondData()" size="small" :loading="fullscreenLoading" v-if="fullscreenLoading">数据加载中</el-button>-->
     
        <el-button type="success"  size="small" v-if="$route.query.id==='old'" @click="ENverificationToggle">验证</el-button>
      </div>
      <div class="right">
        <span class="data_num" style='margin-right:7px;color:black'>共有<i style='color:#5592F7'>{{table.length}}</i>条数据</span>
           <!-- <el-button  type="primary" style='background:#5593F8;color:#FEFEFE;border:none;'    @click="downDataTable=true,onlondData()" >导出数据</el-button> -->
          <el-button size="mini" type="primary"   @click="downDataTable=true,onlondData()" >导出</el-button>
          <el-button size="mini" type="primary" @click="closeTable()">隐藏</el-button>
      </div>
    </div>
    <el-table
      id="tableW"
     :row-class-name="tableRowClassName"
      border
      :data="table.slice((page-1)*200,(page-1)*200 + 200)"
      height="260"
       :header-cell-style="headerStyle"
      @row-click="clickMapS"
      @select="selectDown"
      @select-all="selectDown">
      <el-table-column type="index"   align="center"  :index="(page-1)*200+1" label="序号" width="80">

      </el-table-column>
      <el-table-column v-for="(item,index) in tableName"   align="center"    :prop="item.key"  :label="item.name" :width="item.width" :key="index">

      </el-table-column>
    </el-table>
    <div style="text-align: right;" class="pageOpen">
      <el-button style='background:#5593F8;color:#FEFEFE' size="mini" @click="pageOn()">上一页</el-button>
      <input type="text" value="1" v-model="page" disabled class="ipnutPage">
      <el-button style='background:#5593F8;color:#FEFEFE' size="mini" @click="pageDown()">下一页</el-button>
    </div>

    <!--// 下载数据列表-->
    <transition name="el-zoom-in-bottom">
      <div class="tableAll" v-show="downDataTable">
        <div class="footer_top">
          <div class="left">
            <el-input
              class="file_search"
              placeholder="请输入内容"
              v-model="search">
              <el-button slot="append" icon="el-icon-search" @click="clickSearch"></el-button>
            </el-input>
          </div>
          <div class="left button">
            <el-button size="mini" type="primary" @click="handleDownload()">导出数据</el-button>
            <el-button type="success"  size="small" v-if="$route.query.id==='old'" @click="ENverificationToggle">验证</el-button>
          </div>
          <div class="right">
            <span class="data_num" style='margin-right:7px;color:black'>共有<i  style='color:#5592F7'>{{tableDownNumAll.length}}</i>条数据</span>
            <i class="el-icon-close close" @click="downDataTable = false, tableData = []"></i>
          </div>
        </div>
        <el-table
          id="tableAll_install"
          stripe
          border
          ref="multipleTable"
          :data="downTable"
          height="500"
         
          show-overflow-tooltip="true"
          @select="selectDown"
          @select-all="selectDownAll">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column type="index" :index="(DownPage-1)*200+1" label="序号" width="80">

          </el-table-column>
          <el-table-column v-for="(item,index) in tableName" :prop="item.key" :label="item.name" :width="item.width" :key="index">

          </el-table-column>
        </el-table>
        <!--<div style="text-align: right;" class="pageOpen">-->
          <!--<el-button type="success" size="mini" @click="pageOnD()">上一页</el-button>-->
          <!--<input type="text" value="1" v-model="DownPage" disabled class="ipnutPage">-->
          <!--<el-button type="success" size="mini" @click="pageDownD()">下一页</el-button>-->
        <!--</div>-->
      </div>
    </transition>
  </div>
</template>

<script>
import bus from 'js/evenBus'
export default {
  name: 'newproduct',
  data () {
    return {
      search: '',
      tableTop: [],
      tableData: [],
      tableDown: [],
      page: 1,
      DownPage: 1,
      tableDownALL: [],
       headerStyle: {
          "text-align": "center",
            "color": "#404447",
            'background':'#F5F6FA',
          "font-weight": "700px"
        },
      downData: false,
      downDataTable: false, // 下载数据的表格
      dataPath: [], // 地图传过来筛选过的数据
      func_area: [
        '教育文化', '办公场所', '居住场所', '交通枢纽', '休闲娱乐', '旅游景区', '住宿场所', '购物场所', '医疗服务'
      ],
      dataPathName: '', // 当前点击的功能区
      fullscreenLoading: true,
      tableAll: [], // 过滤后的地图数据
      tableName: [
        {name: '客户编码', key: 'license', width: 200},
        {name: '客户名称', key: 'shop_name', width: 160},
        {name: '经营地址', key: 'shop_address', width: 350},
        {name: '区县公司', key: 'dist', width: 80},
        {name: '客户经理', key: 'contact_win', width: 80},
        {name: '档位', key: 'level', width: 80},
        {name: '经营业态', key: 'shop_type', width: 80},
        {name: '所属商圈', key: 'biz_dist', width: 120},
        {name: '功能区', key: 'func_area', width: 100},
        {name: '客户强势因子', key: 'main_poi', width: 100},
        {name: '订货电话', key: 'phone_no', width: 150}
      ]
    }
  },
  watch: {
    downTable: function () {
      // this.downDataTable = false
      this.toggleSelection(this.downTable)
    },
    table: function () {
      this.page = 1
    }
  },
  props: [
    'title',//表格数据名称
    'table',
    'tableshow',
    'downTable', // 下载的表格数据
    'scrollC', // 判断滚动条是否可以下拉
    'tableDownNumAll' // 储存的所有数据
  ],
  methods: {
    // 点击第一个导出数据
    onlondData () {
      var vm = this
      // console.log(vm.dataPathName)
      // for (var i = 0; i < vm.downTable.length; i++) {
      if (vm.dataPathName !== '') {
        vm.toggleSelection(vm.downTable)
        // vm.tableData = vm.downTable // ？？？？
        vm.tableData = []
        for (var i = 0; i < vm.tableDownNumAll.length; i++) {
          if (vm.dataPathName === vm.tableDownNumAll[i].func_area) {
            vm.tableData.push(vm.tableDownNumAll[i])
          }
        }
      }
    },
    // 点击上一页
    pageOn () {
      // var vm = this
      if (this.page !== 1) {
        this.page = this.page - 1
        // this.$emit('clickPageOn', this.page)
      }
      // this.$emit('clickPageOn', this.page)
    },
    // 点击下一页
    pageDown () {
      var vm = this
      if (vm.table.slice(vm.page * 200,vm.page * 200 + 200).length === 0) {
        vm.$message({type: 'error', message: '没有更多的内容了'})
        return false
      }
      this.page = this.page + 1
      // this.$emit('clickPageDown', this.page)
    },
    // 点击上一页
    // pageOnD () {
    //   var vm = this
    //   if (this.DownPage !== 1) {
    //     this.DownPage = this.DownPage - 1
    //     // this.$emit('clickPageOn', this.page)
    //   }
    //   // this.$emit('clickPageOn', this.page)
    // },
    // 点击下一页
    // pageDownD () {
    //   var vm = this
    //   if (vm.downTable.slice(vm.DownPage*200,vm.DownPage*200 + 200).length === 0) {
    //     vm.$message({type: 'error', message: '没有更多的内容了'})
    //     return false
    //   }
    //   this.DownPage = this.DownPage + 1
    // },
    // 点击搜索
    clickSearch () {
      this.$emit('clickSearch', this.search)
    },
    // 展开验证
    ENverificationToggle () {
      this.$emit('toggle', true)
    },
    // 与组件交互
    // 点击地图互动
    clickMapS: function (row) {
      bus.$emit('row', row)
      // console.log(row)
    },
    // 点击关闭
    closeTable: function () {
      this.$emit('table-show', !this.tableshow)
    },
    // 选中下载
    selectDown (session) { // session所有选中的行，row当前选中的行
      // console.log(session)
      this.tableData = session
      // this.$refs.multipleTable.toggleRowSelection(vm.tableDownALL[1], true)
      // console.log(this.tableData)
    },
    // 点击全选
    selectDownAll (session) { // session所有选中的行，row当前选中的行
      // console.log(session)
      // console.log(session)
      if (session.length !== 0) {
        this.tableData = this.tableDownNumAll
        // console.log(this.tableData)
      } else {
        this.tableData = []
      }
      // this.$refs.multipleTable.toggleRowSelection(vm.tableDownALL[1], true)
      // console.log(this.tableData)
    },
    // 点击切换选中状态
    toggleSelection(rows) {
      var vm = this
      if (rows) {
        rows.forEach(row => {
          // console.log(row)
          if (row.func_area === vm.dataPathName) {
            this.$refs.multipleTable.toggleRowSelection(row, true)
          } else {
            this.$refs.multipleTable.toggleRowSelection(row, false)
          }
        })
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    // 取消选中状态
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 表格数据下载---------------------
    // 下载所有的数据
    handleDownloadAll () {
      var vm = this
      require.ensure([], () => {
        const { export_json_to_excel } = require('@/vendor/Export2Excel')
        const tHeader = []
        for (var i = 0; i < vm.tableName.length; i++) {
          tHeader.push(vm.tableName[i].name)
        }
        const filterVal = []
        for (var i = 0; i < vm.tableName.length; i++) {
          filterVal.push(vm.tableName[i].key)
        }
        // console.log(tHeader)
        // console.log(filterVal)
        const list = this.table
        const data = this.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, this.title)
      })
    },
     tableRowClassName({ row, rowIndex }) {
      // console.log({row, rowIndex})
      if (rowIndex % 2 !== 0) {
        return "table-color2n";
      }
    },
    handleDownload () {
      var vm = this
      // 当没有数据的时候
      // console.log(vm.tableData)
      if (this.tableData.length === 0) {
        vm.$message({type: 'error', message: '请勾选您需要的数据'})
        return false
      }
      // console.log('bushi 100')
      require.ensure([], () => {
        const { export_json_to_excel } = require('@/vendor/Export2Excel')
        const tHeader = []
        for (var i = 0; i < vm.tableName.length; i++) {
          tHeader.push(vm.tableName[i].name)
        }
        const filterVal = []
        for (var i = 0; i < vm.tableName.length; i++) {
          filterVal.push(vm.tableName[i].key)
        }
        // console.log(tHeader)
        // console.log(filterVal)
        const list = this.tableData
        const data = this.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, this.title)
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    // 表格数据下载---------------------over
  },
  mounted: function () {
    var vm = this
    bus.$on('funNameTable', function (res) {
      // console.log(res)
      vm.page = 1
      vm.dataPathName = res
      vm.downDataTable = false
      var tableList = []
      for (var i = 0; i < vm.tableDownNumAll.length; i++) {
        if (vm.tableDownNumAll[i].func_area === res) {
          tableList.push(vm.tableDownNumAll[i])
        }
      }
      // console.log(tableList)
      vm.tableData = tableList
      // console.log(vm.tableData)
      // vm.downDataTable = false
    })
    var footerW = document.getElementById('footer')
    footerW.style.width = (document.body.clientWidth - 424) + 'px'
    var tableAll_install = document.getElementById('tableAll_install')
    tableAll_install.style.width = (document.body.clientWidth - 424) + 'px'
    if (this.downTable === '') {
      vm.fullscreenLoading = true
      return false
    }
    // console.log(this.downTable)
    // 过滤字符串
    // map传过来筛选后的数据
    bus.$on('dataPath', function (res) {
      vm.dataPath = res
    })
    // 滚动条监听事件
    var box = document.getElementById('tableAll_install').children[2]
    // console.log(box)
    //滚动事件触发
    box.onscroll = function() {
      if( getScrollHeight() - (getScrollTop() + getClientHeight()) === 0 ) {
        // console.log('下拉刷新了')
        // vm.tableDown.push(vm.downTable[1].list[0])
        // alert(1)
        vm.$emit('scrollDown', 1)
      }
    }
    function getScrollTop() {
      let scrollTop = 0;
      if(box.scrollTop) {
        scrollTop = box.scrollTop;
      } else if(box.body) {
        scrollTop = box.scrollTop;
      }
      return scrollTop;
    }
    //获取当前可视范围的高度
    function getClientHeight() {
      let clientHeight = 0;
      if(box.clientHeight && box.clientHeight) {
        clientHeight = Math.min(box.clientHeight, box.clientHeight);
      } else {
        clientHeight = Math.max(box.clientHeight, box.clientHeight);
      }
      return clientHeight;
    }
    
    //获取文档完整的高度
    function getScrollHeight() {
      return Math.max(box.scrollHeight, box.scrollHeight);
    }
  }
}
</script>
<style scoped>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}

  .footer{
    width: 100%;
    position: absolute;
    right: 18px;
    bottom: 0;
    height: auto;
    background: #FFFFFF;
    border-radius: 3px;
    /*overflow: hidden;*/
  }
  .footer>div{
    margin-left: 13%;
    width: 86%;
  }
  .footer_top{
    /* background: #464C5B; */
    height: 50px;
  }
  .footer_top .button{
    margin-top: 10px;
  }
  .footer_top .left{
    float: left;
    /* margin-left: 20px; */
  }
  .footer_top .right{
    float: right;
    margin-right: 20px;
  }
  .data_num{
    color: #FFFFFF;
    line-height: 50px;
    font-size: 16px;
  }
  .close{
    color: #FFFFFF;
    line-height: 50px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
  }
  .file_search{
    margin-top: 10px;
  }
  .download{
    margin-top: 10px;
  }
  .footer tr{
    cursor: pointer;
  }
  .tableAll{
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 100;
    background: #FFFFFF;
  }
  .pageOpen{
    margin: 10px 0;
  }
  .pageOpen button:last-child{
    margin-right: 20px;
  }
  .ipnutPage{
    width: 30px;
    height: 20px;
    text-align: center;
  }
</style>
