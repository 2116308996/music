<template>
	<div class="musicplay">
		<div>
			<audio :src="src" controls autoplay>
				当前浏览器不支持audio
			</audio>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				src:''
			}
		},
		mounted() {
			this.src=`/music/${this.$store.state.music.singer} - ${this.$store.state.music.name}.mp3`
			console.log(this.src)
		},
		methods:{
			
		}
	}
</script>

<style scoped>
	.musicplay{
		margin: 0 auto;
		width: 960px;
	}
</style>
