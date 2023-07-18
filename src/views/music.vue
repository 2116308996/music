<template>
	<div class="box">
		<div class="image">
			
		</div>
		<div class="music-box">
			<span>我创建的的歌单</span>
			<el-tabs :tab-position="tabPosition" style="height: 800px;">
			    <el-tab-pane v-for="item in list" :label="item.singlename" :key="item.id">
					<ul>
						<li class="list-header">
						    <div class="list-header-one"></div>
		                    <div class="list-header-two">歌曲标题</div>
						    <div class="list-header-three">时长</div>
						    <div class="list-header-four">歌手</div>
						</li>
						<li class="listli" v-for="(data,index) in item.singlelist":key="data.id" @click="handlePlay(data)">
							<div class="list-header-one">{{index+1}}</div>
							<div class="list-header-two2">{{data.name}}&nbsp;
							</div>
							<div class="list-header-three" >
							{{data.time}}
							</div>
							<div class="list-header-five" >
								<span class="iconfont  icon-a-22-shanchu" @click.stop="delmusic(data.id,item.id)"></span>
							</div>
							<div class="list-header-four">{{data.singer}}</div>
						</li>
					</ul>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script>
	//import music from '@/util/music.js'
	import http from '../router/http.js'
	export default{
		data(){
			return{
				list:[],
				tabPosition: 'left',
			}
		},
		mounted() {
			http({
				url:'/songmusic/select?iduser='+this.$store.state.usermessage.iduser,
				method:'get'
			}).then(res=>{
				this.list=res.data.data
			})
			this.$store.state.isTabbarshow=true;
		},
		methods:{
			handlePlay(data){
				this.$store.commit("changeActiveIndex","3")
				this.$store.commit('changeMusic',data)
				this.$router.push('/center')
				
			},
			delmusic(musicid,sheetid){
				this.$confirm('是否确定删除？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'success'
				}).then(() => {
					http({
						url: '/songmusic/delete?idsongsheet='+sheetid+'&idallmusic=' + musicid,
						method: 'get'
					}).then(res => {
						if (res.data == '删除成功') {
							http({
								url:'/songmusic/select?iduser='+this.$store.state.usermessage.iduser,
								method:'get'
							}).then(res=>{
								this.list=res.data.data
							})
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
				
				return false
				
			}
		}
	}
</script>

<style scoped>
	
	.image{
		width: 100%;
		height: 960px;
		background: url(../../public/image/1.jpg) center center no-repeat;
		background-size: cover;
		opacity: 0.6;
		position: absolute;
	}
	.music-box{
		width: 960px;
		margin: 0 auto;
		position: relative;
		
	}
	.music-box ul{
		list-style: none;
		
	}
	.music-box ul li{
		height: 27px;
		width: 100%;
		font-size: 12px;
		text-align: center;
		line-height: 25px;
	}
	.list-header{
		width: 100%;
		height: 25px;
		line-height: 25px;
		background-color: #F7F7F7;
		box-shadow: 0px 0px 5px grey;
		border-top: 5px solid red;
		font-size: 16px;
	}
	.list-header>div{
		float: left;
		box-sizing: border-box;
		text-align: center;
		border: 1px solid gainsboro;
	}
	ul li>div{
		float: left;
	}
	ul li:nth-child(2n){
		background-color: #F7f7f7;
	}
	.list-header-one{
		width: 107px;
		height: 27px;
		cursor: pointer;
	}
	.list-header-two{
		width: 400px;
		height: 27px;
		cursor: pointer;
	}
	.list-header-two2{
		width: 400px;
		height: 27px;
		cursor: pointer;
	}
	.list-header-two2:hover{
		text-decoration: underline;
	}
	.list-header-three{
		width: 160px;
		height: 27px;
		cursor: pointer;
	}
	.list-header-five{
		width: 160px;
		height: 27px;
		cursor: pointer;
		display: none;
	}
	.listli:hover .list-header-three{
		display: none;
	}
	.listli:hover .list-header-five{
		display: block;
	}
	.list-header-four{
		width: 160px;
		height: 27px;
		cursor: pointer;
		overflow: hidden;
		white-space: nowrap;
		
		text-overflow: ellipsis;
	}

</style>
