var firebase = require('firebase')

var firebaseApp = firebase.initializeApp({
  databaseURL: "https://beerboard-1367.firebaseio.com/"
})
var db = firebaseApp.database()

export default function () {
  return {
    // simple syntax, bind as an array by default
    boardUsers: db.ref('users')
  }
}
