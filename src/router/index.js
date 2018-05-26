import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index'
import Start from '@/views/start'
import Find from '@/views/find'
import Login from '@/views/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Index',
      component: Index,
      children: [
        {
          path: '/start',
          name: 'Start',
          component: Start,
        },
        {
          path: '/find',
          name: 'Find',
          component: Find
        }
      ]
    }
  ],
  mode: 'history',
})
