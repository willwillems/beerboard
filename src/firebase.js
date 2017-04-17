var firebase = require('firebase')

import {FIREBASE_DB} from './constants'

export var firebaseApp = firebase.initializeApp({
  databaseURL: FIREBASE_DB
})
const db = firebaseApp.database()

export default function () {
  return {
    boardUsersArray: db.ref('users'),
    boardUsers: {
      source: db.ref('users'),
      // optionally bind as an object
      asObject: true
    }
  }
}
