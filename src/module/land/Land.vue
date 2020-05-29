<template>
  <div class="Wrap_out">
    <!-- <div class="logoText">
          <img src="./images/logo.png" alt="">
      </div>
     -->
    <div class="Wrap-zong">
        <div class="Wrap">
           <div class="left"></div>
            <div class="LoginOrEnrol right">
        <div class="lOeBox" id="lOeBox0">
          <div class="inputBox">
            <h2 style="margin: 6rem auto 2rem auto;">
              工业作战指挥系统
              <!-- <i style="font-size: 1.2rem; margin-left: 1.5rem;">分中心市场推进器</i> -->
              </h2>
            <div class="inf">
              <!--<span>用户名</span>-->
              <img :src="img.user" alt="账户">
              <input type="text" placeholder="用户名" id="UserName" v-model="UserName">
              <!--<span></span>-->
            </div>
            <div class="inf">
              <!--<span>密码</span>-->
              <img :src="img.pass" alt="密码">
              <input type="password" placeholder="密码" id="Password" v-model="Password">
              <!--<span></span>-->
            </div>
            <!--<div class="Prompt" id="Prompt0"></div>-->
          </div>
          <div class="hint_information" v-if="hintInformation !== ''"><span><i class="el-icon-warning"></i>{{hintInformation}}</span></div>
          <div class="btnBox hint_information">
            <button type="button" id="Login" @click="submitForm()"><span v-if="loading"><i class="el-icon-loading"></i>登录中</span><span v-if="!loading">{{buttonText}}</span></button>
          </div>
        </div>
      </div>
      <!-- 0---------------------------- -->
          <!-- <div class="LoginOrEnrol right">
            <div class="lOeBox" id="lOeBox0">
              <div class="inputBox">
                <img :src="img.titimg" alt="" class="titimg">
                <h2>
                  地图大数据，助力智能烟草
                </h2>
                <div class="inf">
                  <img :src="img.user" alt="账户">
                  <input type="text" placeholder="用户名" id="UserName" v-model="UserName">
                </div>
                <div class="inf">
                  <img :src="img.pass" alt="密码">
                  <input type="password" placeholder="密码" id="Password" v-model="Password">
                </div>
              </div>
              <div class="hint_information" v-if="hintInformation !== ''">
                <span style="font-size:16px;">
                  <i class="el-icon-warning"></i>
                  {{hintInformation}}
                </span>
              </div>
              <div class="btnBox hint_information">
                <button type="button" id="Login" @click="submitForm()">
                  <span v-if="loading">
                    <i class="el-icon-loading"></i>登录中
                  </span>
                  <span v-if="!loading">{{buttonText}}</span>
                </button>
              </div>
            </div>
          </div> -->
        </div>
      </div>

  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";

import Env from "../../api/env.js";
import api from "../../api/land";

export default {
  name: "land",
  data() {
    return {
      UserName: "",
      Password: "",
      hintInformation: "",
      loading: false,
      buttonText: "登录",
      img: {
        titimg:require("./images/font-img.png"),
         user: require('./images/land_user.png'),
        pass: require('./images/land_pass.png')
      }
    };
  },
  methods: {
    submitForm() {
      let vm = this;
      if (vm.UserName && vm.Password) {
        vm.loading = true;
        vm.hintInformation = "";
        let form = {
          username: vm.UserName,
          password: vm.Password
        };
        let url = "/jwtlogin/";
        let instance = axios.create({
                  headers: { "content-type": "application/x-www-form-urlencoded" }
            });
        instance.post(url, qs.stringify(form)).then(res => {
            // vm.$message({type: 'success', message: '登录成功'})

            
            if (res) {
              localStorage.setItem("token", res.data.token); // 登录成功后保存用户token
              localStorage.setItem("userName", vm.UserName); // 登录成功后保存用户token
              vm.buttonText = "登录成功";
              vm.loading = false;
              api.getPermission().then(res => {
                // console.log('11111111')
                //yangwanchao  修改数据返回格式问题  2019-3-15
                  res.data = res
                //end
                if (res.data.length === 0) {
                  // 当没有一条权限时
                  vm.$router.push("/");
                } else {
                  var route;
                  console.log('106')
                   vm.$router.push("/");
                  if (res.data[0].sub_cat.length !== 0) {
                    // 当导航有下一级的时候
                    console.log('107')
                    if (res.data[0].sub_cat[0].sub_cat.length !== 0) {
                      route = res.data[0].sub_cat[0].sub_cat[0].url;
                      vm.$router.push(route);
                    } else {
                      console.log(res.data[0].url)
                      route = res.data[0].sub_cat[0].url;
                      // console.log(route)
                      vm.$router.push(res.data[0].url);
                    }
                  } else {
                    // 当导航没有下一级的时候
                    if (res.data[0].url === null) {
                      // 当导航url为null的时候
                      vm.$router.push("/");
                    } else {
                      // 当导航url不为null的时候
                      // console.log(res.data[0].url)
                      vm.$router.push(res.data[0].url);
                    }
                  }
                  // vm.$router.push('/noPage')
                  // for (let i = 0; i < res.data.length; i++) {
                  //   if (res.data[i].url !== null) {
                  //     route = res.data[i].url
                  //     vm.$router.push(route)
                  //     break
                  //   } else {
                  //     if (res.data[i].sub_cat.length !== 0) {
                  //       route = res.data[i].sub_cat[0].url
                  //       vm.$router.push(route)
                  //       break
                  //     }
                  //   }
                  // }
                }
              });
            }
          })
          .catch(error => {
            // console.log(error.response.status)
            if (error.response.status === 400) {
              vm.loading = false;
              // vm.$message({type: 'error', message: '您的账号密码有误，请重新输入'})
              vm.hintInformation = "您的账户密码信息填写有误";
            }
            // console.log(error.response.status);
            // console.log(error.response.headers);
          });
      } else {
        vm.hintInformation = "请填写完整信息";
      }
    }
  },
  mounted: function() {
    // console.log(Env);
    var vm = this;
    document.onkeydown = function(event) {
      let e = event || (window.event ? window.event : null);
      let currKey;
      currKey = e.keyCode || e.which || e.charCode;
      if (currKey === 13) {
        vm.submitForm();
      }
    };
  }
};
</script>

<style scoped>
 html, body {
    overflow: hidden;
  }
  .Wrap_out{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1000;
    background: url("./images/land_bj.jpg") no-repeat;
    background-size: 100% 100%;
    font-family: "Microsoft YaHei", "宋体", "Segoe UI", "Lucida Grande", Helvetica, Arial, sans-serif, FreeSans, Arimo;
  }
  .Wrap {
    width: 44rem;
    height: 30rem;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    border-radius: .5rem;
    overflow: hidden;
    background: #FFFFFF;
  }
  .Wrap .left{
    float: left;
    width: 60%;
    height: 100%;
    background: url("./images/land_left.png") no-repeat;
    background-size: 66%;
    background-position: center;
  }
  .Wrap .right{
    float: right;
    width: 40%;
    height: 100%;
  }
  .Wrap .LoginOrEnrol {
    /*width: 100%;*/
    /*height: 13rem;*/
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    position: relative;
  }

  .Wrap .LoginOrEnrol .lOeBox {
    width: 80%;
    height: 100%;
    position: absolute;
    left: 10%;
  }

  .Wrap .LoginOrEnrol .lOeBox#lOeBox0 {
    z-index: 9;
  }

  .Wrap .LoginOrEnrol .lOeBox#lOeBox1 {
    z-index: 5;
  }

  .Wrap .LoginOrEnrol .lOeBox .btnBox {
    /*width: 10rem;*/
    height: 3rem;
    text-align: center;
  }

  .Wrap .LoginOrEnrol .lOeBox .btnBox button {
    width: 11rem;
    height: 2.4rem;
    line-height: 2.4rem;
    margin-top: 1rem;
    border: none;
    border-radius: 3rem;
    color: #FFFFFF;
    font-size: 1rem;
    background: #018ffd;
    outline: none;
    cursor: pointer;
  }
  .btnBox button i{
    margin-right: 0.4rem;
  }
  .Wrap .LoginOrEnrol .lOeBox .inputBox {
    width: 100%;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    border-radius: 4px;
    overflow: hidden;
  }
  .inputBox h2{
    font-size: 1.6rem;
    /* line-height: 12rem; */
  }
  .inputBox .inf img{
    float: left;
    width: 1.4rem;
    height: 1.4rem;
    position: absolute;
    top: 0.6rem;
    left: 0.4rem;
  }
  .inputBox .inf input{
    float: left;
  }
  .Wrap .LoginOrEnrol .lOeBox .inputBox > div {
    position: relative;
    z-index: 5;
  }
  .inputBox>div{
    margin-bottom: 1rem;
  }
  .inputBox>div span:nth-child(1){
    display: block;
    float: left;
    line-height: 2.6rem;
    color: #FFFFFF;
    width: 5rem;
    font-size: 18px;
  }
  .Wrap .LoginOrEnrol .lOeBox .inputBox > div:nth-child(2){
    border-radius: 0 0 4px 4px;
    overflow: hidden;
  }

  .Wrap .LoginOrEnrol .lOeBox .inputBox input {
    height: 2.6rem;
    padding: .5rem 0 0 2rem;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    outline: none;
    border: none;
    border-bottom: solid 1px #EBEBEB;
    border-radius: 7px;
  }

  .Wrap .LoginOrEnrol .lOeBox .inputBox span:last-child {
    position: absolute;
    right: 1rem;
    top: 0.8rem;
    z-index: 9;
    height: 2.6rem;
    font-size: .8rem;
    color: #EA2000;
  }

  .Wrap .LoginOrEnrol .lOeBox .inputBox .Prompt {
    text-align: center;
    color: #0b5b97;
    margin-top: 0.4rem;
  }
  .hint_information{
    text-align: center;
    line-height: 40px;
    font-size: 16px;
    background: #FFFFFF;
    border-radius: 4px;
    /*margin-top: 2rem;*/
    color: #f56c6c;
  }
  .hint_information span i{
    font-size: 16px;
    margin-right: 0.4rem;
  }
  .hint_information span{
    font-size: 16px;
  }
</style>
