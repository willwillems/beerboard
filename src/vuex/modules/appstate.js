import {addBeerToUser} from '../../firebaseFunctions'

const state = {
  cart: [],
  board: [],
  touchOverlayUser: {},
  settingsMenuOpen: false,
  settingsMenuVisible: true,
  authModalIsActive: false,
  serverConnectionActive: true
}

const mutations = {
  toggleSettings (state) {
    state.settingsMenuOpen = !state.settingsMenuOpen
  },
  setSettings (state, {newState}) {
    state.settingsMenuOpen = newState
  },
  setSettingsMenuVisibility (state, {visible}) {
    state.settingsMenuVisible = visible
  },
  toggleAuthModal (state) {
    state.authModalIsActive = !state.authModalIsActive
  },
  setAuthModal (state, {newState}) {
    state.authModalIsActive = newState
  },
  setServerConnectionState (state, {newState}) {
    state.serverConnectionActive = newState
  },
  clearCart (state) {
    state.cart = []
  },
  addUserToCart (state, {userID, beers}) {
    let userIndex = state.cart.findIndex(obj => {
      return obj.uid === userID
    })
    // A try catch structure might be better
    if (userIndex === -1) {
      // spread operator for objects is not yet in ECMAscript :(
      state.cart = [{uid: userID, beersInCart: 0}, ...state.cart]
      userIndex = 0
    }

    console.log(userIndex, state.cart, userID)
    state.cart[userIndex].beersInCart += beers
  },
  removeUserFromCart (state, {userID, beers}) {
    let userIndex = state.cart.findIndex(obj => {
      return String(obj.uid) === String(userID)
    })
    // If the user is not present exit
    if (userIndex === -1) return
    state.cart[userIndex].beersInCart -= beers
    // If there are no beers left delete user form cart
    if (state.cart[userIndex].beersInCart <= 0) {
      state.cart.splice(userIndex, 1)
    }
  },
  activateTouchOverlayWithUser (state, {user}) {
    state.touchOverlayUser = user
  },
  deactivateTouchOverlay (state) {
    state.touchOverlayUser = {}
  }
}

const actions = {
  checkCartOut ({ state, commit }) {
    // console.log(state.cart)
    state.cart.forEach(function (user) {
      addBeerToUser(user, !state.serverConnectionActive)
    })
    commit('clearCart')
  }
}

export default {
  state,
  mutations,
  actions
}
