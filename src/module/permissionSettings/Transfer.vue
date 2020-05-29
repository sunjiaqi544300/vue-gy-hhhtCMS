<template>
  <div class="transfer">
    <div class="transferBox" style="width: 210px;margin-right: 10px;">
      <div class="tit">
        <el-checkbox v-model="checkedLeft" @change="allLeft">全部</el-checkbox>
        <span class="length">{{leftCities.length}}/{{leftData.length}}</span>
      </div>
      <div class="group">
        <el-checkbox-group v-model="leftCities">
          <ul class="checkUl">
            <li v-for="(item, index) in leftData" :key="index">
              <el-checkbox :label="item">{{item}}</el-checkbox>
            </li>
          </ul>
        </el-checkbox-group>
      </div>
    </div>
    <div class="change">
      <el-button round  
        style="margin-bottom: 10px;"
        class="btn"
        :disabled="rightCities.length === 0"
        @click="goLeft">
        <i class="el-icon-arrow-left"></i>
      </el-button>
      <el-button round 
        class="btn"
        :disabled="leftCities.length === 0"
        @click="goRight"
        >
        <i class="el-icon-arrow-right"></i>
      </el-button>
    </div>
    <div class="transferBox">
      <div class="tit">
        <el-checkbox v-model="checkedRight" @change="allRight">已有</el-checkbox>
        <span class="length">{{rightCities.length}}/{{rightData.length}}</span>
      </div>
      <div class="group">
        <el-checkbox-group v-model="rightCities" style="display: inline-block;">
          <ul class="checkUl">
            <li v-for="(item, index) in rightData" :key="index">
              <el-checkbox :label="item.dist">{{item.dist}}</el-checkbox>
              <!-- <el-checkbox :label="item.ismain"></el-checkbox> -->
            </li>
          </ul>
        </el-checkbox-group>
        <el-checkbox-group 
          style="display: inline-block;"
          v-model="rightCitiesFlag" 
          @change="flagChange">
          <ul class="checkUl">
            <li v-for="(item, index) in rightData" :key="index">
              <!-- <el-checkbox :label="item.dist">{{item.dist}}</el-checkbox> -->
              <el-checkbox :label="index">主要负责人</el-checkbox>
            </li>
          </ul>
        </el-checkbox-group>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "Transfer",
  props: {
    leftData: {
      type: Array,
      required: true,
    },
    rightData: {
      type: Array,
      required: true,
    },
    rightCitiesFlag: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      checkedLeft: false,
      checkedRight: false,
      leftCities: [],
      rightCities: [],
      // rightCitiesFlag: []
    }
  },
  computed: {
   
  },
  watch: {
    
  },
  mounted:function() {
    
  },
  beforeDestroy: function() {
    this.leftCities = []
    this.rightCities = []
    this.rightCitiesFlag = []
  },
  methods: { 
    goLeft() {
      let vm = this
      // console.log(vm.rightCities)
      let index = []
      vm.rightData.filter((item, i) => {
        if(vm.rightCities.indexOf(item.dist) !== -1) {
          index.push(i)
        }
      })
      // console.log(index)
      vm.$emit('rGol',vm.rightCities, index)
      vm.rightCities = []
    },
    goRight() {
      let vm = this
      vm.$emit('lGor', vm.leftCities)
      vm.leftCities = []
      if(vm.leftData.length === 0) {
        vm.checkedLeft = false
      }
    },
    allLeft() {
      if(this.checkedLeft){
        this.leftCities = this.leftData
      }else {
        return this.leftCities = []
      }
    },
    allRight() {
      if(this.checkedRight){
        return this.rightCities = this.rightData.map(item => item.dist)
      }else {
        return this.rightCities = []
      }
    },
    flagChange() {
      let vm = this
      // console.log(vm.rightCitiesFlag)
      vm.$emit('mainChange', vm.rightCitiesFlag)
    }
  }
}
</script>

<style scoped>
.transfer{
  width: 502px;
  height: 288px;
}
.transferBox{
  width: 230px;
  height: 288px;
  /* display: inline-block; */
  float: left;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  overflow: hidden;
}
.tit{
  height: 40px;
  line-height: 40px;
  background: #F1F1F1;
  margin: 0;
  padding-left: 15px;
  border-bottom: 1px solid #ebeef5;
  box-sizing: border-box;
  color: #000;
  position: relative;
}
.length{
  position: absolute;
  right: 15px;
  color: #909399;
  font-size: 12px;
  font-weight: 400;
}
.group{
  margin: 0;
  padding: 6px 0;
  list-style: none;
  height: 246px;
  overflow: auto;
  box-sizing: border-box;
}
.checkUl{
  padding-left: 16px;
  box-sizing: border-box;
}
.change{
  width: 40px;
  padding-top: 100px;
  /* display: inline-block; */
  float: left;
}
.btn{
  padding: 10px;
  border: 1px solid #dcdfe6;
  background-color: #F1F1F1;
  color: #c0c4cc;
}
.btn.hover{
  background-color: #f5f7fa;
  color: #c0c4cc;
}

</style>
