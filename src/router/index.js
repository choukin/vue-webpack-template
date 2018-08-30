import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 分割页面组件
const List = resolve => require(['../views/List.vue'], resolve)
// const TabExample = resolve => require(['../views/TabExample.vue'], resolve)

const router = new Router({
  routes: [
    // 默认重定向
    {
      path: '',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      component: List
    }
  ]
})

export default router
