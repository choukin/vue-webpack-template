import { fetch } from '@/plugins/http/axios'
import api from './conf'


/**
 * 基于axios封装请求
 * 获取主题详情
 * 需要app接口封装、打开appSet
 */
export const getTopics = (page, tab, limit) => {
  return fetch(api.top250, {
    // appSet: true,
    params: {
      start: page,
      count: limit
    }
  })
}
