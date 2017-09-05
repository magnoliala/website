<template>
  <el-row>
       <el-col >
          <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" router>
          <el-menu-item index="/"><i class="el-icon-message"></i>域名</el-menu-item>
          <el-menu-item index="/company"><i class="el-icon-star-on"></i>接入商</el-menu-item>
          <el-menu-item index="/report"><i class="el-icon-circle-check"></i>上报</el-menu-item>
          <el-menu-item index="/statistics"><i class="el-icon-plus"></i>统计</el-menu-item>
          <el-menu-item index="/equipment"><i class="el-icon-date"></i>配置</el-menu-item>
        </el-menu> 
       </el-col>   
  </el-row>
</template>

<script>
  export default {

		methods: {
		  handleOpen(key, keyPath) {
			//console.log(key, keyPath);
		  },
		  handleClose(key, keyPath) {
			//console.log(key, keyPath);
		  }
		}
  }
</script>

<style>
	.allView .allbody .leftnav .el-row ul li{
		text-align: left
	}
</style>