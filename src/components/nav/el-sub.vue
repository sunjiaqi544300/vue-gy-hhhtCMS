<template>
  <div>
    <template v-for="item in listDataC">
    <!--有下一级导航-->
      <div class="sub" v-if="item.sub_cat && item.sub_cat.length !== 0">
        <span class="title"><i class="el-icon-document"></i>{{item.funct_name}}<i class="el-icon-arrow-down down"></i></span>
        <el-sub :listDataC="item.sub_cat" class="son_list"></el-sub>
      </div>
      <!--无下一级导航-->
      <div class="sub_b" v-else>
        <span class="title"><i class="el-icon-document"></i>{{item.funct_name}}</span>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "el-sub",
  props: [
    'listDataC'
  ],
  methods: {
    // 导航栏展开关闭
    toggle () {

    }
  },
  mounted () {
    // console.log(this.listDataC)
  }
}
</script>

<style scoped>
.sub{
  /*margin-left: 10px;*/
  cursor: pointer;
  border-bottom: 1px;
  padding-left: 10px;
}
.sub_b{
  cursor: pointer;
  border-bottom: 1px;
  padding-left: 10px;
}
/*.sub:hover>span{*/
  /*color: #2f74ff;*/
  /*!*background: #ebf1f6;*!*/
/*}*/
.sub .title{
  display: block;
  line-height: 60px;
  /*margin-left: 10px;*/
  font-size: 14px;
  /*padding-left: 10px;*/
  position: relative;
}
.sub_b .title{
  display: block;
  line-height: 60px;
  /*margin-left: 10px;*/
  font-size: 14px;
  /*padding-left: 10px;*/
  position: relative;
}

.son_list{
  padding-left: 10px;
}
.son_list:hover>span{
  background: #ebf1f6;
}
.sub .title i{
  margin-right: 6px;
}
.sub .title .down{
  position: absolute;
  right: 10px;
  line-height: 60px;
}
</style>
