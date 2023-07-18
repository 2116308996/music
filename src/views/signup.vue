<template>
	<div>
		<loginbackground>
			<div class="form">
				<h2>注册</h2>
				<form>

					<div class="inputBox">
						<input v-model="username" type="text" placeholder="账号" />
					</div>
					<div class="inputBox">
						<input v-model="password" type="password" placeholder="密码" />
					</div>
					<div class="inputBox">
						<input type="button" @click="signup" value="注册" />
					</div>
					<p class="forget">已有账号？
						<a href="javascript:;" @click="tologin">前往登录</a>
					</p>
				</form>
			</div>
		</loginbackground>
	</div>
</template>

<script>
	import loginbackground from '../components/Loginbackground.vue'
	import http from '../router/http.js'
	export default {
		data(){
			return{
				username:'',
				password:'',
				textdata:null
			}
		},
		components: {
			loginbackground
		},
		
		methods: {
			tologin() {
				this.$router.push("/login")
			},
			signup() {
				if(this.username==''){
					this.$message({
					          message: '账号未填写',
					          type: 'error',
							  showClose:true,
					        });
					return 0;
				}
				if(this.username.length>18){
					this.$message({
					          message: '账号不符合规范',
					          type: 'error',
							  showClose:true,
					        });
					return 0;
				}
				if(this.password==''){
					this.$message({
					          message: '密码未填写',
					          type: 'error',
							  showClose:true,
					        });
					return 0;
				}
				if(this.password.length>18){
					this.$message({
					          message: '密码不符合规范',
					          type: 'error',
							  showClose:true,
					        });
					return 0;
				}
				http({
					url:'/user/select?username='+this.username,
					method:'get' 
				}).then(res=>{
					this.textdata=res.data.data
					console.log(this.textdata)
					
					if(this.textdata){
						this.$message({
						          message: '该用户已存在',
						          type: 'error',
								  showClose:true,
						        });
					}
					else{
						http({
							url:'/user/insert?username='+this.username+"&password="+this.password,
							method:'get'
						})
						this.$confirm('注册成功, 是否继前往登录?', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'success'
						}).then(() => {
							this.$router.push("/login")
							// this.$message({
							//   type: 'success',
							//   message: '删除成功!'
							// });
						}).catch(() => {
							this.$message({
								type: 'info',
								message: '已取消',
								showClose:true,
							})
						})
					}
				})
				
				
			}
		}
	}
</script>

<style>
</style>
