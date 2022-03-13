import Vue from 'vue'
import VueRouter from 'vue-router'
import Center from '@/views/center.vue'
import Music from '@/views/music.vue'
import Home from '@/views/home.vue'
import MusicPlay from '@/views/musicplay.vue'
Vue.use(VueRouter)// 注册路由插件
const routes=[
	{
		path:'/center',
		component:Center,
	},
	{
		path:'/music',
		component:Music,
	},
	{
		path:'/home',
		component:Home,
	},
	{
		path:'*',
		redirect:'/home'
	},
	{
		name:'musicplay',
		path:'/musicplay/:id',//动态路由
		component:MusicPlay
	}
	
]
const router=new VueRouter({
	//mode:"history",
	routes
})
export default router