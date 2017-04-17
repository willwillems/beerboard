import {addBeerToUser} from '../../firebaseFunctions'

const state = {
  cart: [],
  board: []
}

const mutations = {
  toggleSpinner (state) {
    state.spinnerActive = !state.spinnerActive
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
  // DO NOT MUTATE STATE OUTSIDE OF MUTATION
  /* checkCartOut ({ state, commit }) {
    state.cart.forEach(function (e) {
      addBeerToUser()
    })
    return
  } */
}

export default {
  state,
  mutations
}
