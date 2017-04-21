import {firebaseApp} from '@/firebase'

const db = firebaseApp.database()

export const addBeerToUser = function ({uid, beersInCart}) {
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
}

export const logUser = function () {
  // console.log(auth.currentUser.uid)
}

export const signUserOut = function () {
  // promise, thenable
  return firebaseApp.auth().signOut()
}
