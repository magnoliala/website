<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
	
/*以下是每个页面的布局css*/
	.allView{
    background: #fff;
    position: absolute;
    width: 100%;
    height: 100%;
    }
    .allbody{
        text-align: center;
        width: 100%;
        height: calc(100% - 50px);
    }
    #fixheader{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        z-index: 100;
    }
    .leftnav{
        position: fixed;
        left: 0;
        top: 4rem;
        width: 150px;
        height: 100%;
        background: #e4e8f1;
    }
    .main{
        margin-left: 160px;
        height: 100%;
		padding-right: 10px;
    }
	.div-inline{
        display: inline-block;
    }

</style>
