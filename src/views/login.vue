<template>
	<div>
	    <loginbackground>
			<div class="form">
				<h2>登录</h2>
				<form>
					<div class="inputBox">
						<input v-model="data.username"type="text" placeholder="账号"/>
					</div>
					<div class="inputBox">
						<input v-model="data.password"type="password" placeholder="密码"/>
					</div>
					<div class="inputBox">
						 <input v-model="data.code" type="text" placeholder="验证码" />
						 <img :src="test.base64Img" @click="getcaptcha" style="float: right;border-radius: 20px;"/>
					</div>
					<div class="inputBox">
						<input type="button" @click="login" value="登录"/>
						
						<input type="button" @click="loginout" value="返回" style="float: right;"/>
					</div>
					<!-- <p class="forget">忘记密码？
					    <a href="#">点击这里</a>
					</p> -->
					<p class="forget">没有账号？
					    <a href="javascript:;" @click="signup">点击注册</a>
					</p>
				</form>
			</div> 
		</loginbackground>
						
	</div>
</template>

<script>
	import loginbackground from '../components/Loginbackground.vue'
	
	//import axios from 'axios'
	import http from '../router/http.js'
	import qs from 'qs'
	export default{
		data(){
			return{
				data:{
					username:'',
				    password:'',
				    code:'',
					token:''
				},
				test:[],
				textdata:[]
			}
		},
		components: {
			loginbackground
		},
		mounted(){
		    this.captcha()	
		},
		methods:{
			login(){
				http({
					url:'/user/select?username='+this.data.username+'&password='+this.data.password,
					method:'get' 
				}).then(res=>{
					this.textdata=res.data.data
					
					//console.log(this.textdata)
					
					if(this.data.code!=this.test.code){
						this.$message({
						          message: '验证码错误',
						          type: 'error',
								  showClose:true,
						        });
						this.captcha()	
						return 0;
					}else if(this.textdata==null){
						
							this.$message({
							          message: '账号或密码错误',
							          type: 'error',
									  showClose:true,
							        });
							return 0;
						
					}	else if(this.textdata.password==this.data.password){
						this.$store.commit("changeUserMessage",this.textdata)
						this.$store.commit("changeActiveIndex","1")
						this.$store.commit("changeIsLogin")
						this.$store.commit("changeIsTabbarshow")
						
						this.$message({
						          message: '登录成功',
						          type: 'success',
								  showClose:true,
						        });
						this.$router.push("/home")
					}else{
						this.$message({
						          message: '账号或密码错误',
						          type: 'error',
								  showClose:true,
						        });
					}
					
				})
				
				
				
				
				
			},
			loginout(){
				this.$store.commit("changeActiveIndex","1")
				this.$store.commit("changeIsTabbarshow")
				this.$router.push("/home")
			},
			signup(){
				this.$router.push("/signup")
			},
			captcha(){
				// axios.get('http://localhost:8081/captcha').then(res=>{
				// 	this.test=res.data.data
				// })
				
				http({
					url:'/captcha',
					method:'get'
				}).then(res=>{
					this.test=res.data.data
					this.data.token=this.test.token
				})
				//console.log(this.test.base64Img)
			},
			getcaptcha(){
				http({
					url:'/captcha',
					method:'get'
				}).then(res=>{
					this.test=res.data.data
					this.data.token=this.test.token
					this.data.code=''
				})
			}
		}
	}
</script>

<style scoped>
	.form .inputBox input[placeholder="验证码"]{
		width: 150px;
	}
</style>
