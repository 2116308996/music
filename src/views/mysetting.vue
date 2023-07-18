<template>
	<div>
		<div class="addsongsheet" v-show="addbox">
			<div class="addbox-one">新建歌单
			<div style="float: right;width: 50px;margin-right: 20px;cursor: pointer;">
				<span class="iconfont icon-a-43-guanbi" @click="outbox"></span>
			</div>
			<div style="color: #333;font-size: 12px;margin-top: 40px;margin-bottom: 5px;">
				歌单:&nbsp;&nbsp;<input type="text" v-model="testsongsheetname" style="width: 300px;height: 30px;border: gainsboro 1px solid;"/>
			</div>
			<div>
				<button class="addbox-two" @click="addsongsheet">确认</button>
			    <button class="addbox-three" @click="outbox">取消</button>
			</div>
			</div>
		</div>
		<div class="addsongsheet" v-show="updatebox">
			<div class="addbox-one">编辑歌单
			<div style="float: right;width: 50px;margin-right: 20px;cursor: pointer;">
				<span class="iconfont icon-a-43-guanbi" @click="outbox"></span>
			</div>
			<div style="color: #333;font-size: 12px;margin-top: 40px;margin-bottom: 5px;">
				歌单:&nbsp;&nbsp;<input type="text" v-model="testsongsheetname" style="width: 300px;height: 30px;border: gainsboro 1px solid;"/>
			</div>
			<div>
				<button class="addbox-two" @click="updatesongsheet">确认</button>
			    <button class="addbox-three" @click="outbox">取消</button>
			</div>
			</div>
		</div>
		<div class="box">
			<div>
				<p class="p1">个人设置</p>
			</div>
			
			<template>
				<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
					<el-tab-pane label="基本设置" name="first">
						<div class="backimg"></div>
						<div class="myinput">
							<div>昵称：<input type="text" v-model="textdata.name"
									:placeholder="$store.state.usermessage.name"></div>
							<div>性别：
								<input type="radio" v-model="textdata.sex" name="a1" id="b1" value="男" ref="b1" />
								<label for="b1" style="margin-right: 50px;">男</label>
								<input type="radio" v-model="textdata.sex" name="a1" id="b2" value="女" ref="b2" />
								<label for="b2">女</label><br>
							</div>
							<div>年龄：<input type="text" v-model="textdata.age"
									:placeholder="$store.state.usermessage.age"></div>

							<div><button type="button" class="mybutton" @click="save">保存</button></div>
						</div>
					</el-tab-pane>
					<el-tab-pane label="歌单管理" name="second">
						<div>
							<div style="font-size: 20px;line-height: 28px;">我创建的歌单
							    <span class="iconfont icon-jiahao1 iconfonthover"style="font-size: 20px;"@click="addshow"></span>
							</div>
							<div style="width: 100%;height: 2px;background-color: red;"></div>
							<div class="songsheet">
								<li v-for="item in mysongsheet" :key="item.idsongsheet">
									<div style="width: 300px;float: left;text-align: center;">{{item.songsheetname}}
									</div>
									<span class="iconfont icon_edit icon-icon-5 iconfonthover" @click="updateshow(item.idsongsheet,item.songsheetname)"></span>
									&nbsp;
									<span class="iconfont  icon-a-22-shanchu iconfonthover"
										@click="delsongsheet(item.idsongsheet)"></span>
									
								</li>
							</div>
						</div>
					</el-tab-pane>
					<!-- <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
			    <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane> -->
				</el-tabs>
			</template>
		</div>
	</div>
</template>

<script>
	import http from "../router/http.js"
	export default {
		data() {
			return {
				activeName: 'first',
				textdata: this.$store.state.usermessage,
				mysongsheet: [],
				addbox:false,
				updatebox:false,
				testsongsheetname:'',
				idsongsheet:'',
			};
		},
		mounted() {
			this.getsongsheet()
			if (this.$store.state.usermessage.sex == "男") {
				this.$refs.b1.checked = "checked"
			} else {
				this.$refs.b2.checked = "checked"
			}
		},
		methods: {
			addshow(){
				this.addbox=true
				this.testsongsheetname=''
			},
			outbox(){
				this.addbox=false
				this.updatebox=false
			},
			updateshow(idsongsheet,songsheetname){
				this.idsongsheet=idsongsheet
				this.testsongsheetname=songsheetname
				this.updatebox=true
			},
			addsongsheet(){
				if(this.testsongsheetname!=''){
					http({
						url:'/songsheet/insert?iduser='+this.$store.state.usermessage.iduser+'&songsheetname='+this.testsongsheetname,
						method:'get'
					}).then(res=>{
						if(res.data=='添加成功'){
							this.getsongsheet()
							this.addbox=false
						}
					})
				}
			},
			updatesongsheet(){
				if(this.testsongsheetname!=''){
					http({
						url:'/songsheet/update?idsongsheet='+this.idsongsheet+'&songsheetname='+this.testsongsheetname,
						method:'get'
					}).then(res=>{
						if(res.data=='修改成功'){
							this.getsongsheet()
							this.updatebox=false
						}
					})
				}
			},
			getsongsheet() {
				http({
					url: '/songsheet/select?iduser=' + this.$store.state.usermessage.iduser,
					method: 'get'
				}).then(res => {
					this.mysongsheet = res.data.data
				})
			},
			handleClick(tab, event) {
				// console.log(tab, event);
			},
			save() {
				// console.log(this.textdata)
				if(this.textdata.name.length>18){
					this.$message({
						message: '昵称不符合规范',
						type: 'error',
						showClose: true,
					});
					return 0;
				}
				if(this.textdata.age>200||this.textdata.age<0){
					this.$message({
						message: '年龄不符合规范',
						type: 'error',
						showClose: true,
					});
					return 0;
				}
				var reg=/^[0-9]*$/;
				if(!reg.test(this.textdata.age)){
					this.$message({
						message: '请输入数字',
						type: 'error',
						showClose: true,
					});
					return 0;
				}
				http({
					url: '/user/update?username=' + this.textdata.account + "&name=" + this.textdata.name +
						"&sex=" + this.textdata.sex + "&age=" + this.textdata.age,
					method: 'get'
				}).then(res => {
					if (res.data == "修改成功") {
						this.$message({
							message: '保存成功',
							type: 'success',
							showClose: true,
						});
					} else {
						this.$message({
							message: '保存失败',
							type: 'error',
							showClose: true,
						});
					}

				})

			},
			delsongsheet(idsongsheet) {
				this.$confirm('是否确定删除？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'success'
				}).then(() => {
					http({
						url: '/songsheet/del?idsongsheet=' + idsongsheet,
						method: 'get'
					}).then(res => {
						if (res.data == '删除成功') {
							this.getsongsheet();
							this.$message({
								message: '删除成功',
								type: 'success',
								showClose: true,
							});
						} else {
							this.$message({
								message: '删除失败',
								type: 'error',
								showClose: true,
							});
						}
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消',
						showClose: true,
					})
				})


			}
		}
	};
</script>

<style scoped>
	* {
		padding: 0;
		margin: 0 auto;
	}
    html,body{
		height: 100%;
	}
	.box {
		width: 960px;
		margin: 0 auto;
		position: relative;
		min-height: 100%;
	}
    .addsongsheet{
		width: 400px;
		height: 200px;
		background-color: #fff;
		position: absolute;
		transform: translate(-50%,-50%);
		left:50%;
		top:50%;
		z-index: 10;
		border-radius: 5px;
		border: gainsboro 1px solid;
		box-shadow: 0px 5px 5px gray;
		opacity: 1;
	}
	.addbox-one{
		width: 100%;
		height: 40px;
		line-height: 40px;
		color: #fff;
		background-color: #2d2d2d;
		text-indent: 2rem;
		border-radius:5px 5px 0 0;
	}
	.addbox-two{
		font-size: 12px;
		height: 30px;
		line-height:30px;
		width: 60px;
		background-color: #3967FF;
		border: 1px  solid gainsboro;
		margin-left: 34px;
	}
	.addbox-two:hover{
		opacity: 0.6;
	}
	.addbox-three:hover{
		opacity: 0.6;
	}
	.addbox-three{
		font-size: 12px;
		height: 30px;
		line-height:30px;
		width: 60px;
		background-color: #ffffff;
		color: black;
		border: 1px  solid gainsboro;
		margin-left: 34px;
	}
	.p1 {
		margin-top: 20px;
		font-size: 24px;
	}

	.el-tabs {
		border-top: red solid 2px;
	}

	.myinput {
		position: relative;
	}

	.myinput input {
		margin-top: 10px;
	}

	.mybutton {
		background-color: royalblue;
		color: white;
		width: 80px;
		height: 30px;
		border-radius: 3px;
		border: gainsboro solid 1px;
		margin-top: 50px;
	}

	.mybutton:hover {
		opacity: 0.8;
	}

	.backimg {
		width: 200px;
		height: 200px;
		overflow: hidden;
		background: url(../../public/image/12.jpg)top center no-repeat;
		background-size: cover;
		float: right;
		margin-right: 500px;
	}

	.songsheet li {
		list-style: none;
		line-height: 30px;
		font-size: 16px;
	}

	.songsheet li:nth-child(2n) {
		background-color: #F7F7F7;
	}

	.iconfont {
		opacity: 0.6;
	}

	.iconfonthover:hover {
		opacity: 1;
	}
</style>
