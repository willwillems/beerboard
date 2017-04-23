import Vue from 'vue'
import Router from 'vue-router'
import BoardView from '@/components/BoardView'
import UserView from '@/components/UserView'

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
      path: '/user',
      name: 'User view',
      component: UserView
    }
  ]
})
