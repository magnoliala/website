<template>
 <div class="allView">
    <div id="fixheader">
       <MyHeader></MyHeader>
    </div>
     <div class="allbody">
         <div class="leftnav">
			  <el-row>
			   <el-col >
				  <el-menu default-active="1" class="el-menu-vertical-demo" router>
				  <el-menu-item index="/"><i class="el-icon-message"></i>按行业分类</el-menu-item>
				  <el-menu-item index="2"><i class="el-icon-star-on"></i>按主题分类</el-menu-item>
				  <el-menu-item index="3"><i class="el-icon-plus"></i>统计</el-menu-item>
				  <el-menu-item index="4"><i class="el-icon-date"></i>设置</el-menu-item>
				</el-menu> 
			   </el-col>   
		 	 </el-row>  
         </div>
         <div class="main">
         	<div class="mainTop">
         		<div class="mainTitle div-inline">
         			<p>搜索</p>
         			<div class="mainSearch div-inline">
                      <el-input
                         placeholder="精确搜索"
                         icon="search"
                         v-model="inputSearch"
                        :on-icon-click="handleIconClick">
                      </el-input>
                      <common-select class="select" :options="allProvince" v-on:input="showSelectProvince"></common-select>
                       <common-select class="select" :options="allIndustry" v-on:input="showSelectIndustry"></common-select> 
                        <el-button type="primary" icon="search" @click="classfiSearch"></el-button> 
                    </div>
         		</div>
         	</div>       
            <div class="mainCenter">
            	<div id="chart"></div>
            </div>
            <div class="classfiTable">
            	<el-table
                        :data="classfiData"
                        border
                        style="width: 100%">
                        <el-table-column
                            prop="ztid"
                            label="主体ID"
                            width="130">
                          </el-table-column>
                          <el-table-column
                            label="域名"
                            width="200">
                            <template scope="scope">
								<span v-html="scope.row.domain"></span>
							</template>
                          </el-table-column>
                         <el-table-column
                            prop="name"
                            label="企业名称"
                            width="260">
                          </el-table-column>
                          <el-table-column
                           prop="category"
                            label="企业类别"
                            width="180">
                          </el-table-column>
                          <el-table-column
                            label="备案信息"
                            width="240">
                            <template scope="scope">
								<span v-html="scope.row.register"></span>
							</template>
                          </el-table-column>
                          <el-table-column
                            prop="province"
                            label="省份"
                            width="180">
                          </el-table-column>
                          <el-table-column
                            prop="city"
                            label="城市"
                            width="180">
                          </el-table-column>
                          <el-table-column
                            prop="country"
                            label="区县"
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

export default{
	data(){
		return{
			initialUrl:global_.globalUrl,  //决定本地还是117
			inputSearch: '',
			currentPage:1,
            pageSize:5,
            totalPage:200,
			selectProvince:'',
			selectIndustry:'',
			allProvince:[], //省份
			allIndustry:[], //行业
			classfiData: [], //显示在页面表格上的数据
		}
	},
	components:{
        'MyHeader':require('../widgets/header.vue'),
		'common-select':require('../widgets/select.vue')
    },
	mounted(){
        let url=this.initialUrl+'/api/provinces'
        let industryUrl=this.initialUrl+'/api/categories'
        let defaultUrl=this.initialUrl+'/api/sitelist'
        let histogramUrl=this.initialUrl+'/api/categorynum'
        let _this = this
		//省市下拉框
         this.$http.get(url, {}).then(function (res) {
                var myTableData=[]
                for (let i = 0; i < res.data.length; i++) { 
					let obj = {}
                    obj.text = res.data[i]
					obj.value = res.data[i]
                    myTableData[i] = obj
                }
                _this.allProvince = myTableData
            }).catch(function (error) {
                    console.log(error)
             })
		 //行业下拉框
		 this.$http.get(industryUrl, {}).then(function (res) {
                var myTableData=[]
                for (let i = 0; i < res.data.length; i++) { 
					let obj = {}
                    obj.text = res.data[i]
					obj.value = i
                    myTableData[i] = obj
                }
                _this.allIndustry = myTableData
            }).catch(function (error) {
                    console.log(error)
             })
		//初始数据的渲染
		this.$http.get(defaultUrl, {}).then(function (res) {
               let myTableData=[]
                for (let i = 0; i < res.data.result.length; i++) {              
					let obj = []
					obj.province=res.data.result[i].province
                    obj.city=res.data.result[i].city
					//为了换行，用html的方式插入的，在写html的时候记得用v-html=“”
					//注意有可能domain和register为空，直接用replace会报错
					if(res.data.result[i].domain === null){
						obj.register = null
					}else{
					obj.domain=res.data.result[i].domain.replace(/,/g,'<br>')
					}
					obj.name=res.data.result[i].name
					obj.country=res.data.result[i].country
					obj.ztid=res.data.result[i].ztid
					if(res.data.result[i].register === null){
						obj.register = null
					}else{
						obj.register=res.data.result[i].register.replace(/,/g,'<br>');
					}
					obj.category=res.data.result[i].category
//					console.log(obj.register)
                    myTableData[i] = obj
                }
                _this.classfiData = myTableData
				_this.totalPage = res.data.result_num
				_this.pageSize = res.data.result.length
            }).catch(function (error) {
                    console.log(error)
             }) 
		//echarts图的渲染
		var chartName = []
		var chartData = []
		var myChart = echarts.init(document.getElementById('chart'));
		this.$http.get(histogramUrl, {}).then(function (res) {
			for(let i = 0;i<res.data.length;i++){
				chartName[i]=res.data[i][0]
				chartData[i]=res.data[i][1]
			}
			var option={
					title: {
					  text: '网站分类数量统计',
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
					  data: ['网站分类数量统计']
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
					  name: '网站分类数量统计',
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
					  data: chartData
					}]
			}
			myChart.setOption(option)
		})
		this.__resizeHanlder = function() {
                myChart.resize();
            };
        window.addEventListener('resize', this.__resizeHanlder);
	},
	methods:{
		//搜索框事件
		handleIconClick(ev){
			alert("此功能暂时合并在下拉菜单框旁边的搜索按钮上，如需修改，再商量咯~")
			
		},
		handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
          },
		//页码跳转
        handleCurrentChange(val) {
//            console.log(`当前页: ${val}`);
			this.currentPage=val;
            let _this = this
            let url=this.initialUrl+'/api/sitelist'
            this.$http.get(url, {params:{query:_this.inputSearch,page:val,province:_this.selectProvince,category:_this.selectIndustry}}).then(function (res) {
                let myTableData=[]
                for (let i = 0; i < res.data.result.length; i++) {              
					let obj = []
					obj.province=res.data.result[i].province
                    obj.city=res.data.result[i].city
					//为了换行，用html的方式插入的，在写html的时候记得用v-html=“”
					if(res.data.result[i].domain === null){
						obj.register = null
					}else{
					obj.domain=res.data.result[i].domain.replace(/,/g,'<br>')
					}
					obj.name=res.data.result[i].name
					obj.country=res.data.result[i].country
					obj.ztid=res.data.result[i].ztid
					if(res.data.result[i].register === null){
						obj.register = null
					}else{
						obj.register=res.data.result[i].register.replace(/,/g,'<br>');
					}
					obj.category=res.data.result[i].category
//					console.log(obj.register)
                    myTableData[i] = obj
                }
                _this.classfiData = myTableData
				
                //console.log(_this.statisticsData)
            }).catch(function (error) {
                    console.log(error)
             })
		},
		//获取选中的省份
		showSelectProvince(data){
			this.selectProvince = data;
//			console.log(this.selectProvince)
		},
		//获取选中的行业类别
		showSelectIndustry(data){
			this.selectIndustry = data;
//			console.log(this.selectIndustry)
		},
		//搜索按钮
		classfiSearch(){
            let url=this.initialUrl+'/api/sitelist'
			let _this=this
			this.$http.get(url, {params:{query:_this.inputSearch,page:'1',province:_this.selectProvince,category:_this.selectIndustry}}).then(function (res) {
				console.log(_this.currentPage)
                if(res.data.result.length === _this.totalPage && res.data.result[0] === null){
                    _this.tableData=[]
                }else{
                    //记得把数据传到一个数组中再传递给tableData
                    let myTableData=[]
                    for (var i = 0; i < res.data.result.length; i++) {             
                        let obj = []
						obj.province=res.data.result[i].province
						obj.city=res.data.result[i].city
						//为了换行，用html的方式插入的，在写html的时候记得用v-html=“”
						if(res.data.result[i].domain === null){
							obj.register = null
						}else{
						obj.domain=res.data.result[i].domain.replace(/,/g,'<br>')
						}
						obj.name=res.data.result[i].name
						obj.country=res.data.result[i].country
						obj.ztid=res.data.result[i].ztid
						if(res.data.result[i].register === null){
							obj.register = null
						}else{
							obj.register=res.data.result[i].register.replace(/,/g,'<br>');
						}
						obj.category=res.data.result[i].category
						console.log(obj.register)
						myTableData[i] = obj
                    }
                    _this.classfiData = myTableData 
					//搜索之后总数会变
					_this.totalPage = res.data.result_num
					_this.pageSize = res.data.result.length
                }
            }).catch(function (error) {
                console.log(error);
             })
		},
	}
}
</script>

<style>
	.allView .allbody .leftnav .el-row ul li{
		text-align: left
	}
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
	.main .mainTop .mainTitle .mainSearch .select{
		float:left;
	 	margin-left:10px;
	}
    .main .mainTop .mainTitle .mainSearch .el-input{
        width: 250px;
		float: left;
    }
	.main .mainTop .mainTitle .mainSearch .el-button{
		margin-left: 10px;
    }
	.main .mainCenter{
		margin: 30px 20px 10px 10px;
		width: calc(100% - 40px);
		height: 300px;
		border:1px solid;
		border-color: #838B83;
		box-shadow: 3px 3px 3px rgba(50,50,50,0.3);
	}
	#chart{
		width: 100%;
		height: 100%;
	}
	.main .classfiTable{
        margin: 30px 20px 10px 10px;
    }
	.main .classfiTable td{
		text-align: left;
	}
    .main .classfiTable .paging{
        float: right;
        margin-top: 10px;
        margin-right: -5px;
    }
</style>