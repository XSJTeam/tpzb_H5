import 'core-js/stable'
import 'regenerator-runtime/runtime'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//封装统一loading
import Loading from "./components/loading";
// 设置 js中可以访问 $cdn
import {
  $cdn
} from '@/config'
//挂载全局
Vue.prototype.$cdn = $cdn
Vue.prototype.$loading = Loading;
// 全局引入按需引入UI库 vant
import '@/plugins/vant'
// 引入全局样式
import '@/assets/css/index.scss'
// 移动端适配
import 'lib-flexible/flexible.js'
// filters
import './filters'
import LuckDraw from 'vue-luck-draw'
import lottery from 'vue-lottery'
Vue.use(lottery)
Vue.use(LuckDraw)
//生产模式消息
Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
