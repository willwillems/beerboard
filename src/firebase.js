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
const db = firebase.database()

export var firebaseApp = firebase

export default function () {
  return {
    boardUsersArray: db.ref('houses/4356729193/users'),
    boardUsers: {
      source: db.ref('houses/4356729193/users'),
      // optionally bind as an object
      asObject: true
    },
    user: {
      source: db.ref('houses/4356729193/users/lsPLXjCdZyOKWDF0570kfe1Le5e2'),
      // optionally bind as an object
      asObject: true
    }
  }
}
