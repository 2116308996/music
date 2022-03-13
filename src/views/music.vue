<template>
	<div class="music-box">
		<div>
			<span>我创建的的歌单</span>
			<el-tabs :tab-position="tabPosition" style="height: 800px;">
			    <el-tab-pane label="我喜欢的音乐">
					<ul>
						<li class="list-header">
						    <div class="list-header-one"></div>
		                    <div class="list-header-two">歌曲标题</div>
						    <div class="list-header-three">时长</div>
						    <div class="list-header-four">歌手</div>
						</li>
						<li v-for="data in musiclist":key="data.id" @click="handlePlay(data)">
							<div class="list-header-one">{{data.id}}</div>
							<div class="list-header-two">{{data.name}}</div>
							<div class="list-header-three">{{data.time}}</div>
							<div class="list-header-four">{{data.singer}}</div>
						</li>
					</ul>
				</el-tab-pane>
			    <el-tab-pane label="配置管理">配置管理</el-tab-pane>
			    <el-tab-pane label="角色管理">角色管理</el-tab-pane>
			    <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script>
	import music from '@/util/music.js'
	export default{
		data(){
			return{
				musiclist:[],
				tabPosition: 'left'
			}
		},
		mounted() {
			this.musiclist=music
			console.log(this.musiclist)
		},
		methods:{
			handlePlay(data){
				this.$store.commit('changeMusic',data)
				this.$router.push({
					name:'musicplay',
					params:{
						id:data.id
					},
				})
			}
		}
	}
</script>

<style scoped>
	.music-box{
		width: 960px;
		margin: 0 auto;
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
	}
	.list-header-two{
		width: 400px;
		height: 27px;
	}
	.list-header-three{
		width: 160px;
		height: 27px;
	}
	.list-header-four{
		width: 160px;
		height: 27px;
	}
</style>
