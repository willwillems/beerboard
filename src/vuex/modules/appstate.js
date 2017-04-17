import {addBeerToUser} from '../../firebaseFunctions'

const state = {
  cart: [],
  board: []
}

const mutations = {
  clearCart (state) {
    state.cart = []
  },
  addUserToCart (state, {userID, beers}) {
    let userIndex = state.cart.findIndex(obj => {
      console.log(obj.uid, userID)
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
  }
}

const actions = {
  checkCartOut ({ state, commit }) {
    // console.log(state.cart)
    state.cart.forEach(function (user) {
      addBeerToUser(user)
    })
    commit('clearCart')
  }
}

export default {
  state,
  mutations,
  actions
}
