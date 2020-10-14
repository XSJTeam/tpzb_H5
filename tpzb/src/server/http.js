import axios from 'axios'
import Vue from 'vue'
import {store} from '@/store';
import qs from 'qs'
import { getStore } from "../plugs/storeUtils";
let instance = axios.create({ 
  timeout: 10000, 
});

instance.interceptors.request.use(config => { // 添加请求拦截器
  /* if (!config.headers['Content-Type'] && (config.method == 'post' || config.method == 'put')) {
     config.headers = {
       'Content-Type': 'application/json'
     };
   }*/
  // if (store.state.Authorization != "") {
  //   config.headers.Authorization = "Bearer " + store.state.Authorization; //携带权限参数
  // }
  if (getStore('Authorization') != "") {
    config.headers.Authorization = "Bearer " + getStore('Authorization'); //携带权限参数
  }
  return config;
}, error => {

  return Promise.reject(error)
})
instance.interceptors.response.use((response) => {
  console.log(response)
  return response;
}, error => {
  return Promise.reject(error)
}); // 添加响应拦截器
let $http = {};
$http.get = async function(url, params = {}, config) {
  return instance.get(store.state.baseURL + url, Object.assign({
    params: params
  }, { ...config,
    cancelToken: store.state.axiosCancelSource.token
  }))
}
$http.getIm = async function(url, params = {}, config) {
  return instance.get(store.state.imUrl + url, Object.assign({
    params: params
  }, { ...config,
    cancelToken: store.state.axiosCancelSource.token
  }))
}
$http.getStatic = async function(url, params = {}, config) {
  return instance.get(url.indexOf("http") != -1 ? url : store.state.rootUrl + url, Object.assign({
    params: params
  }, { ...config,
    cancelToken: store.state.axiosCancelSource.token
  }))
}
$http.post = function(url, data, config) {
  return instance.post(store.state.baseURL + url, data, { ...config,
    cancelToken: store.state.axiosCancelSource.token
  })
}
$http.postHttp = function(url, data, config) {
  return instance.post(url, data, { ...config,
    cancelToken: store.state.axiosCancelSource.token
  })
}
$http.getHttp = function(url, params, config) {
  return instance.get(url, Object.assign({
    params: params
  }, { ...config,
    cancelToken: store.state.axiosCancelSource.token
  }))
}
$http.postForm = function(url, data, config) {
  return instance.post(store.state.baseURL + url, qs.stringify(data), Object.assign({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    }
  }, { ...config,
    cancelToken: store.state.axiosCancelSource.token
  }))
}
$http.postImg = function(url, data, config) {
  return instance.post(store.state.imageUploadUrl + url, data, Object.assign({
    headers: {
      "Content-Type": "multipart/form-data"
    }
  }, { ...config,
    cancelToken: store.state.axiosCancelSource.token
  }))
}
$http.put = function(url, data, config) {
  return instance.put(store.state.baseURL + url, data, { ...config,
    cancelToken: store.state.axiosCancelSource.token
  })
}
$http.putForm = function(url, data, config) {
  return instance.put(store.state.baseURL + url, qs.stringify(data), Object.assign({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    }
  }, { ...config,
    cancelToken: store.state.axiosCancelSource.token
  }))
}
$http.delete = function(url, params, config) {
  return instance.delete(store.state.baseURL + url, Object.assign({
    params: params
  }, { ...config,
    cancelToken: store.state.axiosCancelSource.token
  }))
}

export default $http;
