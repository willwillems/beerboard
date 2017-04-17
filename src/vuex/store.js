import Vue from 'vue'
import Vuex from 'vuex'
// import * as actions from './actions'
// import * as getters from './getters'
import settings from './modules/settings'
import appstate from './modules/appstate'

Vue.use(Vuex)

export default new Vuex.Store({
  // actions,
  // getters,
  modules: {
    settings,
    appstate
  },
  strict: true
})
