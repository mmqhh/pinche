import axios from 'axios'
import { error } from 'util';
import { Message } from 'element-ui';
import { get_token } from '@/utils/auth'


const service = axios.create({
    baseURL: process.env.HOST,
    timeout: 10000
})
//请求拦截器
service.interceptors.request.use(config => {    // axios请求拦截器
    config.headers['token'] = get_token();      //在这里给头部加上从服务器获取并存储至Cookies的token
    return config
}, error => {
    Promise.reject(error)
}
)
//响应拦截器
service.interceptors.response.use(response => {     //有响应，执行下面的判断
    const res = response.data
    if (res.code !== '20000') {
        if (res.code === '50008') {
            return Promise.reject('非法Token！')
        }
        return Promise.reject(response.data.msg)
    }
    else {
        return response
    }
},
    error => {                                      //无响应，弹出错误消息
    console.log('err' + error)// for debug
    Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
    })
    return Promise.reject(error)
})

export default service