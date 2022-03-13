<template>
	<div>
		<div class="swiper-box">
			<div class="swiper zhuhui">
			    <div class="swiper-wrapper">
					<div class="swiper-slide">
						<img src="/image/22.jpg" style="height: 500px;" alt="">
					</div>
					<div class="swiper-slide">
						<img src="/image/22.jpg" style="height: 500px;" alt="">
					</div>
					<div class="swiper-slide">
						<img src="/image/22.jpg" style="height: 500px;" alt="">
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
	</div>
</template>

<script>
	import music from '@/util/music.js'
	import Swiper,{ Navigation, Pagination} from 'swiper'
	import 'swiper/swiper-bundle.css'
	var myswiper;
	function init(){
		    myswiper= new Swiper(".zhuhui", {
			modules:[Navigation,Pagination],
			loop: true, // 循环模式选项

			pagination: {
			  el: '.swiper-pagination',
			},
			 
			navigation: {
			  nextEl: '.swiper-button-next',
			  prevEl: '.swiper-button-prev',
			},

		})
	}
	export default{
		data(){
			return{
				
			}
			
		},
		mounted() {
			
			init()
			
		},
		updated() {
			myswiper.destroy(true,true)
			init()
		}
	}
	
	
</script>

<style>
	.zhuhui{
		height: 500px;
		width: 800px;
	}
	.swiper-box{
		height: 500px;
		width: 100%;
		background: url("http://p1.music.126.net/SspvEIcAe9HN0aDHk8V3XQ==/109951167143683266.jpg?imageView&blur=40x20");
		background-size: cover;
	}
</style>
