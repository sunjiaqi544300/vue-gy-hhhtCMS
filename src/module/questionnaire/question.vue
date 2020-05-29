<template>
  <div class="page">
    <div class="table">
      <el-table @expand-change='confirmAdd3' :data="tableData2" border stripe height="400" style="width:98%">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-table :data="scope.row.child_question" border v-show="scope.row.q_type=='多项填空'">
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    v-if="scope.row.edit2 == edifflg"
                    type="text"
                    size="medium"
                    @click="confirmAdd2(scope.row)"
                  >
                    <i class="el-icon-check" aria-hidden="true"></i>
                  </el-button>
                  
                  <div v-if="scope.row.edit2 == edifflg2">
                    <el-button type="text" size="medium" @click="editData(scope.row)">
                      <i class="el-icon-edit" aria-hidden="true"></i>
                    </el-button>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="question" label="题目名称">
                <template slot-scope="scope">
                  <el-input
                    v-if="scope.row.edit2 ==true"
                    type="textarea"
                    style="width:100px"
                    v-model="scope.row.question"
                    placeholder="请填写"
                  ></el-input>
                  <span v-if="scope.row.edit2 ==false">{{scope.row.question}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="q_type" label="题型" width="100px">
                <template slot-scope="scope">
                  <el-select
                    v-if="scope.row.edit2 ==true"
                    width="80px"
                    v-model="scope.row.q_type"
                    placeholder="请选择"
                  >   
                    <el-option label="单选题" value="单选题">单选题</el-option>
                    <el-option label="多选题" value="多选题">多选题</el-option>
                    <el-option label="问答题" value="问答题">问答题</el-option>
                    <el-option label="单选填空" value="单选填空">单选填空</el-option>
                    <el-option label="多项填空题" value="多项填空题">多项填空题</el-option>
                    <el-option label="评分题" value="评分题">评分题</el-option>
                    <el-option label="排序题" value="排序题">排序题</el-option>
                    <el-option label="矩阵题" value="矩阵题">矩阵题</el-option>
                  </el-select>
                  <span v-if="scope.row.edit2 ==false">
                    <p v-if="scope.row.q_type=='单选题'">单选题</p>
                    <p v-if="scope.row.q_type=='多选题'">多选题</p>
                    <p v-if="scope.row.q_type=='问答题'">问答题</p>
                    <p v-if="scope.row.q_type=='单选填空'">单选填空</p>
                    <p v-if="scope.row.q_type=='多项填空'">多项填空</p>
                    <p v-if="scope.row.q_type=='评分题'">评分题</p>
                    <p v-if="scope.row.q_type=='排序题'">排序题</p>
                    <p v-if="scope.row.q_type=='矩阵题'">矩阵题</p>
                  </span>
                </template>
              </el-table-column>
              <el-table-column prop="required" label="是否必选">
                <template slot-scope="scope">
                  <el-select
                    v-if="scope.row.edit2 ==true"
                    width="80px"
                    v-model="scope.row.required"
                    placeholder="请选择"
                  >
                    <el-option label="必选" value="1">必选</el-option>
                    <el-option label="非必选" value="0">非必选</el-option>
                  </el-select>
                  <span v-if="scope.row.edit2 ==false">
                    <p v-if="scope.row.required=='1'">必选</p>
                    <p v-if="scope.row.required=='0'">非必选</p>
                  </span>
                </template>
              </el-table-column>
              <el-table-column prop="datatype" label="数据类型">
                <template slot-scope="scope">
                  <el-select
                    v-if="scope.row.edit2 ==true"
                    width="80px"
                    :disabled='scope.row.q_type=="矩阵题" || scope.row.q_type=="多项填空" ?true:false'
                    v-model="scope.row.datatype"
                    placeholder="请选择"
                  >
                    <el-option label="数值" value="数值">数值</el-option>
                    <el-option label="文本" value="文本">文本</el-option>
                  </el-select>
                  <!-- <el-input v-if="scope.row.edit" v-model="scope.row.datatype" :disabled='scope.row.q_type=="问答题" || scope.row.q_type=="单选填空" || scope.row.q_type=="多项填空" || scope.row.q_type=="评分题" || scope.row.q_type=="排序题" || scope.row.q_type=="矩阵题"?false:true' placeholder="请填写"></el-input> -->
                  <span v-if="scope.row.edit2 ==false">{{scope.row.datatype}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="maxlen" label="长度">
                <template slot-scope="scope">
                  <el-input v-if="scope.row.edit2 ==true" v-model="scope.row.maxlen" :disabled='scope.row.datatype==="文本"?false:true' placeholder="请填写"></el-input>
                  <span v-if="scope.row.edit2 ==false">{{scope.row.maxlen}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="maxnum" label="最大">
                <template slot-scope="scope">
                  <el-input v-if="scope.row.edit2 ==true" v-model="scope.row.maxnum" :disabled='scope.row.datatype==="数值" ?false:true' placeholder="请填写"></el-input>
                  <span v-if="scope.row.edit2 ==false">{{scope.row.maxnum}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="minnum" label="最小">
                <template slot-scope="scope">
                  <el-input v-if="scope.row.edit2 ==true" v-model="scope.row.minnum" :disabled='scope.row.datatype==="数值" ?false:true ?true:false' placeholder="请填写"></el-input>
                  <span v-if="scope.row.edit2 ==false">{{scope.row.minnum}}</span>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="60">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.edit"
              type="text"
              size="medium"
              @click="confirmAdd(scope.row)"
            >
              <i class="el-icon-check" aria-hidden="true"></i>
            </el-button>
            <div v-else>
              <el-button type="text" size="medium" @click="editData(scope.row)">
                <i class="el-icon-edit" aria-hidden="true"></i>
              </el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="q_class" label="问题类型">
          <template slot-scope="scope">
            <el-input v-if="scope.row.edit" v-model="scope.row.q_class" placeholder="请填写"></el-input>
            <span v-else>{{scope.row.q_class}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="question" label="题目名称">
          <template slot-scope="scope">
            <el-input
              v-if="scope.row.edit"
              type="textarea"
              style="width:100px"
              v-model="scope.row.question"
              placeholder="请填写"
            ></el-input>
            <span v-else>{{scope.row.question}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="q_type" label="题型" width="100px">
          <template slot-scope="scope">
            <el-select
              v-if="scope.row.edit"
              width="80px"
              v-model="scope.row.q_type"
              placeholder="请选择"
            >
              <el-option label="单选题" value="单选题">单选题</el-option>
              <el-option label="多选题" value="多选题">多选题</el-option>
              <el-option label="问答题" value="问答题">问答题</el-option>
              <el-option label="单选填空" value="单选填空">单选填空</el-option>
              <el-option label="多项填空题" value="多项填空题">多项填空题</el-option>
              <el-option label="评分题" value="评分题">评分题</el-option>
              <el-option label="排序题" value="排序题">排序题</el-option>
              <el-option label="矩阵题" value="矩阵题">矩阵题</el-option>
            </el-select>
            <span v-else>
              <p v-if="scope.row.q_type=='单选题'">单选题</p>
              <p v-if="scope.row.q_type=='多选题'">多选题</p>
              <p v-if="scope.row.q_type=='问答题'">问答题</p>
              <p v-if="scope.row.q_type=='单选填空'">单选填空</p>
              <p v-if="scope.row.q_type=='多项填空'">多项填空</p>
              <p v-if="scope.row.q_type=='评分题'">评分题</p>
              <p v-if="scope.row.q_type=='排序题'">排序题</p>
              <p v-if="scope.row.q_type=='矩阵题'">矩阵题</p>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="required" label="是否必选">
          <template slot-scope="scope">
            <el-select
              v-if="scope.row.edit"
              width="80px"
              v-model="scope.row.required"
              placeholder="请选择"
            >
              <el-option 
                v-for="item in options3"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <span v-else>
              <p v-if="scope.row.required=='1'">必选</p>
              <p v-if="scope.row.required=='0'">非必选</p>
            </span>
          </template>
        </el-table-column>
       <el-table-column prop="datatype" label="数据类型">
          <template slot-scope="scope">

             <el-select
              v-if="scope.row.edit"
              width="80px"
              :disabled='scope.row.q_type=="问答题" || scope.row.q_type=="单选填空" ||  scope.row.q_type=="评分题" || scope.row.q_type=="排序题" ?false:true'
              v-model="scope.row.datatype"
              placeholder="请选择"
            >
              <el-option label="数值" value="数值">数值</el-option>
              <el-option label="文本" value="文本">文本</el-option>
            </el-select>
            <!-- <el-input v-if="scope.row.edit" v-model="scope.row.datatype" :disabled='scope.row.q_type=="问答题" || scope.row.q_type=="单选填空" || scope.row.q_type=="多项填空" || scope.row.q_type=="评分题" || scope.row.q_type=="排序题" || scope.row.q_type=="矩阵题"?false:true' placeholder="请填写"></el-input> -->
            <span v-else>{{scope.row.datatype}}</span>
          </template>
        </el-table-column>
       <el-table-column prop="maxlen" label="长度">
          <template slot-scope="scope">
            <el-input v-if="scope.row.edit" v-model="scope.row.maxlen" :disabled='scope.row.q_type=="问答题" || scope.row.q_type=="单选填空" ||  scope.row.q_type=="评分题" || scope.row.q_type=="排序题"?false:true' placeholder="请填写"></el-input>
            <span v-else>{{scope.row.maxlen}}</span>
          </template>
        </el-table-column>
       <el-table-column prop="maxnum" label="最大">
          <template slot-scope="scope">
            <el-input v-if="scope.row.edit" v-model="scope.row.maxnum" :disabled='scope.row.q_type=="问答题" || scope.row.q_type=="单选填空" ||  scope.row.q_type=="评分题" || scope.row.q_type=="排序题"?false:true' placeholder="请填写"></el-input>
            <span v-else>{{scope.row.maxnum}}</span>
          </template>
        </el-table-column>
         <el-table-column prop="minnum" label="最小">
          <template slot-scope="scope">
            <el-input v-if="scope.row.edit" v-model="scope.row.minnum" :disabled='scope.row.q_type=="问答题" || scope.row.q_type=="单选填空" ||  scope.row.q_type=="评分题" || scope.row.q_type=="排序题"?false:true' placeholder="请填写"></el-input>
            <span v-else>{{scope.row.minnum}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="a" label="a">
          <template slot-scope="scope">
            <el-input v-if="scope.row.edit" v-model="scope.row.a" placeholder="请填写"></el-input>
            <span v-else>{{scope.row.a}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="b" label="b">
          <template slot-scope="scope">
            <el-input v-if="scope.row.edit" v-model="scope.row.b" placeholder="请填写"></el-input>
            <span v-else>{{scope.row.b}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="c" label="c">
          <template slot-scope="scope">
            <el-input v-if="scope.row.edit" v-model="scope.row.c" placeholder="请填写"></el-input>
            <span v-else>{{scope.row.c}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="d" label="d">
          <template slot-scope="scope">
            <el-input v-if="scope.row.edit" v-model="scope.row.d" placeholder="请填写"></el-input>
            <span v-else>{{scope.row.d}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="e" label="e">
          <template slot-scope="scope">
            <el-input v-if="scope.row.edit" v-model="scope.row.e" placeholder="请填写"></el-input>
            <span v-else>{{scope.row.e}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="f" label="f">
          <template slot-scope="scope">
            <el-input v-if="scope.row.edit" v-model="scope.row.f" placeholder="请填写"></el-input>
            <span v-else>{{scope.row.f}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="g" label="g">
          <template slot-scope="scope">
            <el-input v-if="scope.row.edit" v-model="scope.row.g" placeholder="请填写"></el-input>
            <span v-else>{{scope.row.g}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="h" label="h">
          <template slot-scope="scope">
            <el-input v-if="scope.row.edit" v-model="scope.row.h" placeholder="请填写"></el-input>
            <span v-else>{{scope.row.h}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="i" label="i">
          <template slot-scope="scope">
            <el-input v-if="scope.row.edit" v-model="scope.row.i" placeholder="请填写"></el-input>
            <span v-else>{{scope.row.i}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="j" label="j">
          <template slot-scope="scope">
            <el-input v-if="scope.row.edit" v-model="scope.row.j" placeholder="请填写"></el-input>
            <span v-else>{{scope.row.j}}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="id" label="id">
        </el-table-column>-->
      </el-table>
    </div>
    <div class="type">
      <span>
        <span class="must-span">*</span>添加题型：
      </span>
      <el-select
        v-model="value"
        clearable
        size="mini"
        style="margin-right:15px"
        placeholder="请选择"
        @change="optionschange"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <span>
        <span class="must-span">*</span>添加问题类型：
      </span>
      <el-select
        v-model="q_class"
        clearable
        size="mini"
        style="margin-right:15px"
        placeholder="请选择"
      >
        <el-option
          v-for="item in qclass"
          :key="item.q_class"
          :label="item.q_class"
          :value="item.q_class"
        ></el-option>
      </el-select>
      <span v-show="requiredshow">
        <span class="must-span">*</span>是否必填：
      </span>
      <el-select v-show="requiredshow" v-model="required" clearable size="mini" placeholder="请选择">
        <el-option
          v-for="item in requiredlist"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <span v-show="requiredshow == false">
        <span class="must-span">*</span>题干问题题目：
      </span>
      <el-input
        v-show="requiredshow == false"
        size="mini"
        clearable
        placeholder="请输入内容"
        style="width:200px;margin-bottom:20px;"
        v-model="questionStem"
      ></el-input>
      <el-button type="primary" size="mini" @click="sure" style="margin-left:20px">确定</el-button>
    </div>
    <div v-show="boxshow">
      <!-- 单选题，多选题等 -->
      <div class="type1" v-if="type=='1'">
        <span>问题题目：</span>
        <el-input
          size="mini"
          clearable
          placeholder="请输入内容"
          style="width:200px;margin-bottom:20px;margin-right:15px"
          v-model="title"
        ></el-input>
        <span>选项答案：</span>
        <el-input size="mini" clearable placeholder="请输入内容" style="width:200px" v-model="input"></el-input>
        <el-button type="primary" size="mini" @click="push" style="margin-left:20px;">添加</el-button>
        <div v-if="value=='排序题'">
          <span>仅选出：</span>
          <el-select
            size="mini"
            v-model="sequence"
            clearable
            style="width:100px;margin-bottom:20px;margin-right:15px"
            placeholder="请选择"
          >
            <el-option v-for="item in sequencelist" :key="item" :label="item" :value="item"></el-option>
          </el-select>
          <span>项</span>
        </div>
        <div v-if="pushtitle" style="margin:10px 0">
          <span>问题题目：{{title}}</span>
          <!-- <span>选项：</span> -->
          <p
            style="margin-left:70px"
            v-for="(item,index1) in arr"
            :key="index1"
          >{{index1|indexFilter}}：{{item}}</p>
     
        </div>
        <div v-if="value=='单选填空'">
          <span>选项其他：</span>
            <span>答案内容类型：</span>
          <el-select
            size="mini"
            v-model="restrictnum"
            clearable
            style="width:150px;margin-bottom:20px;margin-right:15px"
            placeholder="请选择"
          >
            <el-option
              v-for="item in restrict"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <span v-if="restrictnum == '文本'">文本最大长度：</span>
          <el-input
            v-if="restrictnum == '文本'"
            size="mini"
            placeholder="请输入"
            clearable
            style="width:150px;margin-bottom:20px;margin-right:15px"
            v-model="largest"
          ></el-input>
          <span v-if="restrictnum == '数值'">最大值：</span>
          <el-input
            v-if="restrictnum == '数值'"
            size="mini"
            placeholder="请输入"
            clearable
            style="width:100px;margin-bottom:20px;margin-right:15px"
            v-model="maxnum"
          ></el-input>
          <span v-if="restrictnum == '数值'">最小值：</span>
          <el-input
            v-if="restrictnum == '数值'"
            size="mini"
            placeholder="请输入"
            clearable
            style="width:100px;margin-bottom:20px;margin-right:15px"
            v-model="minnum"
          ></el-input>
        </div>
        <el-button type="primary" size="mini" @click="final" style="margin-left:160px">确定提交</el-button>
      </div>
      <!-- 问答题 -->
      <div class="type1" v-if="type=='2'">
        <span>问题题目：</span>
        <el-input
          size="mini"
          placeholder="请输入内容"
          clearable
          style="width:200px;margin-bottom:20px;margin-right:15px"
          v-model="title"
        ></el-input>
        <span>答案内容类型：</span>
        <el-select
          size="mini"
          v-model="restrictnum"
          clearable
          style="width:150px;margin-bottom:20px;margin-right:15px"
          placeholder="请选择"
        >
          <el-option
            v-for="item in restrict"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <span v-if="restrictnum == '文本'">文本最大长度：</span>
        <el-input
          v-if="restrictnum == '文本'"
          size="mini"
          placeholder="请输入"
          clearable
          style="width:150px;margin-bottom:20px;margin-right:15px"
          v-model="largest"
        ></el-input>
        <span v-if="restrictnum == '数值'">最大值：</span>
        <el-input
          v-if="restrictnum == '数值'"
          size="mini"
          placeholder="请输入"
          clearable
          style="width:100px;margin-bottom:20px;margin-right:15px"
          v-model="maxnum"
        ></el-input>
        <span v-if="restrictnum == '数值'">最小值：</span>
        <el-input
          v-if="restrictnum == '数值'"
          size="mini"
          placeholder="请输入"
          clearable
          style="width:100px;margin-bottom:20px;margin-right:15px"
          v-model="minnum"
        ></el-input>
        <el-button type="primary" size="mini" @click="final" style="margin-left:160px">确定提交</el-button>
      </div>
      <!-- 评分题 -->
      <div class="type1" v-if="type=='3'">
        <span>问题题目：</span>
        <el-input
          size="mini"
          placeholder="请输入内容"
          clearable
          style="width:200px;margin-bottom:20px;margin-right:15px"
          v-model="title"
        ></el-input>
        <span>评分总分选择：</span>
        <el-select
          size="mini"
          v-model="largest"
          clearable
          style="width:200px;margin-bottom:20px;"
          placeholder="请选择"
        >
          <el-option
            v-for="item in scorelist"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-button type="primary" size="mini" @click="final" style="margin-left:160px">确定提交</el-button>
      </div>
      <!-- 多项填空 -->
      <div class="type1" v-if="type=='4'">
        <span>小题问题题目：</span>
        <el-input
          size="mini"
          placeholder="请输入内容"
          clearable
          style="width:200px;margin-bottom:20px;margin-right:15px"
          v-model="title"
        ></el-input>
        <span>答案内容类型：</span>
        <el-select
          size="mini"
          v-model="restrictnum"
          clearable
          style="width:150px;margin-bottom:20px;margin-right:15px"
          placeholder="请选择"
        >
          <el-option
            v-for="item in restrict"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <span></span>
        <span v-if="restrictnum == '文本'">文本最大长度：</span>
        <el-input
          v-if="restrictnum == '文本'"
          size="mini"
          placeholder="请输入"
          clearable
          style="width:150px;margin-bottom:20px;margin-right:15px"
          v-model="largest"
        ></el-input>
        <span v-if="restrictnum == '数值'">最大值：</span>
        <el-input
          v-if="restrictnum == '数值'"
          size="mini"
          placeholder="请输入"
          clearable
          style="width:100px;margin-bottom:20px;margin-right:15px"
          v-model="maxnum"
        ></el-input>
        <span v-if="restrictnum == '数值'">最小值：</span>
        <el-input
          v-if="restrictnum == '数值'"
          size="mini"
          placeholder="请输入"
          clearable
          style="width:100px;margin-bottom:20px;margin-right:15px"
          v-model="minnum"
        ></el-input>
        <span>是否必填：</span>
        <el-select style="width:100px" v-model="required" clearable size="mini" placeholder="请选择">
          <el-option
            v-for="item in requiredlist"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-button type="primary" size="mini" @click="pushrestrict" style="margin-left:20px">添加一条</el-button>
        <br />
        <div v-if="pushtitle2" style="margin:10px 0">
          <el-table :data="arrliat" border style="width: 100%">
            <el-table-column prop="question" label="题目名称" width="180"></el-table-column>
            <el-table-column prop="datatype" label="类型" width="180"></el-table-column>
            <el-table-column prop="required" label="是否必填" width="180">
              <template slot-scope="scope">
                <span>{{scope.row.required==1?'必选':'非必选'}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="maxlen" label="文本长度"></el-table-column>
            <el-table-column prop="maxnum" label="数值做大长度"></el-table-column>
            <el-table-column prop="minnum" label="数值最小长度"></el-table-column>
          </el-table>
          <el-button
            type="primary"
            size="mini"
            @click="final"
            style="margin-left:260px;margin-top:10px"
          >确定提交</el-button>
        </div>
      </div>
      <!-- 矩阵问题 -->
      <div class="type1" v-if="type=='5' || flg===true">
        <!--矩阵X-->
        <span v-show="flg==true?false:true">问题题目：</span>
        <el-input
          v-show="flg==true?false:true"
          size="mini"
          placeholder="请输入内容"
          clearable
          style="width:200px;margin-bottom:20px;margin-right:15px"
          v-model="title"
        ></el-input>
        <div >
          <div id="right_div1">
            <div id="right_divx">
              <table cellspacing="0" cellpadding="0" id="right_table1" class="table table-bordered">
                <tr>
                  <th v-for="(item,index) in MatrixX" :key="index">
                    <!-- 抽屉 -->
                    <drawer
                      title="选项设置"
                      :visible.sync="item.dialogVisible"
                      width="500px"
                      close-on-click-modal
                    >
                      <el-form ref="form" label-width="80px">
                        <el-form-item label="数据类型">
                          <el-select v-model="item.datatype" style="float:left" placeholder="请选择活动区域">
                            <el-option label="文本" value="文本"></el-option>
                            <el-option label="数值" value="数值"></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="是否必填">
                          <el-checkbox v-model="item.required" style="float:left"></el-checkbox>
                        </el-form-item>
                        <el-form-item label="最小值" v-show="item.datatype=='数值'">
                          <el-input type="number" v-model="item.minnum"></el-input>
                        </el-form-item>
                        <el-form-item label="最大值" v-show="item.datatype=='数值'">
                          <el-input type="number" v-model="item.maxnum"></el-input>
                        </el-form-item>
                        <el-form-item label="最大长度" v-show="item.datatype=='文本'">
                          <el-input type="number" v-model="item.maxlen"></el-input>
                        </el-form-item>
                        <el-form-item>
                          <el-button type="primary" @click="onSubmit(item)">确定</el-button>
                          <el-button @click="cancel(item)">取消</el-button>
                        </el-form-item>
                      </el-form>
                    </drawer>
                    <!-- <p>{{bank.sName}}</p> -->
                    <span v-if="index==0" style="width:80px;display:inline-block">&nbsp;</span>
                    <el-input v-else v-model="item.question" style="width:80px;float:left"></el-input>
                    <el-popover placement="bottom-end" width="40px" trigger="click">
                      <div>
                        <p style="cursor:pointer" @click="setX(item,index)">设置</p>
                        <p style="cursor:pointer;margin-top:5px" @click="deleteX(item,index)">删除</p>
                      </div>
                      <span v-if="index==0"></span>
                      <span slot="reference" style="cursor:pointer;" v-else class="el-icon-more"></span>
                    </el-popover>
                  </th>
                </tr>
              </table>
            </div>
            <div>
              <el-button type="primary" v-if="flg" @click="addX2" plain class="el-icon-plus"></el-button>
              <el-button type="primary" v-else @click="addX" plain class="el-icon-plus"></el-button>
            </div>
          </div>
          <div class="contentY">
            <!-- !--矩阵Y-->
            <div id="left_div2">
              <table cellspacing="0" cellpadding="0" id="left_table2" class="table table-bordered">
                <tr v-for="(item,index) in MatrixY" :key="index">
                  <th>
                    <!-- <p>{{agent.agent_name}}</p> -->
                    <el-input v-model="item.question" style="width:80px;float:left"></el-input>
                    <el-popover placement="bottom-end" width="40px" trigger="click">
                      <div>
                        <p style="cursor:pointer;margin-top:5px" @click="deleteY(item,index)">删除</p>
                      </div>
                      <span slot="reference" style="cursor:pointer;" class="el-icon-more"></span>
                    </el-popover>
                  </th>
                </tr>
              </table>
            </div>
            <!-- 进度单元格 -->
          <div id="right_div2">
              <div id="right_div2x">
                <table cellspacing="0" cellpadding="0" id="right_table2" class="table table-bordered">
                  <tr v-for="(item,index) in MatrixY" :key="index">
                    <td align="center" v-for="(demo,index) in MatrixX" v-if="index > 0" :key="index">
                      <el-input :disabled="true" style="width:100px;float:left"></el-input>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        <div>
          <el-button type="primary" v-if="flg" @click="addY2" plain class="el-icon-plus"></el-button>
          <el-button type="primary" v-else @click="addY" plain class="el-icon-plus"></el-button>
        </div>
        </div>
        <el-button type="primary" v-if="flg" size="mini" @click="Editadd" style="margin-left:160px">确定修改</el-button>
        <el-button type="primary" v-else size="mini" @click="final2" style="margin-left:160px">确定提交</el-button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import drawer from "@/components/drawer/drawer.vue";
import { hostType } from "@/api/env.js";
export default {
  name: "page",
  data() {
    return {
      
      formLabelWidth: "80px",
      //矩阵X
      MatrixX: [
        { MatrixX: null },
        {
          coltype: "col",
          minnum: null,
          maxnum: null,
          maxlen: null,
          datatype: "",
          dialogVisible: false, //抽屉
          required: null,
          q_type: "",
          question: ""
        },
        {
          coltype: "col",
          minnum: null,
          maxnum: null,
          maxlen: null,
          datatype: "",
          dialogVisible: false, //抽屉
          required: null,
          q_type: "",
          question: ""
        }
      ],
      //矩阵Y
      MatrixY: [
        {
          coltype: "row",
          minnum: null,
          maxnum: null,
          maxlen: null,
          datatype: "",
          dialogVisible: false, //抽屉
          required: null,
          q_type: "问答题",
          question: ""
        },
        {
          coltype: "row",
          minnum: null,
          maxnum: null,
          maxlen: null,
          datatype: "",
          dialogVisible: false, //抽屉
          required: null,
          q_type: "问答题",
          question: ""
        }
      ],
      boxshow: false,
      sequence: "",
      sequencelist: ["1", "2", "3", "4", "5", "6"],
      maxnum: "",
      minnum: "",
      largest: "",
      multipletitle: "",
      restrictnum: "",
      requiredshow: true,
      arr: [],
      questionStem: "",
      arrliat: [], //多项选择数组
      score: "",
      qclass: [],
      required: "",
      q_class: "",
      pushtitle: false,
      pushtitle2: false,
      title: "",
      title2: "",
      tableData: [],
      options2: ["A", "B", "C", "D"],
      requiredlist: [
        {
          value: "1",
          label: "必选"
        },
        {
          value: "0",
          label: "非必选"
        }
      ],
      scorelist: [
        {
          value: "5",
          label: "5"
        },
        {
          value: "10",
          label: "10"
        }
      ],
      restrict: [
        {
          value: "数值",
          label: "数值"
        },
        {
          value: "文本",
          label: "文本"
        }
      ],
      options: [
        {
          value: "单选题",
          label: "单选题"
        },
        {
          value: "多选题",
          label: "多选题"
        },
        {
          value: "问答题",
          label: "问答题"
        },
        {
          value: "单选填空",
          label: "单选填空"
        },
        {
          value: "多项填空",
          label: "多项填空"
        },
        {
          value: "评分题",
          label: "评分题"
        },
        {
          value: "排序题",
          label: "排序题"
        },
        {
          value: "矩阵题",
          label: "矩阵题"
        }
      ],
      options3: [
        {
          value: "1",
          label: "必选"
        },
        {
          value: "0",
          label: "非必选"
        }
      ],
      value: "",
      value2: "",
      tableData2: [],
      input: "",
      type: Number,
      flg: false,
      Matrixarr: [],
      text:[],
      editrow:"",
      datanewXlen:"",
      datanewYlen:"",
      oldMatrixX:[],
      oldMatrixY:[],
      Matrixflg:false,
      edifflg:true,
      edifflg2:false
    };
  },
  components: {
    drawer
  },
  mounted() {
    this.getdata();
    this.oldMatrixX = this.MatrixX;
    this.oldMatrixY = this.MatrixY;
    // console.log(vm.tableData2)
  },
  filters: {
    indexFilter(index1) {
      var trans = String.fromCharCode(64 + parseInt(index1 + 1));
      return trans;
    }
  },
  methods: {
    arrInitialization(){
      this.MatrixX=[{ MatrixX: null },
        {
          coltype: "col",
          minnum: null,
          maxnum: null,
          maxlen: null,
          datatype: "",
          dialogVisible: false, //抽屉
          required: null,
          q_type: "",
          question: ""
        },
        {
          coltype: "col",
          minnum: null,
          maxnum: null,
          maxlen: null,
          datatype: "",
          dialogVisible: false, //抽屉
          required: null,
          q_type: "",
          question: ""
        }
      ],
      //矩阵Y
      this.MatrixY=[{
          coltype: "row",
          minnum: null,
          maxnum: null,
          maxlen: null,
          datatype: "",
          dialogVisible: false, //抽屉
          required: null,
          q_type: "问答题",
          question: ""
        },
        {
          coltype: "row",
          minnum: null,
          maxnum: null,
          maxlen: null,
          datatype: "",
          dialogVisible: false, //抽屉
          required: null,
          q_type: "问答题",
          question: ""
        }
      ]
    },
    confirmAdd3(expandedRows,expanded){//获取点击下拉的表格行数据
      console.log(expandedRows)
      this.text = expandedRows
    },
    cancel(item){
      item.dialogVisible = false
    },
    onSubmit(item) {
      this.MatrixX.forEach((v, i) => {
        if (v.datatype === "数值") {
          console.log(v);
          if (v.minnum * 1 > v.maxnum * 1) {
            //隐视转换数字
            this.$message.error("最小数值不能比最大数值大");
            return;
          }
        }
        if (v.required * 1 == true) {
          v.required = 1;
        } else {
          v.required = 0;
        }
        console.log(v);
        if (v.q_class === "") {
          v.q_class = this.q_class;
        }
        if (v.q_type === "") {
          v.q_type = '问答题';
        }
        // if(v.hasOwnProperty('dialogVisible')){
        //   delete v.dialogVisible
        // }
      });
      this.MatrixY.forEach((v, i) => {
        if (v.minnum * 1 > v.maxnum * 1) {
          //隐视转换数字
          this.$message.error("最小数值不能比最大数值大");
          return;
        }
        if (v.required * 1 == true) {
          v.required = 1;
        } else {
          v.required = 0;
        }
        if (v.q_class === "") {
          v.q_class = this.q_class;
        }
        if (v.q_type === "") {
          v.q_type = this.value;
        }
        
        // if(v.hasOwnProperty('dialogVisible')){
        //   delete v.dialogVisible
        // }
      });
      item.dialogVisible = false
      this.Matrixarr = this.MatrixX.concat(this.MatrixY);

      console.log(this.MatrixY);
      console.log(this.MatrixX);
    },
    //矩阵X
    addX() {
         console.log('++++++======-')
      this.MatrixX.push({
        coltype: "row",
        minnum: null,
        maxnum: null,
        maxlen: null,
        datatype: "",
        dialogVisible: false, //抽屉
        required: null,
        q_type: '问答题',
        question: ""
      });
    },//修改并且新增的矩阵X
    addX2() {
        console.log('+333333333=-')
      this.MatrixX.push({
        "c_id":null,
        "q_id": "",
        "coltype":"col",
        "question": "",
        "a": "",
        "b": "",
        "c": "",
        "d": "",
        "e": "",
        "f": "",
        "g": "",
        "h": "",
        "i": "",
        "j": "",
        "q_type": null,
        "required": null,
        "datatype": "",
        "maxlen": null,
        "minnum": null,
        "maxnum": null,
        dialogVisible: false
      });
    },
    addY() {
      this.MatrixY.push({
        coltype: "row",
        minnum: null,
        maxnum: null,
        maxlen: null,
        datatype: "",
        dialogVisible: false, //抽屉
        required: null,
        q_type: '问答题',
        question: ""
      });
    },
    addY2() {
      this.MatrixY.push({
        "c_id":null,
        "q_id": "",
        "coltype":"col",
        "question": "",
        "a": "",
        "b": "",
        "c": "",
        "d": "",
        "e": "",
        "f": "",
        "g": "",
        "h": "",
        "i": "",
        "j": "",
        "q_type": null,
        "required": null,
        "datatype": "",
        "maxlen": null,
        "minnum": null,
        "maxnum": null
      });
    },
    deleteX(item, index) {
      let domain = hostType(1);
      let vm = this;
      console.log(item, index);
      this.$confirm("确定删除此列吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
           vm.$axios
              .delete(`${domain}` + "/api/matrix/" + item.c_id + "/")
              .then(data=>{
                vm.MatrixX.forEach((v, i) => {
                  if (index === i) {
                    vm.MatrixX.splice(index, 1);
                  }
                });
                vm.$message({
                  type: "success",
                  message: "删除成功!"
                });
                // console.log(data)
            })
        
          
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    deleteY(item, index) {
      console.log(item, index);
      let domain = hostType(1);
      let vm = this;
      this.$confirm("确定删除此列吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
           vm.$axios
              .delete(`${domain}` + "/api/matrix/" + item.c_id + "/")
              .then(data=>{
                vm.MatrixY.forEach((v, i) => {
                  if (index === i) {
                    vm.MatrixY.splice(i, 1);
                  }
                });
                vm.$message({
                  type: "success",
                  message: "删除成功!"
                });
                console.log(data)
          })
         

        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    setX(item, index) {
      // if(item.hasOwnProperty("dialogVisible")){
        item.dialogVisible = true;
      // }else{
        // item.dialogVisible = false;
      // }
      
      // 
      console.log(item, index);
    },
    //确认添加
    confirmAdd(row) {
      console.log(row.required)
      if(row.required ==='必选'){
        row.required = 1
      }else if(row.required === '非必选'){
        row.required = 0
      }
      row.edit = false;
      let vm = this;
      let domain = hostType(1);
      vm.$axios
        .put(`${domain}` + "/api/setque/" + row.id + "/", {
          // child_question: row.child_questions,
          a: row.a,
          b: row.b,
          c: row.c,
          d: row.d,
          e: row.e,
          f: row.f,
          g: row.g,
          h: row.h,
          i: row.i,
          j: row.j,
          id: row.id,
          q_class: row.q_class,
          q_type: row.q_type,
          question: row.question,
          required: row.required,
          datatype: row.datatype,
          maxlen: row.maxlen,
          minnum: row.minnum,
          maxnum: row.maxnum
        })
        .then(function(response) {
          vm.flg = false
          // vm.getdata()
          vm.$message({
            message: "修改成功",
            type: "success"
          });
        });
      // alert(JSON.stringify(this.tableData2))
    },
    confirmAdd2(row){
      console.log(row.required)
      if(row.required ==='必选'){
        row.required = 1
      }else if(row.required === '非必选'){
        row.required = 0
      }
      row.edit2=false
      this.edifflg = false
      this.edifflg2 = false
      this.edifflg = true
      console.log(row.edit2 == false)
      let vm = this,arr=[];
      arr.push({
        "coltype":"pck",
        "question": row.question,
        "a": "",
        "b": "",
        "c": "",
        "d": "",
        "e": "",
        "f": "",
        "g": "",
        "h": "",
        "i": "",
        "j": "",
        "q_type": row.q_type,
        "required": row.required,
        "datatype": row.datatype,
        "maxlen": row.maxlen*1,
        "minnum": row.minnum*1,
        "maxnum": row.maxnum*1,
        'c_id':row.rowid
      })
      let domain = hostType(1);
      vm.$axios
        .put(`${domain}` + "/api/setque/" + this.text.id + "/", {
          child_question:arr,
          a: this.text.a,
          b: this.text.b,
          c: this.text.c,
          d: this.text.d,
          e: this.text.e,
          f: this.text.f,
          g: this.text.g,
          h: this.text.h,
          i: this.text.i,
          j: this.text.j,
          q_class: this.text.q_class,
          q_type: this.text.q_type,
          question: this.text.question,
          required: this.text.required,
          datatype: this.text.datatype,
          maxlen: this.text.maxlen*1,
          minnum: this.text.minnum*1,
          maxnum: this.text.maxnum*1
        })
        .then(function(response) {
          // vm.getdata()
          //  row.edit = false;
            
          console.log(row)
          vm.$message({
            message: "修改成功",
            type: "success"
          });
        });
    },
    Editadd() {
      console.log(this.editrow)
      console.log(this.editrow.required == '必选'?1:0)
      // row.edit = false;
      console.log(this.MatrixX)

      let arr = this.MatrixX.concat(this.MatrixY);
      arr.splice(0, 1);
      arr.forEach(v => {
        if(v.hasOwnProperty('q_id')){
          v.q_id = this.editrow.id
        }
        if (v.dialogVisible === false || v.dialogVisible) {
          delete v.dialogVisible;
        }
        if(v.maxnum || v.maxlen || v.minnum){
          v.maxlen = v.maxlen*1
          v.maxnum = v.maxnum*1
          v.minnum = v.minnum*1
        }
        // if(v.child_question.length>0){

        // }
      });
      console.log(arr)
      let vm = this;
      let domain = hostType(1);
      vm.$axios
        .put(`${domain}` + "/api/setque/" + `${this.editrow.id}` + "/", {
          "question": this.editrow.question,
          "a": null,
          "b": null,
          "c": null,
          "d": null,
          "e": null,
          "f": null,
          "g": null,
          "h": null,
          "i": null,
          "j": null,
          "q_type": this.editrow.q_type,
          "q_class": this.editrow.q_class,
          "required":this.editrow.required=='必选'?1:0,
          "datatype": "",
          "maxlen": null,
          "minnum": null,
          "maxnum": null,
          "child_question":arr
        })
        .then(function(response) {
          // vm.MatrixY = []
          // vm.MatrixX = []
          arr.forEach(v => {
            if(v.coltype=='row'){
              v.dialogVisible = false
            }
          });
          console.log(arr)
          // vm.getdata()
          vm.flg = false
          // vm.text.edit = true
          vm.$message({
            message: "修改成功",
            type: "success"
          });
        });
        console.log(this.MatrixY)
      // alert(JSON.stringify(this.tableData2))
    },
    //修改
    editData(row) {
      let vm = this;
      vm.type = Number
      console.log(row,'修改')
      this.editrow = row
      row.edit2 = true; 
      this.edifflg = true;
      this.edifflg2 = false;
      this.Matrixflg = true;
      if(row.q_type==='矩阵题'){
        this.flg = true;
        vm.boxshow = true;
      }else{
        this.flg = false;
        vm.boxshow = false;
      }
      vm.MatrixX=[
        { empty: null }
      ]
      vm.MatrixY=[]
      let domain = hostType(1);
      vm.$axios
        .get(`${domain}` + "/api/setque/" + `${row.id?row.id:this.text.id}` + "/")
        .then(function(data) {
          console.log(data)
          if(row.q_type=='矩阵题' && data.data.child_question.length>0){
            let datanewX = data.data.child_question;
            let datanewY = data.data.child_question;
            let hash = {};
            datanewX = datanewX.reduce(function(arr, current) {
                hash[current.colid] ? '' : hash[current.colid] = true && arr.push(current);
                return arr
            }, []) //获取行信息
            datanewY = datanewY.reduce(function(arr, current) {
                hash[current.rowid] ? '' : hash[current.rowid] = true && arr.push(current);
                return arr
            }, [])//获取列信息
            console.log(datanewX,'xxxxxxxxxxxx')
             console.log(datanewY,'yyyyyyyyyyyyyyy')
            // vm.datanewXlen = datanewX.length
            // vm.datanewYlen = datanewX.length
            datanewX.forEach(v=>{
              vm.MatrixX.push({
                "c_id": v.colid?v.colid:null,
                "coltype":"col",
                "question": v.question?v.question:null,
                "a": "",
                "b": "",
                "c": "",
                "d": "",
                "e": "",
                "f": "",
                "g": "",
                "h": "",
                "i": "",
                "j": "",
                "q_type": v.q_type?v.q_type:null,
                "required": v.required?v.required:null,
                "datatype": v.datatype?v.datatype:null,
                "maxlen": v.maxlen?v.maxlen*1:null,
                "minnum": v.minnum?v.minnum*1:null,
                "maxnum": v.maxnum?v.maxnum*1:null,
                dialogVisible: false,
              })
      
            })
            datanewY.forEach(v=>{
              vm.MatrixY.push({
                "c_id": v.rowid?v.rowid:null,
                "coltype":"row",
                "question": v.rowquestion?v.rowquestion:null,
                "a": "",
                "b": "",
                "c": "",
                "d": "",
                "e": "",
                "f": "",
                "g": "",
                "h": "",
                "i": "",
                "j": "",
                "q_type": v.q_type?v.q_type:null,
                "required": v.required?v.required:null,
                "datatype": v.datatype?v.datatype:null,
                "maxlen": v.maxlen?v.maxlen*1:null,
                "minnum": v.minnum?v.minnum*1:null,
                "maxnum": v.maxnum?v.maxnum*1:null
              })
            })
          }
          if (data.status == 200) {
            if (row.required == 1) {
              row.required = "必选";
            } else {
              row.required = "非必选";
            }
              // 
            vm.tableData2.forEach(v=>{
              if(row.id == v.id){
                row.edit= true
              }else{
                v.edit = false
              }
            })
          } else if (data == false) {
            vm.$message.error("此题不能编辑");
          }
          //  vm.$message('此题不能编辑');
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //删除
    deleteData(row, index) {
      this.tableData.splice(index, 1);
    },
    submitData() {},
    //  确定
    sure() {
      let vm = this;
      vm.boxshow = true;
      if (vm.value == "多项填空") {
        if (vm.value != "" && vm.q_class != "") {
          if (
            vm.value == "单选题" ||
            vm.value == "多选题" ||
            vm.value == "单选填空" ||
            vm.value == "排序题"
          ) {
            console.log(vm.value);
            vm.type = 1;
          } else if (vm.value == "问答题") {
            vm.type = 2;
          } else if (vm.value == "评分题") {
            vm.type = 3;
          } else if (vm.value == "多项填空") {
            vm.type = 4;
          } else if (vm.value == "矩阵题") {
            vm.type = 5;
            vm.flg = false
            vm.arrInitialization()
            vm.Matrixflg = false
          }
        } else {
          vm.$message.error("请填选完整");
        }
      } else if(vm.value == "矩阵题"){
             if (vm.value != "" && vm.q_class != ""){
               vm.type = 5;
              vm.flg = false
              vm.arrInitialization() //初始化
              vm.Matrixflg = false
             }
             
        }
       else {
        if (vm.value != "" && vm.required != "" && vm.q_class != "") {
          if (
            vm.value == "单选题" ||
            vm.value == "多选题" ||
            vm.value == "单选填空" ||
            vm.value == "排序题"
          ) {
            console.log(vm.value);
            vm.type = 1;
          } else if (vm.value == "问答题") {
            vm.type = 2;
          } else if (vm.value == "评分题") {
            vm.type = 3;
          } else if (vm.value == "多项填空") {
            vm.type = 4;
          } else if (vm.value == "矩阵题") {
            vm.type = 5;
            vm.flg = false
            vm.arrInitialization() //初始化
            vm.Matrixflg = false
          }
        } else {
          vm.$message.error("请填选完整");
        }
      }
    },
    getdata() {
      //列表数据
      let vm = this;
      let domain = hostType(1);
      vm.$axios
        .get(`${domain}` + "/api/setque/")
        .then(function(response) {
          console.log(response.data);
          vm.tableData = response.data.data;
          vm.qclass = response.data.q_class;
          // console.log(vm.tableData)
          for (let index = 0; index < vm.tableData.length; index++) {
              if(vm.tableData[index].q_type =='多项填空'){
                vm.tableData[index].child_question.forEach(v=>{v.edit2=false})
              }
            // if(vm.tableData[index].q_type === '单选题' || vm.tableData[index].q_type === '多选题' || vm.tableData[index].q_type === '单选填空题' || vm.tableData[index].q_type === '排序题' || vm.tableData[index].q_type === '评分题' || vm.tableData[index].q_type === '问答题'){
              vm.tableData2.push({
                child_question: vm.tableData[index].child_question,
                a: vm.tableData[index].a,
                b: vm.tableData[index].b,
                c: vm.tableData[index].c,
                d: vm.tableData[index].d,
                e: vm.tableData[index].e,
                f: vm.tableData[index].f,
                g: vm.tableData[index].g,
                h: vm.tableData[index].h,
                i: vm.tableData[index].i,
                j: vm.tableData[index].j,
                id: vm.tableData[index].id,
                q_class: vm.tableData[index].q_class,
                q_type: vm.tableData[index].q_type,
                question: vm.tableData[index].question,
                required: vm.tableData[index].required,
                maxlen: vm.tableData[index].maxlen,
                minnum: vm.tableData[index].minnum,
                maxnum: vm.tableData[index].maxnum,
                datatype: vm.tableData[index].datatype,
                edit: false
              });
            // }
          }
        });
    },
    // 确定提交
    final() {
      let vm = this;
      if (parseInt(vm.minnum) > parseInt(vm.maxnum)) {
        alert("最小数值不能比最大数值大");
        return;
      }
      console.log(vm.required);
      let domain = hostType(2);
      vm.$axios
        .post(`${domain}` + "/api/setque/", {
          child_questions: vm.arrliat.length <= 0 ? [] : vm.arrliat,
          a: vm.arr[0],
          b: vm.arr[1],
          c: vm.arr[2],
          d: vm.arr[3],
          e: vm.arr[4],
          f: vm.arr[5],
          g: vm.arr[6],
          h: vm.arr[7],
          i: vm.arr[8],
          j: vm.arr[9],
          q_class: vm.q_class,
          q_type: vm.value,
          question: vm.title == "" ? vm.questionStem : vm.title,
          datatype: vm.restrictnum ? vm.restrictnum : null,
          required: vm.required ? vm.required : null,
          maxlen: vm.largest ? vm.largest * 1 : vm.sequence?vm.sequence:null,
          minnum: vm.minnum ? vm.minnum * 1 : null,
          maxnum: vm.maxnum ? vm.maxnum * 1 : null
        })
        .then(function(response) {
          console.log(response);
          if (response.data == "提交成功") {
            vm.getdata();
            console.log(response.data);
            vm.$message({
              message: "添加成功",
              type: "success"
            });
            vm.arr = [];
            vm.input = "";
            vm.largest = "";
            vm.minnum = "";
            vm.maxnum = "";
            vm.arrliat=[]
            vm.arrInitialization()




            // vm.q_class = "";
            // vm.value = "";
            // vm.title = "";
            // vm.required = "";
          }
        });
    },
    final2() {
      let vm = this;
      this.Matrixarr = this.MatrixX.concat(this.MatrixY);
      this.Matrixarr.splice(0, 1);
      this.Matrixarr.forEach(v => {
        console.log(v);
        if (v.dialogVisible === false || v.dialogVisible) {
          delete v.dialogVisible;
        }
        if (v.q_class === "") {
          v.q_class = this.q_class;
        }
        if (v.q_type === "") {
          v.q_type = '问答题';
        }
      });
      console.log(this.Matrixarr);
      let domain = hostType(2);
      vm.$axios
        .post(`${domain}` + "/api/setque/", {
          child_questions: vm.Matrixarr.length <= 0 ? [] : vm.Matrixarr,
          a: vm.arr[0],
          b: vm.arr[1],
          c: vm.arr[2],
          d: vm.arr[3],
          e: vm.arr[4],
          f: vm.arr[5],
          g: vm.arr[6],
          h: vm.arr[7],
          i: vm.arr[8],
          j: vm.arr[9],
          q_class: vm.q_class,
          q_type: vm.value,
          question: vm.title,
          datatype: vm.restrictnum ? vm.restrictnum : null,
          required: vm.required ? vm.required : null,
          maxlen: vm.largest ? vm.largest * 1 : null,
          minnum: vm.minnum ? vm.minnum * 1 : null,
          maxnum: vm.maxnum ? vm.maxnum * 1 : null
        })
        .then(function(response) {
          if (response.data == "提交成功") {
            vm.getdata();
             vm.$message({
              message: "添加成功",
              type: "success"
            });
            vm.arrInitialization()
            vm.arr = [];
            vm.Matrixarr = [];
            vm.input = "";
            vm.largest = "";
            vm.minnum = "";
            vm.maxnum = "";
            // vm.q_class = "";
            // vm.value = "";
            // vm.title = "";
            // vm.required = "";
          }
        });
    },
    // 添加
    push() {
      let vm = this;
      if (vm.input == "") {
        alert("选项不能为空");
        return;
      }
      vm.pushtitle = true;
      if (vm.arr.length > 9) {
        alert("最多只能添加10个");
        return;
      }
      vm.arr.push(vm.input);
      console.log(vm.arr);
      vm.input = "";
    },
    pushrestrict() {
      let vm = this;
      if (vm.title == "") {
        alert("问题不能为空");
        return;
      }
      if (parseInt(vm.minnum) > parseInt(vm.maxnum)) {
        alert("最小数值不能比最大数值大");
        return;
      }
      vm.pushtitle2 = true;
      vm.arrliat.push({
        question: vm.title,
        coltype: "pck",
        q_type: '问答题',
        maxnum: vm.maxnum * 1,
        minnum: vm.minnum * 1,
        maxlen: vm.largest * 1,
        datatype: vm.restrictnum,
        required: vm.required
      });
      console.log(vm.arrliat);
      vm.title = "";
      vm.maxnum = "";
      vm.minnum = "";
      vm.largest = "";
      vm.restrictnum = "";
      vm.required = "";
    },
    // 联动事件
    optionschange() {
      this.title = "";
      this.maxnum = "";
      this.arr = [];
      this.arrliat = [];
      this.minnum = "";
      this.largest = "";
      this.required = "";
      this.q_class = "";
      this.restrictnum = "";
      this.questionStem = "";
      this.boxshow = false;
      if (this.value == "多项填空") {
        this.requiredshow = false;
      } else {
        this.requiredshow = true;
      }
    }
  }
};
</script>

<style scoped>
.type {
  padding: 15px;
}
.setX {
  cursor: pointer;
}
.type1 {
  border: 1px solid rgb(216, 215, 215);
  width: 80%;
  padding: 30px;
}
#right_div1 {
  display: flex;
}
#right_divx {
  border: 1px solid #ebeef5;
  background: #fff;
}
#right_table1 tr th:last-child {
  border-right: none;
}
#right_divx th,
td {
  width: 120px;
  height: 40px;
}
.contentY {
  display: flex;
}
#left_div2 th,
td {
  width: 120px;
  height: 40px;
}
#left_div2 {
  border: 1px solid #ebeef5;
  background: #fff;
  width: 119px;
}
#left_table2 tr th {
  border-bottom: 1px solid #ebeef5;
}
#left_table2 tr:last-child th {
  border-bottom: none;
}
#left_div2 {
  border-top: none;
}
#right_div1 th,
td {
  border-right: 1px solid #ebeef5;
}
#right_div2x td {
  width: 120px;
  border-bottom: 1px solid #ebeef5;
}
#right_table2 tr:last-child td {
  border-bottom: none;
}
#right_div2 {
  border-bottom: 1px solid #ebeef5;
  background: #fff;
}
</style>
