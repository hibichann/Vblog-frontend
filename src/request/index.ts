import axios,{AxiosRequestConfig} from 'axios'
import { ElMessage } from 'element-plus'
// 创建一个 axios 实例
const service = axios.create({
  baseURL: 'http://192.168.0.105:3000',
  timeout: 30000, // 请求超时时间毫秒
  withCredentials: false, // 异步请求携带cookie
  headers: {
    'Content-Type': 'application/json',
    'token': 'your token',
    'lang': window.localStorage.getItem('lang'),
    'X-Requested-With': 'XMLHttpRequest',
    'Access-Control-Allow-Origin': '*'
  }
})

// 添加请求拦截器
service.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config
  },
  function (error) {
    // 对请求错误做些什么
    console.log(error)
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    // dataAxios 是 axios 返回数据中的 data
    const dataAxios = response.data
    // 这个状态码是和后端约定的
    // const code = dataAxios.reset
    return dataAxios
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    console.log(error)
    ElMessage.error(error.message)
    return Promise.reject(error)
  }
)
export default <T = any> (config:AxiosRequestConfig)=>{
  return service(config).then(res => {
    return res as unknown as T
  })
}
