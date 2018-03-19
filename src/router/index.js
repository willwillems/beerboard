import Vue from 'vue'
import Router from 'vue-router'

import * as c from '@/constants'
import { auth } from '@/firebase'

import BoardView from '@/components/BoardView'
import UserView from '@/components/UserView'
import HomeView from '@/components/HomeView'
import AdminView from '@/components/AdminView'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/board',
      name: 'Board view',
      component: BoardView
    },
    {
      path: '/user',
      name: 'User view',
      component: UserView
    },
    {
      path: '/',
      name: 'Home view',
      component: HomeView
    },
    {
      path: '/admin',
      name: 'Admin view',
      component: AdminView
    },
    {
      path: '/demo',
      name: 'demo route',
      beforeEnter (to, from, next) {
        auth.signInWithEmailAndPassword(c.DEMO_EMAIL, c.DEMO_PASSWORD)
          .then(() => {
            next({ name: 'Board view' })
          })
          .catch(e => {
            next(e)
          })
      }
    }
  ]
})
