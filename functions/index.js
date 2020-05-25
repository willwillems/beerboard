const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

// ---------------------- WARNING ----------------------
// This code is not compatibe with the new 1.0 API, DO NOT DEPLOY
// BEFORE REFACTORING!

exports.addUserToDB = functions.auth.user().onCreate(function (userRecord, context) {
  // Get the uid and display name of the newly created user.
  var uid = userRecord.uid
  var email = userRecord.email
  var house
  // Start data for the user
  var beers
  var img
  var name

  admin.database()
    .ref(`/invites`)
    .orderByChild("email")
    .equalTo(email)
    .once('value')
    .then(function (snapshot) {
      var invite = snapshot.val()
      var data
      try {
        data = invite[Object.keys(invite)[0]]
      } catch (e) {
        return Promise.reject("No invite was present")
      }
      house = data.house
      // If data is specified in the invite use it else use defaults
      beers = data.beers || 0
      img = data.img || "/placeholder.png"
      name = data.name || userRecord.displayName || "unknown"

      return admin.database()
        .ref(`/settings`)
        .child(uid)
        .set({
          house,
          date: Date.now()
        })
    })
    .then(function () {
      return admin.database()
        .ref(`/houses/${house}/users`)
        .child(uid)
        .set({
          beers,
          img,
          name,
          uid
        })
    })
    .catch(function (e) {
      console.log(e)
    })
})
