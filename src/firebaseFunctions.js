import * as localforage from "localforage"
import {firebaseApp} from '@/firebase'

const db = firebaseApp.database()

export const dbMutationsStore = localforage.createInstance({
  name: "stored database mutations"
})

export const addBeerToUser = function ({uid, beersInCart, time}, storeMutationsLocally) {
  let timeOfTransaction = (new Date()).getTime()
  if (time) {
    timeOfTransaction = time
  }

  db.ref(`houses/4356729193/users/${uid}`).transaction(function (user) {
    if (user === null) return 0
    user.beers += beersInCart
    return user
  })

  db.ref(`history/${uid}/${timeOfTransaction}`).set({
    time: timeOfTransaction,
    beers: beersInCart,
    metaData: false
  })

  if (storeMutationsLocally) {
    dbMutationsStore.setItem(String(timeOfTransaction), {
      time: timeOfTransaction,
      uid,
      beersInCart
    }, function (err) {
      console.log(err)
    })
  }
}

export const entryExistInFirebase = function (path, key) {
  db.ref(path).once('value', function (snapshot) {
    return snapshot.exists()
  })
}

export const logUser = function () {
  // console.log(auth.currentUser.uid)
}

export const signUserOut = function () {
  // promise, thenable
  return firebaseApp.auth().signOut()
}
