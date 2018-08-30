import axios from 'axios'
import store from '../../vuex/'
import { stringify } from 'qs'
import { extend } from '@/plugins/utils/'

// axios 配置
axios.defaults.timeout = 8000

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 404: console.log('请求404'); break
        case 500: console.log('请求500'); break
      }
    }
    console.log(error)
    return Promise.reject({ code: '-100', message: '网络异常请稍后再试！' })
  }
)

// 封装请求
export function fetch (url, opt = {}) {
  let params = opt.params || {}
  let data = opt.data || {}
  
  let fetchFlag = false

  const userInfo = store.state.userInfo
  const appHeader = {
    deviceId: userInfo.deviceId,
    memberId: userInfo.memberId,
    token: userInfo.token,
    platform: 'h5',
    timestamp: new Date().getTime(),
    versionCode: userInfo.versionCode,
    versionName: userInfo.versionName,
    model: {}
  }

  if (opt.appSet) {
    params = extend(true, {}, appHeader)
    data = extend(true, {}, appHeader)
    extend(true, params.model, opt.params)
    extend(true, data.model, opt.data)
  }

  if (opt.type && opt.type.toLowerCase() != 'get') {
    fetchFlag = true
  }

  return new Promise((resolve, reject) => {
    axios({
      method: opt.type || 'get',
      url: url,
      params: fetchFlag ? null : (opt.appSet ? { data: JSON.stringify(params) } : params),
      // 判断是否有自定义头部，以对参数进行序列化。不定义头部，默认对参数序列化为查询字符串。
      data: opt.headers ? (opt.appSet ? { data: JSON.stringify(data) } : data)
                        : (stringify(opt.appSet ? { data: JSON.stringify(data) } : data)),
      responseType: opt.dataType || 'json',
      // 设置默认请求头
      headers: opt.headers || {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
    })
    .then(response => {
      resolve(response.data)
    })
    .catch(error => {
      store.commit('SET_LOADING', false)
      reject(error)
    })
  })
}

export default axios
