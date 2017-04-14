var firebase = require('firebase')

import {FIREBASE_DB} from './constants'

var firebaseApp = firebase.initializeApp({
  databaseURL: FIREBASE_DB
})
var db = firebaseApp.database()

export default function () {
  return {
    // simple syntax, bind as an array by default
    boardUsers: db.ref('users')
  }
}
