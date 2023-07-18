<template>
	<div>
		<div class="swiper-box">
			<div class="swiper zhuhui">
				<div class="swiper-wrapper">
					<div class="swiper-slide" v-for="data in homeimage" :key="data.id">
						<div class="background-slide" :style="{
							backgroundImage:'url('+data.background+')'
						}
						">
							<img :src="data.image" style="width: 860px;" alt="" @click="handlemusic(data)">
						</div>
					</div>
				</div>
				<!-- 如果需要分页器 -->
				<div class="swiper-pagination"></div>

				<!-- 如果需要导航按钮 -->
				<div class="swiper-button-prev"></div>
				<div class="swiper-button-next"></div>

				<!-- 如果需要滚动条 -->
				<!-- <div class="swiper-scrollbar"></div>  -->
			</div>
		</div>
		<div>
			<h3 style="text-align: center;margin-top: 15px;">推荐歌曲</h3>
		</div>
		<div style="margin-bottom: 80px;">
			<ul>
				<li class="list-header">
					<div class="list-header-one" @click="getmusic()">刷新</div>
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

					<div class="list-header-four" :title="data.singer">{{data.singer}}</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import music from '@/util/music.js'
	import http from "../router/http.js"
	import Swiper, {
		Navigation,
		Pagination,
		Autoplay
	} from 'swiper'
	import 'swiper/swiper-bundle.css'
	import Homeimage from '@/util/homeimage.js'
	var myswiper, slide;

	function init() {
		myswiper = new Swiper(".zhuhui", {
			modules: [Navigation, Pagination, Autoplay],
			loop: true, // 循环模式选项

			pagination: {
				el: '.swiper-pagination',
			},

			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},

			autoplay: {
				delay: 2500,
				disableOnInteraction: false,
			},

		})
	}
	export default {
		data() {
			return {
				homeimage: [],
				musiclist: [],
				newlist: []
			}

		},
		mounted() {
			this.homeimage = Homeimage
			//console.log(this.homeimage)
			init()

			http({
				url: '/allmusic',
				method: 'get'
			}).then(res => {
				this.musiclist = res.data.data
				if (this.$store.state.randommusiclist.toString() == [].toString()) {
					this.getmusic()
				}
				this.newlist = this.$store.state.randommusiclist
			})
			this.$store.state.isTabbarshow = true
		},
		methods: {
			getmusic() {
				this.newlist = this.getRandomArrayElements(this.musiclist, 10);
				this.$store.commit("changeRandomMusicList", this.newlist);
			},
			getRandomArrayElements(arr, count) {
				var shuffled = arr.slice(0),
					i = arr.length,
					min = i - count,
					temp, index;
				while (i-- > min) {

					index = Math.floor((i + 1) * Math.random());
					temp = shuffled[index];
					shuffled[index] = shuffled[i];
					shuffled[i] = temp;

				}
				return shuffled.slice(min);
			},
			handlemusic(data) {
				this.$store.commit("changeActiveIndex", "3")
				this.$store.commit('changeMusic', data)
				this.$router.push('/center')
			},
			handlePlay(data) {
				this.$store.commit("changeActiveIndex", "3")
				this.$store.commit('changeMusic', data)
				this.$router.push('/center')

			},
		},
		updated() {
			myswiper.destroy(true, true)
			init()
		},
		destroyed() {

		}
	}
</script>

<style scoped>
	.ani-slide {
		background-color: red;
	}

	.zhuhui {
		height: 335px;
		width: 100%;
	}

	.background-slide {
		height: 335px;
		width: 100%;
		background-size: cover;
		text-align: center;
	}

	.background-slide img {
		height: 335px;
	}

	.swiper-box {
		height: 335px;
		width: 100%;
		/* background: url("http://p1.music.126.net/SspvEIcAe9HN0aDHk8V3XQ==/109951167143683266.jpg?imageView&blur=40x20");
		background-size: cover; */
	}

	.list-header {
		width: 827px;
		height: 25px;
		line-height: 25px;
		background-color: #F7F7F7;
		box-shadow: 0px 0px 5px grey;
		border-top: 5px solid red;
		font-size: 16px;
		margin-top: 15px;

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

	.list-header-six {
		width: 500px;
		height: 27px;
		cursor: pointer;
	}

	.list-header-six2 {
		width: 500px;
		height: 27px;
		cursor: pointer;
	}

	.list-header-six2:hover {
		text-decoration: underline;
	}

	.list-header-seven {
		width: 220px;
		height: 27px;
		cursor: pointer;
	}




	.list-header-four {
		width: 160px;
		height: 27px;
		cursor: pointer;
		overflow: hidden;
		white-space: nowrap;

		text-overflow: ellipsis;
	}
</style>
