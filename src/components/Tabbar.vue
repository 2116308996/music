<template>
	<div style="width: 100%; background-color: #333333;">
		<div class="home">
			<div class="logo">
				<img src="../assets/logo.png" style="height: 100%;" alt="">
				
			</div>
			<div class="logo-name">我的音乐</div>
			<div class="home-box">
				<el-menu 
				  :default-active="$store.state.activeIndex"
				            class="el-menu-demo" 
				  		  mode="horizontal" 
				  	      background-color="#333333"
				  	      text-color="#CCCCCC" 
				  	      active-text-color="#ffffff">
					<el-menu-item index="1" @click="tohome" >
							<div class="home-text" ref="home">
								<span class="iconfont icon-shouye"></span>
								<span>首页</span>
							</div>
					</el-menu-item>
					<el-menu-item index="2" @click="tomusic">
							<div class="home-text" ref="music">
								<span class="iconfont icon-icon-14"></span>
								<span>我的</span>
							</div>
					</el-menu-item>
					<el-menu-item index="3" @click="tocenter">
							<div class="home-text" ref="center">
								<span class="iconfont icon-wode"></span>
								<span>正在播放</span>
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
				  @search='onSearch'
				/>
			</div>
			<div class="user-login" v-show="!($store.state.islogin)">
				<span @click="login">登录</span>
			</div>
			<div class="user" v-show="($store.state.islogin)">
				<el-dropdown style="height: 60px;width: 160px;">
					<div class="user-image">
					<span class="el-dropdown-link">
				      </span>
					</div>
				  <el-dropdown-menu slot="dropdown">
				    <!-- <el-dropdown-item>
						<div>我的主页</div>
					</el-dropdown-item> -->
				    <el-dropdown-item>
						<div @click="tomysetting">个人设置</div>
					</el-dropdown-item>
				    <el-dropdown-item >
						<div @click="loginout">退出登录</div>
					</el-dropdown-item>
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
				activeIndex: '1',
				value:''
			}
		},
		mounted(){
		},
		methods: {
			onSearch(){
				this.$store.commit("changeActiveIndex","1")
				this.$store.commit("changeSearchText",this.value)
				this.$router.push('search')
			},
			login(){
				this.$store.commit("changeIsTabbarshow")
				this.$router.push('/login')
			},
			loginout(){
				this.$store.commit("changeIsLogin")
			},
			tohome(){
				this.$store.commit("changeActiveIndex","1")
				this.$router.push('/home') 
			},
			tomusic(){
				this.$store.commit("changeActiveIndex","2")
				this.$router.push('/music') 
			},
			tocenter(){
				this.$store.commit("changeActiveIndex","3")
				this.$router.push('/center') 
				//document.getElementsByClassName('nav').getElementsByTagename('li').innerHTML
				
			},
			tomysetting(){
				this.$router.push('/mysetting') 
			}
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
	.user-login:hover{
		text-decoration: underline;
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
