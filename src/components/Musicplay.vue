<template>
	<div class="musicplay">
		<div class="box">
			<div><div ref="imagemove" class="back" @click="gomusic"></div></div>
			<audio :src="handlesrc()" controls autoplay :loop="loop" class="audio-fixed" ref="player">
				当前浏览器不支持audio
			</audio> 
			<p style="position:absolute; bottom:100px;" v-show="false">{{currentTime}}</p>
			<!-- <div class="index" @click="change(index)">{{index}}</div> -->
			<!-- <div class="index2" @click="changemusicplayshowtrue">播放列表</div> -->
		</div>
		<div class="playlist" v-if="musicplayshow">
		    <div class="tabber">
				<div style="width: 100px;text-align: center;" >播放列表</div>
				<div style="width: 200px;height: 40px;text-align: right; cursor: pointer;" @click="delmusclist">清除</div>
				<div><p class="iconfont icon-a-22-shanchu" style="cursor: pointer;"></p></div>
				<div style="float: right;width: 30px;cursor: pointer;" @click="changemusicplayshowfalse"><p class="iconfont icon-a-43-guanbi"></p></div>
			</div>
			<div class="musiclist">
				<ul>
					<li v-for="data in $store.state.musiclist" :key="data.id" @click="tomusic(data)">
						<div>{{data.name}}</div>
						<div>{{data.singer}}</div>
						<div>{{data.time}}</div>
					</li>
				</ul>
			</div>
	    </div>
	</div>
	
</template>

<script>
	import music from "../util/musiclist.js"
	export default {
		data() {
			return {
				src: '',
				currentTime: this.$store.state.currentTime,
				indexlist:['顺序播放','循环播放','随机播放'],
				index:'循环播放',
				loop:true,
				music:music,
				musicplayshow:false,
				i:1,
			}
		},
		mounted() {
			this.addEventHandle()
			console.log(this.music)
			
			this.$store.commit("changemusiclist",this.music)
			this.$refs.imagemove.style.animationPlayState="paused"
		},
		methods: {
			delmusclist(){
				this.$store.commit("changemusiclist",[])
			},
			tomusic(data){
				
				this.$store.commit('musicplay')
				this.$store.commit("changeMusicplay",data);
			},
			changemusicplayshowfalse(){
				this.musicplayshow=false
			},
			changemusicplayshowtrue(){
				this.musicplayshow=true
			},
			change(index){
				this.i++
			    this.index=this.indexlist[this.i%3]
				if(this.i%3==1){
					this.loop=true
				}else{
					this.loop=false
				}
				if(this.i%3==0){
					if(this.$refs.player==true){
						for(let j=0;j<music.length;j++){
							
						}
					}
				}
			},
			addEventHandle() {

				this.$refs.player.addEventListener("timeupdate", (event) => {
					this.$store.commit('changecurrentTime', this.$refs.player.currentTime)
					//console.log(this.$store.state.currentTime)
					//console.log(this.$refs.player.duration)
					this.currentTime=this.$refs.player.currentTime
				}) 
			},
			handlesrc(){
 			if (this.$store.state.music.isplay) {
					this.$store.commit('changeMusicPlayName',this.$store.state.musicplay.name)
					return `/music/${this.$store.state.musicplay.singer} - 
			${this.$store.state.musicplay.name}${this.$store.state.musicplay.type}`
				}
			},
			move(){
				
				 //console.log(this.$refs.player.paused)
				 if(this.$refs.player.paused){
					 this.$refs.imagemove.style.animationPlayState="paused"
				 }else{
					 this.$refs.imagemove.style.animationPlayState="running"
				 }

			},
			gomusic(){
				
				this.$store.commit('changeMusic',this.$store.state.musicplay)
				if(this.$store.state.activeIndex!='3'){
					this.$router.push('/center')
					this.$store.commit("changeActiveIndex","3")
				}
				
			}
		},
		updated() {
           this.move()
		  // console.log("sada")
		},
        beforeDestory(){
           // console.log("111111111")
		}
	}
</script>

<style scoped>
	.musicplay {
		width: 410px;
		height: 54px;
		position: fixed;
		z-index: 100;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
	}
    .box{
		height: 54px;
	}
	@keyframes imagemove{
		0%{}
		100%{
			transform:rotate(360deg);
		}
	}
	.back{
	    background: url(../../public/image/1.jpg) center center no-repeat;
		background-size: cover;
		height: 54px;
		width: 54px;
		border-radius: 50%;
        animation: imagemove 5s linear infinite;
	}
	.audio-fixed {
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
	}
	.index{
		position: absolute;
		right: 0;
		top:1px;
		width: 60px;
		height: 24px;
		font-size: 12px;
		text-align: center;
		line-height: 24px;
		background-color: lightgray;
		opacity: 1;
		border-radius: 20%;
		border: gray 1px solid;
	}
	.index:hover{
		opacity: 0.6;
	}
	.index2:hover{
		opacity: 0.6;
	}
	.index2{
		position: absolute;
		right: 0;
		top:30px;
		width: 60px;
		height: 24px;
		font-size: 12px;
		text-align: center;
		line-height: 24px;
		background-color: lightgray;
		opacity: 1;
		border-radius: 20%;
		border: gray 1px solid;
	}
	.playlist{
		width: 100%;
		height: 400px;
		background-color: yellow;
		position: absolute;
		bottom: 54px;
		border-radius: 20px 20px 0 0;
	}
	.tabber{
		height: 40px;
		width: 100%;
		background-color: #121212;
		border-radius: 20px 20px 0 0;
	}
	.tabber div{
		float: left;
		height: 40px;
		line-height: 40px;
		color: white;
	}
	.musiclist{
		width: 100%;
		max-height: calc(100% - 40px);
		overflow: auto;
	}
	.musiclist li{
		height: 30px;
		line-height: 30px;
		background-color: #333;
		color: white;
		width: 100%;
		cursor: pointer;
	}
	.musiclist li:hover{
		opacity: 0.8;
	}
	.musiclist li div{
		float: left;
		font-size: 12px;
	}
	.musiclist li div:nth-child(1){
		width: 100px;
		margin-left: 10px;
		margin-right: 30px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.musiclist li div:nth-child(2){
		width: 100px;
		margin-left: 10px;
		margin-right: 30px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
