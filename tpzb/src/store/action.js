import {
  LOGIN
} from "./mutation-types.js";
import {
  store
} from "./index";
import {
  setStore,
  getStore,
  clearStore,
  removeStore
} from '@/plugs/storeUtils';
import utils from '@/plugs/utils';

import server from '@/server/getData';
import router from '@/routers.js';
import Vue from 'vue';
// import VueSocketIO from 'vue-socket.io';
//import VueSocketIO from '@/plus/vue-socketio.js';

export default {
  // 登录
  [LOGIN]({
    commit
  }, data) {
    commit('LOGIN', data);
  },
  //检查是否登录
  // async checkLogin({
  // 	commit,
  // 	state
  // }, readonly) {
  // 	if (!state.isCheck) {
  // 		try {
  // 			const Authorization = getStore('Authorization');
  // 			if (Authorization) {
  // 				readonly = readonly ? {
  // 					readonly: true
  // 				} : {}; //readonly为了不显示没登录时的提示
  // 				const result = await server.getInfoByToken({
  // 					...readonly
  // 				});
  // 				if (result.data.code == 0) {
  // 					commit("CHECK_LOGIN", result.data);
  // 					commit("LOGIN", result.data.data); //登录成功,获得用户信息
  // 					commit("CHANGEACCESSTOKEN", {
  // 						token: Authorization,
  // 						userId: result.data.data.userId
  // 					});
  // 					let userinfo = result.data.data;
  // 					if (userinfo.roles) {
  // 						for (let i = 0; i < userinfo.roles.length; i++) {
  // 							let obj = userinfo.roles[i];
  // 							if (obj.roleKey == "service") {
  // 								commit('ROLE', 1);
  // 								break;
  // 							} else {
  // 								commit('ROLE', 0);
  // 							}
  // 						}
  // 					}
  // 					return await Promise.resolve({
  // 						code: 200
  // 					}); //成功获取
  // 				} else {
  // 					commit("CHECK_LOGIN", {
  // 						code: 1
  // 					});
  // 					return await Promise.resolve({
  // 						code: 500
  // 					}); //获取失败
  // 				}
  // 			} else {
  // 				commit("CHECK_LOGIN", {
  // 					code: 1
  // 				});
  // 				return await Promise.resolve({
  // 					code: 500
  // 				}); //获取失败
  // 			}
  // 		} catch (err) {
  // 			console.log(err);
  // 			commit("CHECK_LOGIN", err);
  // 			return await Promise.resolve({
  // 				code: 500
  // 			}); //获取失败
  // 		}
  // 	}
  // 	return await Promise.resolve({
  // 		code: 201
  // 	}); //已经获取过
  // },

  // 获取定位
  async getMylocation({
    state
  }, data) {
    if (state.isWeixin) {
      try {
        let GPS = {
          x_pi: 3.14159265358979324 * 3000.0 / 180.0,
          bd_encrypt(gcjLat, gcjLon) {
            let x = gcjLon,
              y = gcjLat;
            let z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * this.x_pi);
            let theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * this.x_pi);
            let bdLon = z * Math.cos(theta) + 0.0065;
            let bdLat = z * Math.sin(theta) + 0.006;
            return {
              'lat': bdLat,
              'lon': bdLon
            };
          }
        }
        data = data || {}
        if (data.getCache && data.callback) {
          let myLocation = getStore("myLocation");
          if (myLocation) {
            console.log("定位读缓存的");
            data.callback(JSON.parse(myLocation));
          }
        }
        let position = await getLocation();
        //alert("获取位置完成")
        let obj = await new Promise((resolve, reject) => {
          let timer = setTimeout(() => {
            reject("timerfailed")
          }, 5000);
          let json = GPS.bd_encrypt(position.latitude, position.longitude);
          let bdMapObj = { //应用内百度地图模块返回的值
            status: false, //布尔型；true||false
            province: '', //字符串类型；省份
            city: '', //字符串类型；城市
            district: '', //字符串类型；县区
            streetName: '', //字符串类型；街道名
            streetNumber: '', //字符串类型；街道号
            country: '', //字符串类型；国家
            countryCode: '', //字符串类型；国家代码
            adCode: '', //字符串类型；行政区域编码
            businessCircle: '', //字符串类型；商圈名称
            sematicDescription: '', //字符串类型；结合当前位置POI的语义化结果描述
            cityCode: '', //字符串类型；城市编码
            lon: json.lon, //数字类型；经度
            lat: json.lat, //数字类型；纬度
            address: '', //字符串类型；地址信息
            poiList: [{ //数组类型；经纬度点热点列表
              name: '', //字符串类型；热点名称
              uid: '', //字符串类型；热点id
              address: '', //字符串类型；热点地址
              city: '', //字符串类型；热点所在城市
              phone: '', //字符串类型；热点电话
              postcode: '', //字符串类型；热点邮编
              epoitype: '', //字符串类型；热点类型，0:普通点 1:公交站 2:公交线路 3:地铁站 4:地铁线路
              coord: { //JSON对象；热点坐标信息
                lat: '', //数字类型；热点纬度
                lon: '' //数字类型；热点经度
              }
            }]
          };
          let url = "http://api.map.baidu.com/geocoder/v2/?ak=" + state.baiduKey +
            "&callback=renderReverse&location=" +
            json.lat + "," + json.lon + "&output=json&pois=0"
          $.ajax({
            type: "GET",
            dataType: "jsonp",
            url: url,
            success: function(data) {
              if (data.status == 0) {
                bdMapObj.province = data.result.addressComponent.province;
                bdMapObj.city = data.result.addressComponent.city;
                bdMapObj.district = data.result.addressComponent.district;
                bdMapObj.streetName = data.result.addressComponent.street;
                bdMapObj.streetNumber = data.result.addressComponent.street_number;
                bdMapObj.country = data.result.addressComponent.country;
                bdMapObj.countryCode = data.result.addressComponent.country_code;
                bdMapObj.adCode = data.result.addressComponent.adcode;
                bdMapObj.businessCircle = data.result.business;
                bdMapObj.sematicDescription = data.result.sematic_description;
                bdMapObj.cityCode = data.result.cityCode;
                bdMapObj.address = data.result.formatted_address;
                //if(data.result.poiRegions.length>0){
                bdMapObj.poiList = [{
                  name: data.result.poiRegions[0] && data.result.poiRegions[0].name || data.result.addressComponent
                    .street, //字符串类型；热点名称
                  uid: data.result.poiRegions[0] && data.result.poiRegions[0].uid || 123456789, //字符串类型；热点id
                  address: data.result.formatted_address, //字符串类型；热点地址
                  city: data.result.addressComponent.city, //字符串类型；热点所在城市
                  phone: '', //字符串类型；热点电话
                  postcode: '', //字符串类型；热点邮编
                  epoitype: 0, //字符串类型；热点类型，0:普通点 1:公交站 2:公交线路 3:地铁站 4:地铁线路
                  coord: { //JSON对象；热点坐标信息
                    lat: json.lat, //数字类型；热点纬度
                    lon: json.lon //数字类型；热点经度
                  }
                }]
                //}
                if (bdMapObj.country == "中国") {
                  resolve(bdMapObj);
                } else {
                  reject("failed");
                }

              } else {
                reject("failed");
              }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
              reject(json.lat + "," + json.lon + "地址位置获取失败");
            }
          });
        });
        setStore("myLocation", JSON.stringify(obj));
        return Promise.resolve(obj)
      } catch (e) {
        console.log("定位失败");
        //alert("获取位置失败")
        return Promise.resolve({
          lon: 0.00,
          lat: 0.00
        });
      }
    } else {
      try {
        let map = window.api.require('bMap');
        if (window.api.systemType == "ios") {
          await new Promise((resolve, reject) => {
            map.initMapSDK(function(ret) {
              if (ret.status) {
                resolve("success")
              } else {
                reject("failed")
              }
            });
          })
        }
        data = data || {}
        if (data.getCache && data.callback) {
          let myLocation = getStore("myLocation");
          if (myLocation) {
            console.log("定位读缓存的");
            data.callback(JSON.parse(myLocation));
          }
        }
        let result = await new Promise((resolve, reject) => {
          let timer = setTimeout(() => {
            reject("timerfailed")
          }, 5000)
          map.getLocation({
            accuracy: '10m',
            autoStop: true,
            filter: 1
          }, function(ret, err) {
            clearTimeout(timer);
            if (ret.status) {
              resolve(ret)
            } else {
              setTimeout(() => {
                map.getLocation({
                  accuracy: '10m',
                  autoStop: true,
                  filter: 1
                }, function(ret, err) {
                  if (ret.status) {
                    resolve(ret)
                  } else {
                    reject("getLocationfailed")
                  }
                });
              }, 1000)
            }
          });
        });
        let obj = await new Promise((rs, rj) => {
          let timer = setTimeout(() => {
            rj("timerfailed")
          }, 5000)
          map.getNameFromCoords({
            lon: result.lon,
            lat: result.lat
          }, function(ret, err) {
            clearTimeout(timer);
            if (ret.status) {
              if (ret.country == "中国") {
                rs(ret)
              } else {
                rj("getNameFromCoordsfailed")
              }
              console.log("结果：" + JSON.stringify(ret))
            } else {
              rj("getNameFromCoordsfailed")
            }
          });
        })
        setStore("myLocation", JSON.stringify(obj));
        return Promise.resolve(obj)
      } catch (e) {
        return Promise.resolve({
          lon: 0.00,
          lat: 0.00
        })
      }
    }
  },
  changeHandleBackRouteName({
    state
  }, {
    type,
    routerName
  }) { //配合routerback使用,修改当前监听页面
    if (type == "add") {
      if (state.handleBackRouteName.length == 0 || state.handleBackRouteName[0].$options.name != routerName.$options.name) {
        state.handleBackRouteName.unshift(routerName);
      }
    } else if (type == "del") {
      let length = state.handleBackRouteName.length;
      if (length > 0) {
        for (let i = 0; i < length; i++) {
          if (state.handleBackRouteName[i].$options.name == routerName.$options.name) {
            console.log("销毁routerback:" + routerName.$options.name)
            state.handleBackRouteName.splice(i, 1);
            break;
          }
        }
      }
    }
    console.log("当前监听的routerback:" + state.handleBackRouteName.length);
  },
  async initJpush({
    commit,
    state,
    dispatch
  }) {
    console.log("初始化极光推送");
    if (window.api) {
      let ajpush = window.api.require('ajpush');
      if (window.api.systemType != "ios") {
        await new Promise((resolve, reject) => {
          ajpush.init(function(ret) {
            console.log(JSON.stringify(ret));
            resolve(ret)
          });
        })
      } else {
        ajpush.setBadge({
          badge: 0
        });
      }
      ajpush.getRegistrationId(function(ret) {
        try {
          if (ret.id) {
            server.update_ajpush({
              regId: ret.id
            })
            commit('CHANGEREGISTRATIONID', ret.id)
          }
        } catch (e) {
          console.log(e)
          //TODO handle the exception
        }
      });
      ajpush.setListener(
        function(ret) {
          console.log("极光推送监听消息：" + JSON.stringify(ret))
          if (ret.extra) {
            dispatch("insertMessage")
          }
        }
      );
    }
    return Promise.resolve('success');
  },

};
