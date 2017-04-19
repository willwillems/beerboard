import Vue from 'vue'
import Router from 'vue-router'
import BoardView from '@/components/BoardView'
import LoginView from '@/components/LoginView'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Board view',
      component: BoardView
    },
    {
      path: '/login',
      name: 'Login view',
      component: LoginView
    }
  ]
})
