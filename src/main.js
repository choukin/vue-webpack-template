// 公用样式
import './assets/style/reset.css'

// Libs
import Vue from 'vue'
import router from './router/'
import { sync } from 'vuex-router-sync'
import store from './vuex/'
import fastclick from 'fastclick'
import 'object-assign-polyfill'


// 业务模块
import App from './App'
import { toast, messageBox } from '@/plugins/utils'

if (process.env.NODE_ENV !== 'production') {
  // const Vconsole = require('vconsole')
  /* eslint-disable no-new */
  // new Vconsole()
}

// import http from './plugins/http/'
// Vue.use(http)

Vue.config.productionTip = false  // 关闭生产提示
sync(store, router) // 路由信息同步store

// FastClick
document.addEventListener('DOMContentLoaded', function () {
  fastclick.attach(document.body)
})


// 信息框 & Toast
 
window.toast = toast
window.messageBox = messageBox

main({
  memberId: '',
  token: ''
})

// 业务入口
function main (baseInfo) {
  store.dispatch('setBaseInfo', baseInfo)

  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
  })
}
