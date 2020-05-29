<template>
	<div>
		<div class="search">
			<!--<div class="search-box">
				<input type="text" class="search-txt" placeholder="请输入搜索条件"/>
				<a class="el-icon-search search-a" href="javascript:void(0)"></a>
			</div>-->
			<el-button type="primary" size='mini' @click="exportExcel" style="float:left;margin:0 1rem">导出数据</el-button>
			<el-upload
			    ref="upload"
			    action="/wm/upload/"
			    :show-file-list="false"
			    :on-change="readExcel"
			    :auto-upload="false" style="float:left;margin-right:1rem">
			  <el-button
			      slot="trigger"
			      size="mini"
			      type="primary" >
			    	导入数据
			  </el-button>
			</el-upload>
			<el-button type="primary" size='mini' @click="save">保存</el-button>
			<span class="table-count">
				共有{{tableData.length}}条数据
			</span>
		</div>
		<el-table
	    :data="tableData"
	    height="40rem"
	    border
	    style="width: 100%" id="tb">
	    <el-table-column
	      label="日期"
	      align="center"
	      width="100">
		      <template slot-scope="scope">
		      	<span v-show="scope.row.index%2==0">{{scope.row.date}}</span>
		        <input type="text" v-model="scope.row.date" v-show="scope.row.index%2!=0" class="td-txt"/>
		      </template>
	    </el-table-column>
	    <el-table-column
	      label="月份"
	      align="center"
	      width="70">
		      <template slot-scope="scope">
		      	<span v-show="scope.row.index%2==0">{{scope.row.month}}</span>
		        <input type="text" v-model="scope.row.month" v-show="scope.row.index%2!=0" class="td-txt"/>
		      </template>
	    </el-table-column>
	    <el-table-column
	      prop="productId"
	      align="center"
	      label="商品编号"
	      width="150">
	    </el-table-column>
	    <el-table-column
	      prop="productName"
	      align="center"
	      label="商品名称"
	      width="150">
	    </el-table-column>
	    <el-table-column
	      prop="way"
	      align="center"
	      label="投放方式"
	      width="120">
	    </el-table-column>
	    <el-table-column
	      align="center"
	      label="一档"
	      width="70">
	      	  <template slot-scope="scope">
		      	<span v-show="scope.row.index%2==0">{{scope.row.one}}</span>
		        <input type="text" v-model="scope.row.one" v-show="scope.row.index%2!=0" class="td-txt"/>
		      </template>
	    </el-table-column>
	    <el-table-column
	      align="center"
	      label="二档"
	      width="70">
	      	  <template slot-scope="scope">
		      	<span v-show="scope.row.index%2==0">{{scope.row.two}}</span>
		        <input type="text" v-model="scope.row.two" v-show="scope.row.index%2!=0" class="td-txt"/>
		      </template>
	    </el-table-column>
	    <el-table-column
	      align="center"
	      label="三档"
	      width="70">
	      	  <template slot-scope="scope">
		      	<span v-show="scope.row.index%2==0">{{scope.row.three}}</span>
		        <input type="text" v-model="scope.row.three" v-show="scope.row.index%2!=0" class="td-txt"/>
		      </template>
	    </el-table-column>
	    <el-table-column
	      align="center"
	      label="四档"
	      width="70">
	          <template slot-scope="scope">
		      	<span v-show="scope.row.index%2==0">{{scope.row.four}}</span>
		        <input type="text" v-model="scope.row.four" v-show="scope.row.index%2!=0" class="td-txt"/>
		      </template>
	    </el-table-column>
	    <el-table-column
	      align="center"
	      label="五档"
	      width="70">
	      	  <template slot-scope="scope">
		      	<span v-show="scope.row.index%2==0">{{scope.row.five}}</span>
		        <input type="text" v-model="scope.row.five" v-show="scope.row.index%2!=0" class="td-txt"/>
		      </template>
	    </el-table-column>
	    <el-table-column
	      align="center"
	      label="六档"
	      width="70">
	       	  <template slot-scope="scope">
		      	<span v-show="scope.row.index%2==0">{{scope.row.six}}</span>
		        <input type="text" v-model="scope.row.six" v-show="scope.row.index%2!=0" class="td-txt"/>
		      </template>
	    </el-table-column>
	    <el-table-column
	      align="center"
	      label="七档"
	      width="70">
	      	  <template slot-scope="scope">
		      	<span v-show="scope.row.index%2==0">{{scope.row.seven}}</span>
		        <input type="text" v-model="scope.row.seven" v-show="scope.row.index%2!=0" class="td-txt"/>
		      </template>
	    </el-table-column>
	    <el-table-column
	      align="center"
	      label="八档"
	      width="70">
	      	  <template slot-scope="scope">
		      	<span v-show="scope.row.index%2==0">{{scope.row.eight}}</span>
		        <input type="text" v-model="scope.row.eight" v-show="scope.row.index%2!=0" class="td-txt"/>
		      </template>
	    </el-table-column>
	    <el-table-column
	      align="center"
	      label="九档"
	      width="70">
	      	  <template slot-scope="scope">
		      	<span v-show="scope.row.index%2==0">{{scope.row.nine}}</span>
		        <input type="text" v-model="scope.row.nine" v-show="scope.row.index%2!=0" class="td-txt"/>
		      </template>
	    </el-table-column>
	    <el-table-column
	      align="center"
	      label="十档"
	      width="70">
	          <template slot-scope="scope">
		      	<span v-show="scope.row.index%2==0">{{scope.row.ten}}</span>
		        <input type="text" v-model="scope.row.ten" v-show="scope.row.index%2!=0" class="td-txt"/>
		      </template>
	    </el-table-column>
	    <el-table-column
	      align="center"
	      label="十一档"
	      width="70">
	      	  <template slot-scope="scope">
		      	<span v-show="scope.row.index%2==0">{{scope.row.eleven}}</span>
		        <input type="text" v-model="scope.row.eleven" v-show="scope.row.index%2!=0" class="td-txt"/>
		      </template>
	    </el-table-column>
	    <el-table-column
	      align="center"
	      label="十二档"
	      width="70">
	      	  <template slot-scope="scope">
		      	<span v-show="scope.row.index%2==0">{{scope.row.twelve}}</span>
		        <input type="text" v-model="scope.row.twelve" v-show="scope.row.index%2!=0" class="td-txt"/>
		      </template>
	    </el-table-column>
	    <el-table-column
	      align="center"
	      label="十三档"
	      width="70">
	          <template slot-scope="scope">
		      	<span v-show="scope.row.index%2==0">{{scope.row.thirteen}}</span>
		        <input type="text" v-model="scope.row.thirteen" v-show="scope.row.index%2!=0" class="td-txt"/>
		      </template>
	    </el-table-column>
	    <el-table-column
	      align="center"
	      label="十四档"
	      width="70">
	          <template slot-scope="scope">
		      	<span v-show="scope.row.index%2==0">{{scope.row.fourteen}}</span>
		        <input type="text" v-model="scope.row.fourteen" v-show="scope.row.index%2!=0" class="td-txt"/>
		      </template>
	    </el-table-column>
	    <el-table-column
	      align="center"
	      label="十五档"
	      width="70">
	          <template slot-scope="scope">
		      	<span v-show="scope.row.index%2==0">{{scope.row.fifteen}}</span>
		        <input type="text" v-model="scope.row.fifteen" v-show="scope.row.index%2!=0" class="td-txt"/>
		      </template>
	    </el-table-column>
	    <el-table-column
	      align="center"
	      label="十六档"
	      width="70">
	          <template slot-scope="scope">
		      	<span v-show="scope.row.index%2==0">{{scope.row.sixteen}}</span>
		        <input type="text" v-model="scope.row.sixteen" v-show="scope.row.index%2!=0" class="td-txt"/>
		      </template>
	    </el-table-column>
	    <el-table-column
	      align="center"
	      label="十七档"
	      width="70">
	          <template slot-scope="scope">
		      	<span v-show="scope.row.index%2==0">{{scope.row.seventeen}}</span>
		        <input type="text" v-model="scope.row.seventeen" v-show="scope.row.index%2!=0" class="td-txt"/>
		      </template>
	    </el-table-column>
	    <el-table-column
	      align="center"
	      label="十八档"
	      width="70">
	          <template slot-scope="scope">
		      	<span v-show="scope.row.index%2==0">{{scope.row.eighteen}}</span>
		        <input type="text" v-model="scope.row.eighteen" v-show="scope.row.index%2!=0" class="td-txt"/>
		      </template>
	    </el-table-column>
	    <el-table-column
	      align="center"
	      label="十九档"
	      width="70">
	          <template slot-scope="scope">
		      	<span v-show="scope.row.index%2==0">{{scope.row.nineteen}}</span>
		        <input type="text" v-model="scope.row.nineteen" v-show="scope.row.index%2!=0" class="td-txt"/>
		      </template>
	    </el-table-column>
	    <el-table-column
	      align="center"
	      label="二十档"
	      width="70">
	          <template slot-scope="scope">
		      	<span v-show="scope.row.index%2==0">{{scope.row.twenty}}</span>
		        <input type="text" v-model="scope.row.twenty" v-show="scope.row.index%2!=0" class="td-txt"/>
		      </template>
	    </el-table-column>
	    <el-table-column
	      align="center"
	      label="二十一档"
	      width="70">
	          <template slot-scope="scope">
		      	<span v-show="scope.row.index%2==0">{{scope.row.twenty_one}}</span>
		        <input type="text" v-model="scope.row.twenty_one" v-show="scope.row.index%2!=0" class="td-txt"/>
		      </template>
	    </el-table-column>
	    <el-table-column
	      align="center"
	      label="二十二档"
	      width="70">
	          <template slot-scope="scope">
		      	<span v-show="scope.row.index%2==0">{{scope.row.twenty_two}}</span>
		        <input type="text" v-model="scope.row.twenty_two" v-show="scope.row.index%2!=0" class="td-txt"/>
		      </template>
	    </el-table-column>
	    <el-table-column
	      align="center"
	      label="二十三档"
	      width="70">
	          <template slot-scope="scope">
		      	<span v-show="scope.row.index%2==0">{{scope.row.twenty_three}}</span>
		        <input type="text" v-model="scope.row.twenty_three" v-show="scope.row.index%2!=0" class="td-txt"/>
		      </template>
	    </el-table-column>
	    <el-table-column
	      align="center"
	      label="二十四档"
	      width="70">
	          <template slot-scope="scope">
		      	<span v-show="scope.row.index%2==0">{{scope.row.twenty_four}}</span>
		        <input type="text" v-model="scope.row.twenty_four" v-show="scope.row.index%2!=0" class="td-txt"/>
		      </template>
	    </el-table-column>
	    <el-table-column
	      align="center"
	      label="二十五档"
	      width="70">
	          <template slot-scope="scope">
		      	<span v-show="scope.row.index%2==0">{{scope.row.twenty_five}}</span>
		        <input type="text" v-model="scope.row.twenty_five" v-show="scope.row.index%2!=0" class="td-txt"/>
		      </template>
	    </el-table-column>
	    <el-table-column
	      align="center"
	      label="二十六档"
	      width="70">
	          <template slot-scope="scope">
		      	<span v-show="scope.row.index%2==0">{{scope.row.twenty_six}}</span>
		        <input type="text" v-model="scope.row.twenty_six" v-show="scope.row.index%2!=0" class="td-txt"/>
		      </template>
	    </el-table-column>
	    <el-table-column
	      align="center"
	      label="二十七档"
	      width="70">
	          <template slot-scope="scope">
		      	<span v-show="scope.row.index%2==0">{{scope.row.twenty_seven}}</span>
		        <input type="text" v-model="scope.row.twenty_seven" v-show="scope.row.index%2!=0" class="td-txt"/>
		      </template>
	    </el-table-column>
	    <el-table-column
	      align="center"
	      label="二十八档"
	      width="70">
	          <template slot-scope="scope">
		      	<span v-show="scope.row.index%2==0">{{scope.row.twenty_eight}}</span>
		        <input type="text" v-model="scope.row.twenty_eight" v-show="scope.row.index%2!=0" class="td-txt"/>
		      </template>
	    </el-table-column>
	    <el-table-column
	      align="center"
	      label="二十九档"
	      width="70">
	          <template slot-scope="scope">
		      	<span v-show="scope.row.index%2==0">{{scope.row.twenty_nine}}</span>
		        <input type="text" v-model="scope.row.twenty_nine" v-show="scope.row.index%2!=0" class="td-txt"/>
		      </template>
	    </el-table-column>
	    <el-table-column
	      align="center"
	      label="三十档"
	      width="70">
	          <template slot-scope="scope">
		      	<span v-show="scope.row.index%2==0">{{scope.row.thirty}}</span>
		        <input type="text" v-model="scope.row.thirty" v-show="scope.row.index%2!=0" class="td-txt"/>
		      </template>
	    </el-table-column>
	    
	  </el-table>
	</div>
</template>

<script>
	//import axios from 'axios'
	import FileSaver from 'file-saver'
	import XLSX from 'xlsx'
	export default {
	    data() {
			return {
			    tableData: [{
			    	index:'',
				    date: '',
					month: '',
					week: '',
					productId:'',
					productName:'',
					way:'',
					one:'',
					two:'',
					three:'',
					four:'',
					five:'',
					six:'',
					seven:'',
					eight:'',
					nine:'',
					ten:'',
					eleven:'',
					twelve:'',
					thirteen:'',
					fourteen:'',
					fifteen:'',
					sixteen:'',
					seventeen:'',
					eighteen:'',
					nineteen:'',
					twenty:'',
					twenty_one:'',
					twenty_two:'',
					twenty_three:'',
					twenty_four:'',
					twenty_five:'',
					twenty_six:'',
					twenty_seven:'',
					twenty_eight:'',
					twenty_nine:'',
					thirty:''
				}]
			}
	   },
	   methods:{
	   		/*初始化表格*/
	   		initTable(){
	   			this.$axios.get('http://192.168.1.3:8000/industry/api/strategy/?dist=朝阳区&month=20180809&time='+ new Date().getTime()).then(function(res){
	   				//console.log(res.data)
	   				this.tableData=[]
	   				for(var i=0;i<res.data.length;i++){
	   					this.tableData.push({
	   						index:i,
						    date: res.data[i].launchdate,
							month: res.data[i].monthly,
							//week: '',
							productId:res.data[i].product_id,
							productName:res.data[i].product_name,
							way:res.data[i].launchmode,
							one:res.data[i]['一档'],
							two:res.data[i]['二档'],
							three:res.data[i]['三档'],
							four:res.data[i]['四档'],
							five:res.data[i]['五档'],
							six:res.data[i]['六档'],
							seven:res.data[i]['七档'],
							eight:res.data[i]['八档'],
							nine:res.data[i]['九档'],
							ten:res.data[i]['十档'],
							eleven:res.data[i]['十一档'],
							twelve:res.data[i]['十二档'],
							thirteen:res.data[i]['十三档'],
							fourteen:res.data[i]['十四档'],
							fifteen:res.data[i]['十五档'],
							sixteen:res.data[i]['十六档'],
							seventeen:res.data[i]['十七档'],
							eighteen:res.data[i]['十八档'],
							nineteen:res.data[i]['十九档'],
							twenty:res.data[i]['二十档'],
							twenty_one:res.data[i]['二十一档'],
							twenty_two:res.data[i]['二十二档'],
							twenty_three:res.data[i]['二十三档'],
							twenty_four:res.data[i]['二十四档'],
							twenty_five:res.data[i]['二十五档'],
							twenty_six:res.data[i]['二十六档'],
							twenty_seven:res.data[i]['二十七档'],
							twenty_eight:res.data[i]['二十八档'],
							twenty_nine:res.data[i]['二十九档'],
							thirty:res.data[i]['三十档']
	   					})
	   				}
	   			}.bind(this)).catch(function(error){
	   				// console.log(error)
	   			})
	   		},
	   		/*导出*/
		   	exportExcel () {
                /* generate workbook object from table */
                let wb = XLSX.utils.table_to_book(document.querySelector('#tb'));
                /* get binary string as output */
                let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' });
                try {
                    FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '数据.xlsx');
                } catch (e)
                {
                    if (typeof console !== 'undefined')
                        console.log(e, wbout)
                }
                return wbout
	 		},
	 		/*导入*/
	 		readExcel(file) {
			    const fileReader = new FileReader();
			    fileReader.onload = (ev) => {
				    try {
				        const data = ev.target.result;
				        const workbook = XLSX.read(data, {
				            type: 'binary'
				        });
				        for (let sheet in workbook.Sheets) {
				          	const sheetArray = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
				          	/*整理数据*/
				            this.changeTableData(sheetArray)
				         
				      	} 
				    }catch (e) {
				        this.$message.warning('解析错误！');
				        return false;
				    }
				};
				fileReader.readAsBinaryString(file.raw);
		    },
		    /*整理excel数据*/
		    changeTableData(sheetData){
		    	this.tableData=[]
		    	for(var i=0;i<sheetData.length;i++){
		    		this.tableData.push({
		  				index:i,
		  				date:sheetData[i]['日期'].replace(/ /g,''),
		  				month:sheetData[i]['月份'].replace(/ /g,''),
		  				//week:sheetData[i]['周'],
		  				productId:sheetData[i]['商品编号'].replace(/ /g,''),
		  				productName:sheetData[i]['商品名称'].replace(/ /g,''),
		  				way:sheetData[i]['投放方式'].replace(/ /g,''),
		  				one:sheetData[i]['一档'].replace(/ /g,''),
		  				two:sheetData[i]['二档'].replace(/ /g,''),
		  				three:sheetData[i]['三档'].replace(/ /g,''),
		  				four:sheetData[i]['四档'].replace(/ /g,''),
		  				five:sheetData[i]['五档'].replace(/ /g,''),
		  				six:sheetData[i]['六档'].replace(/ /g,''),
		  				seven:sheetData[i]['七档'].replace(/ /g,''),
		  				eight:sheetData[i]['八档'].replace(/ /g,''),
		  				nine:sheetData[i]['九档'].replace(/ /g,''),
		  				ten:sheetData[i]['十档'].replace(/ /g,''),
		  				eleven:sheetData[i]['十一档'].replace(/ /g,''),
		  				twelve:sheetData[i]['十二档'].replace(/ /g,''),
		  				thirteen:sheetData[i]['十三档'].replace(/ /g,''),
		  				fourteen:sheetData[i]['十四档'].replace(/ /g,''),
		  				fifteen:sheetData[i]['十五档'].replace(/ /g,''),
		  				sixteen:sheetData[i]['十六档'].replace(/ /g,''),
		  				seventeen:sheetData[i]['十七档'].replace(/ /g,''),
		  				eighteen:sheetData[i]['十八档'].replace(/ /g,''),
		  				nineteen:sheetData[i]['十九档'].replace(/ /g,''),
		  				twenty:sheetData[i]['二十档'].replace(/ /g,''),
		  				twenty_one:sheetData[i]['二十一档'].replace(/ /g,''),
		  				twenty_two:sheetData[i]['二十二档'].replace(/ /g,''),
		  				twenty_three:sheetData[i]['二十三档'].replace(/ /g,''),
		  				twenty_four:sheetData[i]['二十四档'].replace(/ /g,''),
		  				twenty_five:sheetData[i]['二十五档'].replace(/ /g,''),
		  				twenty_six:sheetData[i]['二十六档'].replace(/ /g,''),
		  				twenty_seven:sheetData[i]['二十七档'].replace(/ /g,''),
		  				twenty_eight:sheetData[i]['二十八档'].replace(/ /g,''),
		  				twenty_nine:sheetData[i]['二十九档'].replace(/ /g,''),
		  				thirty:sheetData[i]['三十档'].replace(/ /g,'')
		  			})
		    	}
		    },
		    /*保存*/
		    save(){
		    	var saveData=[];
		    	for(var i=0;i<this.tableData.length;i++){
		    		if(this.tableData[i].index%2 !=0){
		    			if((this.tableData[i].month!=null&&this.tableData[i].month!='')&&(this.tableData[i].date!=null&&this.tableData[i].date!='')){
		    				saveData.push({
			    				dist:'朝阳区',
			    				launchdate:this.tableData[i].date,
				  				monthly:this.tableData[i].month,
				  				//week:this.tableData[i].week,
				  				product_id:this.tableData[i].productId,
				  				product_name:this.tableData[i].productName,
				  				launchmode:this.tableData[i].way,
				  				'一档':this.tableData[i].one,
				  				'二档':this.tableData[i].two,
				  				'三档':this.tableData[i].three,
				  				'四档':this.tableData[i].four,
				  				'五档':this.tableData[i].five,
				  				'六档':this.tableData[i].six,
				  				'七档':this.tableData[i].seven,
				  				'八档':this.tableData[i].eight,
				  				'九档':this.tableData[i].nine,
				  				'十档':this.tableData[i].ten,
				  				'十一档':this.tableData[i].eleven,
				  				'十二档':this.tableData[i].twelve,
				  				'十三档':this.tableData[i].thirteen,
				  				'十四档':this.tableData[i].fourteen,
				  				'十五档':this.tableData[i].fifteen,
				  				'十六档':this.tableData[i].sixteen,
				  				'十七档':this.tableData[i].seventeen,
				  				'十八档':this.tableData[i].eighteen,
				  				'十九档':this.tableData[i].nineteen,
				  				'二十档':this.tableData[i].twenty,
				  				'二十一档':this.tableData[i].twenty_one,
				  				'二十二档':this.tableData[i].twenty_two,
				  				'二十三档':this.tableData[i].twenty_three,
				  				'二十四档':this.tableData[i].twenty_four,
				  				'二十五档':this.tableData[i].twenty_five,
				  				'二十六档':this.tableData[i].twenty_six,
				  				'二十七档':this.tableData[i].twenty_seven,
				  				'二十八档':this.tableData[i].twenty_eight,
				  				'二十九档':this.tableData[i].twenty_nine,
				  				'三十档':this.tableData[i].thirty
			    			})
		    			}
		    			
		    		}
		    	}
		    	this.$axios.post('http://192.168.1.3:8000/industry/api/strategy/?dist=朝阳区&month=20180809&time='+ new Date().getTime(),saveData).then(function(res){
		    		this.$message({
			          message: '保存成功',
			          type: 'success'
			        });
		    	}.bind(this)).catch(function(error){
		    		console.log(error)
		    	})
		    	//console.log(saveData)
		    }



	   },
	   mounted() {
	   		this.initTable()
		}
  	}
</script>

<style>
	.search{
		overflow: hidden;
		margin: 1rem 0;
	}
	.search > .search-box{
		border: 1px solid #ccc;
		float: left;
		width:13rem;
		height: 1.5rem;
		line-height: 1.5rem;
		margin:0 1rem;
		border-radius: 5px;
	}
	.search-a{
		font-size: 1rem;
		color: #333;
	}
	.search-txt{
		border: none;
		outline: none;
		width: 11rem;
		padding-left: 0.3rem;
		height: 1.5rem;
		line-height: 1.5rem;
		background: transparent;
	}
	.table-count{
		margin:0.45rem 1rem 0 0;
		float: right;
	}
	.td-txt{
		outline: none;
	    width: 90%;
	    height: 1rem;
	    font-size: 0.8rem;
	    color: #666;
	    border: none;
	    background: transparent;
	    text-align: center;
	}
</style>