import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index'
import Start from '@/views/start'
import Find from '@/views/find'
import Login from '@/views/login'
import Record from '@/views/record'
import UserManagement from '@/views/user-manage'
import NotFound from '@/views/404'

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
        },
        {
          path: '/record',
          name: 'Record',
          component: Record
        },
        {
          path: '/user-management',
          name: 'User-Management',
          component: UserManagement
        }
      ]
    },
    {
      path: '*',
      name: '404',
      component: NotFound
    }
  ],
  mode: 'history',
})
