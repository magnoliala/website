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
                <div class="statisticTop">
					<div class="col-lg-3 col-md-3 col-sm-6">
                		<div class="buttonAll">
                		<div class="col-lg-9 col-md-9 col-sm-9 col-xs-9">
                			<small>监测全域名</small>
                			<h3>{{allField}}</h3>
                		</div>
                		<div class="buttonImg col-lg-3 col-md-3 col-sm-3 col-xs-3"><img src="../../assets/watch.png" alt=""  style="width:40px"></div>
                		</div>
                	</div>
                	<div class="col-lg-3 col-md-3 col-sm-6">
                		<div class="buttonAll">
                		<div class="col-lg-9 col-md-9 col-sm-9 col-xs-9">
                			<small>监测网站</small>
                			<h3>{{allWebsite}}</h3>
                		</div>
                		<div class="buttonImg col-lg-3 col-md-3 col-sm-3 col-xs-3"><img src="../../assets/is-document.png" alt="" style="width:40px;"></div>
                		</div>
                	</div>
                	<div class="col-lg-3 col-md-3 col-sm-6">
						<div class="buttonAll">
						<div class="col-lg-9 col-md-9 col-sm-9 col-xs-9">
                			<small>已上报</small>
                			<h3>{{reportWebsite}}</h3>
                		</div>
                		<div class="buttonImg col-lg-3 col-md-3 col-sm-3 col-xs-3"><img src="../../assets/allWebsite.png" alt="" style="width:40px;"></div>
						</div>
                	</div>
                	<div class="col-lg-3 col-md-3 col-sm-6">
                		<div class="buttonAll">
						<div class="col-lg-9 col-md-9 col-sm-9 col-xs-9">
                			<small>已处理</small>
                			<h3>{{handled}}</h3>
                		</div>
                		<div class="buttonImg col-lg-3 col-md-3 col-sm-3 col-xs-3"><img src="../../assets/buffer.png" alt="" style="width:40px;"></div>
               			</div>
                	</div>
                </div>
                <div class="statisticChart">
                	<div class="chartItem col-md-8 col-sm-8">
						<div class="statisticNumChart">
							<div id="statisticNum" style="width:100%;height:100%"></div>
						</div>		
					</div>
                	<div class="chartItem col-md-4 col-sm-4">
                		<div class="statisticTypeChart">
                			<div id="websiteType" style="width:100%;height:100%"></div>
                		</div>
                	</div>
                </div>
                <div class="statisticTable">
                	<div class="tableItem col-md-4 col-sm-12">
                	<h2 class="tableName">接入单位排名</h2>
                		<el-table
						:data="companyRank"
						border
						style="width: 100%">
						<el-table-column
						  type="index"
						  label="ID">
						</el-table-column>
						<el-table-column
						  prop="isp"
						  label="接入商">
						</el-table-column>
						<el-table-column
						  prop="found_num"
						  label="发现数量"
						  width="80">
						</el-table-column>
						<el-table-column
						  prop="submitted_num"
						  label="已上报">
						</el-table-column>
						<el-table-column
						  prop="handled_num"
						  label="已处理">
						</el-table-column>
					  </el-table>
					  <div class="paging">
					  		<el-pagination
							  small
							  layout="prev, pager, next"
							  :total="50">
							</el-pagination>
					  </div>
                	</div>
                	<div class="tableItem col-md-4 col-sm-12">
                	<h2 class="tableName">省份排名</h2>
                		<el-table
						:data="provinceRank"
						border
						style="width: 100%">
						<el-table-column
						  type="index"
						  label="ID"
						  width="50">
						</el-table-column>
						<el-table-column
						  prop="province"
						  label="省份名称">
						</el-table-column>
						<el-table-column
						  prop="num"
						  label="未备案数量"
						  width="120">
						</el-table-column>
					  </el-table>
               		 <div class="paging">
					  		<el-pagination
							  small
							  layout="prev, pager, next"
							  :total="50">
							</el-pagination>
					  </div>
                	</div>
                	<div class="tableItem col-md-4 col-sm-12">
                	<h2 class="tableName">十大承载IP</h2>
                		<el-table
						:data="IPRank"
						border
						style="width: 100%">
						<el-table-column
						  type="index"
						  label="ID"
						  width="50">
						</el-table-column>
						<el-table-column
						  prop="ip"
						  label="IP地址">
						</el-table-column>
						<el-table-column
						  prop="isp"
						  label="接入商" >
						</el-table-column>
						<el-table-column
						  prop="num"
						  label="未备案网站数量"
						  width="120">
						</el-table-column>
					  </el-table>
               		 <div class="paging">
					  		<el-pagination
							  small
							  layout="prev, pager, next"
							  :total="50">
							</el-pagination>
					  </div>
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
//    name: 'statistics',
    data(){
        return{
			initialUrl:global_.globalUrl,  //决定本地还是117
			allField:'2000',
			allWebsite:'2000',
			reportWebsite:'2000',
			handled:'2000',
			companyRank:[],
			provinceRank:[],
			IPRank:[]
           }
          },
     
    components:{
        'MyHeader':require('../widgets/header.vue'),
        'MyLeftNav':require('../widgets/leftnav.vue'),
    },
    mounted (){
		//四个标签tags
		 let tagsUrl=this.initialUrl+'/api/unregister/statistics/tags'
         let _this = this
         this.$http.get(tagsUrl, {}).then(function (res) {
			    _this.allField = res.data.full_domain_num
				_this.allWebsite = res.data.website_num
				_this.reportWebsite = res.data.submitted_num
				_this.handled = res.data.handled_num        
            }).catch(function (error) {
                    console.log(error)
             })
		 //接入单位排名
		let ispUrl=this.initialUrl+'/api/unregister/statistics/isp_rank'
		this.$http.get(ispUrl, {}).then(function (res) {
			    _this.companyRank = res.data.result       
            }).catch(function (error) {
                    console.log(error)
             })
		//省份排名
		let provinceUrl = this.initialUrl + '/api/unregister/statistics/province_rank'
		this.$http.get(provinceUrl,{}).then(function(res){
			_this.provinceRank = res.data.result
		}).catch(function (error) {
                    console.log(error)
             })
		//十大承载IP
		let topIPUrl = this.initialUrl + '/api/unregister/statistics/top_ip'
		this.$http.get(topIPUrl,{}).then(function(res){
			_this.IPRank = res.data.result
		}).catch(function (error) {
                    console.log(error)
             })
		//折线图的初始化
		var statisticNumChart = echarts.init(document.getElementById('statisticNum'));
		let numChartUrl = this.initialUrl + '/api/unregister/statistics/num_of_day'
		this.$http.get(numChartUrl,{}).then(function(res){
			var dateList = res.data.result.date
			var valueList = res.data.result.num
			var numOption = {
				// Make gradient line here
				visualMap: [{
					show: false,
					type: 'continuous',
					seriesIndex: 0,
					min: 0,
					max: 400
				}],
				title: [{
					left: 'center',
					text: '每天未备案检测数量'
				}],
				tooltip: {
					trigger: 'axis'
				},
				xAxis: [{
					data: dateList
				}],
				yAxis: [{
					splitLine: {show: false}
				}],
				grid: [{
					left: '6%',
					right: '6%',
					bottom: '63'
				}], 
				dataZoom: [{
					type: 'inside',
					start: 0,
					end: 10
				}, {
					start: 0,
					end: 10,
					handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
					handleSize: '80%',
					handleStyle: {
						color: '#fff',
						shadowBlur: 3,
						shadowColor: 'rgba(0, 0, 0, 0.6)',
						shadowOffsetX: 2,
						shadowOffsetY: 2
					}
				}],
				series: [{
					type: 'line',
					showSymbol: false,
					data: valueList
				}]
			};
			statisticNumChart.setOption(numOption);
		}).catch(function (error) {
                    console.log(error)
             })
		
		//饼图的初始化
		var websiteTypeChart = echarts.init(document.getElementById('websiteType'));
		let websiteTypeUrl = this.initialUrl +'/api/unregister/statistics/website_type'
		var websiteType = []
		this.$http.get(websiteTypeUrl,{}).then(function(res){
			for(let i=0;i<res.data.result.length;i++){
				websiteType[i] = res.data.result[i].name
			}
			var websiteData = res.data.result
			var option = {
				title : {
					text: '未备案网站类型',
					subtext: '实际监测数据',
					x:'center'
				},
				tooltip : {
					trigger: 'item',
					formatter: "{a} <br/>{b} : {c} ({d}%)"
				},
				legend: {
					x :'center',
					y : 'bottom',
					data: websiteType
				},
				toolbox: {
					show : true,
					feature : {
						mark : {show: true},
						dataView : {show: true, readOnly: false},
						magicType : {
							show: true,
							type: ['pie', 'funnel']
						},
						restore : {show: true},
						saveAsImage : {show: true}
					}
				},
				calculable : true,
				series : [
					{
						name:'未备案网站类型',
						type:'pie',
						radius : ['12%', '70%'],
						center : ['50%', '50%'],
						roseType : 'radius',
						label: {
							normal: {
								show: true
							},
							emphasis: {
								show: true
							}
						},
						lableLine: {
							normal: {
								show: false
							},
							emphasis: {
								show: true
							}
						},
						data: websiteData
					}
				]
			};
            websiteTypeChart.setOption(option); 
		}).catch(function (error) {
                    console.log(error)
             })
		this.__resizeHanlder = function() {
			websiteTypeChart.resize();
			statisticNumChart.resize();
		};
		window.addEventListener('resize', this.__resizeHanlder);
    },

    methods: {

    },   
}
</script>


<style>
    .main .statisticTop{
        margin-top: 4.5rem;
        width: 100%;
        height: 5.5rem;
		margin-bottom: 1rem;
    }
    .main .statisticTop .buttonAll{
		margin: 5px 0px;;
		background:#E5E9F2;
		height: 5rem;
		width: 100%;
		border-radius: 5px;
		text-align: left;
		padding-left: 10px;
		padding-top: 0.7rem;
	}
	.main .statisticTop .buttonAll .buttonImg img{
		float: right;
		margin-top: 0.2rem;
	}
	.main .statisticTop .buttonAll h3{
		margin-top:0px;
	}
	.main .statisticChart{
        width: 100%;
        height: calc(100% - 35rem);
	}
	.main .statisticChart .chartItem{
		height: 100%;
		padding-right: 10px;
	}
	.main .statisticChart .chartItem .statisticNumChart{
		height: 100%;
		border:1px solid;
		border-color: #838B83;
		box-shadow: 3px 3px 3px rgba(50,50,50,0.3);
	}
	.main .statisticChart .chartItem .statisticTypeChart{
		height: 100%;
		border:1px solid;
		border-color: #838B83;
		box-shadow: 3px 3px 3px rgba(50,50,50,0.3);
	}
	.main .statisticTable{
		width: 100%;
		height: 24rem;
		padding-top: 1rem;
	}
	.main .statisticTable .tableItem{
		height: 100%;
	}
	.main .statisticTable .tableItem .el-table{
		font-size: 0.4rem;
	}
	.main .statisticTable .tableItem .el-table th,.main .statisticTable .tableItem .el-table td{
		height: 2.8rem;
	}
	.main .statisticTable .tableItem .el-table .cell{
		padding-left: 1rem;
		padding-right: 1rem;
		text-align: center;
	}
	.main .statisticTable .tableItem .tableName{
		text-align:left;
        font-size: 1.6rem;
        padding-left: 1.5rem;
        margin: 0.5rem 0 1rem;
        border-left: 4px solid #1F2D3D;
	}
	.main .statisticTable .tableItem .paging{
		float: right;
        margin-top: 3px;
        margin-right: -5px;
	}
</style>