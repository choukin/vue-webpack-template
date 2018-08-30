import * as types from '../types'

const state = {
  loadingState: false // loading状态
}

const mutations = {
  // loading显示隐藏切换
  [types.SET_LOADING] (state, status) {
    state.loadingState = status
  }
}

const actions = {
  // 设置loading显示隐藏
  setLoading ({commit}, status) {
    commit(types.SET_LOADING, status)
  }
}

const getters = {
  loadingState: state => state.loadingState
}

export default {
  state,
  getters,
  mutations,
  actions
}
