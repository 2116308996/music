<template>
	<div style="width: 100%; background-color: #333333;">
		<div class="home">
			<div class="logo">
				<img src="../assets/logo.png" style="height: 100%;" alt="">
				
			</div>
			<div class="logo-name">我的音乐</div>
			<div class="home-box">
				<el-menu 
				  :default-active="activeIndex1"
				            class="el-menu-demo" 
				  		  mode="horizontal" 
				  		  
				  	      background-color="#333333"
				  	      text-color="#CCCCCC" 
				  	      active-text-color="#ffffff">
					<el-menu-item index="1" @click="$router.push('/home')">
							<div class="home-text" ref="home">
								<span class="iconfont icon-shouye"></span>
								<span>首页</span>
							</div>
					</el-menu-item>
					<el-menu-item index="2" @click="$router.push('/music')">
							<div class="home-text" ref="music">
								<span class="iconfont icon-icon-14"></span>
								<span>音乐</span>
							</div>
					</el-menu-item>
					<el-menu-item index="3" @click="$router.push('/center')">
							<div class="home-text" ref="center">
								<span class="iconfont icon-wode"></span>
								<span>我的</span>
							</div>
					</el-menu-item>
				</el-menu>
			</div>
			<div class="search">
				<van-search
				  v-model="value"
				  shape="round"
				  background="#333333"
				  placeholder="请输入搜索关键词"
				  height='60px'
				/>
			</div>
			<div class="user-login" v-show="false">
				<span>登录</span>
			</div>
			<div class="user" v-show="true">
				<el-dropdown style="height: 60px;width: 160px;">
					<div class="user-image">
					<span class="el-dropdown-link">
				      </span>
					</div>
				  <el-dropdown-menu slot="dropdown">
				    <el-dropdown-item>我的主页</el-dropdown-item>
				    <el-dropdown-item>个人设置</el-dropdown-item>
				    <el-dropdown-item>退出登录</el-dropdown-item>
				  </el-dropdown-menu>
				</el-dropdown>
			</div>
		
		</div>
		
	</div>
	
</template>

<script>
	export default {
		data() {
			return {
				activeIndex1: '1',
				value:''
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	* {
		margin: 0;
		padding: 0;
	}
    .home{
		width: 960px;
		margin: 0 auto;
		height: 60px;
		background-color: #333333;
	}
	.home>div{
		float: left;
	}
	.logo{
		width: 80px;
		height: 60px;
		background-color: #333333;
	}
	.logo-name{
		width:120px;
		height: 60px;
		font-family: Arial, Helvetica, sans-serif;
		color: white;
		font-size: 26px;
		line-height: 60px;
		background-color: #333333;
	}
	.home-box {
		width: 300px;
		margin: 0 auto;
		height: 60px;
	}
	.search{
		width: 200px;
		height: 60px;
	}
	.user{
		width: 260px;
		height: 60px;
		background-color: #333333;
	}
	.user-login{
		width: 260px;
		height: 60px;
		background-color: #333333;
		color: white;
		line-height: 60px;
		box-sizing: border-box;
		padding-left: 100px;
	}
	.user-image{
		border-radius: 50%;
		overflow: hidden;
		background-color: white;
		width: 40px;
		height: 40px;
		margin-top: 10px;
		margin-left: 100px;
		background: center top url(../../public/image/12.jpg) no-repeat;
		background-size:cover;
	}
</style>
