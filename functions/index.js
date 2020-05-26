const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

exports.addUserToDB = functions.auth.user().onCreate(function (event) {
  // Get the uid of the newly created user.
  var uid = event.data.uid

  return admin.database()
    .ref(`/settings`)
    .child(uid)
    .set({
      house: null,
      beers: 0,
      img: "/placeholder.png",
      date: Date.now()
    })
})

exports.addUserToHouse = functions.https.onRequest((req, res) => {
  // Grab the text parameter.
  var email = req.query.email
  var houseId = req.query.house
  var uid
  // check if the request is proper
  if (!email || !houseId) return res.status(400).send({ error: 'Need email and houseId' })
  if (req.method !== "POST") return res.status(400).send({ error: 'Only POST requests' })
  // write the data
  return admin.auth()
    .getUserByEmail(email)
    .then((userRecord) => {
      // Add the user record to the house object
      if (!userRecord) return res.status(400).send({ error: 'User record not found' })
      uid = userRecord.uid
      return admin.database()
        .ref(`houses/${houseId}/users/${uid}`)
        .set({
          uid,
          name: userRecord.displayName || "",
          img: "/placeholder.png",
          color: "",
          beers: 0
        })
    })
    .then(ref => {
      // add the house property to the user
      return admin.database()
        .ref(`settings/${uid}`)
        .update({ house: houseId })
    })
    .then(ref => res.status(200).send({ status: 'Data saved' }))
    .catch(e => {
      console.log("Error fetching user data:", e)
      res.status(500).send({ error: 'Something went wrong' })
    })
})

exports.createHouse = functions.https.onRequest((req, res) => {
  // Grab the text parameter.
  var name = req.query.name
  // check if the request is proper
  if (!name) return res.status(400).send({ error: 'Need a name' })
  if (req.method !== "POST") return res.status(400).send({ error: 'Only POST requests' })
  // write the data
  return admin.database()
    .ref(`houses`)
    .push({
      name,
      created: Date.now(),
      users: []
    })
    .then(ref => res.status(500).send({ status: 'House created', uid: ref.key }))
    .catch(e => {
      console.log("Error fetching user data:", e)
      res.status(500).send({ error: 'Something went wrong' })
    })
})
