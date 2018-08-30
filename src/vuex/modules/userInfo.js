import * as types from '../types'

// 设备及用户信息
const state = {
  token: ''
}

const mutations = {
  [types.SET_BASEINFO] (state, data) {
    for (let key in data) {
      state[key] = data[key]
    }
  }
}

const actions = {
  setBaseInfo ({ commit }, obj) {
    commit(types.SET_BASEINFO, obj)
  }
}

const getters = {
  userInfo: (state) => state
}

export default {
  state,
  actions,
  mutations,
  getters
}
