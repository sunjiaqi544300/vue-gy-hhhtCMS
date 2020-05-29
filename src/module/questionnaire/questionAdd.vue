<template>
  <div class="page">
    <div>
      <h4>添加问卷:</h4>
      <div class="type">
        <span>问卷名称：</span>
        <el-input size="mini"  clearable  placeholder="请输入内容" style="width:300px;margin-bottom:20px;" suffix-icon="el-icon-date"
          v-model="title">
        </el-input>
        <span style="margin-left:30px">问题类型：</span>
        <el-select v-model="value" size="mini"  clearable   placeholder="请选择">
          <el-option v-for="(item,index) in stypelist" :key="index" :label="item.lable" :value="item.value">
          </el-option>
        </el-select>
        <el-button type="primary" size="mini" @click="sure" style="margin-left:20px">提交</el-button>
      </div>
    </div>
    <div>
      <h4>组卷:</h4>
      <div class="type">
        <span>问卷名称：</span>
        <el-select v-model="value2" size="mini"  style="width:260px"  clearable filterable placeholder="请选择">
          <el-option v-for="(item,index)  in surverlist" :key="index" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
        <el-button type="primary" size="mini" @click="filter" style="margin-left:20px">查询</el-button>
        <div class="table">
          <el-table :data="tableData" border style="width: 98%" height="400px">
           
            <el-table-column prop="q_type" label="题目类型">
            </el-table-column>
             <el-table-column prop="question" label="题目">
            </el-table-column>
            <el-table-column prop="q_class" label="问题类型">
            </el-table-column>
            <el-table-column prop="required" label="是否必选">
            </el-table-column>
            <el-table-column prop="options.a" label="a">

            </el-table-column>
            <el-table-column prop="options.b" label="b">

            </el-table-column>
            <el-table-column prop="options.c" label="c">

            </el-table-column>
            <el-table-column prop="options.d" label="d">

            </el-table-column>
            <el-table-column prop="options.e" label="e">

            </el-table-column>
            <el-table-column prop="options.f" label="f">

            </el-table-column>
            <el-table-column prop="options.g" label="g">

            </el-table-column>
            <el-table-column prop="options.h" label="h">

            </el-table-column>
            <el-table-column prop="options.i" label="i">

            </el-table-column>
            <el-table-column prop="options.j" label="j">

            </el-table-column>
          </el-table>
        </div>
        <div>
          <span>问题：</span>
          <el-select v-model="value3" size="medium" clearable filterable placeholder="请选择">
            <el-option v-for="(item,index)  in question_up" :key="index" :label="item.question" :value="item.id">
            </el-option>
          </el-select>
          <el-button type="primary" size="mini" @click="questionSure" style="margin-left:20px">提交</el-button>
        </div>
      </div>
    </div>
    <div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import "@/module/businessManager/css/public.css";
  import "@/assets/css/creat-assembly-w.css";
  import {
    hostType
  } from '@/api/env.js'
  export default {
    name: "page",
    data() {
      return {
        stypelist: [{
            lable: '零售户调研问卷',
            value: '6'
          },
          {
            lable: '客户经理调研问卷',
            value: '7'
          }
        ],
        surverlist: [],
        question_up: [],
        options: [],
        value: '',
        value2: '',
        value3: '',
        title: "",
        tableData: [],
      }
    },
    components: {

    },
    mounted() {
      let vm = this
      let domain = hostType(2)
      vm.$axios
        .get(`${domain}` + "/api/survey/")
        .then(function (response) {
          console.log(response.data)
          vm.surverlist = response.data
        });
    },
    methods: {
      filter() {
        console.log('0000')
        let vm = this
        let domain = hostType(2)
        vm.$axios
          .get(`${domain}` + "/api/survey_question/?s_id=" + vm.value2)
          .then(function (response) {
            console.log(response.data)
            vm.tableData = response.data.question_up
            vm.question_up = response.data.question_down
          });
        vm.$axios
          .get(`${domain}` + "/api/survey/")
          .then(function (response) {
            console.log(response.data)
            vm.surverlist = response.data
          });
      },
      sure() {
        console.log('777')
        let vm = this
        let domain = hostType(2)
        vm.$axios
          .post(`${domain}` + "/api/survey/", {
            "name": vm.title,
            "stype": vm.value
          })
          .then(function (response) {
            console.log(response.data)
            vm.$message({
              message: '提交成功',
              type: 'success'
            });
             vm.$axios
        .get(`${domain}` + "/api/survey/")
        .then(function (response) {
          console.log(response.data)
          vm.surverlist = response.data
        });
          });

      },
      questionSure() {
        let vm = this
        let domain = hostType(2)
        if (vm.value3 == '') {
          alert('请选择问题在提交')
        } else {
          vm.$axios
            .post(`${domain}` + "/api/survey_question/", {
              "survey": vm.value2,
              "question": vm.value3
            })
            .then(function (response) {
              console.log(response.data)
               vm.$axios
          .get(`${domain}` + "/api/survey_question/?s_id=" + vm.value2)
          .then(function (response) {
            console.log(response.data)
            vm.tableData = response.data.question_up
             vm.$message({
              message: '提交成功',
              type: 'success'
            });
            // vm.question_up = response.data.question_down
          });
            });
        }
      }
    }
  }

</script>

<style scoped>
  h4 {
    font-size: 20px;
    font-weight: 500;
  }

  .type {
    border: 1px solid rgb(216, 215, 215);
    width: 90%;
    margin: 10px 20px;
    padding: 30px;
  }

  .table {
    margin: 10px;
  }

</style>
