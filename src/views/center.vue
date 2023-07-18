<template>
	<div style="background-color: #F5F5F5;">

		<div class="center">
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
			<div class="music-img"></div>
			<div class="music">
				<div class="music-name">
					{{this.$store.state.music.name}}
				</div>
				<div style="color: #999999;">
					歌手：<span style="color: #0C73C2;">{{this.$store.state.music.singer}}</span>
				</div>
				<div class="music-bth">
					<div @click="musiclistplay" class="music-bth-one">
						<span class="iconfont icon-bofang2"></span> 播放
					</div>
					<div class="music-bth-two">
						<a :href="`/music/${this.$store.state.music.singer} - ${this.$store.state.music.name}${this.$store.state.music.type}`"
							download>
							<span class="iconfont icon-a-40-xiazai"></span> 下载
						</a>
					</div>
					<div @click="addshow()" class="music-bth-two" style="color: blue;">
						<span class="iconfont icon-jiahao1"></span>&nbsp;收藏
					</div>
				</div>
				<div class="lyc" ref='lrc'>
					<div class="lyric">
						<p class="act" :class="changeclass(index)" v-for="(item,key,index) in currentMUsicLyric"
							:key="key">
							<span>{{item}}{{scrolllrc(index)}}</span>
						</p>
					</div>
				</div>
				<p @click="ChangeHeight()" ref='expansion' class="expansion">展开</p>
				<div style="height: 300px;width: 100%;"></div>
			</div>
		</div>
	</div>

</template>

<script>
	import http from "../router/http.js"
	export default {
		data() {
			return {
				currentMUsicLyric: [],
				allkey: [],
				changeheight: false,
				addbox: false,
				list: [],
			}
		},
		mounted() {
			this.lyric()

			http({
				url: '/songmusic/select?iduser=' + this.$store.state.usermessage.iduser,
				method: 'get'
			}).then(res => {
				this.list = res.data.data
				//console.log(this.list)
			})

		},
		methods: {
			lyric(){
			  this.$store.state.isTabbarshow = true;
			  let lyricArr = this.$store.state.music.lyric.split('[').slice(1)
			  let lrcObj = {};
			  lyricArr.forEach(item => {
			  	let arr = item.split(']')
			  	let m = parseInt(arr[0].split(':')[0])
			  	let s = parseInt(arr[0].split(':')[1])
			  	arr[0] = m * 60 + s;
			  	if (arr[1] != '\n') {
			  		if (arr[1].length == 1) {} else {
			  			var brr = arr[1].split('↵')
			  			lrcObj[arr[0]] = brr[0]
			  		}
			  	}
			  })
			  this.currentMUsicLyric = lrcObj
			  //console.log(this.musiclyric)
			  
			  for (var key in this.currentMUsicLyric) {
			  	this.allkey.push(key)
			  }
			  //console.log(this.allkey)	
			},
			MusicCollect(id, singlelist) {
				// console.log(this.$store.state.music.id)
				// 	console.log(singlelist)	
				var listlength = 0;
				if (singlelist == null) {
					http({
						url: '/songmusic/insert?idsongsheet=' + id + '&idallmusic=' + this.$store.state.music.id,
						method: 'get'
					}).then(res => {
						this.addbox = false
						if (res.data == "添加成功") {

							http({
								url: '/songmusic/select?iduser=' + this.$store.state.usermessage.iduser,
								method: 'get'
							}).then(res => {
								this.list = res.data.data
								console.log(this.list)
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
					if (singlelist[i].id == this.$store.state.music.id) {
						this.$message({
							message: '重复收藏歌曲',
							type: 'success',
							showClose: true,
						});
						return 0;
					}
				}
				http({
					url: '/songmusic/insert?idsongsheet=' + id + '&idallmusic=' + this.$store.state.music.id,
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
			addshow() {
				this.addbox = true
			},
			outbox() {
				this.addbox = false

			},
			scrolllrc(index) {
				if (this.$store.state.music.name == this.$store.state.musicplayname) {
					if (this.$store.state.currentTime > this.allkey[index] && this.$store.state.currentTime < this.allkey[
							index + 1]) {
						if (index >= 4) {
							this.$refs.lrc.scrollTop = (21 * (index - 4))
						}
					}
				}
			},
			musiclistplay() {
                // let list=this.$store.state.musiclist
				this.$store.commit('musicplay')
				this.$store.commit("changeMusicplay", this.$store.state.music)
				// console.log(this.$store.state.musiclist.length)
				// for(var i=0;i<list.length;i++){
				// 	if(list[i].id==this.$store.state.music.id){
				// 		console.log(list[i].id,this.$store.state.music.id)
				// 		console.log("此歌曲重复")
				// 		return 0;
				// 	}
				// }
				
				// let sss=this.$store.state.music
				// console.log(sss)
				// list.push(sss)
				
    //             this.$store.commit("changemusiclist",list)
				// console.log(list)
				 
			},
			changeclass(index) {
				if (this.$store.state.music.name == this.$store.state.musicplayname) {
					if (this.$store.state.currentTime > this.allkey[index] && this.$store.state.currentTime < this.allkey[
							index + 1]) {
						return {
							'active': true
						}
					}
				}
			},
			ChangeHeight() {
				this.changeheight = !this.changeheight
				//console.log(this.changeheight)
				if (this.changeheight) {
					this.$refs.lrc.className = 'changeheight'
					this.$refs.expansion.innerHTML = '收起'
				} else {
					this.$refs.lrc.className = 'lyc'
					this.$refs.expansion.innerHTML = '展开'
				}
			}
		}
	}
</script>

<style scoped>
	.center {
		width: 960px;
		margin: 0 auto;
		border: 1px solid gray;
	}

	.music-img {
		width: 200px;
		height: 200px;
		background-color: yellow;
		float: left;
		margin-top: 50px;
		margin-left: 50px;
		border-radius: 50%;
		background: url(../../public/image/1.jpg) center;
		background-size: cover;
	}

	.music {
		margin-left: 300px;
		margin-top: 50px;
	}

	.music-name {
		font-size: 24px;
	}

	.music-bth {
		height: 40px;
	}

	.music-bth-one {
		color: white;
		background-color: #3967FF;

		box-shadow: 1px 1px 1px gray;

	}

	.music-bth-one:hover {
		opacity: 0.7;
	}

	.music-bth-two:hover {
		opacity: 0.7;
	}

	.music-bth>div {
		float: left;
		margin: 0 5px;
		border: 1px solid gray;
		border-radius: 5px;
	}

	.lyc {
		width: 300px;
		height: 250px;
		overflow: auto;
	}

	.changeheight {
		min-height: 250px;
		width: 300px;
	}

	.lyric>p {
		min-height: 21px;
		text-align: center;
	}

	.act {
		font-size: 12px;
	}

	.active {
		font-size: 16px;
		color: mediumvioletred;
	}

	.expansion {
		color: blue;
	}

	.expansion:hover {
		text-decoration: underline;
	}

	.lyc::-webkit-scrollbar {
		display: none;
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
