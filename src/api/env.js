/*
 * Created by bootdo
 * 设置api请求的baseURL
 * 实际项目中建议该文件不纳入版本管理
 */
import Vue from 'vue'
//获取当前环境
function getApiHost() {
  let apiHost = '';
  const locationHost = location.host;
  const ALL_IP_HOST = {
    'merchant.vsports360.com': 'https://www.vsports360.com', //生产
    // '47.95.5.79:8083': 'http://47.95.5.79:8088', //测试
  }
  for (let host in ALL_IP_HOST) {
    if (host == locationHost) {
      apiHost = ALL_IP_HOST[host]
    }
  }
  if (!apiHost) {
    // apiHost = '' //接口请求需要配置的地址
    apiHost = 'http://192.168.1.3:8001' //接口请求需要配置的地址
  }
  return apiHost
}

let apiHost = getApiHost()

export default {
  baseURL: apiHost, //公共的接口请求访问地址
  fileBaseURL: apiHost, //文件路径访问地址
}
export function hostType(type) {
  let link
  if (type == 1) {
    link = "http://192.168.1.3:8001"
    // link = ""
  } else {
    // link = ""
    link = "http://192.168.1.3:8001"
  }
  return link
}
//地图环境判断
export function mapType() {
  let point
  // point = ["39.916527", "116.397128"] //北京
  // point = ["39.11221", "117.23429"] //天津
  point = ["39.91231", "116.36611"] //内蒙
  return point
}
