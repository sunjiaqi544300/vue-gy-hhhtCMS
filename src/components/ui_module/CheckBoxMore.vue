<template>
  <div class="checkboxList clearboth" style="width: 100%; height: 100%">
    <span>{{cityList.func_area}}</span>
    <el-checkbox v-model="thisCheckAll" @change="handleCheckAllChange">全选</el-checkbox>
    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
      <el-checkbox v-for="(city,index) in cityList.main_poi" :label="city" :key="index" v-if="index<=2">{{city}}</el-checkbox>
      <!--<el-checkbox label="其他" v-if="checkOther" @change="clickOther">其他</el-checkbox>-->
    </el-checkbox-group>
  </div>
</template>

<script>
export default {
  name: "check-box-more",
  data () {
    return {
      thisCheckAll: this.Recommend,
      checkedCities: this.Recommend ? this.cityList.main_poi : [] // 选择的内容的名字
    }
  },
  props: [
    'data',
    'cityList',
    'checkAll',
    'checkOther',
    'Recommend'
  ],
  watch: {
    checkAll: function (val) {
      var vm = this
      vm.checkedCities = val ? vm.cityList.main_poi : []
      this.thisCheckAll = this.checkAll
      this.$emit('BoxData', vm.checkedCities, vm.data)
    }
  },
  methods: {
    // 单行点击全选
    handleCheckAllChange (val) {
      // console.log(val)
      var vm = this
      var thisList = []
      // console.log(this.cityList)
      this.checkedCities = val ? this.cityList.main_poi : []
      if (val) {
        this.$emit('BoxData', vm.cityList.main_poi, vm.data)
      } else {
        this.$emit('BoxData', [], vm.data)
      }
    },
    // 单个点选
    handleCheckedCitiesChange (val) {
      var vm = this
      console.log(val)
      // this.checkedCitiesAll.push(value)      // let checkedCount = value.length
      if (val.length > 3) {
        this.thisCheckAll = val.length === 4
      } else {
        this.thisCheckAll = val.length === this.cityList.main_poi.length
      }
      // this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
      this.$emit('BoxData', val, vm.data)
    },
    // 点击选择其他
    clickOther () {}
  },
  mounted: function () {
    // this.$emit('BoxData', this.checkedCities)
    // console.log(this.Recommend)
    var checkBox = document.getElementById('')
  }
}
</script>

<style scoped>
  .checkboxList{
    padding: 10px 0;
    border-bottom: 1px #999999 solid;
  }
  .checkboxList>span{
    display: block;
    float: left;
    width: 62px;
  }
  .checkboxList label{
    float: left;
    margin-left: 12px;
  }
  .checkboxList>div{
    float: left;
    margin-left: 12px;
  }
</style>
