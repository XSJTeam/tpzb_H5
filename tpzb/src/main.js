// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './routers'
 
import '@/js/jquery-1.8.3.min';
import '@/js/rem';
import '@/sass/main.scss';
import {Fn} from '@js/api';
import {store} from '@/store/index.js';
import storeUtils from '@/plugs/storeUtils';
import server from '@/server/getData';
import Vant from 'vant'
Vue.use(Vant)

Vue.config.productionTip = false;
Vue.prototype.Fn = Fn;
Vue.prototype.$utils = storeUtils;
Vue.prototype.$server = server;

// 图片懒加载配置项
import {
  Lazyload
} from 'vant'
Vue.use(Lazyload, {
  lazyComponent: true
});

const myRoute = {
  methods: {
    routerPush(e, obj) {
      let params = { ...obj,
        params: {
          filp: e.currentTarget
        }
      };
      this.$router.push(params);
    },
    routerReplace(e, obj) {
      let params = { ...obj,
        params: {
          filp: e.currentTarget
        }
      };
      this.$router.replace(params);
    }
  }
}
Vue.mixin(myRoute); //全局混入

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: {
    App
  },
  template: '<App/>'
})
