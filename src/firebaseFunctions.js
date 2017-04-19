import {firebaseApp} from './firebase'

const db = firebaseApp.database()
const auth = firebaseApp.auth()

auth.onAuthStateChanged(function (user) {
  console.log('thisisit', user)
})

export const addBeerToUser = function ({uid, beersInCart}) {
  db.ref(`houses/4356729193/users/${uid}`).transaction(function (user) {
    user.beers += beersInCart
    return user
  })
  // TODO catch error if history does not exist
  db.ref(`history/${uid}`).transaction(function (history) {
    // Firebase usually returns a null value while retrieving a
    // key for the first time but while saving it checks if
    // the new value is similar to older value or not.
    // If not, firebase will run the whole process again, and
    // this time the correct value is returned by the server
    if (history === null) {
      return {}
    }
    history[(new Date()).getTime()] = {
      time: (new Date()).getTime(),
      beers: beersInCart,
      metaData: false
    }
    return history
  })
}

export const logUser = function () {
  console.log(auth.currentUser.uid)
}
