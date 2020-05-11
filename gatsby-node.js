const url = require("url")
const firebase = require("firebase-admin")
const serviceAccount = require("./firebaseServiceAccount.json")
require("dotenv").config()

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: `${process.env.FIREBASE_DATABASE_URL}`,
})
const db = firebase.firestore()
const employeesRef = userId => db.collection("employees").doc(userId)

exports.onCreateDevServer = ({ app }) => {
  app.get("/api/emergencyCheckIn", function (req, res) {
    const url_parts = url.parse(req.url, true)
    const query = url_parts.query

    if (query.userId) {
      employeesRef(query.userId)
        .get()
        .then(doc => {
          if (!doc.exists) {
            console.log("The employee id was not found!")
          } else {
            employeesRef(query.userId)
              .update({
                emergencyCheckIn: firebase.firestore.FieldValue.serverTimestamp(),
              })
              .then(console.log("Updated employee with ID: ", query.userId))
              .catch(err => console.log("Failed to update employee data!", err))
          }
        })
        .catch(err => {
          console.log("Failed to get employee!", err)
        })
    }

    res.send(401, "Not authorized!")
  })

  app.get("/api/isAtWork", function (req, res) {
    const url_parts = url.parse(req.url, true)
    const query = url_parts.query
    let isAtWork = null

    try {
      isAtWork = JSON.parse(query.isAtWork)
    } catch (error) {
      console.log('"isAtWork" must me true or false')
    }

    if (query.userId && isAtWork !== null) {
      employeesRef(query.userId)
        .get()
        .then(doc => {
          if (!doc.exists) {
            console.log("The employee id was not found!")
          } else {
            employeesRef(query.userId)
              .update({
                isAtWork: isAtWork === true ? true : false,
                emergencyCheckIn: null,
              })
              .then(console.log("Updated employee with ID: ", query.userId))
              .catch(err => console.log("Failed to update employee data!", err))
          }
        })
        .catch(err => {
          console.log("Failed to get employee!", err)
        })
    }

    res.send(401, "Not authorized!")
  })
}
