import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)
export default new Vuex.Store({
	plugins:[createPersistedState(
	// {
	// 	reducer(val){
	// 		return{
	// 			usermessage:val.usermessage,
	// 			islogin:val.islogin,
	// 			isTabbarshow:val.isTabbarshow,
	// 			activeIndex:val.activeIndex
	// 		}
	// 	}
	// }
	)],
	//持久性 reducer,部分持久性
	//公共状态2
	state:{
		music:{
			id:'',
			name:'',
			singer:'',
			type:'',
		    lyric:'',
			isplay:false,
		},
		musicplay:{
            id:'',
			name:'',
			singer:'',
			type:'',
		    lyric:'',
			isplay:false,
		},
		usermessage:[],
		musicplayname:'',
		currentTime:0,
		islogin:false,
		isTabbarshow:true,
		activeIndex:'1',
		searchtext:' ',
		musicsheetid:0,
		randommusiclist:[],
		musiclist:[]
	},
	//支持异步
	actions:{
	},
	//统一管理，支持同步
	mutations:{
		changemusiclist(state,data){
			state.musiclist=data
		},
		changeMusic(state,data){
			state.music.id=data.id
			state.music.name=data.name
			state.music.singer=data.singer
			state.music.type=data.type
			state.music.lyric=data.lyric
			state.music.isplay=false
		},
		changeMusicplay(state,data){
			state.musicplay.id=data.id
			state.musicplay.name=data.name
			state.musicplay.singer=data.singer
			state.musicplay.type=data.type
			state.musicplay.lyric=data.lyric
			state.musicplay.isplay=true
		},
		changeMusicPlayName(state,name){
			state.musicplayname=name
		},
		changecurrentTime(state,currentTime){
			state.currentTime=currentTime
		},
		musicplay(state){
			state.music.isplay=true
		},
		changeIsLogin(state){
			state.islogin=!state.islogin
		},
		changeIsTabbarshow(state){
			state.isTabbarshow=!state.isTabbarshow
		},
		changeActiveIndex(state,string){
			state.activeIndex=string
		},
		changeUserMessage(state,mess){
			state.usermessage=mess
		},
		changeSearchText(state,mess){
			state.searchtext=mess
		},
		changeMusicSheetId(state,id){
			state.musicsheetid=id
		},
		changeRandomMusicList(state,list){
			state.randommusiclist=list
		}
	},
	getters: {
		
	  }
})