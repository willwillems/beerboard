var firebase = require('firebase')

var firebaseApp = firebase.initializeApp({
  databaseURL: "https://beerboard-1367.firebaseio.com/"
})
var db = firebaseApp.database()

export default {
  // simple syntax, bind as an array by default
  anArray: db.ref('test')
}
