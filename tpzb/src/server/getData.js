import http from '@/server/http';
import {
	store
} from '../store/index';
let server = {};
 
// server.smsVerificationCode = (data, config) => {
// 	return http.postForm("wq/userController/smsVerificationCode", data, config);
// }
 
// server.getAllChildrenAreaByCode = (data, config) => {
// 	return http.get("enterprise/demandController/getAllChildrenAreaByCode", data, config);
// }
 
// server.uploadPic = (data, config) => {
// 	return http.post("upload", data, config);
// }
export default server;
