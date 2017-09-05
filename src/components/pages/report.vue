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
                <div class="reportTop">
                    <p>上报情况</p>
                    <el-button type="primary" v-on:click="dataReport">生成上报</el-button>
                </div>
                <div class="reportTable">
                    <el-table
                        ref="multipleTable"
                        :data="reportData"
                        border
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                        <el-table-column
                          type="selection"
                          width="55">
                        </el-table-column>
                         <el-table-column
						  prop="id"
						  label="序号"
						  width="150">
						</el-table-column>
                        <el-table-column
                            prop="time"
                            label="时间"
                            width="150">
                          </el-table-column>
                          <el-table-column
                            prop="website_num"
                            label="网站总数"
                            width="260">
                          </el-table-column>
                          <el-table-column
                            prop="ipcompany_num"
                            label="接入商总数"
                            width="260">
                          </el-table-column>
                          <el-table-column
                            prop="last_confirm"
                            label="最后确认状态"
                            show-overflow-tooltip>
                          </el-table-column>
                        <el-table-column label="操作">
                          <template scope="scope">
                            <el-button
                              size="small"
                              type="primary"
                              @click="handleOutput(scope.$index, scope.row)">导出</el-button>
                              <el-button
                              size="small"
                              type="danger"
                              @click="handleDelete(scope.$index, scope.row)">撤销</el-button>
                          </template>
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
    data(){
        return{
			initialUrl:global_.globalUrl,  //决定本地还是117
            inputSearch: '',
            select:'',
            currentPage:1,
            pageSize:30,
            totalPage:200,
            reportData: [],  //显示在页面的数据
			multipleSelection: [], //checkbox选择的数据
              }
          },
     
    components:{
        'MyHeader':require('../widgets/header.vue'),
        'MyLeftNav':require('../widgets/leftnav.vue'),
    },
    mounted (){
        let url=this.initialUrl+'/api/unregister/submit/all'
        let _this = this
         this.$http.get(url, {params:{page:'1'}}).then(function (res) {
                let myTableData = res.data.result
                _this.reportData = myTableData
				_this.totalPage = res.data.result_num	
				_this.pageSize = res.data.result.length
            }).catch(function (error) {
                    console.log(error)
             })
    },

    methods: {
        //搜索框使用IP地址准确查询事件
        handleIconClick(ev) {
			
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
          },
        handleCurrentChange(val) {
//            console.log(`当前页: ${val}`);
			this.currentPage=val;
            var _this = this
            let url=this.initialUrl+'/api/unregister/submit/all'
            this.$http.get(url, {params:{ip:_this.inputSearch,page:val}}).then(function (res) {
                let myTableData=[]
                for (let i = 0; i < res.data.result.length; i++) {              let obj = res.data.result[i]
                     myTableData[i] = obj
                }
                _this.reportData = myTableData
                //console.log(_this.statisticsData)
            }).catch(function (error) {
                    console.log(error)
             })
			
          },
		//多选框
		 handleSelectionChange(val) {
          	this.multipleSelection = val;
		 },
		//每一行数据的导出
		handleOutput(index, row){
			let url=this.initialUrl+"/api/unregister/submit/output?id="+row.id
			window.open(url)
		},
		//撤销
		handleDelete(index, row){
//			console.log(index,row)
			var _this = this
			this.$confirm(`此操作将永久删除序号为${row.id}的数据, 是否继续?`, '提示', {
			  confirmButtonText: '确定',
			  cancelButtonText: '取消',
			  type: 'warning'
			}).then(() => {
				let url=this.initialUrl+"/api/unregister/submit/delete?id="+row.id
				this.$http.get(url, {}).then(function (res) {
					if(res.data.status === "ok"){
						_this.$message({
							type: 'success',
							message: '删除成功!'
						  });
					}else{
						_this.$message({
							type: 'error',
							message: '删除失败!'
						  });
					}
					
                }).catch(function (error) {
                    console.log(error)
             })
			}).catch(() => {
			  _this.$message({
				type: 'info',
				message: '已取消删除'
			  });          
			});
		},
		//生成上报按钮
		dataReport(){
			let url=this.initialUrl+"/api/unregister/submit/auto_submit"
			var _this = this
			this.$http.get(url, {}).then(function (res) {
				if(res.data.status === "ok"){
					_this.$message({
							type: 'success',
							message: '上报成功!'
						  });
				}
            }).catch(function (error) {
                    console.log(error)
             })
		//成功之后刷新页面
         let updateUrl=this.initialUrl+'/api/unregister/submit/all'
         this.$http.get(updateUrl, {params:{page:'1'}}).then(function (res) {
                let myTableData = res.data.result
                _this.reportData = myTableData
				_this.totalPage = res.data.result_num	
				_this.pageSize = res.data.result.length
            }).catch(function (error) {
                    console.log(error)
             })
		}
    },   
}

</script>


<style>
    .main .reportTop{
        margin-top: 70px;
        width: 100%;
        height: 30px;
    }
    .main .reportTop p{
        float: left;
		font-size: 2rem;
		margin-left: 10px;
    }
	.main .reportTop .el-button{
		float:right;
		margin-right: 20px;
	}
    .main .reportTable{
        margin: 20px 20px 10px 10px;
    }
    .main .reportTable .paging{
        float: right;
        margin-top: 10px;
        margin-right: -5px;
    }
    .main .reportTable .el-table td{
        text-align: left;
    }
</style>