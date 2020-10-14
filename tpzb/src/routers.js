import Vue from 'vue';
import VueRouter from 'vue-router';
import Vant from 'vant'
import {clearStore,setStore, getStore} from "./plugs/storeUtils";
import server from "./server/getData";
import {store} from './store/index';

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
}

const Index = () => import('@/components/index/detail.vue');//首页

// const Nothing = () => import('@/components/other/nothing');//404什么都没

Vue.use(VueRouter);
Vue.use(Vant);
const NotFoundComponent = {
  template: '<h1 style="text-align:center;">404</h1>'
}
const routers = [
  // {path: '/index',name: 'index',component: Index,meta: {title: "首页",requireAuth:true, deepth: 11, transitionType: 'flip'}},

  // {path: '/nothing', name: 'nothing', component: Nothing, meta: {title: "404", hideWxMenu: true}},//404什么都没
  // {path: '/404', name: '404', component: NotFoundComponent, meta: {title: "404"}},//404
  // {path: '*', component: NotFoundComponent, title: '图片直播'},//404
  // {path: '/', redirect: '/index', title: '图片直播'},//跳到首页
  // {path: '/index.html', redirect: '/index', title: '图片直播'}//跳到首页
];
const router = new VueRouter({
  linkActiveClass: 'cur',
  linkExactActiveClass: 'cur',
  routes: routers,
  scrollBehavior(to, from, savedPosition) {//滚动到顶部
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  }
})
router.beforeEach(async (to, from, next) => {
  setTimeout(() => {
    if (store.state.forbidBack) {//阻止页面返回(配合routerBack插件使用)
      window.history.pushState('forward', null, "#" + from.fullPath);
      store.commit("CHANGESTORE", {name: "forbidBack", value: false});
      console.log("阻止了一次路由返回!")
      return false;
    } else if (store.state.isBrowser && !from.name) {//第一次进入需要routerback的页面多加一个历史
    }
    next();
  }, 0)
});
router.beforeResolve(async (to, from, next) => {
	if(to.query.sususu&&to.query.phone){
		const Authorization=to.query.sususu;
		setStore('Authorization', Authorization);//保存token到本地
		let keys=Object.keys(to.query);
		let obj={};
		let arr=["sususu","nickName","avatarUrl","gender","paperNum","phone","realName"];
		let userInfo={};
		for(let i=0;i<keys.length;i++){
			if(!arr.includes(keys[i])){
				obj[keys[i]]=to.query[keys[i]];
			}else{
				userInfo[keys[i]]=to.query[keys[i]]||"";
			}
		}
		store.commit("CHANGESTORE",{name: "userInfo", value: userInfo})
		next({name:to.name,query:obj,replace:true});
		return;
	}

  next();
  // 判断该路由是否需要登录权限
	// const checkLogin=async (flag)=>{
	// 	if(flag){
	// 		if((to.name=='login'||to.name=='register')&&store.state.isLogin){
	// 			next({name:"index"});
	// 		}else{
	// 			next();
	// 		}
	// 	}else{
	// 		if(store.state.isLogin){
	// 			next();
	// 		}else{
	// 			next({name:"login"});
	// 		}
	// 	}
	// };
	// if(to.meta.requireAuth){//需要验证登录
	// 	store.dispatch("checkLogin").then((res)=>{
	// 		checkLogin();
	// 	});
	// }else{
	// 	store.dispatch("checkLogin",true).then((res)=>{
	// 		checkLogin(true);
	// 	});
	// }
})
router.afterEach((to, from) => {
})
export default router;
