import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)
export default new Vuex.Store({
	plugins:[createPersistedState()],
	//持久性 reducer,部分持久性
	//公共状态
	state:{
		music:{
			id:'',
			name:'',
			singer:''
		}
	},
	//支持异步
	actions:{
	},
	//统一管理，支持同步
	mutations:{
		changeMusic(state,data){
			state.music.id=data.id
			state.music.name=data.name
			state.music.singer=data.singer
		}
	},
	getters: {
		
	  }
})