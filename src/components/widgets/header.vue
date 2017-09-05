<template>
    <div class="navbar">
       <div class="logo"><p><img src="../../assets/window.png" alt="">互联网基础资源自动探测平台</p></div>
       <div class="link-group">
           <router-link to="/" tag="span" class="link">未备案核查</router-link>
           <router-link to="/record_check" tag="span" class="link">备案核查</router-link>
           <router-link to="/ip_check" tag="span" class="link">IP核查</router-link>
           <router-link to="/classification" tag="span" class="link">网站分类</router-link>
       </div>
       <div class="user">
            <router-link to="/" tag="span" class="link" >用户</router-link>
           <router-link to="/" tag="span" class="link">登录</router-link>
       </div>
   </div>
</template>

<style>
    .navbar{
        background: #2c3742;
        width: 100%;
        height: 4rem;
        color: aliceblue;
    }
    .logo{
        float: left;
        display: inline-block;
        margin-left: 15px;
        margin-top: 0.7rem;
        font-size: 1.8rem;
        cursor: pointer;
    }
    .logo img{
        height: 30px;
        margin-right: 10px;
    }
    .link-group{
        float:left;
        margin:13px 0 13px 50px;
        font-size: 1.3rem;
    }
      .link {
        padding: 0 20px;
        font-weight: 500;
        display: inline-block;
      }

      .link:hover {
        cursor: pointer;
        color: #4aabbc
      }

      .link-active {
        background-color: #EEEEEE;
        color: #4aabbc
      }
    .user{
        float: right;
        display: inline-block;
        margin-right: 20px;
        margin-top: 13px;
        font-size: 1.4rem;
    }
</style>