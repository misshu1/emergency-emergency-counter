const firebase = require("firebase-admin")
require("dotenv").config()

const {
    FIREBASE_ADMIN_JSON_PROJECT_ID,
    FIREBASE_ADMIN_JSON_CLIENT_EMAIL,
    FIREBASE_DATABASE_URL,
    FIREBASE_ADMIN_JSON_PRIVATE_KEY,
} = process.env

if (!firebase.apps.length) {
    firebase.initializeApp({
        credential: firebase.credential.cert({
            projectId: FIREBASE_ADMIN_JSON_PROJECT_ID,
            clientEmail: FIREBASE_ADMIN_JSON_CLIENT_EMAIL,
            privateKey: FIREBASE_ADMIN_JSON_PRIVATE_KEY,
        }),
        databaseURL: FIREBASE_DATABASE_URL,
    })
}

const db = firebase.firestore()
const employeesRef = userId => db.collection("employees").doc(userId)

exports.handler = async function (event, context) {
    const query = event.queryStringParameters

    if (query.userId) {
        return employeesRef(query.userId)
            .get()
            .then(doc => {
                if (!doc.exists) {
                    return {
                        statusCode: 404,
                        body: JSON.stringify(`The employee id was not found!`),
                    }
                } else {
                    return employeesRef(query.userId)
                        .update({
                            isAtWork: true,
                            emergencyCheckIn: firebase.firestore.FieldValue.serverTimestamp(),
                        })
                        .then(() => {
                            return {
                                statusCode: 200,
                                body: JSON.stringify(
                                    `Updated employee with ID: ${query.userId}`
                                ),
                            }
                        })
                        .catch(err => {
                            return {
                                statusCode: 500,
                                body: JSON.stringify(
                                    `Failed to update employee data! 
                                    ${err}`
                                ),
                            }
                        })
                }
            })
            .catch(err => {
                return {
                    statusCode: 502,
                    body: JSON.stringify(
                        `Failed to get employee!
                        ${err}`
                    ),
                }
            })
    }

    return {
        statusCode: 400,
        body: JSON.stringify("Bad Request!"),
    }
}
