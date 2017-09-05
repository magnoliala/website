<template>
 <div class="allView">
    <div id="fixheader">
       <MyHeader></MyHeader>
    </div>
     <div class="allbody">
         <div class="leftnav">
          <MyLeftNav></MyLeftNav>   
         </div>
         <div class="main">
         	<div class="equipmentTop">
				 <el-radio-group v-model="outputType">
					<el-radio :label="1">部分导出</el-radio>
					<el-radio :label="2">全量导出</el-radio>
				  </el-radio-group>
				<el-button type="primary" v-on:click="equipmentReport">提交</el-button>
      		 <template v-if="outputType === 1">
       		  <div class="equipmentInput div-inline">
       		  <p class=" div-inline">生成条数：</p>
       		  <el-input class=" div-inline" v-model="input" placeholder="请输入内容"></el-input></div>
        	  <div class="equipmentInput">
       	  	 <p>生成周期：</p>
        	  	 <el-radio-group v-model="dateRadio">
					<el-radio :label="1">每周</el-radio>
					<el-radio :label="2">每月</el-radio>
				  </el-radio-group>
      		  </div>
      		  <div class="equipmentInput">
       		  <p>生成设置：</p>
        		  <el-radio-group v-model="setRadio">
					<el-radio :label="1">随机</el-radio>
					<el-radio :label="2">各省均匀</el-radio>
				  </el-radio-group>
        	  </div> 
        	  </template>
<!--
        	  <template v-else>
        	  	<el-button  type="primary" v-on:click="equipmentReport">提交</el-button>
        	  </template>
-->
      		</div> 
       		<div class="equipmentNext">
       			<p>历史版本下载：</p>
       			<el-select v-model="selectEdition" placeholder="2017-07-24 05:22.xlsx">
					<el-option
					  v-for="item in allEdition"
					  :key="item.value"
					  :label="item.label"
					  :value="item.value">
					</el-option>
				</el-select>
       			<el-button type="primary" v-on:click="equipmentDownload">下载</el-button>
       		</div>
         </div>
     </div>
 </div>  
</template>

<script>
import global_ from '../../assets/globalData.vue'

export default{
	name:'equipment',
	data(){
		return{
			initialUrl:global_.globalUrl,  //决定本地还是117
			input:'',
			outputType: 1,
			dateRadio: 1,
			setRadio:1,
			allEdition:[{
				value:'1',
				label:'2017-07-24 05:22.xlsx'
			},{
				value:'2',
				label:'2017-07-25 05:22.xlsx'
			},{
				value:'3',
				label:'2017-07-26 05:22.xlsx'
			},{
				value:'4',
				label:'2017-07-27 05:22.xlsx'
			}],
			selectEdition:''
		}
	},
	components:{
        'MyHeader':require('../widgets/header.vue'),
		'MyLeftNav':require('../widgets/leftnav.vue'),
		'common-select':require('../widgets/select.vue')
    },
	mounted(){
        let url=this.initialUrl+'/api/unregister/submit/config'
        let _this = this
         this.$http.get(url, {}).then(function (res) {
			   _this.input = res.data.config.num
			   _this.setRadio = res.data.config.mode
            }).catch(function (error) {
                    console.log(error)
             })
		
	},
	methods:{
		//提交按钮
		equipmentReport(){
        	let url=this.initialUrl+'/api/unregister/submit/config'
			let _this = this
			this.$http.post(url,{num:_this.input,mode:_this.setRadio}).then(response =>{
				_this.$message({
				  showClose: true,
				  message: '提交成功',
				  type: 'success'
				});
				}, response => {
					// error callback
				  })
		},
		//下载按钮
		equipmentDownload(){
			console.log("开始下载。。未完待续");
		}
	},
}
</script>


<style>
	.main .equipmentTop{
		margin-top: 80px;
		height: 180px;
	}
	.main .equipmentTop .el-radio-group{
		float:left;
		margin-left: -40px;
	}
	.main .equipmentTop .el-radio-group .el-radio{
		margin-left: 80px;
	}
	.main .equipmentTop .equipmentInput{
		clear: both;
		float: left;
		height: auto;
		margin-top: 20px;
	}
	.main .equipmentTop .equipmentInput p{
		float: left;
		margin-left: 20px;
	}
	.main .equipmentTop .equipmentInput .el-input{
		width: 220px;
		margin-left: 40px;
		margin-top: -10px;
	}
	.main .equipmentTop .el-button{
		float: left;
		margin-top: -6px;
		margin-left: 92px;
	}
	.main .equipmentNext{
		margin-top: 20px;
	}
	.main .equipmentNext p{
		float: left;
		margin-left: 20px;
		margin-top: 10px;
	}
	.main .equipmentNext .el-select{
		float: left;
		margin-left: 15px;
	}
	.main .equipmentNext .el-button{
		float: left;
		margin-left: 30px;
	}
</style>