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
                         placeholder="准确查询"
                         icon="search"
                         v-model="inputSearch"
                        :on-icon-click="handleIconClick">
                      </el-input>
                      <el-dropdown @command="handleCommand">
                          <el-button type="primary">
                            核实状态<i class="el-icon-caret-bottom el-icon--right"></i>
                          </el-button>
                          <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="0">全部</el-dropdown-item>
                            <el-dropdown-item command="1">一致</el-dropdown-item>
                            <el-dropdown-item command="2">不一致</el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                    </div>
                </div>
                <div class="mainTable">
                    <el-table
                        ref="multipleTable"
                        :data="tableData"
                        border
                        style="width: 100%">
                         <el-table-column
                            prop="domain"
                            label="域名"
                            width="250">
                          </el-table-column>
                        <el-table-column
                            prop="register_ip"
                            label="备案ip"
                            width="250">
                          </el-table-column>
                          <el-table-column
                            prop="actual_ip"
                            label="实际ip"
                            width="250">
                          </el-table-column>
                          <el-table-column
                            prop="title"
                            label="网站标题"
                            show-overflow-tooltip>
                          </el-table-column>
                        <el-table-column
                            prop="status"
                            label="是否一致"
                            width="200">
                          </el-table-column>
                      </el-table>
                      <div class="paging">
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
			inputSearch:'', //搜索框
			tableData:[],  //表格
			currentPage:1,  //当前页面
			pageSize:30,
            totalPage:200,
			status:'', //下拉菜单状态
              }
          },
     
    components:{
        'MyHeader':require('../widgets/header.vue'),
        'MyLeftNav':require('../widgets/leftnav.vue'),
    },
    mounted (){
		let url = this.initialUrl+'/api/registerlist'
		var _this = this
		this.$http.get(url, {}).then(function (res) {
			  if(res.data.result.length === _this.totalPage && res.data.result[0] === null){
                    _this.tableData=[]
                }else{
                    var myTableData = res.data.result
                    _this.tableData = myTableData 
					_this.totalPage = res.data.result_num
                }
		 }).catch(function (error) {
                console.log(error);
             })
    },
    methods: {
       //搜索框使用IP地址准确查询事件
        handleIconClick(ev) {
            var _this = this
            let url = this.initialUrl+'/api/registerlist'
            this.$http.get(url, {params:{query:_this.inputSearch}}).then(function (res) {
                if(res.data.result.length === _this.totalPage && res.data.result[0] === null){
                    _this.tableData=[]
                }else{
                    var myTableData = res.data.result
                    _this.tableData = myTableData 
					_this.totalPage = res.data.result_num
                }
            }).catch(function (error) {
                console.log(error);
             })
        },
		handleSizeChange(val) {
            console.log(`每页 ${val} 条`)
          },
		//下拉菜单的选择
		handleCommand(command) {
			this.status = command
			var _this = this
            let url = this.initialUrl+'/api/registerlist'
            this.$http.get(url, {params:{query:_this.inputSearch,page:1,status:_this.status}}).then(function (res) {
                if(res.data.result.length === _this.totalPage && res.data.result[0] === null){
                    _this.tableData=[]
                }else{
                    var myTableData = res.data.result
                    _this.tableData = myTableData 
                }
            }).catch(function (error) {
                console.log(error);
             })
		  },
		handleCurrentChange(val) {
//            console.log(`当前页: ${val}`);
            this.currentPage=val;
            var _this = this
            let url = this.initialUrl+'/api/registerlist'
            this.$http.get(url, {params:{query:_this.inputSearch,page:_this.currentPage,status:_this.status}}).then(function (res) {
                if(res.data.result.length === _this.totalPage && res.data.result[0] === null){
                    _this.tableData=[]
                }else{
                    var myTableData = res.data.result
                    _this.tableData = myTableData 
                }
            }).catch(function (error) {
                console.log(error);
             })
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
    .main .mainTable{
        margin: 20px 20px 10px 10px;
    }
    .main .mainTable .paging{
        float: right;
        margin-top: 10px;
        margin-right: -5px;
    }
    .main .mainTable .el-table td{
        text-align: left;
    }
</style>