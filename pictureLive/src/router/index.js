import Vue from 'vue'
import Router from 'vue-router'
import {
  constantRouterMap
} from './router.config.js'
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router)

const createRouter = () =>
  new Router({
    mode: 'history', // 如果你是 history模式 需要配置vue.config.js publicPath
    base: process.env.BASE_URL,
    scrollBehavior: () => ({
      y: 0
    }),
    routes: constantRouterMap
  })
const router = createRouter()
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
//路由白名单
const whileRouterList = ['/login']
router.beforeEach((to, from, next) => {
  // 确定用户是否已登录  
  const hasToken = false // 这里就是路由是否通过标准，一般都是通过token来验证
  if (hasToken) { // 登录
    if (to.path === '/login') {
      // 如果已登录，请重定向到主页
      next('/home')
      return
    }
    next()
  } else {
    if (whileRouterList.indexOf(to.name) === -1) {
      // 在免费登录白名单中，直接进入
      next()
    } else {
      // 没有访问权限的其他页将重定向到登录页。
      next('/login')
    }
  }
})
export default router
