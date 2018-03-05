var firebase = require('firebase')

import * as c from './constants'

firebase.initializeApp({
  apiKey: c.FIREBASE_API_KEY,
  authDomain: c.FIREBASE_AUTH,
  databaseURL: c.FIREBASE_DB,
  projectId: c.FIREBASE_PROJECT_ID,
  storageBucket: c.FIREBASE_STORAGE,
  messagingSenderId: c.FIREBASE_MESSAGE_ID
})
export const db = firebase.database()
export const auth = firebase.auth()

export var firebaseApp = firebase

var house = ""
export const houseID = () => house

export const activateFirebaseUserRefs = function (vm) {
  /*
  This funky construction takes the VueComponent(this) and updates
  the values that were previously occupied by the firebasePlaceholders
  in the data section of the component. This is necessairy because the
  user uid and the house value are not avaliable at page load so the ref's
  need to be updated later. This was the DRY-est solution I could find...
  */
  let firebaseRefsAreActivated = false
  const unsubscribe = firebaseApp.auth().onAuthStateChanged((authUser) => {
    if (authUser) {
      // first read the house from the db that corresponds with the user
      db.ref(`/settings/${authUser.uid}`).once('value').then(function (snapshot) {
        house = snapshot.val().house
        vm.$bindAsObject('boardUsersArray', db.ref(`houses/${house}/users`))
        vm.$bindAsArray('boardUsers', db.ref(`houses/${house}/users`))
        vm.$bindAsObject('user', db.ref(`houses/${house}/users/${authUser.uid}`))
        vm.$bindAsObject('userHistory', db.ref(`history/${house}/${authUser.uid}`))
        firebaseRefsAreActivated = true
      })
    }
  })
  if (firebaseRefsAreActivated) {
    unsubscribe()
  }
}

export const firebasePlaceholders = {
  boardUsersArray: [],
  boardUsers: {},
  user: {},
  userHistory: {}
}
