// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueFire from 'vuefire'
import Vuex from 'vuex'

// Activate service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/static/serviceworker.js')

  // Warm up the cache on that very first use
  if (!navigator.serviceWorker.controller) {
    navigator.serviceWorker.addEventListener('controllerchange', function changeListener () {
      // We only care about this once.
      navigator.serviceWorker.removeEventListener('controllerchange', changeListener)
    })
  }
}

Vue.use(Vuex)

Vue.use(VueFire)

Vue.config.productionTip = false

/* eslint-disable no-new */
export default new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
