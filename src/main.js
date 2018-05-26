import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import '@/assets/normalize.min.css';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store'
Vue.config.productionTip = false
Vue.use(ElementUI)
/* eslint-disable no-new */

//全局路由钩子，得放在router前，不然无效
import { get_token } from '@/utils/auth' // 验权
const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  if (get_token()) {                    //首先检测cookies里有无token
    if (to.path === '/login') {         //有，且目标页面是登录页，就跳过登录
      next({ path: '/' })               //直接进入首页
    } else {
      if (store.state.username === '') {        //有token，但是没有用户信息
        store.dispatch('GetInfo').then(res => { // 拉取用户信息
          next()                                // 拉起完用户信息后放行
        })
      }
      else {
        next();                                 //有token也有用户信息，放行
      }
    }
  } else {                                      //cookies里没有token
    if (whiteList.indexOf(to.path) !== -1) {    //检测是否是白名单路由
      next()                                    //是，放行
    } else {
      next('/login')                            //不是，跳转到登录
    }
  }
})


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})



