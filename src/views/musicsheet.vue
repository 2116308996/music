<template>
	<div>
		<div class="addsongsheet" v-show="addbox">
			<div class="addbox-one">添加到歌单
				<div style="float: right;width: 50px;margin-right: 20px;cursor: pointer;">
					<span class="iconfont icon-a-43-guanbi" @click="outbox"></span>
				</div>
			</div>
			<div>
				<ul>
					<li v-for="(item,index) in list" @click="MusicCollect(item.id,item.singlelist)" :key="item.id">
						<p>{{item.singlename}}&nbsp;{{item.length}}首</p>
					</li>
				</ul>
			</div>
		
		</div>
		<div class="musicsheet">
			<div>
				<ul>
					<li class="list-header">
						<div class="list-header-one"></div>
						<div class="list-header-two">歌曲标题</div>
						<div class="list-header-three">时长</div>
					 <div class="list-header-four">歌手</div>
					</li>
					<li class="listli" v-for="(data,index) in newlist" :key="data.id" @click="handlePlay(data)">
						<div class="list-header-one">{{index+1}}</div>
						<div class="list-header-two2">{{data.name}}</div>
						<div class="list-header-three">
							{{data.time}}
						</div>
						<div class="list-header-five">
							<span class="iconfont icon-jiahao1" @click.stop="addshow(data.id)"></span>
						</div>
						<div class="list-header-four" :title="data.singer">{{data.singer}}</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import http from '../router/http.js'
	export default{
		data(){
			return{
				newlist:[],
				addbox: false,
				list: [],
				musicid: '',
			}
		},
		mounted() {
			
			http({
				url: '/songmusic/select?iduser=' + this.$store.state.usermessage.iduser,
				method: 'get'
			}).then(res => {
				this.list = res.data.data
				//console.log(this.list)
			})
			
			//console.log(this.$store.state.musicsheetid)
			http({
				url: '/songmusic/select/idsongsheet?idsongsheet=' + this.$store.state.musicsheetid,
				method: 'get'
			}).then(res => {
				this.newlist = res.data.data
				//console.log(this.list)
			})
		},
		methods:{
			MusicCollect(id, singlelist) {
				// console.log(this.$store.state.music.id)
				// 	console.log(singlelist)	
				var listlength = 0;
				if (singlelist == null) {
					http({
						url: '/songmusic/insert?idsongsheet=' + id + '&idallmusic=' + this
							.$store.state.music.id,
						method: 'get'
					}).then(res => {
						this.addbox = false
						if (res.data == "添加成功") {
			
							http({
								url: '/songmusic/select?iduser=' + this.$store.state.usermessage.iduser,
								method: 'get'
							}).then(res => {
								this.list = res.data.data
								//console.log(this.list)
							})
			
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
					return 0;
				}
			
				for (var i = 0; i < singlelist.length; i++) {
					if (singlelist[i].id == this.musicid) {
						this.$message({
							message: '重复收藏歌曲',
							type: 'success',
							showClose: true,
						});
						return 0;
					}
				}
				http({
					url: '/songmusic/insert?idsongsheet=' + id + '&idallmusic=' + this
						.musicid,
					method: 'get'
				}).then(res => {
					this.addbox = false
					if (res.data == "添加成功") {
			
						http({
							url: '/songmusic/select?iduser=' + this.$store.state.usermessage.iduser,
							method: 'get'
						}).then(res => {
							this.list = res.data.data
							//console.log(this.list)
						})
			
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
			outbox() {
				this.addbox = false
			
			},
			addshow(id) {
				this.addbox = true
				this.musicid = id
				console.log(id)
			},
			handlePlay(data) {
				this.$store.commit("changeActiveIndex", "3")
				this.$store.commit('changeMusic', data)
				this.$router.push('/center')
			
			},
		}
	}
</script>

<style scoped>
	.list-header {
		width: 827px;
		height: 25px;
		line-height: 25px;
		background-color: #F7F7F7;
		box-shadow: 0px 0px 5px grey;
		border-top: 5px solid red;
		font-size: 16px;
	    margin-top: 50px;
	}
	
	.list-header>div {
		float: left;
		box-sizing: border-box;
		text-align: center;
		border: 1px solid gainsboro;
	}
	ul {
		width: 827px;
		margin: 0 auto;
	}
	
	ul li {
		width: 827px;
		height: 27px;
		line-height: 25px;
	
	}
	
	ul li>div {
		float: left;
		text-align: center;
	}
	
	ul>li:nth-child(2n) {
		background-color: #F7f7f7;
	}
	
	.list-header-one {
		width: 107px;
		height: 27px;
		cursor: pointer;
	}
	
	.list-header-two {
		width: 400px;
		height: 27px;
		cursor: pointer;
	}
	
	.list-header-two2 {
		width: 400px;
		height: 27px;
		cursor: pointer;
	}
	
	.list-header-two2:hover {
		text-decoration: underline;
	}
	
	.list-header-three {
		width: 160px;
		height: 27px;
		cursor: pointer;
	}
	
	.list-header-five {
		width: 160px;
		height: 27px;
		cursor: pointer;
		display: none;
	}
	.list-header-six{
		width: 500px;
		height: 27px;
		cursor: pointer;
	}
	.list-header-six2{
		width: 500px;
		height: 27px;
		cursor: pointer;
	}
	.list-header-six2:hover{
		text-decoration: underline;
	}
	.list-header-seven{
		width: 220px;
		height: 27px;
		cursor: pointer;
	}
	.listli:hover .list-header-three {
		display: none;
	}
	
	.listli:hover .list-header-five {
		display: block;
	}
	
	.list-header-four {
		width: 160px;
		height: 27px;
		cursor: pointer;
		overflow: hidden;
		white-space: nowrap;
	
		text-overflow: ellipsis;
	}
	.addsongsheet {
		width: 400px;
		min-height: 200px;
		background-color: #fff;
		position: absolute;
		transform: translate(-50%, -50%);
		left: 50%;
		top: 50%;
		z-index: 10;
		border-radius: 5px;
		border: gainsboro 1px solid;
		box-shadow: 0px 5px 5px gray;
		opacity: 1;
	}
	
	.addbox-one {
		width: 100%;
		height: 40px;
		line-height: 40px;
		color: #fff;
		background-color: #2d2d2d;
		text-indent: 2rem;
		border-radius: 5px 5px 0 0;
	}
	
	.addsongsheet ul li {
		width: 400px;
		height: 40px;
		border-bottom: 1px darkgray solid;
		line-height: 40px;
		text-indent: 2rem;
	}
	
	.addsongsheet ul li:hover {
		background-color: darkgray;
	}
</style>
