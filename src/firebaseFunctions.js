import * as lf from "localforage"
import {firebaseApp} from '@/firebase'

const db = firebaseApp.database()

export const addBeerToUser = function ({uid, beersInCart}, storeMutationsLocally) {
  db.ref(`houses/4356729193/users/${uid}`).transaction(function (user) {
    user.beers += beersInCart
    return user
  })

  const timeOfTransaction = (new Date()).getTime()
  db.ref(`history/${uid}/${timeOfTransaction}`).set({
    time: timeOfTransaction,
    beers: beersInCart,
    metaData: false
  })

  if (storeMutationsLocally) {
    lf.setItem(timeOfTransaction, {
      time: timeOfTransaction,
      uid,
      beersInCart
    }, function (err) {
      console.log(err)
    })
  }
}

export const logUser = function () {
  // console.log(auth.currentUser.uid)
}

export const signUserOut = function () {
  // promise, thenable
  return firebaseApp.auth().signOut()
}
