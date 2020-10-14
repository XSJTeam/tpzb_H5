/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [{
  path: '/',
  redirect: '/home',
  
},{
  path: '/home',
  name: 'Home',
  component: () => import('@/views/Home'),
  meta: {
    title: '首页',
    keepAlive: false
  }
},
{
  path: '/download',
  name: 'Download',
  component: () => import('@/views/Download'),
  meta: {
    title: '下载',
    keepAlive: false
  }
}, {
  path: '/preview',
  name: 'Preview',
  component: () => import('@/views/Preview'),
  meta: {
    title: '图片预览',
    keepAlive: false
  }
},{
    path: '/share',
    name: 'Share',
    component: () => import('@/views/Share'),
    meta: {
      title: '分享',
      keepAlive: false
    }
  }]
