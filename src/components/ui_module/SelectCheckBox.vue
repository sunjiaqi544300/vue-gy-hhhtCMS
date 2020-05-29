<template>
  <div class="select_left clearboth">
    <span class="label" :class="{necessary_options: necessaryOptions}" v-if="selectCheckData.label !== ''">{{selectCheckData.label}}：</span>
    <div class="select">
      <input class="input" disabled type="text" :placeholder="propsLabel ? '' : '请选择'" v-model="checkedCities" size="mini">
      <el-popover width="185"
                  trigger="click"
                  v-model="cityToggle">
        <el-button class="el-dropdown-link input" slot="reference">选中</el-button>
        <div class="checkboxList clearboth" v-if="selectCheckData.data.length !== 0">
          <el-checkbox v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="(item,index) in selectCheckData.data" :label="item" :key="index">{{item}}</el-checkbox>
          </el-checkbox-group>
          <div class="checkboxList_button">
            <el-button size="mini" @click="checkAll=false,checkedCities = []">清空</el-button>
            <el-button type="primary" size="mini" @click="clickConfirm(),cityToggle= false">确认</el-button>
          </div>
        </div>
        <div v-if="selectCheckData.data.length === 0" class="no_data">无数据</div>
      </el-popover>
    </div>
    <span class="props" v-if="checkedCities.length === 0 ? propsLabel : false">请选择{{selectCheckData.label}}</span>
  </div>
</template>

<script>
export default {
  name: "select-check-box",
  data () {
    return {
      checkedCitiesAll: '',
      cityToggle: false,
      checkAll: false,
      checkedCities: []
    }
  },
  props: [
    'selectCheckData',
    'necessaryOptions',
    'propsLabel',
    'emptyC'
  ],
  watch: {
    'emptyC': function  (data) {
      var vm = this
      vm.checkAll = false
      vm.cityToggle= false
      vm.checkedCities = []
    }
  },
  methods: {
    // 点击确认
    clickConfirm () {
      this.$emit('checkData', this.checkedCities, this.checkAll)
    },
    // 单行点击全选
    handleCheckAllChange(val) {
      // console.log(val)
      this.checkedCities = val ? this.selectCheckData.data : [];
      this.isIndeterminate = false;
    },
    // 单个点选
    handleCheckedCitiesChange(value) {
      // console.log(value)
      // this.checkedCitiesAll.push(value)      // let checkedCount = value.length;
      this.checkAll = value.length === this.selectCheckData.data.length;
      // this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
    }
  }
}
</script>

<style scoped>
  input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
    /* WebKit browsers */
    color: #c2c6cd;
  }
  input:-moz-placeholder, textarea:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #c2c6cd;
  }
  input::-moz-placeholder, textarea::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #c2c6cd;
  }
  input:-ms-input-placeholder, textarea:-ms-input-placeholder {
    /* Internet Explorer 10+ */
    color: #c2c6cd;
  }
  .select_left{
    margin: 10px 0;
    position: relative;
  }
  .select_left .props{
    position: absolute;
    left: 159px;
    top: 0;
    font-size: 12px;
    line-height: 28px;
    color: red;
  }
  .select_left>div{
    width: 210px;
  }
  .select_left .label{
    display: block;
    float: left;
    width: 147px;
    text-align: right;
    line-height: 30px;
    font-size: 14px;
    color: #363636;
  }
  .select_left .select{
    position: relative;
    display: block;
    float: left;
  }
  .select_left .select>.input{
    display: block;
    outline: none;
    padding-left: 15px;
    width: 193px;
    height: 28px;
    line-height: 30px;
    background: #FFFFFF;
    border: 1px #dcdcdc solid;
    border-radius: 4px;
    font-size: inherit;
  }
  .select_left .select button{
    width: 210px;
  }
  .select .option{
    position: absolute;
    top: 32px;
    z-index: 100;
    width: 210px;
    max-height: 200px;
    background: #FFFFFF;
    overflow-y: auto;
  }
  .select .option span{
    padding-left: 10px;
    display: block;
    line-height: 26px;
    cursor: pointer;
  }
  .select .option span:hover{
    background: #34495E;
    color: #FFFFFF;
  }
  .checkbox{
    /*position: absolute;*/
    /*top: 32px;*/
    /*z-index: 100;*/
    background: #FFFFFF;
    /*width: 230px;*/
  }
  .checkbox label{
    /*color: #FFFFFF;*/
    float: left;
    width: 89px;
    margin: 6px 0;
  }
  .checkbox label:nth-child(1){
    /*color: #FFFFFF;*/
  }
  .el-dropdown-link{
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
  }
  .checkboxList{
    padding: 10px 0 40px 0;
    max-height: 200px;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .checkboxList>span{
    display: block;
    float: left;
    width: 62px;
  }
  .checkboxList label{
    display: block;
    margin: 0 0 0 10px;
  }
  .checkboxList>div{
  }
  .checkboxList_button{
    width: 100%;
    text-align: center;
    margin-top: 20px;
    position: absolute;
    bottom: 0;
    left: 0;
    background: #FFFFFF;
    z-index: 10;
    height: 40px;
    line-height: 40px;
  }
  .necessary_options:before{
    content: '*';
    color: #f56c6c;
    margin-right: 6px;
  }
  .no_data{
    margin: 0;
    text-align: center;
    color: #999;
    font-size: 14px;
  }
</style>
