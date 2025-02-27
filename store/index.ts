import { createStore } from "vuex";
import createPersistedState from 'vuex-persistedstate' // 引入数据持久化插件

export default createStore({
	state: {
		setting: uni.getStorageSync('setting') || {
			is_login: false,
			token: '',
			refresh_token: '',
		}
	},
	mutations: {
		set_login(state, login : boolean) {
			state.setting.is_login = login;
		},
		set_token(state, token : string) {
			state.setting.token = token;
		},
		set_refresh_token(state, refresh_token : string) {
			state.setting.refresh_token = refresh_token;
		}
	},
	actions: {

	},
	getters: {

	},
	modules: {},
	plugins: [
		createPersistedState({
			paths: ['setting'],
			storage: { // 存储方式定义  
				getItem: (key : string) => uni.getStorageSync(key), // 获取  
				setItem: (key : string, value : any) => uni.setStorageSync(key, value), // 存储  
				removeItem: (key : string) => uni.removeStorageSync(key) // 删除  
			}
		})

	],
	strict: true
});