import axios from 'axios'
import {
  Toast
} from 'vant'
// 根据环境不同引入不同api地址
import {
  baseApi
} from '@/config'

let URL = ''
switch (process.env.NODE_ENV) {
  case 'development':
    URL = '/api' + baseApi
    break;
  case 'production':
    URL = '/api' + baseApi
    break;
}
// create an axios instance
const service = axios.create({
  baseURL: URL, // url = base api url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request拦截器 request interceptor
service.interceptors.request.use(
  config => {
    // 不传递默认开启loading
    if (!config.hideloading) {
      // loading
      Toast.loading({
        forbidClick: true
      })
    }
    if (localStorage.getItem('token')) {
      config.headers['token'] = localStorage.getItem('token')
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)
// respone拦截器
service.interceptors.response.use(
  response => {
    Toast.clear()
    const res = response.data
    if (res.status && res.status !== 200) {
      return Promise.reject(res || 'error')
    } else {
      const code = response.data.code
      switch (code) {
        case '102':
          window.localStorage.removeItem('token')
          setTimeout(() => {
            window.location.reload()
          }, 500);
          break;
        case '101':
          window.localStorage.removeItem('token')
          setTimeout(() => {
            window.location.reload()
          }, 500);
          break;
        case '-1':
          Toast(res.msg)
          break;
        case '100':
          Toast("系统出错")
          break;
        case '103':
          Toast(res.msg)

          break;
      }
      return Promise.resolve(res)
    }
  },
  error => {
    Toast.clear()
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default service
