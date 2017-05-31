const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

var Mailgun = require('mailgun-js')
var apikey = 'key'

var mailgun = new Mailgun({
  apiKey: apikey,
  domain: "mg.beerboard.nl"})

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
  var data = {
  // Specify email data
    from: "test@beerboard.nl",
  // The email to contact
    to: "test@test.com",
  // Subject and text data
    subject: 'Hello from Mailgun',
    html: 'Hello, This is not a plain-text email, I wanted to test some spicy Mailgun sauce in NodeJS! <a href="lol">Click here to add your email address to a mailing list</a>'
  }
  // Invokes the method to send emails given the above data with the helper library
  mailgun.messages().send(data, function (err, body) {
    // If there is an error, render the error page
    if (err) {
      response.send("error from Firebase!")
    } else {
      response.send("all good from Firebase!")
    }
  })
})

exports.addUserToDB = functions.auth.user().onCreate(function (event) {
  // Get the uid and display name of the newly created user.
  var uid = event.data.uid
  var displayName = event.data.displayName || "unknown"
  var email = event.data.email
  var house

  admin.database()
    .ref(`/invites`)
    .orderByChild("email")
    .equalTo(email)
    .once('value')
    .then(function (snapshot) {
      var invite = snapshot.val()
      try {
        house = invite[Object.keys(invite)[0]].house
      } catch (e) {
        return Promise.reject("No invite was present")
      }
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
          beers: 0,
          name: displayName,
          uid
        })
    })
    .catch(function (e) {
      console.log(e)
    })
})
