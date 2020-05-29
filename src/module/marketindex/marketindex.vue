<template>
  <div>
    <div class="install-w">
      <h2 class="title-w">
        云南中烟呼和浩特分中心销售数据汇总表
        <el-button class="button" type="primary" size="mini" @click="exportExcel">导出数据</el-button>
      </h2>
      <!-- 省市区 province  city area-->
      <div class="filterBox">
        <div class="selectBox">
          <span class="tit"><span class="must-span"></span>省：</span>
          <el-select v-model="province" clearable filterable  placeholder="请选择" @change="dsyprovinceChange">
            <el-option v-for="(item, index) in provinceList" :key="index" :label="item" :value="item">
            </el-option>
          </el-select>
        </div>
        <div class="selectBox">
          <span class="tit"><span class="must-span"></span>市：</span>
          <el-select v-model="city" clearable filterable placeholder="请选择">
            <el-option v-for="(item, index) in cityList" :key="index" :label="item"
              :value="item"></el-option>
          </el-select>
        </div>
        <!-- <div class="selectBox">
         <span class="must-span">*</span> <span class="tit">区：</span>
            <el-select v-model="area" clearable filterable size="mini" placeholder="请选择">
              <el-option v-for="(item, index) in selectlist2" :key="index" :label="item" :value="item"></el-option>
           </el-select>
          </div> -->
        <el-button size="mini" type="primary" style="margin-left:2%" @click="query_methods">查询</el-button>
      </div>
      <!-- end -->
      <div class="table more_header" :style="{height: tableHeight + 'px'}">
      <el-table
        v-loading="loading"
        :data="tableData"
        style="width: 100%; text-align: center"
        height="100%"
        id="tableFilter"
        @cell-click="cellClick"
        :row-class-name="tableRowClassName"
        :cell-class-name="tableCellClassName"
        header-row-class-name="table-header-class-name"
        :header-cell-style="headerStyle"
        row-key="dist"
        default-expand-all
        :tree-props="{children: 'child'}"
        >
          <el-table-column
            type="index"
            width="50"
            fixed
            sortable
            label="序号">
          </el-table-column>
          <el-table-column
            prop="dist"
            label="区县"
            fixed
            sortable
            width="100">
          </el-table-column>
          <el-table-column
            prop="admin"
            label="负责人"
            fixed
            sortable
            width="100">
          </el-table-column>
          <el-table-column
            label="呼和浩特"
            width="100">
            <el-table-column
              prop="sales"
              label="销量（箱）"
              sortable
              width="100">
            </el-table-column>
            <el-table-column
              prop="sales_ratio"
              label="同比增长（%）"
              sortable
              width="100">
            </el-table-column>
          </el-table-column>
          <el-table-column
            label="云南中烟"
            width="100">
            <el-table-column
              prop="sales1"
              label="销量（箱）"
              sortable
              width="100">
            </el-table-column>
            <el-table-column
              prop="sales_ratio1"
              label="同比增长（%）"
              sortable
              width="100">
            </el-table-column>
            <el-table-column
              prop="completion_rate"
              label="完成率（%）"
              sortable
              width="100">
            </el-table-column>
          </el-table-column>
          <el-table-column
            label="呼和浩特单箱销售额（元/箱）">
            <el-table-column
              prop="this_year"
              label="今年"
              sortable
              width="100">
            </el-table-column>
            <el-table-column
              prop="last_year"
              label="去年"
              sortable
              width="100">
            </el-table-column>
            <el-table-column
              prop="ratio"
              label="同比增长"
              sortable
              width="100">
            </el-table-column>
          </el-table-column>
          <el-table-column
            label="云南单箱销售额（元/箱）">
            <el-table-column
              prop="this_year1"
              label="今年"
              sortable
              width="100">
            </el-table-column>
            <el-table-column
              prop="last_year1"
              label="去年"
              sortable
              width="100">
            </el-table-column>
            <el-table-column
              prop="ratio1"
              label="同比增长"
              sortable
              width="100">
            </el-table-column>
          </el-table-column>
          <el-table-column
            label="销售结构（箱、%）">
            <!--一类烟所有01-->
            <el-table-column
              label="品类一">
              <!--呼和浩特-->
              <el-table-column
              label="呼和浩特"
              :render-header="renderProductId">
                <el-table-column
                  prop="sales_volume"
                  label="销量"
                  sortable
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="scale"
                  label="同比增长"
                  sortable
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="occupation_ratio"
                  label="占比"
                  sortable
                  width="100">
                </el-table-column>
              </el-table-column>
              <!--云南-->
              <el-table-column
                label="云南中烟"
                :render-header="renderProductId1">
                <el-table-column
                  prop="sales_volume1"
                  label="销量"
                  sortable
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="scale1"
                  label="同比增长"
                  sortable
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="occupation_ratio1"
                  label="占比"
                  sortable
                  width="100">
                </el-table-column>
              </el-table-column>
            </el-table-column>
            <!--二类烟所有23-->
            <el-table-column
              label="品类二">
              <!--呼和浩特-->
              <el-table-column
                label="呼和浩特"
                 :render-header="renderProductId2"
             >
                <el-table-column
                  prop="sales_volume2"
                  label="销量"
                  sortable
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="scale2"
                  label="同比增长"
                  sortable
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="occupation_ratio2"
                  label="占比"
                  sortable
                  width="100">
                </el-table-column>
              </el-table-column>
              <!--云南-->
              <el-table-column
                label="云南中烟"
                  :render-header="renderProductId3"
              >
                <el-table-column
                  prop="sales_volume3"
                  label="销量"
                  sortable
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="scale3"
                  label="同比增长"
                  sortable
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="occupation_ratio3"
                  label="占比"
                  sortable
                  width="100">
                </el-table-column>
              </el-table-column>
            </el-table-column>
            <!--三类45-->
            <el-table-column
              label="品类三">
              <!--呼和浩特-->
              <el-table-column
                label="呼和浩特"
                :render-header="renderProductId4"
                >
                <el-table-column
                  prop="sales_volume4"
                  label="销量"
                  sortable
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="scale4"
                  label="同比增长"
                  sortable
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="occupation_ratio4"
                  label="占比"
                  sortable
                  width="100">
                </el-table-column>
              </el-table-column>
              <!--云南-->
              <el-table-column
                label="云南中烟"
                :render-header="renderProductId5"
                >
                <el-table-column
                  prop="sales_volume5"
                  label="销量"
                  sortable
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="scale5"
                  label="同比增长"
                  sortable
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="occupation_ratio5"
                  label="占比"
                  sortable
                  width="100">
                </el-table-column>
              </el-table-column>
            </el-table-column>
            <!--四类67-->
            <el-table-column
              label="品类四">
              <!--呼和浩特-->
              <el-table-column
                label="呼和浩特"
                :render-header="renderProductId6"
                >
                <el-table-column
                  prop="sales_volume6"
                  label="销量"
                  sortable
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="scale6"
                  label="同比增长"
                  sortable
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="occupation_ratio6"
                  label="占比"
                  sortable
                  width="100">
                </el-table-column>
              </el-table-column>
              <!--云南-->
              <el-table-column
                label="云南中烟"
                  :render-header="renderProductId7"
              >
                <el-table-column
                  prop="sales_volume7"
                  label="销量"
                  sortable
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="scale7"
                  label="同比增长"
                  sortable
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="occupation_ratio7"
                  label="占比"
                  sortable
                  width="100">
                </el-table-column>
              </el-table-column>
            </el-table-column>
            <!--五类89-->
            <el-table-column
              label="品类五">
              <el-table-column
                label="呼和浩特"
                 :render-header="renderProductId8"
                >
                <el-table-column
                  prop="sales_volume8"
                  label="销量"
                  sortable
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="scale8"
                  label="同比增长"
                  sortable
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="occupation_ratio8"
                  label="占比"
                  sortable
                  width="100">
                </el-table-column>
              </el-table-column>
              <el-table-column
                label="云南中烟"
                :render-header="renderProductId9"
                >
                <el-table-column
                  prop="sales_volume9"
                  label="销量"
                  sortable
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="scale9"
                  label="同比增长"
                  sortable
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="occupation_ratio9"
                  label="占比"
                  sortable
                  width="100">
                </el-table-column>
              </el-table-column>
            </el-table-column>
            <!--品类6-->
            <el-table-column
              label="品类六">
              <el-table-column
                label="呼和浩特"
                :render-header="renderProductId10"
               >
                <el-table-column
                  prop="sales_volume10"
                  label="销量"
                  sortable
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="scale10"
                  label="同比增长"
                  sortable
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="occupation_ratio10"
                  label="占比"
                  sortable
                  width="100">
                </el-table-column>
              </el-table-column>
              <el-table-column
                label="云南中烟"
                :render-header="renderProductId11"
                >
                <el-table-column
                  prop="sales_volume11"
                  label="销量"
                  sortable
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="scale11"
                  label="同比增长"
                  sortable
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="occupation_ratio11"
                  label="占比"
                  sortable
                  width="100">
                </el-table-column>
              </el-table-column>
            </el-table-column>
             <!--品类7-->
             <!-- <el-table-column
              label="品类七">
              <el-table-column
                label="呼和浩特"
                :render-header="renderProductId12"
               >
                <el-table-column
                  prop="sales_volume12"
                  label="销量"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="scale12"
                  label="同比增长"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="occupation_ratio12"
                  label="占比"
                  width="100">
                </el-table-column>
              </el-table-column>
              <el-table-column
                label="云南中烟"
                :render-header="renderProductId13"
                >
                <el-table-column
                  prop="sales_volume13"
                  label="销量"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="scale13"
                  label="同比增长"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="occupation_ratio13"
                  label="占比"
                  width="100">
                </el-table-column>
              </el-table-column>
            </el-table-column> -->
                <!--无品类-->
             <!-- <el-table-column
              label="无品类">
              <el-table-column
                label="呼和浩特"
                :render-header="renderProductId14"
               >
                <el-table-column
                  prop="sales_volume14"
                  label="销量"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="scale14"
                  label="同比增长"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="occupation_ratio14"
                  label="占比"
                  width="100">
                </el-table-column>
              </el-table-column>
              <el-table-column
                label="云南中烟"
                :render-header="renderProductId15"
                >
                <el-table-column
                  prop="sales_volume15"
                  label="销量"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="scale15"
                  label="同比增长"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="occupation_ratio15"
                  label="占比"
                  width="100">
                </el-table-column>
              </el-table-column>
            </el-table-column> -->
          </el-table-column>
      </el-table>
    </div>
    </div>
  </div>
</template>

<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import {hostType} from '@/api/env.js'
// import 'xlsx-style'
import '@/assets/css/creat-assembly-w.css'
export default {
  name: "strategy-table",
  data () {
    return {
      provinceData:{},
      province: '',  //省
      city: '',  //市
      provinceList: [],
      cityList: [],
      tableHeight: '',
      tableData: [],
      loading: false,
      beijingY1: [],
      data1: '呼和浩特',
      yunnanY1: [],
      datay1: '云南',
      beijingY2: [],
      data2: '呼和浩特',
      yunnanY2: [],
      datay2: '云南',
      beijingY3: '',
      data3: '呼和浩特',
      yunnanY3: '',
      datay3: '云南',
      beijingY4: '',
      data4: '呼和浩特',
      yunnanY4: '',
      datay4: '云南',
      beijingY5: '',
      data5: '呼和浩特',
      yunnanY5: '',
      datay5: '云南',
      beijingY6: '',
      data6: '呼和浩特',
      yunnanY6: '',
      datay6: '云南',
       beijingY7: '',
      data7: '呼和浩特',
      yunnanY7: '',
      datay7: '云南',
       beijingY8: '',
      data8: '呼和浩特',
      yunnanY8: '',
      datay8: '云南',
      headerStyle: {
        'text-align': 'center',
        'color': '#404447',
        'font-weight': 'bold',
      },
      
  }
  },
  watch: {
    '$route': function () {
      var vm = this
      vm.loading = true
      setTimeout(function () {
        vm.loadFristTime()
      }, 1000)
    }
  },
  beforeDestroy () {
    // alert(1)
    if (document.querySelector('.createSelect') !== null) {
      var div = document.querySelectorAll('.createSelect')
      for (let i = div.length; i >= 0; i--) {
        div[i-1].parentNode.removeChild(div[i - 1])
      }
    }
  },
   created() {
      this.dsyprovince();
    },
  methods: {
    //省市区请求接口
    dsyprovince() {
      let domain = hostType(1)
      this.$axios.get(`${domain}` + '/api/datacollect/')
        .then(res => {
          let pData = res.data.data.data
          let provinceD = []
          let cityD = []
          this.provinceData = pData
          //处理区域数据
          Object.keys(pData).forEach(function(key) {
            provinceD.push(key);
            cityD = pData[key]

          });
          this.provinceList = provinceD
          if(this.province != ''){
            this.cityList = cityD 
          }
          
        })
    },
    //省级change后，初始化市
    dsyprovinceChange(province){
      console.log(province)
      this.city = ''
      this.cityList = this.provinceData[province]
    },
    //查询
    query_methods(){
      this.loadFristTime()
    },
    // 第一类呼和浩特，云南
    renderProductId (h, {column}) {
      var vm = this
      return  h('el-select', {
        props: { value: vm.data1, size: "mini", filterable: 'filterable',clearable:'clearable' },
        on: { change: vm.change1 }
      },
       (()=> {
              let arr = []
              for(let item of vm.beijingY1) {
                arr.push(h("el-option", {
                  props: { value: item.product_id, label  : item.product_name  },
                }))
              }
              arr.unshift(h("el-option", {
                  props: { value: "呼和浩特", label: "呼和浩特"  },
                }))
              return arr
        })()
      )
    },
    renderProductId1 (h, {column}) {
    var vm = this
      return  h('el-select', {
        props: { value: vm.datay1, size: "mini", filterable: 'filterable' ,clearable:'clearable' },
        on: { change: vm.changey1 }
      },
       (()=> {
              let arr = []
              
              for(let item of vm.yunnanY1) {
                arr.push(h("el-option", {
                  props: { value: item.product_id, label  : item.product_name  },
                }))
              }
              arr.unshift(h("el-option", {
                  props: { value: "云南", label: "云南"  },
                }))
              return arr
            })()
      
      )
    },
     // 第二类呼和浩特，云南
    renderProductId2 (h, {column}) {
      var vm = this
      return  h('el-select', {
        props: { value: vm.data2, size: "mini", filterable: 'filterable',clearable:'clearable' },
        on: { change: vm.change2 }
      },
       (()=> {
              let arr = []
              for(let item of vm.beijingY2) {
                arr.push(h("el-option", {
                  props: { value: item.product_id, label  : item.product_name  },
                }))
              }
              arr.unshift(h("el-option", {
                  props: { value: "呼和浩特", label: "呼和浩特"  },
                }))
              return arr
         })()
      )
    },
    renderProductId3 (h, {column}) {
    var vm = this
      return  h('el-select', {
        props: { value: vm.datay2, size: "mini", filterable: 'filterable' ,clearable:'clearable' },
        on: { change: vm.changey2 }
      },
       (()=> {
              let arr = []
              for(let item of vm.yunnanY2) {
                arr.push(h("el-option", {
                  props: { value: item.product_id, label  : item.product_name  },
                }))
              }
              arr.unshift(h("el-option", {
                  props: { value: "云南", label: "云南"  },
                }))
              return arr
            })()
      
      )
    },
     // 第三类呼和浩特，云南
    renderProductId4 (h, {column}) {
       var vm = this
      return  h('el-select', {
        props: { value: vm.data3, size: "mini", filterable: 'filterable' ,clearable:'clearable' },
        on: { change: vm.change3 }
      },
       (()=> {
              let arr = []
              for(let item of vm.beijingY3) {
                arr.push(h("el-option", {
                  props: { value: item.product_id, label  : item.product_name  },
                }))
              }
              arr.unshift(h("el-option", {
                  props: { value: "呼和浩特", label: "呼和浩特"  },
                }))
              return arr
            })()
      )
    },
    renderProductId5 (h, {column}) {
        var vm = this
      return  h('el-select', {
        props: { value: vm.datay3, size: "mini", filterable: 'filterable' ,clearable:'clearable' },
        on: { change: vm.changey3 }
      },
       (()=> {
              let arr = []
              for(let item of vm.yunnanY3) {
                arr.push(h("el-option", {
                  props: { value: item.product_id, label  : item.product_name  },
                }))
              }
              arr.unshift(h("el-option", {
                  props: { value: "云南", label: "云南"  },
                }))
              return arr
            })()
      
      )
    },
      // 第四类呼和浩特，云南
    renderProductId6 (h, {column}) {
     var vm = this
      return  h('el-select', {
        props: { value: vm.data4, size: "mini", filterable: 'filterable' ,clearable:'clearable' },
        on: { change: vm.change4 }
      },
       (()=> {
              let arr = []
              for(let item of vm.beijingY4) {
                arr.push(h("el-option", {
                  props: { value: item.product_id, label  : item.product_name  },
                }))
              }
              arr.unshift(h("el-option", {
                  props: { value: "呼和浩特", label: "呼和浩特"  },
                }))
              return arr
            })()
      )
    },
    renderProductId7 (h, {column}) {
       var vm = this
      return  h('el-select', {
        props: { value: vm.datay4, size: "mini", filterable: 'filterable' ,clearable:'clearable' },
        on: { change: vm.changey4 }
      },
       (()=> {
              let arr = []
              for(let item of vm.yunnanY4) {
                arr.push(h("el-option", {
                  props: { value: item.product_id, label  : item.product_name  },
                }))
              }
              arr.unshift(h("el-option", {
                  props: { value: "云南", label: "云南"  },
                }))
              return arr
            })()
      
      )
    },
    // 第五类呼和浩特，云南
    renderProductId8 (h, {column}) {
      var vm = this
      return  h('el-select', {
        props: { value: vm.data5, size: "mini", filterable: 'filterable' ,clearable:'clearable' },
        on: { change: vm.change5 }
      },
       (()=> {
              let arr = []
              for(let item of vm.beijingY5) {
                arr.push(h("el-option", {
                  props: { value: item.product_id, label  : item.product_name  },
                }))
              }
              arr.unshift(h("el-option", {
                  props: { value: "呼和浩特", label: "呼和浩特"  },
                }))
              return arr
            })()
      )
    },
    renderProductId9 (h, {column}) {
       var vm = this
      return  h('el-select', {
        props: { value: vm.datay5, size: "mini", filterable: 'filterable' ,clearable:'clearable' },
        on: { change: vm.changey5 }
      },
       (()=> {
              let arr = []
              for(let item of vm.yunnanY5) {
                arr.push(h("el-option", {
                  props: { value: item.product_id, label  : item.product_name  },
                }))
              }
              arr.unshift(h("el-option", {
                  props: { value: "云南", label: "云南"  },
                }))
              return arr
            })()
      )
    },
    // 第六类呼和浩特，云南
    renderProductId10 (h, {column}) {
     var vm = this
      return  h('el-select', {
        props: { value: vm.data6, size: "mini", filterable: 'filterable' ,clearable:'clearable' },
        on: { change: vm.change6 }
      },
       (()=> {
              let arr = []
              for(let item of vm.beijingY6) {
                arr.push(h("el-option", {
                  props: { value: item.product_id, label  : item.product_name  },
                }))
              }
              arr.unshift(h("el-option", {
                  props: { value: "呼和浩特", label: "呼和浩特"  },
                }))
              return arr
            })()
      )
    },
    renderProductId11 (h, {column}) {
       var vm = this
      return  h('el-select', {
        props: { value: vm.datay6, size: "mini", filterable: 'filterable' ,clearable:'clearable' },
        on: { change: vm.changey6}
      },
       (()=> {
              let arr = []
              for(let item of vm.yunnanY6) {
                arr.push(h("el-option", {
                  props: { value: item.product_id, label  : item.product_name  },
                }))
              }
              arr.unshift(h("el-option", {
                  props: { value: "云南", label: "云南"  },
                }))
              return arr
            })()
      )
    },
     // 第7类呼和浩特，云南
    renderProductId12 (h, {column}) {
     var vm = this
      return  h('el-select', {
        props: { value: vm.data7, size: "mini", filterable: 'filterable' ,clearable:'clearable' },
        on: { change: vm.change7 }
      },
       (()=> {
              let arr = []
              for(let item of vm.beijingY7) {
                arr.push(h("el-option", {
                  props: { value: item.product_id, label  : item.product_name  },
                }))
              }
              arr.unshift(h("el-option", {
                  props: { value: "呼和浩特", label: "呼和浩特"  },
                }))
              return arr
            })()
      )
    },
    renderProductId13 (h, {column}) {
       var vm = this
      return  h('el-select', {
        props: { value: vm.datay7, size: "mini", filterable: 'filterable' ,clearable:'clearable' },
        on: { change: vm.changey7}
      },
       (()=> {
              let arr = []
              for(let item of vm.yunnanY7) {
                arr.push(h("el-option", {
                  props: { value: item.product_id, label  : item.product_name  },
                }))
              }
              arr.unshift(h("el-option", {
                  props: { value: "云南", label: "云南"  },
                }))
              return arr
            })()
      )
    },
      // 无价类呼和浩特，云南
         renderProductId14 (h, {column}) {
     var vm = this
      return  h('el-select', {
        props: { value: vm.data8, size: "mini", filterable: 'filterable' ,clearable:'clearable' },
        on: { change: vm.change8 }
      },
       (()=> {
              let arr = []
              for(let item of vm.beijingY8) {
                arr.push(h("el-option", {
                  props: { value: item.product_id, label  : item.product_name  },
                }))
              }
              arr.unshift(h("el-option", {
                  props: { value: "呼和浩特", label: "呼和浩特"  },
                }))
              return arr
            })()
      )
    },
    renderProductId15 (h, {column}) {
       var vm = this
      return  h('el-select', {
        props: { value: vm.datay8, size: "mini", filterable: 'filterable' ,clearable:'clearable' },
        on: { change: vm.changey8}
      },
       (()=> {
              let arr = []
              for(let item of vm.yunnanY8) {
                arr.push(h("el-option", {
                  props: { value: item.product_id, label  : item.product_name  },
                }))
              }
              arr.unshift(h("el-option", {
                  props: { value: "云南", label: "云南"  },
                }))
              return arr
            })()
      )
    },
    // 类一呼和浩特
    change1(us){
      let vm = this
      vm.data1 = us  
      let domain = hostType(1)
      if(us === '呼和浩特') {
        us = ''
      }
      vm.$axios.get(`${domain}`+'/api/datacollect/?one='+(vm.data1=='呼和浩特'?'':vm.data1) +'&two='+(vm.datay1=='云南'?'':vm.datay1) +'&three='+(vm.data2=='呼和浩特'?'':vm.data2)+'&four='+(vm.datay2=='云南'?'':vm.datay2)+'&five='+(vm.data3=='呼和浩特'?'':vm.data3)  +'&six='+(vm.datay3=='云南'?'':vm.datay3)+'&seven='+(vm.data4=='呼和浩特'?'':vm.data4)+'&eight='+(vm.datay4=='云南'?'':vm.datay4)+'&nine='+(vm.data5=='呼和浩特'?'':vm.data5)+'&ten='+(vm.datay5=='云南'?'':vm.datay5)+'&eleven='+(vm.data6=='呼和浩特'?'':vm.data6)+'&twelve=' +(vm.datay6=='云南'?'':vm.datay6) +'&twelve=' +(vm.datay6=='云南'?'':vm.datay6) +'&thirteen='+(vm.data7=='呼和浩特'?'':vm.data7)+'&fourteen=' +(vm.datay7=='云南'?'':vm.datay7)+'&fifteen='+(vm.data8=='呼和浩特'?'':vm.data8)+'&sixteen=' +(vm.datay8=='云南'?'':vm.datay8)+ '&province='+ vm.province + '&city='+ vm.city + '')
      .then(res => {
        // console.log(res.data)
        vm.tableData = res.data.data.data
      })
    },
// 类一云南
    changey1(us){
      let vm = this
      let domain = hostType(1)
      vm.datay1 = us
      if(us === '云南') {
        us = ''
      }
      vm.$axios.get(`${domain}`+'/api/datacollect/?one='+(vm.data1=='呼和浩特'?'':vm.data1) +'&two='+(vm.datay1=='云南'?'':vm.datay1) +'&three='+(vm.data2=='呼和浩特'?'':vm.data2)+'&four='+(vm.datay2=='云南'?'':vm.datay2)+'&five='+(vm.data3=='呼和浩特'?'':vm.data3)  +'&six='+(vm.datay3=='云南'?'':vm.datay3)+'&seven='+(vm.data4=='呼和浩特'?'':vm.data4)+'&eight='+(vm.datay4=='云南'?'':vm.datay4)+'&nine='+(vm.data5=='呼和浩特'?'':vm.data5)+'&ten='+(vm.datay5=='云南'?'':vm.datay5)+'&eleven='+(vm.data6=='呼和浩特'?'':vm.data6)+'&twelve=' +(vm.datay6=='云南'?'':vm.datay6) +'&twelve=' +(vm.datay6=='云南'?'':vm.datay6) +'&thirteen='+(vm.data7=='呼和浩特'?'':vm.data7)+'&fourteen=' +(vm.datay7=='云南'?'':vm.datay7)+'&fifteen='+(vm.data8=='呼和浩特'?'':vm.data8)+'&sixteen=' +(vm.datay8=='云南'?'':vm.datay8)+ '&province='+ vm.province + '&city='+ vm.city + '')
      .then(res => {
        vm.tableData = res.data.data.data
      }) 
    },
// 类二呼和浩特
    change2(us){
      let vm = this
      let domain = hostType(1)
      vm.data2 = us
      if(us === '呼和浩特') {
        us = ''
      }
      vm.$axios.get(`${domain}`+'/api/datacollect/?one='+(vm.data1=='呼和浩特'?'':vm.data1) +'&two='+(vm.datay1=='云南'?'':vm.datay1) +'&three='+(vm.data2=='呼和浩特'?'':vm.data2)+'&four='+(vm.datay2=='云南'?'':vm.datay2) +'&five='+(vm.data3=='呼和浩特'?'':vm.data3)  +'&six='+(vm.datay3=='云南'?'':vm.datay3)+'&seven='+(vm.data4=='呼和浩特'?'':vm.data4)+'&eight='+(vm.datay4=='云南'?'':vm.datay4)+'&nine='+(vm.data5=='呼和浩特'?'':vm.data5)+'&ten='+(vm.datay5=='云南'?'':vm.datay5)+'&eleven='+(vm.data6=='呼和浩特'?'':vm.data6)+'&twelve=' +(vm.datay6=='云南'?'':vm.datay6) +'&twelve=' +(vm.datay6=='云南'?'':vm.datay6) +'&thirteen='+(vm.data7=='呼和浩特'?'':vm.data7)+'&fourteen=' +(vm.datay7=='云南'?'':vm.datay7)+'&fifteen='+(vm.data8=='呼和浩特'?'':vm.data8)+'&sixteen=' +(vm.datay8=='云南'?'':vm.datay8) +'&province='+ vm.province + '&city='+ vm.city+ '')
      .then(res => {
        vm.tableData = res.data.data.data
      })
    },
// 类二云南
  changey2(us){
      let vm = this
      let domain = hostType(1)
      vm.datay2 = us
      if(us === '云南') {
        us = ''
      }
      vm.$axios.get(`${domain}`+'/api/datacollect/?one='+(vm.data1=='呼和浩特'?'':vm.data1) +'&two='+(vm.datay1=='云南'?'':vm.datay1) +'&three='+(vm.data2=='呼和浩特'?'':vm.data2)+'&four='+(vm.datay2=='云南'?'':vm.datay2) +'&five='+(vm.data3=='呼和浩特'?'':vm.data3)  +'&six='+(vm.datay3=='云南'?'':vm.datay3)+'&seven='+(vm.data4=='呼和浩特'?'':vm.data4)+'&eight='+(vm.datay4=='云南'?'':vm.datay4)+'&nine='+(vm.data5=='呼和浩特'?'':vm.data5)+'&ten='+(vm.datay5=='云南'?'':vm.datay5)+'&eleven='+(vm.data6=='呼和浩特'?'':vm.data6)+'&twelve=' +(vm.datay6=='云南'?'':vm.datay6) + '&twelve=' +(vm.datay6=='云南'?'':vm.datay6) +'&thirteen='+(vm.data7=='呼和浩特'?'':vm.data7)+'&fourteen=' +(vm.datay7=='云南'?'':vm.datay7)+'&fifteen='+(vm.data8=='呼和浩特'?'':vm.data8)+'&sixteen=' +(vm.datay8=='云南'?'':vm.datay8) +'&province='+ vm.province + '&city='+ vm.city +'')
      .then(res => {
        vm.tableData = res.data.data.data
      })
    },
// 类三呼和浩特
change3(us){
      let vm = this
      let domain = hostType(1)
      vm.data3 = us
      if(us === '呼和浩特') {
        us = ''
      }
      vm.$axios.get(`${domain}`+'/api/datacollect/?one='+(vm.data1=='呼和浩特'?'':vm.data1) +'&two='+(vm.datay1=='云南'?'':vm.datay1) +'&three='+(vm.data2=='呼和浩特'?'':vm.data2)+'&four='+(vm.datay2=='云南'?'':vm.datay2) +'&five='+(vm.data3=='呼和浩特'?'':vm.data3)  +'&six='+(vm.datay3=='云南'?'':vm.datay3)+'&seven='+(vm.data4=='呼和浩特'?'':vm.data4)+'&eight='+(vm.datay4=='云南'?'':vm.datay4)+'&nine='+(vm.data5=='呼和浩特'?'':vm.data5)+'&ten='+(vm.datay5=='云南'?'':vm.datay5)+'&eleven='+(vm.data6=='呼和浩特'?'':vm.data6)+'&twelve=' +(vm.datay6=='云南'?'':vm.datay6) + '&twelve=' +(vm.datay6=='云南'?'':vm.datay6) +'&thirteen='+(vm.data7=='呼和浩特'?'':vm.data7)+'&fourteen=' +(vm.datay7=='云南'?'':vm.datay7)+'&fifteen='+(vm.data8=='呼和浩特'?'':vm.data8)+'&sixteen=' +(vm.datay8=='云南'?'':vm.datay8)+'&province='+ vm.province + '&city='+ vm.city +'')
      .then(res => {
        // console.log(res.data)
        vm.tableData = res.data.data.data
      })
    },
// 类三云南
changey3(us){
      let vm = this
      let domain = hostType(1)
      vm.datay3 = us
      if(us === '云南') {
        us = ''
      }
      vm.$axios.get(`${domain}`+'/api/datacollect/?one='+(vm.data1=='呼和浩特'?'':vm.data1) +'&two='+(vm.datay1=='云南'?'':vm.datay1) +'&three='+(vm.data2=='呼和浩特'?'':vm.data2)+'&four='+(vm.datay2=='云南'?'':vm.datay2) +'&five='+(vm.data3=='呼和浩特'?'':vm.data3)  +'&six='+(vm.datay3=='云南'?'':vm.datay3)+'&seven='+(vm.data4=='呼和浩特'?'':vm.data4)+'&eight='+(vm.datay4=='云南'?'':vm.datay4)+'&nine='+(vm.data5=='呼和浩特'?'':vm.data5)+'&ten='+(vm.datay5=='云南'?'':vm.datay5)+'&eleven='+(vm.data6=='呼和浩特'?'':vm.data6)+'&twelve=' +(vm.datay6=='云南'?'':vm.datay6) + '&twelve=' +(vm.datay6=='云南'?'':vm.datay6) +'&thirteen='+(vm.data7=='呼和浩特'?'':vm.data7)+'&fourteen=' +(vm.datay7=='云南'?'':vm.datay7)+'&fifteen='+(vm.data8=='呼和浩特'?'':vm.data8)+'&sixteen=' +(vm.datay8=='云南'?'':vm.datay8)+'&province='+ vm.province + '&city='+ vm.city +'')
      .then(res => {
        // console.log(res.data)
        vm.tableData = res.data.data.data
      })
    },
 // 类四呼和浩特
    change4(us){
      let vm = this
      let domain = hostType(1)
      vm.data4 = us
      if(us === '呼和浩特') {
        us = ''
      }
      vm.$axios.get(`${domain}`+'/api/datacollect/?one='+(vm.data1=='呼和浩特'?'':vm.data1) +'&two='+(vm.datay1=='云南'?'':vm.datay1) +'&three='+(vm.data2=='呼和浩特'?'':vm.data2)+'&four='+(vm.datay2=='云南'?'':vm.datay2) +'&five='+(vm.data3=='呼和浩特'?'':vm.data3)+'&six='+(vm.datay3=='云南'?'':vm.datay3)+'&seven='+(vm.data4=='呼和浩特'?'':vm.data4)+'&eight='+(vm.datay4=='云南'?'':vm.datay4)+'&nine='+(vm.data5=='呼和浩特'?'':vm.data5)+'&ten='+(vm.datay5=='云南'?'':vm.datay5)+'&eleven='+(vm.data6=='呼和浩特'?'':vm.data6)+'&twelve=' +(vm.datay6=='云南'?'':vm.datay6) +'&twelve=' +(vm.datay6=='云南'?'':vm.datay6) +'&thirteen='+(vm.data7=='呼和浩特'?'':vm.data7)+'&fourteen=' +(vm.datay7=='云南'?'':vm.datay7)+'&fifteen='+(vm.data8=='呼和浩特'?'':vm.data8)+'&sixteen=' +(vm.datay8=='云南'?'':vm.datay8)+'&province='+ vm.province + '&city='+ vm.city + '')
      .then(res => {
        // console.log(res.data)
        vm.tableData = res.data.data.data
      })
         
    },
// 类四云南
changey4(us){
      let vm = this
      let domain = hostType(1)
      vm.datay4= us
      if(us === '云南') {
        us = ''
      }
      vm.$axios.get(`${domain}`+'/api/datacollect/?one='+(vm.data1=='呼和浩特'?'':vm.data1) +'&two='+(vm.datay1=='云南'?'':vm.datay1) +'&three='+(vm.data2=='呼和浩特'?'':vm.data2)+'&four='+(vm.datay2=='云南'?'':vm.datay2) +'&five='+(vm.data3=='呼和浩特'?'':vm.data3)  +'&six='+(vm.datay3=='云南'?'':vm.datay3)+'&seven='+(vm.data4=='呼和浩特'?'':vm.data4)+'&eight='+(vm.datay4=='云南'?'':vm.datay4)+'&nine='+(vm.data5=='呼和浩特'?'':vm.data5)+'&ten='+(vm.datay5=='云南'?'':vm.datay5)+'&eleven='+(vm.data6=='呼和浩特'?'':vm.data6)+'&twelve=' +(vm.datay6=='云南'?'':vm.datay6) + '&twelve=' +(vm.datay6=='云南'?'':vm.datay6) +'&thirteen='+(vm.data7=='呼和浩特'?'':vm.data7)+'&fourteen=' +(vm.datay7=='云南'?'':vm.datay7)+'&fifteen='+(vm.data8=='呼和浩特'?'':vm.data8)+'&sixteen=' +(vm.datay8=='云南'?'':vm.datay8)+'&province='+ vm.province + '&city='+ vm.city +'')
      .then(res => {
        // console.log(res.data)
        vm.tableData = res.data.data.data
      })
    },
// 类五呼和浩特
    change5(us){
      let vm = this
      let domain = hostType(1)
      vm.data5= us
      if(us === '呼和浩特') {
        us = ''
      }
      vm.$axios.get(`${domain}`+'/api/datacollect/?one='+(vm.data1=='呼和浩特'?'':vm.data1) +'&two='+(vm.datay1=='云南'?'':vm.datay1) +'&three='+(vm.data2=='呼和浩特'?'':vm.data2)+'&four='+(vm.datay2=='云南'?'':vm.datay2) +'&five='+(vm.data3=='呼和浩特'?'':vm.data3)  +'&six='+(vm.datay3=='云南'?'':vm.datay3)+'&seven='+(vm.data4=='呼和浩特'?'':vm.data4)+'&eight='+(vm.datay4=='云南'?'':vm.datay4)+'&nine='+(vm.data5=='呼和浩特'?'':vm.data5)+'&ten='+(vm.datay5=='云南'?'':vm.datay5)+'&eleven='+(vm.data6=='呼和浩特'?'':vm.data6)+'&twelve=' +(vm.datay6=='云南'?'':vm.datay6) +'&twelve=' +(vm.datay6=='云南'?'':vm.datay6) +'&thirteen='+(vm.data7=='呼和浩特'?'':vm.data7)+'&fourteen=' +(vm.datay7=='云南'?'':vm.datay7)+'&fifteen='+(vm.data8=='呼和浩特'?'':vm.data8)+'&sixteen=' +(vm.datay8=='云南'?'':vm.datay8)+'&province='+ vm.province + '&city='+ vm.city + '')
      .then(res => {
        // console.log(res.data)
        vm.tableData = res.data.data.data
      })                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
    },
// 类五云南
changey5(us){
      let vm = this
      let domain = hostType(1)
      vm.datay5= us
      if(us === '云南') {
        us = ''
      }
      vm.$axios.get(`${domain}`+'/api/datacollect/?one='+(vm.data1=='呼和浩特'?'':vm.data1) +'&two='+(vm.datay1=='云南'?'':vm.datay1) +'&three='+(vm.data2=='呼和浩特'?'':vm.data2)+'&four='+(vm.datay2=='云南'?'':vm.datay2) +'&five='+(vm.data3=='呼和浩特'?'':vm.data3)  +'&six='+(vm.datay3=='云南'?'':vm.datay3)+'&seven='+(vm.data4=='呼和浩特'?'':vm.data4)+'&eight='+(vm.datay4=='云南'?'':vm.datay4)+'&nine='+(vm.data5=='呼和浩特'?'':vm.data5)+'&ten='+(vm.datay5=='云南'?'':vm.datay5)+'&eleven='+(vm.data6=='呼和浩特'?'':vm.data6)+'&twelve=' +(vm.datay6=='云南'?'':vm.datay6) +'&twelve=' +(vm.datay6=='云南'?'':vm.datay6) +'&thirteen='+(vm.data7=='呼和浩特'?'':vm.data7)+'&fourteen=' +(vm.datay7=='云南'?'':vm.datay7)+'&fifteen='+(vm.data8=='呼和浩特'?'':vm.data8)+'&sixteen=' +(vm.datay8=='云南'?'':vm.datay8)+ '&province='+ vm.province + '&city='+ vm.city + '')
      .then(res => {
        // console.log(res.data)
        vm.tableData = res.data.data.data
      })
    },
// 类六呼和浩特
    change6(us){
      let vm = this
      let domain = hostType(1)
      vm.data6= us
      if(us === '呼和浩特') {
        us = ''
      }
      vm.$axios.get(`${domain}`+'/api/datacollect/?one='+(vm.data1=='呼和浩特'?'':vm.data1) +'&two='+(vm.datay1=='云南'?'':vm.datay1) +'&three='+(vm.data2=='呼和浩特'?'':vm.data2)+'&four='+(vm.datay2=='云南'?'':vm.datay2) +'&five='+(vm.data3=='呼和浩特'?'':vm.data3)  +'&six='+(vm.datay3=='云南'?'':vm.datay3)+'&seven='+(vm.data4=='呼和浩特'?'':vm.data4)+'&eight='+(vm.datay4=='云南'?'':vm.datay4)+'&nine='+(vm.data5=='呼和浩特'?'':vm.data5)+'&ten='+(vm.datay5=='云南'?'':vm.datay5)+'&eleven='+(vm.data6=='呼和浩特'?'':vm.data6)+'&twelve=' +(vm.datay6=='云南'?'':vm.datay6) + '&twelve=' +(vm.datay6=='云南'?'':vm.datay6) +'&thirteen='+(vm.data7=='呼和浩特'?'':vm.data7)+'&fourteen=' +(vm.datay7=='云南'?'':vm.datay7)+'&fifteen='+(vm.data8=='呼和浩特'?'':vm.data8)+'&sixteen=' +(vm.datay8=='云南'?'':vm.datay8) + '&province='+ vm.province + '&city='+ vm.city +'')
      .then(res => {
        // console.log(res.data)
        vm.tableData = res.data.data.data
      })        
    },
// 类六云南
changey6(us){
      let vm = this
      let domain = hostType(1)
      vm.datay6= us
      if(us === '云南') {
        us = ''
      }
      vm.$axios.get(`${domain}`+'/api/datacollect/?one='+(vm.data1=='呼和浩特'?'':vm.data1) +'&two='+(vm.datay1=='云南'?'':vm.datay1) +'&three='+(vm.data2=='呼和浩特'?'':vm.data2)+'&four='+(vm.datay2=='云南'?'':vm.datay2) +'&five='+(vm.data3=='呼和浩特'?'':vm.data3)  +'&six='+(vm.datay3=='云南'?'':vm.datay3)+'&seven='+(vm.data4=='呼和浩特'?'':vm.data4)+'&eight='+(vm.datay4=='云南'?'':vm.datay4)+'nine='+(vm.data5=='呼和浩特'?'':vm.data5)+'&ten='+(vm.datay5=='云南'?'':vm.datay5)+'eleven='+(vm.data6=='呼和浩特'?'':vm.data6)+'&twelve=' +(vm.datay6=='云南'?'':vm.datay6) +'&twelve=' +(vm.datay6=='云南'?'':vm.datay6) +'&thirteen='+(vm.data7=='呼和浩特'?'':vm.data7)+'&fourteen=' +(vm.datay7=='云南'?'':vm.datay7)+'&fifteen='+(vm.data8=='呼和浩特'?'':vm.data8)+'&sixteen=' +(vm.datay8=='云南'?'':vm.datay8)+ '&province='+ vm.province + '&city='+ vm.city + '')
      .then(res => {
        // console.log(res.data)
        vm.tableData = res.data.data.data
      })
    },

    // 类7呼和浩特
    change7(us){
      let vm = this
      let domain = hostType(1)
      vm.data7= us
      if(us === '呼和浩特') {
        us = ''
      }
      vm.$axios.get(`${domain}`+'/api/datacollect/?one='+(vm.data1=='呼和浩特'?'':vm.data1) +'&two='+(vm.datay1=='云南'?'':vm.datay1) +'&three='+(vm.data2=='呼和浩特'?'':vm.data2)+'&four='+(vm.datay2=='云南'?'':vm.datay2) +'&five='+(vm.data3=='呼和浩特'?'':vm.data3)  +'&six='+(vm.datay3=='云南'?'':vm.datay3)+'&seven='+(vm.data4=='呼和浩特'?'':vm.data4)+'&eight='+(vm.datay4=='云南'?'':vm.datay4)+'&nine='+(vm.data5=='呼和浩特'?'':vm.data5)+'&ten='+(vm.datay5=='云南'?'':vm.datay5)+'&eleven='+(vm.data6=='呼和浩特'?'':vm.data6)+'&twelve=' +(vm.datay6=='云南'?'':vm.datay6) +'&thirteen='+(vm.data7=='呼和浩特'?'':vm.data7)+'&fourteen=' +(vm.datay7=='云南'?'':vm.datay7)+'&fifteen='+(vm.data8=='呼和浩特'?'':vm.data8)+'&sixteen=' +(vm.datay8=='云南'?'':vm.datay8)+'&province='+ vm.province + '&city='+ vm.city +'')
      .then(res => {
        // console.log(res.data)
        vm.tableData = res.data.data.data
      })        
    },
// 类7云南
changey7(us){
      let vm = this
      let domain = hostType(1)
      vm.datay7= us
      if(us === '云南') {
        us = ''
      }
      vm.$axios.get(`${domain}`+'/api/datacollect/?one='+(vm.data1=='呼和浩特'?'':vm.data1) +'&two='+(vm.datay1=='云南'?'':vm.datay1) +'&three='+(vm.data2=='呼和浩特'?'':vm.data2)+'&four='+(vm.datay2=='云南'?'':vm.datay2) +'&five='+(vm.data3=='呼和浩特'?'':vm.data3)  +'&six='+(vm.datay3=='云南'?'':vm.datay3)+'&seven='+(vm.data4=='呼和浩特'?'':vm.data4)+'&eight='+(vm.datay4=='云南'?'':vm.datay4)+'nine='+(vm.data5=='呼和浩特'?'':vm.data5)+'&ten='+(vm.datay5=='云南'?'':vm.datay5)+'eleven='+(vm.data6=='呼和浩特'?'':vm.data6)+'&twelve=' +(vm.datay6=='云南'?'':vm.datay6) +'&thirteen='+(vm.data7=='呼和浩特'?'':vm.data7)+'&fourteen=' +(vm.datay7=='云南'?'':vm.datay7)+'&fifteen='+(vm.data8=='呼和浩特'?'':vm.data8)+'&sixteen=' +(vm.datay8=='云南'?'':vm.datay8)+'&province='+ vm.province + '&city='+ vm.city + '')
      .then(res => {
        // console.log(res.data)
        vm.tableData = res.data.data.data
      })
    },

    // 类8呼和浩特
    change8(us){
      let vm = this
      let domain = hostType(1)
      vm.data8= us
      if(us === '呼和浩特') {
        us = ''
      }
      vm.$axios.get(`${domain}`+'/api/datacollect/?one='+(vm.data1=='呼和浩特'?'':vm.data1) +'&two='+(vm.datay1=='云南'?'':vm.datay1) +'&three='+(vm.data2=='呼和浩特'?'':vm.data2)+'&four='+(vm.datay2=='云南'?'':vm.datay2) +'&five='+(vm.data3=='呼和浩特'?'':vm.data3)  +'&six='+(vm.datay3=='云南'?'':vm.datay3)+'&seven='+(vm.data4=='呼和浩特'?'':vm.data4)+'&eight='+(vm.datay4=='云南'?'':vm.datay4)+'&nine='+(vm.data5=='呼和浩特'?'':vm.data5)+'&ten='+(vm.datay5=='云南'?'':vm.datay5)+'&eleven='+(vm.data6=='呼和浩特'?'':vm.data6)+'&twelve=' +(vm.datay6=='云南'?'':vm.datay6) + '&thirteen='+(vm.data7=='呼和浩特'?'':vm.data7)+'&fourteen=' +(vm.datay7=='云南'?'':vm.datay7)+'&fifteen='+(vm.data8=='呼和浩特'?'':vm.data8)+'&sixteen=' +(vm.datay8=='云南'?'':vm.datay8)+ '&province='+ vm.province + '&city='+ vm.city +'')
      .then(res => {
        // console.log(res.data)
        vm.tableData = res.data.data.data
      })        
    },
// 类六云南
changey8(us){
      let vm = this
      let domain = hostType(1)
      vm.datay8= us
      if(us === '云南') {
        us = ''
      }
      vm.$axios.get(`${domain}`+'/api/datacollect/?one='+(vm.data1=='呼和浩特'?'':vm.data1) +'&two='+(vm.datay1=='云南'?'':vm.datay1) +'&three='+(vm.data2=='呼和浩特'?'':vm.data2)+'&four='+(vm.datay2=='云南'?'':vm.datay2) +'&five='+(vm.data3=='呼和浩特'?'':vm.data3)  +'&six='+(vm.datay3=='云南'?'':vm.datay3)+'&seven='+(vm.data4=='呼和浩特'?'':vm.data4)+'&eight='+(vm.datay4=='云南'?'':vm.datay4)+'nine='+(vm.data5=='呼和浩特'?'':vm.data5)+'&ten='+(vm.datay5=='云南'?'':vm.datay5)+'eleven='+(vm.data6=='呼和浩特'?'':vm.data6)+'&twelve=' +(vm.datay6=='云南'?'':vm.datay6) +'&thirteen='+(vm.data7=='呼和浩特'?'':vm.data7)+'&fourteen=' +(vm.datay7=='云南'?'':vm.datay7)+'&fifteen='+(vm.data8=='呼和浩特'?'':vm.data8)+'&sixteen=' +(vm.datay8=='云南'?'':vm.datay8)+ '&province='+ vm.province + '&city='+ vm.city + '')
      .then(res => {
        // console.log(res.data)
        vm.tableData = res.data.data.data
      })
    },
    optionClick (us) {
      // console.log(us)
      // console.log(us.path[0].className)
      us.stopPropagation()
      // console.log(' .' + us.target.className + '-option')
      // console.log(document.querySelector('div'))
      // console.log(document.querySelector(' .' + us.target.className + '-option'))
      var thisWidth = us.target.clientWidth
      // console.log(thisWidth)
      var vm = this
      if (document.querySelector('.createSelect')) {
        var divAll = document.querySelectorAll('.createSelect')
        for (let i = 0; i < divAll.length; i++) {
          if (us.target.className.split('-')[1] === divAll[i].className.split('-')[1]) {
            if (divAll[i].style.display === 'none') {
              divAll[i].style.display = 'block'
            } else {
              divAll[i].style.display = 'none'
            }
          } else {
            divAll[i].style.display = 'none'
          }
        }
      }
      if (!document.querySelector(' .' + us.target.className + '-option')) {
        var d = document.createElement('div')
        d.className = 'createSelect'
        d.className += ' ' + us.target.className + '-option'
        d.style.position = 'fixed'
        d.style.top = us.clientY - us.offsetY + 32 + 'px'
        d.style.left = us.clientX - us.offsetX+ 'px'
        d.style.width = thisWidth + 'px'
        d.style.height = '60px'
        d.style.display = 'block'
        document.body.appendChild(d)
        var d2 = document.createElement('div')
        d2.className = 'w-selectOption'
        var unm = us.target.className.split('-')[1]
        console.log('=============99999000')
        // if (unm === 'one') {
        //   vm.$axios
        //   .get('/industry/api/productselect/?isall=1&cla=' + encodeURI('一类'))
        //   .then(res => {
        //     vm.beijingY1 = res.data
        //     for (let i = 0; i < res.data.length; i++) {
        //       let p = document.createElement('p')
        //       p.setAttribute('product_id', res.data[i].product_id)
        //       p.innerHTML = res.data[i].product_name
        //       d2.appendChild(p)
        //     }
        //   })
        // } else if (unm === 'two') {
        //   vm.$axios.get('/industry/api/productselect/?isyn=1&cla=' + encodeURI('一类')).then(res => {
        //     vm.beijingY1 = res.data
        //     for (let i = 0; i < res.data.length; i++) {
        //       let p = document.createElement('p')
        //       p.setAttribute('product_id', res.data[i].product_id)
        //       p.innerHTML = res.data[i].product_name
        //       d2.appendChild(p)
        //     }
        //   })
        // } else if (unm === 'three') {
        //   vm.$axios.get('/industry/api/productselect/?isall=1&cla=' + encodeURI('二类')).then(res => {
        //     vm.beijingY1 = res.data
        //     for (let i = 0; i < res.data.length; i++) {
        //       let p = document.createElement('p')
        //       p.setAttribute('product_id', res.data[i].product_id)
        //       p.innerHTML = res.data[i].product_name
        //       d2.appendChild(p)
        //     }
        //   })
        // } else if (unm === 'four') {
        //   vm.$axios.get('/industry/api/productselect/?isyn=1&cla=' + encodeURI('二类')).then(res => {
        //     vm.beijingY1 = res.data
        //     for (let i = 0; i < res.data.length; i++) {
        //       let p = document.createElement('p')
        //       p.setAttribute('product_id', res.data[i].product_id)
        //       p.innerHTML = res.data[i].product_name
        //       d2.appendChild(p)
        //     }
        //   })
        // } else if (unm === 'five') {
        //   vm.$axios.get('/industry/api/productselect/?isall=1&cla=' + encodeURI('三类')).then(res => {
        //     vm.beijingY1 = res.data
        //     for (let i = 0; i < res.data.length; i++) {
        //       let p = document.createElement('p')
        //       p.setAttribute('product_id', res.data[i].product_id)
        //       p.innerHTML = res.data[i].product_name
        //       d2.appendChild(p)
        //     }
        //   })
        // } else if (unm === 'six') {
        //   vm.$axios.get('/industry/api/productselect/?isyn=1&cla=' + encodeURI('三类')).then(res => {
        //     vm.beijingY1 = res.data
        //     for (let i = 0; i < res.data.length; i++) {
        //       let p = document.createElement('p')
        //       p.setAttribute('product_id', res.data[i].product_id)
        //       p.innerHTML = res.data[i].product_name
        //       d2.appendChild(p)
        //     }
        //   })
        // } else if (unm === 'seven') {
        //   vm.$axios.get('/industry/api/productselect/?isall=1&cla=' + encodeURI('四类')).then(res => {
        //     vm.beijingY1 = res.data
        //     for (let i = 0; i < res.data.length; i++) {
        //       let p = document.createElement('p')
        //       p.setAttribute('product_id', res.data[i].product_id)
        //       p.innerHTML = res.data[i].product_name
        //       d2.appendChild(p)
        //     }
        //   })
        // } else if (unm === 'eight') {
        //   vm.$axios.get('/industry/api/productselect/?isyn=1&cla=' + encodeURI('四类')).then(res => {
        //     vm.beijingY1 = res.data
        //     for (let i = 0; i < res.data.length; i++) {
        //       let p = document.createElement('p')
        //       p.setAttribute('product_id', res.data[i].product_id)
        //       p.innerHTML = res.data[i].product_name
        //       d2.appendChild(p)
        //     }
        //   })
        // } else if (unm === 'nine') {
        //   vm.$axios.get('/industry/api/productselect/?isall=1&cla=' + encodeURI('五类')).then(res => {
        //     vm.beijingY1 = res.data
        //     for (let i = 0; i < res.data.length; i++) {
        //       let p = document.createElement('p')
        //       p.setAttribute('product_id', res.data[i].product_id)
        //       p.innerHTML = res.data[i].product_name
        //       d2.appendChild(p)
        //     }
        //   })
        // } else if (unm === 'ten') {
        //   vm.$axios.get('/industry/api/productselect/?isyn=1&cla=' + encodeURI('五类')).then(res => {
        //     vm.beijingY1 = res.data
        //     for (let i = 0; i < res.data.length; i++) {
        //       let p = document.createElement('p')
        //       p.setAttribute('product_id', res.data[i].product_id)
        //       p.innerHTML = res.data[i].product_name
        //       d2.appendChild(p)
        //     }
        //   })
        // } else if (unm === 'eleven') {
        //   vm.$axios.get('/industry/api/productselect/?isall=1&cla=' + encodeURI('无价类')).then(res => {
        //     vm.beijingY1 = res.data
        //     for (let i = 0; i < res.data.length; i++) {
        //       let p = document.createElement('p')
        //       p.setAttribute('product_id', res.data[i].product_id)
        //       p.innerHTML = res.data[i].product_name
        //       d2.appendChild(p)
        //     }
        //   })
        // } else if (unm === 'twelve') {
        //   vm.$axios.get('/industry/api/productselect/?isyn=1&cla=' + encodeURI('无价类')).then(res => {
        //     vm.beijingY1 = res.data
        //     for (let i = 0; i < res.data.length; i++) {
        //       let p = document.createElement('p')
        //       p.setAttribute('product_id', res.data[i].product_id)
        //       p.innerHTML = res.data[i].product_name
        //       d2.appendChild(p)
        //     }
        //   })
        // }
        // else if (unm === 'thirteen') {
        //   vm.$axios.get('/industry/api/productselect/?isyn=1&cla=' + encodeURI('无价类')).then(res => {
        //     vm.beijingY1 = res.data
        //     for (let i = 0; i < res.data.length; i++) {
        //       let p = document.createElement('p')
        //       p.setAttribute('product_id', res.data[i].product_id)
        //       p.innerHTML = res.data[i].product_name
        //       d2.appendChild(p)
        //     }
        //   })
        // }
        // else if (unm === 'fourteen') {
        //   vm.$axios.get('/industry/api/productselect/?isyn=1&cla=' + encodeURI('无价类')).then(res => {
        //     vm.beijingY1 = res.data
        //     for (let i = 0; i < res.data.length; i++) {
        //       let p = document.createElement('p')
        //       p.setAttribute('product_id', res.data[i].product_id)
        //       p.innerHTML = res.data[i].product_name
        //       d2.appendChild(p)
        //     }
        //   })
        // }
        // else if (unm === 'fifteen') {
        //   vm.$axios.get('/industry/api/productselect/?isyn=1&cla=' + encodeURI('无价类')).then(res => {
        //     vm.beijingY1 = res.data
        //     for (let i = 0; i < res.data.length; i++) {
        //       let p = document.createElement('p')
        //       p.setAttribute('product_id', res.data[i].product_id)
        //       p.innerHTML = res.data[i].product_name
        //       d2.appendChild(p)
        //     }
        //   })
        // }
        // else if (unm === 'sixteen') {
        //   vm.$axios.get('/industry/api/productselect/?isyn=1&cla=' + encodeURI('无价类')).then(res => {
        //     vm.beijingY1 = res.data
        //     for (let i = 0; i < res.data.length; i++) {
        //       let p = document.createElement('p')
        //       p.setAttribute('product_id', res.data[i].product_id)
        //       p.innerHTML = res.data[i].product_name
        //       d2.appendChild(p)
        //     }
        //   })
        // }
        d2.onclick = function (event) {
          var event = event || window.event
          var target = event.target || event.srcElement
          if (target.nodeName.toLowerCase() === 'p') {
            // console.log(target.innerHTML)
            us.target.textContent = target.innerHTML
            us.target.setAttribute('product_id',target.getAttribute('product_id'))
            vm.loading = true
            var one = document.querySelector('.selectTable-one').textContent === '呼和浩特' ? '' : document.querySelector('.selectTable-one').getAttribute('product_id'),
              two = document.querySelector('.selectTable-two').textContent === '云南' ? '' : document.querySelector('.selectTable-two').getAttribute('product_id'),
              three = document.querySelector('.selectTable-three').textContent === '呼和浩特' ? '' : document.querySelector('.selectTable-three').getAttribute('product_id'),
              four = document.querySelector('.selectTable-four').textContent === '云南' ? '' : document.querySelector('.selectTable-four').getAttribute('product_id'),
              five = document.querySelector('.selectTable-five').textContent === '呼和浩特' ? '' : document.querySelector('.selectTable-five').getAttribute('product_id'),
              six = document.querySelector('.selectTable-six').textContent === '云南' ? '' : document.querySelector('.selectTable-six').getAttribute('product_id'),
              seven = document.querySelector('.selectTable-seven').textContent === '呼和浩特' ? '' : document.querySelector('.selectTable-seven').getAttribute('product_id'),
              eight = document.querySelector('.selectTable-eight').textContent === '云南' ? '' : document.querySelector('.selectTable-eight').getAttribute('product_id'),
              nine = document.querySelector('.selectTable-nine').textContent === '呼和浩特' ? '' : document.querySelector('.selectTable-nine').getAttribute('product_id'),
              ten = document.querySelector('.selectTable-ten').textContent === '云南' ? '' : document.querySelector('.selectTable-ten').getAttribute('product_id'),
              eleven = document.querySelector('.selectTable-eleven').textContent === '呼和浩特' ? '' : document.querySelector('.selectTable-eleven').getAttribute('product_id'),
              twelve = document.querySelector('.selectTable-twelve').textContent === '云南' ? '' : document.querySelector('.selectTable-twelve').getAttribute('product_id')
            vm.$axios.get('/industry/api/datacollect/?one=' + one + '&two=' + two + '&three=' + three + '&four=' + four + '&five=' + five + '&six=' + six + '&seven=' + seven + '&eight=' + eight + '&nine=' + nine + '&ten=' + ten + '&eleven=' + eleven + '&twelve=' + twelve +'&province='+ vm.province + '&city='+ vm.city ).then(res => {
              vm.tableData = res.data
              vm.loading = false
              // console.log(res)
            })
          }
        }
        d.appendChild(d2)
        // d.innerHTML = '<div class="w-selectOption" onclick=' + this.clickOption(this) +'><p>呼和浩特</p><p>大前门</p></div>'
      } else {
        // document.querySelector(' .' + us.target.className + '-option').style.display = 'block'
        document.querySelector(' .' + us.target.className + '-option').style.top = us.clientY - us.offsetY + 32 + 'px'
        document.querySelector(' .' + us.target.className + '-option').style.left = us.clientX - us.offsetX + 'px'
      }
    },
    // 点击单个格子
    cellClick (row, column, cell, event) {
    // || column.label === '负责人' || column.label === '销量（箱）' || column.label === '销量同比增长（%）' || column.label === '完成率（%）' || column.label === '去年' || column.label === '今年' || column.label === '同比增长'
      // return false
      var vm = this
      if (cell.cellIndex === 1 || cell.cellIndex === 2 || cell.cellIndex === 5 || cell.cellIndex === 6 || cell.cellIndex === 7 || cell.cellIndex === 11 || cell.cellIndex === 12 || cell.cellIndex === 13) {
        if (vm.$route.path === '/strategyTableW') {
          vm.$router.push({path: '/schedule', query: {dist: row.dist}})
        } else if (vm.$route.path === '/strategyTableWB') {
          // console.log(row)
          vm.$router.push({path: '/MarketAnalysis', query: {dist: row.admin}})
        }
      }
    },
    // 控制表格行的颜色
    tableRowClassName({row, rowIndex}) {
      // console.log({row, rowIndex})
      if (rowIndex === 0) {
        return 'warning-row';
      }
      if (rowIndex%2 === 0) {
        return 'table-color2n';
      }
    },
    tableCellClassName ({row, column, rowIndex, columnIndex}) {
      // console.log({row, column, rowIndex, columnIndex})
      // 第四列
      if (columnIndex === 1) {
        return 'color_blue'
      }
      if (columnIndex === 2) {
        return 'color_blue'
      }
      if (columnIndex === 5) {
        return 'color_blue'
      }
      if (columnIndex === 6) {
        return 'color_blue'
      }
      if (columnIndex === 7) {
        return 'color_blue'
      }
      if (columnIndex === 11) {
        return 'color_blue'
      }
      if (columnIndex === 12) {
        return 'color_blue'
      }
      if (columnIndex === 13) {
        return 'color_blue'
      }
      if (columnIndex === 4) {
        if (row.sales_ratio < 0) {
          return 'color_red'
        }
      }
      if (columnIndex === 6) {
        if (row.sales_ratio1 < 0) {
          return 'color_red'
        }
      }
      if (columnIndex === 10) {
        if (row.sales_ratio < 0) {
          return 'ratio'
        }
      }
      if (columnIndex === 13) {
        if (row.sales_ratio < 0) {
          return 'ratio1'
        }
      }
    },
    // 导出数据
    exportExcel () {
      /* generate workbook object from table */
      let wb = XLSX.utils.table_to_book(document.querySelector('#tableFilter').querySelector('.el-table__fixed'));
      /* get binary string as output */
      console.log(wb)
      let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' });
      try {
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '云南中烟呼和浩特分中心销售数据汇总表.xlsx');
      } catch (e)
      {
        if (typeof console !== 'undefined')
          console.log(e, wbout)
      }
      console.log(wbout)
      return wbout
    },
  //  初始化请求事件
    loadFristTime () {
      var vm = this
       let domain = hostType(1)
      vm.$axios.get(`${domain}`+'/api/datacollect/?time=' + new Date().getTime()+'&province='+ vm.province + '&city='+ vm.city).then(res => {
        vm.tableData = res.data.data.data
        vm.loading = false
      })
    }
  },
  mounted () {
    var windowH = document.documentElement.clientHeight
    // console.log(windowH)
    this.tableHeight = windowH - 200
    var vm = this
    // 初始化加载数据
    vm.loading = true
    vm.loadFristTime()
    document.body.onclick = function () {
      // console.log(document.querySelectorAll('.createSelect'))
      if (document.querySelector('.createSelect')) {
        var divAll = document.querySelectorAll('.createSelect')
        for (let i = 0; i < divAll.length; i++) {
          divAll[i].style.display = 'none'
        }
      }
    }

     let domain = hostType(1)
      vm.$axios.get(`${domain}`+'/api/productselect/')
   .then(res => {
     console.log(res.data.data.product)
     let product = res.data.data.product
     let yn_product = res.data.data.yn_product
       for (let index = 0; index < yn_product.length; index++) {
        if(yn_product[index].category === '品类一'){
           vm.yunnanY1 = yn_product[index].product;
        }else if(yn_product[index].category === '品类二'){
          vm.yunnanY2 = yn_product[index].product;
        }
        else if(yn_product[index].category === '品类三'){
          vm.yunnanY3 = yn_product[index].product;
        }
        else if(yn_product[index].category === '品类四'){
          vm.yunnanY4 = yn_product[index].product;
        }
        else if(yn_product[index].category === '品类五'){
          vm.yunnanY5 = yn_product[index].product;
        }
        else if(yn_product[index].category === '品类六'){
          vm.yunnanY6 = yn_product[index].product;
        }
        else if(yn_product[index].category === '品类七'){
          vm.yunnanY7 = yn_product[index].product;
        }
        else if(yn_product[index].category === '无品类'){
          vm.yunnanY8 = yn_product[index].product;
        }
     }
     for (let index = 0; index < product.length; index++) {
        if(product[index].category === '品类一'){
           vm.beijingY1 = product[index].product;
        }else if(product[index].category === '品类二'){
          vm.beijingY2 = product[index].product;
        }
        else if(product[index].category === '品类三'){
          vm.beijingY3 = product[index].product;
        }
        else if(product[index].category === '品类四'){
          vm.beijingY4 = product[index].product;
        }
        else if(product[index].category === '品类五'){
          vm.beijingY5 = product[index].product;
        }
        else if(product[index].category === '品类六'){
          vm.beijingY6 = product[index].product;
        }
        else if(product[index].category === '品类七'){
          vm.beijingY7 = product[index].product;
        }
        else if(product[index].category === '无品类'){
          vm.beijingY8 = product[index].product;
        }
     }
            // vm.beijingY1 = res.data;
   })
          // vm.$axios
          //   .get(`${domain}`+"/ops_map/api/opsbiztop/")
          //   .then(function (response) {
          //     vm.selectlist1 = response.data.mon_list;
          //   });
    // 类一呼和浩特
  //   vm.$axios.get(`${domain}`+'/api/productselect/?isall=1&cla=' + encodeURI('一类'))
  //  .then(res => {
  //           vm.beijingY1 = res.data;
  //  })
  // //  类一云南
  //  vm.$axios.get(`${domain}`+'/api/productselect/?isyn=1&cla=' + encodeURI('一类'))
  //  .then(res => {
  //           vm.yunnanY1 = res.data            
  //  })
  //  // 类二呼和浩特
  //   vm.$axios.get(`${domain}`+'/api/productselect/?isall=1&cla=' + encodeURI('二类'))
  //  .then(res => {
  //           vm.beijingY2 = res.data            
  //  })
  //  // 类二云南
  //   vm.$axios.get(`${domain}`+'/api/productselect/?isyn=1&cla=' + encodeURI('二类'))
  //  .then(res => {
  //           vm.yunnanY2 = res.data            
  //  })
  //   // 类三呼和浩特
  //   vm.$axios.get(`${domain}`+'/api/productselect/?isall=1&cla=' + encodeURI('三类'))
  //  .then(res => {
  //           vm.beijingY3 = res.data 
  //  })
  //   // 类三云南
  //   vm.$axios.get(`${domain}`+'/api/productselect/?isyn=1&cla=' + encodeURI('三类'))
  //  .then(res => {
  //           vm.yunnanY3= res.data          
  //  })
  //    // 类四呼和浩特
  //   vm.$axios.get(`${domain}`+'/api/productselect/?isall=1&cla=' + encodeURI('四类'))
  //  .then(res => {
  //           vm.beijingY4= res.data 
  //  })
  //  // 类四云南
  //   vm.$axios.get(`${domain}`+'/api/productselect/?isyn=1&cla=' + encodeURI('四类'))
  //  .then(res => {
  //           vm.yunnanY4= res.data
  //  })
  //   // 类五呼和浩特
  //   vm.$axios.get(`${domain}`+'/api/productselect/?isall=1&cla=' + encodeURI('五类'))
  //  .then(res => {
  //           vm.beijingY5= res.data 
  //  })
  //   //  类五云南
  //  vm.$axios.get(`${domain}`+'/api/productselect/?isyn=1&cla=' + encodeURI('五类'))
  //  .then(res => {
  //           vm.yunnanY5 = res.data      
  //  })
  //  // 类六呼和浩特
  //   vm.$axios.get(`${domain}`+'/api/productselect/?isall=1&cla=' + encodeURI('六类'))
  //  .then(res => {
  //           vm.beijingY6= res.data 
  //  })
  //   //类六云南
  //  vm.$axios.get(`${domain}`+'/api/productselect/?isyn=1&cla=' + encodeURI('六类'))
  //  .then(res => {
  //           vm.yunnanY6= res.data      
  //  })
   // 滚动条事件
    var box = document.getElementById('tableFilter').children[2]
    box.onscroll = function() {
      if (document.querySelector('.createSelect')) {
        var divAll = document.querySelectorAll('.createSelect')
        for (let i = 0; i < divAll.length; i++) {
          divAll[i].style.display = 'none'
        }
      }
    }
  }
}
</script>

<style scoped>
  .filterBox{
    background: #fff;
    margin: 0;
  }
  .selectBox{
    display: inline-block;
    margin-left: 20px
  }
  .install-w{
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0 3px 7px #ccc;
  }
  .more_header th{
    text-align: center;
  }
  .title-w{
    line-height: 60px;
    font-size: 16px;
    /*margin-left: 20px;*/
    padding-left: 20px;
    background: #FFFFFF;
    color: #629ef6;
    font-weight: bold;
  }
  .title-w .button{
    float: right;
    margin-top: 16px;
    margin-right: 15px;
  }
  .table.more_header{
    padding: 0 1rem 1rem 1rem;
    box-sizing: border-box;
    background: #FFFFFF;
  }
</style>
