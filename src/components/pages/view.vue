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
                <div class="mainTop">
                    <div class="mainTitle div-inline">
                    <p>搜索</p>
                    <div class="mainSearch">
                      <el-input
                         placeholder="使用IP地址准确查询"
                         icon="search"
                         v-model="inputSearch"
                        :on-icon-click="handleIconClick">
                      </el-input>
                      <el-dropdown>
                          <el-button type="primary">
                            核对状态<i class="el-icon-caret-bottom el-icon--right"></i>
                          </el-button>
                          <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>基本确认</el-dropdown-item>
                            <el-dropdown-item>疑似确认</el-dropdown-item>
                            <el-dropdown-item>无法确认</el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown>
                        <el-dropdown>
                          <el-button type="primary">
                            上报状态<i class="el-icon-caret-bottom el-icon--right"></i>
                          </el-button>
                          <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>已上报</el-dropdown-item>
                            <el-dropdown-item>未上报</el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown>  
                        <el-dropdown>
                          <el-button type="primary">
                            处理状态<i class="el-icon-caret-bottom el-icon--right"></i>
                          </el-button>
                          <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>已处理</el-dropdown-item>
                            <el-dropdown-item>未处理</el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                    </div>
                    <div class="mainButton div-inline">
                    <div class="div-inline">已选择{{multipleSelection.length}}条数据</div>
                    <el-button type="primary" v-on:click="dataExport"><i class="el-icon-upload2 el-icon--left"></i>导出</el-button>
                    </div>
<!--
                    <div class="mainSearch div-inline">
                    <el-input placeholder="请输入内容" v-model="inputSearch">
                        <el-select v-model="select" slot="prepend" placeholder="请选择">
                          <el-option label="省市" value="1"></el-option>
                          <el-option label="IP" value="2"></el-option>
                          <el-option label="用途" value="3"></el-option>
                        </el-select>
                        <el-button slot="append" icon="search"></el-button>
                    </el-input>
                    </div>
-->
                </div>
                <div class="mainNext">
                <div class="row">
                	<div class="col-lg-3 col-md-3 col-sm-6">
                		<div class="buttonAll">
                		<div class="col-lg-8 col-md-8 col-sm-8 col-xs-8">
                			<small>未备案网站</small>
                			<h1>{{allWebsite}}</h1>
                		</div>
                		<div class="col-lg-4 col-md-4 col-sm-4 col-xs-4"><img src="../../assets/watch.png" alt=""></div>
                		</div>
                	</div>
                	<div class="col-lg-3 col-md-3 col-sm-6">
                		<div class="buttonAll">
                		<div class="col-lg-8 col-md-8 col-sm-8 col-xs-8">
                			<small>基本确认</small>
                			<h1>{{confirmWebsite}}</h1>
                		</div>
                		<div class="col-lg-4 col-md-4 col-sm-4 col-xs-4"><img src="../../assets/is-document.png" alt=""></div>
                		</div>
                	</div>
                	<div class="col-lg-3 col-md-3 col-sm-6">
						<div class="buttonAll">
						<div class="col-lg-8 col-md-8 col-sm-8 col-xs-8">
                			<small>已上报</small>
                			<h1>{{reportWebsite}}</h1>
                		</div>
                		<div class="col-lg-4 col-md-4 col-sm-4 col-xs-4"><img src="../../assets/allWebsite.png" alt=""></div>
						</div>
                	</div>
                	<div class="col-lg-3 col-md-3 col-sm-6">
                		<div class="buttonAll">
						<div class="col-lg-8 col-md-8 col-sm-8 col-xs-8">
                			<small>接入商</small>
                			<h1>{{provider}}</h1>
                		</div>
                		<div class="col-lg-4 col-md-4 col-sm-4 col-xs-4"><img src="../../assets/buffer.png" alt=""></div>
               			</div>
                	</div>
                </div>
                </div>
                <div class="mainTable">
                    <el-table
                        ref="multipleTable"
                        :data="tableData"
                        border
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                        <el-table-column
                          type="selection"
                          width="55">
                        </el-table-column>
                         <el-table-column
                            prop="domain"
                            label="域名"
                            width="145">
                          </el-table-column>
                        <el-table-column
                            prop="ip"
                            label="IP地址"
                            width="150">
                          </el-table-column>
                          <el-table-column
                            prop="provider"
                            label="接入商"
                            width="260">
                          </el-table-column>
                          <el-table-column
                            prop="title"
                            label="网站标题"
                            width="200"
                            show-overflow-tooltip>
                          </el-table-column>
                        <el-table-column
                            prop="ipmarker"
                            label="IPMarker位置"
                            width="200">
                          </el-table-column>
                          <el-table-column
                            prop="asid"
                            label="自治域号"
                            width="100">
                          </el-table-column>
                          <el-table-column
                            prop="asname"
                            label="自治域名称"
                            show-overflow-tooltip
                            >
                          </el-table-column>
                      </el-table>
                      <div class="paging">
<!--                        <span class="demonstration">显示总数</span>-->
                        <el-pagination
                          @size-change="handleSizeChange"
                          @current-change="handleCurrentChange"
                          :current-page.sync="currentPage"
                          :page-size="pageSize"
                          layout="total, prev, pager, next"
                          :total="totalPage">
                        </el-pagination>
                      </div>
                </div>
         </div>
     </div>
 </div>  
</template>


<script>
import global_ from '../../assets/globalData.vue'

export default {
    name: 'View',
    data(){
        return{
			initialUrl:global_.globalUrl,  //决定本地还是117
			allWebsite:'',
			confirmWebsite:'',
			reportWebsite:'',
			provider:'',
            inputSearch: '',
            select:'',
            currentPage:1,
            pageSize:30,
            totalPage:200,
            tableData: [],  //显示在页面的数据
			multipleSelection: [], //checkbox选择的数据
              }
          },
     
    components:{
        'MyHeader':require('../widgets/header.vue'),
        'MyLeftNav':require('../widgets/leftnav.vue'),
    },
    mounted (){
		var companyId = this.$route.params.companyId
		var status = this.$route.params.status
        let url=this.initialUrl+'/api/queryip'
        let _this = this
         this.$http.get(url, {params:{page:'1',ipcompany_id:companyId,confirm_status:status}}).then(function (res) {
                var myTableData=[]
                _this.totalPage=res.data.result_num
                for (var i = 0; i < res.data.result.length; i++) {                
                     var obj = res.data.result[i]
                     myTableData[i] = obj
                }
			    _this.allWebsite = res.data.statistic.total
				_this.confirmWebsite = res.data.statistic.confirmed
				_this.reportWebsite = res.data.statistic.submitted
				_this.provider = res.data.statistic.ipcompany
                _this.tableData = myTableData
                //console.log(_this.tableData)
				//从接入商页面跳转过来，更新总数量
				_this.totalPage = res.data.result_num
            }).catch(function (error) {
                    console.log(error)
             })
//       
    },

    methods: {
        //搜索框使用IP地址准确查询事件
        handleIconClick(ev) {
            var _this = this
            let url=this.initialUrl+'/api/queryip'
            this.$http.get(url, {params:{ip:_this.inputSearch}}).then(function (res) {
                if(res.data.result.length === _this.totalPage && res.data.result[0] === null){
                    //长度为totalPage 但是值为空的数组，也就是没有符合条件的IP地址，为什么是长度为totalPage的数组？
                    _this.tableData=[]
//                    _this.totalPage=0
//                    alert(`抱歉，没有符合ip=${_this.inputSearch}的数据`)
                }else{
                    //记得把数据传到一个数组中再传递给tableData
                    var myTableData=[]
                    for (var i = 0; i < res.data.result.length; i++) {             
                         var obj = res.data.result[i]
                         myTableData[i] = obj
//                         console.log(myTableData[i])
                    }
                    _this.tableData = myTableData 
					//搜索之后总数会变
					_this.totalPage = res.data.result_num
                }
            }).catch(function (error) {
                console.log(error);
             })
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
          },
        handleCurrentChange(val) {
//            console.log(`当前页: ${val}`);
			var companyId = this.$route.params.companyId
			var status = this.$route.params.status
            this.currentPage=val;
            var _this = this
            let url=this.initialUrl+'/api/queryip'
            this.$http.get(url, {params:{page:val,ip:_this.inputSearch,ipcompany_id:companyId,confirm_status:status}}).then(function (res) {
                console.log(val)
                console.log(res)
                var myTableData=[]
                for (var i = 0; i < res.data.result.length; i++) {                
                     var obj = res.data.result[i]
                     myTableData[i] = obj
                }
                _this.tableData = myTableData
                //console.log(_this.tableData)
            }).catch(function (error) {
                    console.log(error)
             })
          },
		//多选框
		 handleSelectionChange(val) {
          	this.multipleSelection = val;
		 },
		//数据导出
		dataExport(){
			var selection=this.multipleSelection
			var selectionId=[]
			for(var i=0; i<selection.length; i++){
				selectionId[i]=selection[i].id
			}
			if(selectionId.length === 0){
				alert("您没有选择任何数据")
			}else{
				let url=this.initialUrl+'/api/unregister/output'
				//将参数传递的方式改成form,如果要用formdata的方式
//				var postCfg = {
//					headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//					transformRequest: function (data) {
//						return $.param(data);
//					}
//				};
				//把我们选择的数据id号存放在id中,传给后台
				this.$http.post(url,{id:selectionId}).then(response =>{
					//开始下载
					window.open(response.data)
				}, response => {
					// error callback
				  })
			}	
		},
    },   
}

</script>


<style>
    .main .mainTop{
        margin-top: 70px;
        width: 100%;
        height: 30px;
    }
    .main .mainTop .mainTitle{
        float: left;
        margin-left: 15px;
        font-size: 2rem;
    }
    .main .mainTop .mainTitle p{
        float: left;
    }
    .main .mainTop .mainTitle .mainSearch{
        float:left;
        margin-left: 20px;
    }
    .main .mainTop .mainTitle .mainSearch .el-input{
        width: 250px;
    }
    .main .mainTop .mainButton{
        float: right;
        margin-right: 20px;
		font-size: 1.3rem;
    }
	.main .mainTop .mainButton button{
        margin-left: 10px;
    }
	.main .mainNext{
		padding: 20px 15px 0px 5px;
		width: calc(100% - 10px);
		min-height: 100px;
		font-size: 1.7rem;
	}
	.main .mainNext .buttonAll{
		margin: 5px;
		background:#E5E9F2;
		height: 80px;
		width: 100%;
		padding-top: 2px;
		border-radius: 5px;
		text-align: left;
		padding-left: 10px;
		padding-top: 8px;
	}
	.main .mainNext .buttonAll img{
		margin-top: 5px;
	}
	.main .mainNext .buttonAll h1{
		margin-top:0px;
	}
    .main .mainTable{
        margin: 20px 20px 10px 10px;
    }
    .main .mainTable .paging{
        float: right;
        margin-top: 10px;
        margin-right: -5px;
    }
/*
    .main .mainTable .el-table .el-table__body-wrapper .cell{
        height: 48px;
    }
*/
    .main .mainTable .el-table td{
        text-align: left;
    }
</style>