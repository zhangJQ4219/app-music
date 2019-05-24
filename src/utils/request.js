import axios from 'axios'
// import store from '@/store'
// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API,
  // baseURL: 'http://localhost:5050',
  timeout: 15000 // 请求超时时间
})

service.interceptors.request.use(
  request => {
    // request.headers['Access-Token'] = 'zhangjiaqi' // 正式请求自定义字段需要服务器支持
    // 请求正常则返回
    return request
  },
  error => {
    console.log(error)
    // 请求错误则向store commit这个状态变化
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    return Promise.resolve(response.data)
    // const res = response.data
    // if (res.code !== 200) {
    //   console.error(res.msg)
    //   return Promise.reject(res.msg)
    // } else {
    //   // return response.data
    //   return Promise.resolve(response.data)
    // }
  },
  error => {
    console.error('err' + error) // for debug
    return Promise.reject(error)
  }
)
export default service
