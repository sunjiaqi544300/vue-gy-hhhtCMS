import Vue from 'vue'
import Env from './env';
import axios from 'axios'
import Qs from 'qs'
import router from '../router'

axios.defaults.withCredentials = true;
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
//  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';//配置请求头
// const GLOBAL_CONFIG = Env['GLOBAL_CONFIG'];

//添加一个请求拦截器
axios.interceptors.request.use(
        config => {
            var token = localStorage.getItem('token')
            if (config.method == "get") {
                // config.data = Qs.stringify(config.data)
            }
            if (token) { // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
                config.headers.Authorization = 'JWT ' + token
            }
            return config
        },
        err => {
            return Promise.reject(err)
        })
    // http response 服务器响应拦截器，这里拦截401错误，并重新跳入登页重新获取token
axios.interceptors.response.use(
    response => {
        return response
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 这里写清除token的代码
                    // Element.Message.error({
                    //   message: '请您登陆'
                    // })
                    router.push('/land')
            }
            return false
        }
        return false
    })


//基地址
let base = Env.baseURL;
//测试使用
export const ISDEV = Env.isDev;


//请求通用方法
export const POST = (url, params) => {
    return axios.post(`${base}${url}`, params).then(res => res.data)
}

export const GET = (url, params) => {
    return axios.get(`${base}${url}`, {
        params: params
    }).then(res => res.data)
}

export const PUT = (url, params) => {
    return axios.put(`${base}${url}`, params).then(res => res.data)
}

export const DELETE = (url, params) => {
    return axios.delete(`${base}${url}`, {
        params: params
    }).then(res => res.data)
}

export const PATCH = (url, params) => {
    return axios.patch(`${base}${url}`, params).then(res => res.data)
}