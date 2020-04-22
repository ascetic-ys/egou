import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		userInfo: {},
		weChat:{}
	},
	mutations: {
		login(state, provider) {

			state.hasLogin = true;
			state.userInfo = provider;
			uni.setStorage({//缓存用户登陆状态
			    key: 'userInfo',  
			    data: provider  
			}) 
		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
			state.weChat = {};
			uni.removeStorage({  
                key: 'userInfo'  
            })
			uni.removeStorage({
			    key: 'weChat'  
			})
		},
		setWeChat(state,provider){
			state.weChat=provider
			uni.setStorage({//缓存用户微信信息
			    key: 'weChat',  
			    data: provider  
			}) 
		},
		removeWeChat(state,provider){
			state.weChat=provider
			uni.removeStorage({//清空用户微信信息
			    key: 'weChat' 
			}) 
		}
	},
	actions: {
	},
  plugins: [createLogger()]
})

export default store
