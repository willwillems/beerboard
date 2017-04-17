import {firebaseApp} from './firebase'

const db = firebaseApp.database()

export const addBeerToUser = function ({uid, beersInCart}) {
  db.ref(`users/${uid}`).transaction(function (user) {
    user.beers += beersInCart
    return user
  })
}
