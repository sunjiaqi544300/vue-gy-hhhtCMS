<template>
  <div class="table">
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
      prop="dist"
      label="区县"
      width="80"
      :filters="headerFilter1"
      :filter-method="filterTag">
      </el-table-column>
      <el-table-column
        prop="launchdate"
        label="日期"
        width="100">
      </el-table-column>
      <el-table-column
        prop="monthly"
        label="月份"
        width="100">
      </el-table-column>
      <el-table-column
        prop="item_name"
        label="周"
        width="80">
      </el-table-column>
      <el-table-column
        prop="product_id"
        label="商品编码"
        width="100"
        :filters="headerFilter2"
        :filter-method="filterTag">
      </el-table-column>
        <el-table-column
        prop="product_name"
        label="商品名称"
        width="120"
        :filters="headerFilter3"
        :filter-method="filterTag">
        </el-table-column>
      <el-table-column
        prop="policy_type"
        label="策略类型"
        width="120"
        :filters="headerFilter4"
        :filter-method="filterTag">
      </el-table-column>
      <el-table-column
        prop="launchmode"
        label="投放方式"
        width="120"
        :filters="headerFilter5"
        :filter-method="filterTag">
      </el-table-column>
      <el-table-column
        v-for="item in tabHeader"
        :prop="item.key"
        :label="item.name"
        :width="item.width">
      </el-table-column>
    </el-table>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'Table',
  data () {
    return {
      pageNum: 20,
      headerFilter1: [{text: '东城区', value: '东城区'}, {text: '西城区', value: '西城区'}, {text: '朝阳区', value: '朝阳区'}, {text: '崇文区', value: '崇文区'}, {text: '海淀区', value: '海淀区'}, {text: '宣武区', value: '宣武区'}, {text: '石景山区', value: '石景山区'}, {text: '门头沟区', value: '门头沟区'}, {text: '丰台区', value: '丰台区'}, {text: '房山区', value: '房山区'}, {text: '大兴区', value: '大兴区'}, {text: '顺义区', value: '顺义区'}, {text: '平谷区', value: '平谷区'}, {text: '昌平区', value: '昌平区'}, {text: '怀柔区', value: '怀柔区'}, {text: '延庆区', value: '延庆区'}, {text: '密云区', value: '密云区'}],
      headerFilter2: [],
      headerFilter3: [],
      headerFilter4: [{text: '紧俏', value: '紧俏'}, {text: '均衡满足', value: '均衡满足'}, {text: '顺销', value: '顺销'}, {text: '新品', value: '新品'}, {text: '未归属', value: '未归属'}],
      headerFilter5: [{text: '按需投放', value: '按需投放'}, {text: '一档一策', value: '一档一策'}]
    }
  },
  props: [
    'height', // 表格高度
    'tabHeader', // 表格头部
    'tableData' // 表格数据
  ],
  methods: {
    // 过滤方法
    filterTag (value, row, header) {
      console.log(value)
      console.log(row)
      console.log(header)
      if (header.label === '区县') {
        return row.dist === value
      } else if (header.label === '商品编码') {
        return row.product_id === value
      } else if (header.label === '商品名称') {
        return row.product_name === value
      } else if (header.label === '策略类型') {
        return row.policy_type === value
      } else if (header.label === '投放方式') {
        return row.launchmode === value
      }
    }
  },
  mounted () {
    var vm = this
    var box = document.getElementById('tableFilter').children[2]
    console.log(box)
    //滚动事件触发
    box.onscroll = function() {
      if( getScrollHeight() - (getScrollTop() + getClientHeight()) === 0 ) {
        // console.log('下拉刷新了')
        // vm.tableDown.push(vm.downTable[1].list[0])
        // vm.$emit('scrollDown', 1)
        // console.log('到地步了 ')
        // console.log(vm.pageNum)
        // console.log(vm.tableData.length)
        if (vm.pageNum < vm.tableData.length) {
          vm.pageNum = vm.pageNum + 20
        }
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
  },
  components: {

  }
}
</script>

<style scoped>

</style>
