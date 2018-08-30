// Store
import Vue from 'vue'
import Vuex from 'vuex'

import * as actions from './actions'

import userInfo from './modules/userInfo'
import common from './modules/common'

Vue.use(Vuex)

// 严格模式开启
const debug = process.env.NODE_ENV !== 'production'

// 创建 store 实例
export default new Vuex.Store({
  actions,
  modules: {
    userInfo,
    common
  },
  strict: debug
})
