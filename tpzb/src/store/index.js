import Vue from 'vue'
import mutations from './mutations'
import actions from './action'
import getters from './getters'
import Vuex from 'vuex'
Vue.use(Vuex) 

const state = {
	version: "1.0.1",
	cachelist: {}, //记录页面切换缓存
	keepAlive: [], //决定那个页面需要缓存的

	handleRoute: false, //安卓返回键是否操作路由,当值为false时，操作路由，当值为true时，将值改变为false
	handleBackRouteName: [], //配合routerback使用
	forbidBack: false, //配合routerback使用,是否阻止页面返回
	// 开发环境
	// baseURL:"http://192.168.0.52:8182/api",//接口地址
	baseURL: "http://mis.iceinfo.net:8234/api/", //接口地址
	// baseURL:"http://192.168.0.78:8182/api/",//接口地址


	// imageUrl: 'http://112.74.160.195:8199/file/',
	// 测试（给客户用）
	// baseURL: "http://192.168.0.236:8182/", //接口地址
	// imageUrl: 'http://wh.iceinfo.net/file/',

	axiosCancelSource: {}, //用来取消axios的请求用的
	isLogin: false,
	isCheck: false, //是否已经检查过登录
	Authorization: '',
	openid: '',
	unionId: '',
	userId: '',
	userInfo: '',
	pageSize: 10,
	isWeixin: true, //打包公众号改为true
	isRefresh: false, //返回之后是否重新加载
}
let status = {
	store: new Vuex.Store({
		state,
		getters,
		actions,
		mutations,
	}),
};
export const store = status.store;
