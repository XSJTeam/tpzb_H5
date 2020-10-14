// 按需全局引入 vant组件
import Vue from 'vue'
import {
  Button,
  List,
  Cell,
  Tabbar,
  TabbarItem,
  RadioGroup,
  Radio,
  Toast,
  Dialog
} from 'vant'
Vue.use(Button)
Vue.use(Cell)
Vue.use(List)
Vue.use(Tabbar).use(TabbarItem)

Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(Toast)
Vue.use(Dialog)
