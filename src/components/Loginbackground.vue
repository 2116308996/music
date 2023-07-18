<template>
	<div>
		<section>
			
				<!-- 背景色 -->
				<div class="color"></div>
				<div class="color"></div>
				<div class="color"></div>
				<div class="box">
					<!-- 背景圆 -->
					<div class="circlre" style="--x:0"></div>
					<div class="circlre" style="--x:1"></div>
					<div class="circlre" style="--x:2"></div>
					<div class="circlre" style="--x:3"></div>
					<div class="circlre" style="--x:4"></div>
					<!-- 登录框 -->
					<div class="container">
						<slot></slot> 
					</div>
				</div>
				
		</section>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
	}
</script>

<style scoped>
	*{
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	/* 水平垂直居中 */
	section{
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
		position: relative;
		overflow: hidden;
		background: linear-gradient(to bottom,#f1f4f9,#dff1ff);
	}
	/* 背景颜色 */
	section .color{
		position: absolute;
		filter: blur(200px);
	}
	section .color:nth-child(1){
		top: -350px;
		width: 600px;
		height: 600px;
		background-color: #ff359d;
	}
	section .color:nth-child(2){
		bottom: -150px;
		left: 100px;
		width: 500px;
		height: 500px;
		background-color: #fffd87;
	}
	section .color:nth-child(3){
		bottom: 50px;
		right: 100px;
		width: 500px;
		height: 500px;
		background-color: #00d2ff;
	}
	.box{
		position: relative;
	}
	.box .circlre{
		position: absolute;
		background: rgba(255,255,255,0.1);
		backdrop-filter:blur(5px);
		box-shadow: 0 25px 45px rgba(0,0,0,0.1);
		border: 1px solid rgba(255,255,255,0.5);
		border-right: 1px solid rgba(255,255,255,0.1);
		border-bottom: 1px solid rgba(255,255,255,0.1);
		border-radius: 50%;
		
		filter:hue-rotate(calc(var(--x) * 60deg));
		animation: animate 10s linear infinite;
		animation-delay: calc(var(--x) * -2s);
	}
	@keyframes animate{
		0%,100%{
			transform: translateY(-50px);
		}
		50%{
			transform: translateY(50px);
		}
	}
	.box .circlre:nth-child(1){
		top:-50px;
		right:-60px;
		width: 100px;
		height: 100px;
	}
	.box .circlre:nth-child(2){
		top:150px;
		left:-100px;
		width: 120px;
		height: 120px;
		z-index: 2;
	}
	.box .circlre:nth-child(3){
		bottom:50px;
		right:-60px;
		width: 80px;
		height: 80px;
		z-index: 2;
	}
	.box .circlre:nth-child(4){
		bottom:-80px;
		left:100px;
		width: 60px;
		height: 60px;
		z-index: 2;
	}
	.box .circlre:nth-child(5){
		top:-80px;
		left:140px;
		width: 60px;
		height: 60px;
		z-index: 2;
	}
    /* 登录框样式 */
	.container{
		position: relative;
		width: 400px;
		min-height: 400px;
		background-color: rgba(255,255,255,0.1);
		display: flex;
		justify-content: center;
		align-items: center;
		backdrop-filter:blur(5px);
		box-shadow: 0 25px 45px rgba(0,0,0,0.1);
		border: 1px solid rgba(255,255,255,0.5);
		border-right: 1px solid rgba(255,255,255,0.1);
		border-bottom: 1px solid rgba(255,255,255,0.1);
	}
	.form{
		position: relative;
		width: 100%;
		height: 100%;
		padding: 50px;
	}
	.form h2{
		position: relative;
		color: #fff;
		font-size: 24px;
		font-weight: 600;
		letter-spacing: 5px;
		margin-bottom: 30px;
		cursor: pointer;
	}
	.form h2::before{
		content: "";
		position: absolute;
		bottom: -5px;
		width: 0px;
		height: 3px;
		background: #fff;
		transition: 0.5s;
	}
	.form h2:hover::before{
		width: 53px;
	}
	.form .inputBox{
		width: 100%;
		margin-top: 20px;
	}
	.form .inputBox input{
		width: 100%;
		padding: 10px 20px;
		background: rgba(255,255,255,0.3);
		outline: none;
		border: none;
		border-radius: 30px;
		border-right: 1px solid rgba(255,255,255,0.1);
		border-bottom: 1px solid rgba(255,255,255,0.1);
		font-size: 16px;
		letter-spacing: 1px;
		color: #fff;
		box-shadow: 0 5px 15px rgba(0,0,0,0.05);
	}
	.form .inputBox input::placeholder{
		color: #fff;
	}
	/* 登录按钮样式 */
	.form .inputBox input[type="button"]{
		background: #fff;
		color: #666;
		max-width: 120px;
		margin-bottom: 20px;
		font-weight: 600;
		sursor:pointer;
	}
	
	.forget{
		margin-top: 5px;
		color:#fff;
		letter-spacing: 1px;
	}
	.forget a{
		font-weight: 600;
		text-decoration: none;
		color:#fff
	}
</style>
