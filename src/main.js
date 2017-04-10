// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueFire from 'vuefire'
var firebase = require('firebase')

Vue.use(VueFire)

var firebaseApp = firebase.initializeApp({
  databaseURL: "https://beerboard-1367.firebaseio.com/"
})
var db = firebaseApp.database()

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  firebase: {
    // simple syntax, bind as an array by default
    anArray: db.ref('test')
  },
  router,
  template: '<App/>',
  components: { App }
})
