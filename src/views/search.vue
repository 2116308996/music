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
		<div class="search">

			<div class="sch">
				<input class="sch-input" type="text" v-model="value" @keydown="key_search($event)">
				<button class="sch-button" @click="onSearch">
					<span class="iconfont icon-sousuo" style="height: 40px;"></span>
				</button>
			</div>

			<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
				<el-tab-pane label="单曲" name="first">
					<div>
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
				</el-tab-pane>
				<el-tab-pane label="歌单" name="second">
					<ul>
						<li class="list-header">
							<div class="list-header-one"></div>
							<div class="list-header-six">歌单标题</div>
							<div class="list-header-seven">歌曲量</div>
						</li>
						<li v-for="(item,index) in songsheetall":key="item.idsongsheet" @click="tomusicsheet(item.idsongsheet)">
							<div class="list-header-one">{{index+1}}</div>
							<div class="list-header-six2">{{item.songsheetname}}</div>
							<div class="list-header-seven">{{item.length}}</div>
						</li>
					</ul>
				</el-tab-pane>
				<!-- <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
            			    <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane> -->
			</el-tabs>


			
		</div>
	</div>
</template>

<script>
	import {
		Toast
	} from 'vant'
	import http from '../router/http.js'
	//	import music from '@/util/allmusic.js'
	import axios from 'axios'

	export default {
		data() {
			return {
				value: this.$store.state.searchtext,
				musiclist: [],
				newlist: [],
				addbox: false,
				list: [],
				musicid: '',
				activeName: 'first',
				songsheetalllist:[],
				songsheetall:[],
				lengths:0
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

			http({
				url: '/allmusic',
				method: 'get'
			}).then(res => {
				this.musiclist = res.data.data
				this.onSearch()
			})
			
			http({
				url: '/songsheet/selectall',
				method: 'get'
			}).then(res => {
				this.songsheetalllist = res.data.data
				
				this.onSearch()
			})
			

		},
		methods: {
			tomusicsheet(id){
				this.$store.commit("changeActiveIndex", "1")
				this.$store.commit('changeMusicSheetId', id)
				this.$router.push("/musicsheet")
			},

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
			handleClick(tab, event) {
				// console.log(tab, event);
			},
			key_search(event) {
				if (event.keyCode == 13) {
					this.onSearch();
				}
			},
			onSearch() {
				
				this.$store.commit("changeSearchText",this.value)
				Toast.loading({
					message: '加载中...',
					forbidClick: true,
					duration: 0
				});
				setTimeout(() => {
					Toast.clear()
				}, 300)
				
				this.newlist = this.musiclist.filter(item => item.name.toUpperCase().includes(this.value.toUpperCase()));
                this.songsheetall = this.songsheetalllist.filter(item => item.songsheetname.toUpperCase().includes(this.value.toUpperCase()));
               
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
	.search {
		width: 960px;
		margin: 0 auto;
		border: 1px solid gray;
		height: 800px;
	}

	.sch {
		width: 400px;
		height: 44px;
		margin: 0 auto;
		margin-top: 50px;
	}

	.sch-input {
		display: inline-block;
		width: 350px;
		height: 40px;
		border-radius: 5px 0px 0px 5px;
		float: left;

	}

	.sch-button {
		height: 44px;
		width: 44px;
		border-radius: 0px 5px 5px 0px;
		border-left: none;
	}

	.sch .iconfont {
		font-size: 30px;
	}

	.list-header {
		width: 827px;
		height: 25px;
		line-height: 25px;
		background-color: #F7F7F7;
		box-shadow: 0px 0px 5px grey;
		border-top: 5px solid red;
		font-size: 16px;

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
