<template>
     <div>
		 <tabbar></tabbar>
		 <router-view></router-view>
	 </div>
</template>

<script>
import tabbar from './components/Tabbar'
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vant from 'vant'
import 'vant/lib/index.css';

Vue.use(Vant);
Vue.use(ElementUI)

export default {
     components:{
		 tabbar
	 }
}
</script>

<style>
    *{
		margin: 0;
		padding: 0;
	}
	.van-search{
		height: 60px;
	}
	.el-dropdown-link{
		height: 40px;
		width: 40px;
	}
</style>
