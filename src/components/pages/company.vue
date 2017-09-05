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
                    <div class="mainLink div-inline">
                    <router-link :to="{path:'/company'}"><img src="../../assets/home.png" alt="">接入商</router-link>
                    <div class="div-inline"><img src="../../assets/next.png" alt="">搜索</div></div> 
                    <div class="mainSearch">
                        <el-input
                         placeholder="查询接入商"
                         icon="search"
                         v-model="providerSearch"
                        :on-icon-click="handleIconClick">
                      </el-input>
                      <el-dropdown @command="handleCommand">
                          <el-button type="primary" class="el-dropdown-link">
                            省份<i class="el-icon-caret-bottom el-icon--right"></i>
                          </el-button>
                          <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="a">xxx</el-dropdown-item>
                            <el-dropdown-item command="b">xxxx</el-dropdown-item>
                            <el-dropdown-item>xxxx</el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown>
                    </div> 
                    </div>
                    <div class="mainButton div-inline">
                    <el-button type="primary" icon="edit"></el-button>
                    <el-button type="primary" icon="share"></el-button>
                    <el-button type="primary" icon="delete"></el-button>
                    </div>
                </div>
                <div class="mainCenter">
					<div id="companyChart"></div>
				</div>
                <div class="staticTable">
                    <el-table
                       @cell-click=handleDetail
                        :data="statisticsData"
                        border
                        style="width: 100%">
                        <el-table-column
                          label="ID"
						  type="index"
						  width="60">
						</el-table-column>
                         <el-table-column
                            prop="company"
                            label="接入商"
                            width="280">
                          </el-table-column>
                          <el-table-column
                           prop="number"
                            label="网站总数"
                            width="160">
                          </el-table-column>
                          <el-table-column
                            prop="confirm_yes"
                            label="基本确认"
                            width="160">
                          </el-table-column>
                          <el-table-column
                            prop="confirm_suspect"
                            label="疑似确认"
                            width="160">
                          </el-table-column>
                          <el-table-column
                            prop="confirm_not"
                            label="无法确认"
                            width="160">
                            </el-table-column> 
                          <el-table-column
                            prop="submitted"
                            label="已提交"
                            width="160">
                          </el-table-column>
                        <el-table-column
                            prop="handled"
                            label="已处理"
                            width="160">
                          </el-table-column> 
                          <el-table-column
                            prop="handled"
                            label="最后上报时间"
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
import echarts from "echarts"
import global_ from '../../assets/globalData.vue'

export default {
//    name: 'company',
    data(){
        return{
			initialUrl:global_.globalUrl,  //决定本地还是117
            providerSearch:'',
            currentPage:1,
            pageSize:30,
            totalPage:200,
            statisticsData: [],  //显示在页面的数据
           }
          },
     
    components:{
        'MyHeader':require('../widgets/header.vue'),
        'MyLeftNav':require('../widgets/leftnav.vue')
    },
    mounted (){
        let url=this.initialUrl+'/api/ipcompany'
        let _this = this
		var chartName = []
//		var chartNum = []
		var chartConfirm = []
//		var itemStyle = {
//			normal: {
//			},
//			emphasis: {
//				barBorderWidth: 1,
//				shadowBlur: 10,
//				shadowOffsetX: 0,
//				shadowOffsetY: 0,
//				shadowColor: 'rgba(0,0,0,0.5)'
//			}
//		};
		var myChart = echarts.init(document.getElementById('companyChart'));
         this.$http.get(url, {params:{page:'1'}}).then(function (res) {
                var myTableData = res.data.result
                _this.totalPage=res.data.result_num
			    _this.statisticsData = myTableData
				for(let i = 0;i<res.data.result.length;i++){
					chartName[i] = res.data.result[i].company
//					chartNum[i] = res.data.result[i].number
					chartConfirm[i] = res.data.result[i].confirm_yes
				}
				 var option={
					title: {
					  text: '接入商信息统计',
					  left: 'center'
					},
					tooltip: {
					  trigger: 'axis',
					  axisPointer : {            // 坐标轴指示器，坐标轴触发有效
					  type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
					  }
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '8%',
						containLabel: true
					},
					legend: {
					  show: false,
					  left: 'right',
					  data: ['接入商信息统计']
					},
					xAxis: [{
					  type: 'category',
					  axisLabel: {
						inside: true,
						rotate: 90,
						interval: 0,
						textStyle: {
						  color: '#000'
						}
					  },
					  axisTick: {
						show: false
					  },
					  axisLine: {
						show: false
					  },
					  z: 10,
					  data: chartName
					}],
					yAxis: [{
						type: 'value',
					}],
					series: [{
					  name: '基本确认数',
					  type: 'bar',
					  barWidth: '50%',
					  itemStyle: {
						normal: {
						  color: new echarts.graphic.LinearGradient(
							0, 0, 0, 1, [{
								offset: 0,
								color: '#83bff6'
							  },
							  {
								offset: 0.5,
								color: '#188df0'
							  },
							  {
								offset: 1,
								color: '#188df0'
							  }
							]
						  )
						},
						emphasis: {
						  color: new echarts.graphic.LinearGradient(
							0, 0, 0, 1, [{
								offset: 0,
								color: '#2378f7'
							  },
							  {
								offset: 0.7,
								color: '#2378f7'
							  },
							  {
								offset: 1,
								color: '#83bff6'
							  }
							]
						  )
						}
					  },
					  data: chartConfirm
					}]
			}
				 myChart.setOption(option)
            }).catch(function (error) {
                    console.log(error)
             })
		this.__resizeHanlder = function() {
                myChart.resize();
            };
        window.addEventListener('resize', this.__resizeHanlder);
    },

    methods: {
        //搜索框，搜索接入商
        handleIconClick(ev) {
            var _this = this
            let url=this.initialUrl+'/api/ipcompany'
            var chartName = []
			var chartConfirm = []
            this.$http.get(url, {params:{search:_this.providerSearch}}).then(function (res) {
				
                if(res.data.result.length === _this.totalPage && res.data.result[0] === null){
                    //长度为totalPage 但是值为空的数组，也就是没有符合条件的IP地址，为什么是长度为totalPage的数组？
                    _this.statisticsData=[]
//                    _this.totalPage=0
//                    alert(`抱歉，没有符合ip=${_this.inputSearch}的数据`)
                }else{
                    //记得把数据传到一个数组中再传递给statisticsData
                    var myTableData = res.data.result
                    _this.statisticsData = myTableData
					_this.totalPage = res.data.result_num
					for(let i = 0;i<res.data.result.length;i++){
						chartName[i] = res.data.result[i].company
						chartConfirm[i] = res.data.result[i].confirm_yes
					}
                }
            }).catch(function (error) {
                console.log(error);
             })
//			this.__resizeHanlder = function() {
//                myChart.resize();
//            };
//			window.addEventListener('resize', this.__resizeHanlder);
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
          },
		//页码跳转
        handleCurrentChange(val) {
//            console.log(`当前页: ${val}`);
            this.currentPage=val;
            var _this = this
            let url=this.initialUrl+'/api/ipcompany'
			var chartName = []
			var chartConfirm = []
            this.$http.get(url, {params:{search:_this.providerSearch,page:val}}).then(function (res) {
                var myTableData = res.data.result
                _this.statisticsData = myTableData
				for(let i = 0;i<res.data.result.length;i++){
					chartName[i] = res.data.result[i].company
					chartConfirm[i] = res.data.result[i].confirm_yes
				}
//				 var option = {
//					 color: ['#008891','#37c6c0'],
//						 title: {
//						  text: '接入商数量统计',
//						  left: 'center'
//						},
//						tooltip : {},
//						legend: {
//							data:['网站总数','基本确认'],
//							align: 'right',
//					        right: 10
//						},
//						grid: {
//							left: '3%',
//							right: '4%',
//							bottom: '3%',
//							containLabel: true
//						},
//						xAxis : [
//							{
//								type : 'category',
//								data : chartName,
//								axisLine: {onZero: true},
//								splitLine: {show: false},
//								axisTick: {show: false},
//								axisLine: {show: false},
//							}
//						],
//						yAxis : [
//							{
//								type : 'value'
//							}
//						],
//						series : [
//							{
//								name:'网站总数',
//								type:'bar',
//								stack: 'one',
//								itemStyle: itemStyle,
//								data:chartNum
//							},
//							{
//								name:'基本确认',
//								type:'bar',
//								stack: 'one',
//								itemStyle: itemStyle,
//								data:chartConfirm
//							}
//						]
//					}
            }).catch(function (error) {
                    console.log(error)
             })
          },
		//下拉菜单框点击事件
		handleCommand(command){
			this.$message('click on item ' + command);
		},
		//网站详细信息跳转
		handleDetail(row,cell){
			var companyId = row.id
			if(cell.property === 'confirm_yes'){
				var status = 1
			}else if(cell.property === 'confirm_suspect'){
				var status = 2
			}else if(cell.property === 'confirm_not'){
				var status = 3
			}
			//将获取到的数据传递到view页面进行渲染
			this.$router.push({
				name:'view',
				params:{companyId:companyId,status:status}
			})
			
		}
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
	.main .mainTop .mainTitle .mainLink{
        float:left;
    }
	.main .mainTop .mainTitle .mainSearch{
        float:left;
        margin-left: 30px;
    }
	.main .mainTop .mainTitle img{
		margin: 0 5px;
	}
    .main .mainTop .mainTitle .mainSearch .el-input{
        width: 250px;
    }
    .main .mainTop .mainButton{
        float: right;
        margin-right: 20px;
    }
	.main .mainCenter{
		margin: 30px 20px 10px 10px;
		width: calc(100% - 40px);
		height: 300px;
		border:1px solid;
		border-color: #838B83;
		box-shadow: 3px 3px 3px rgba(50,50,50,0.3);
	}
	#companyChart{
		width: 100%;
		height: 100%;
	}
    .main .staticTable{
        margin: 30px 20px 10px 10px;
    }
    .main .staticTable .paging{
        float: right;
        margin-top: 10px;
        margin-right: -5px;
    }
    .main .staticTable .el-table td{
        text-align: left;
  		cursor: pointer;
    }
	.main .staticTable .el-table td:hover{
		color: 	#838B83
	}
</style>