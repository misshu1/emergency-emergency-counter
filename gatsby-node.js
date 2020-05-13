const url = require("url")
const firebase = require("firebase-admin")
require("dotenv").config()

const serviceAccount = {
    projectId: `${process.env.FIREBASE_ADMIN_JSON_PROJECT_ID}`,
    privateKey: `${process.env.FIREBASE_ADMIN_JSON_PRIVATE_KEY}`,
    clientEmail: `${process.env.FIREBASE_ADMIN_JSON_CLIENT_EMAIL}`,
}

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
            return employeesRef(query.userId)
                .get()
                .then(doc => {
                    if (!doc.exists) {
                        return res
                            .status(404)
                            .send(`The employee id was not found!`)
                    } else {
                        return employeesRef(query.userId)
                            .update({
                                isAtWork: true,
                                emergencyCheckIn: firebase.firestore.FieldValue.serverTimestamp(),
                            })
                            .then(() => {
                                return res
                                    .status(200)
                                    .send(
                                        `Updated employee with ID: ${query.userId}`
                                    )
                            })
                            .catch(err => {
                                return res
                                    .status(500)
                                    .send(
                                        `Failed to update employee data! ${err}`
                                    )
                            })
                    }
                })
                .catch(err => {
                    return res
                        .status(502)
                        .send(`Failed to get employee! ${err}`)
                })
        }
        return res.status(400).send(`Bad Request!`)
    })

    app.get("/api/isAtWork", function (req, res) {
        const url_parts = url.parse(req.url, true)
        const query = url_parts.query
        let isAtWork = null

        try {
            isAtWork = JSON.parse(query.isAtWork)
            if (typeof isAtWork !== "boolean") {
                return res.status(400).send(`"isAtWork" must be true or false!`)
            }
        } catch (err) {
            return res.status(400).send(`"isAtWork" must be true or false!`)
        }

        if (query.userId && typeof isAtWork === "boolean") {
            return employeesRef(query.userId)
                .get()
                .then(doc => {
                    if (!doc.exists) {
                        return res
                            .status(404)
                            .send(`The employee id was not found!`)
                    } else {
                        return employeesRef(query.userId)
                            .update({
                                isAtWork,
                                emergencyCheckIn: null,
                            })
                            .then(() => {
                                return res
                                    .status(200)
                                    .send(
                                        `Updated employee with ID: ${query.userId}`
                                    )
                            })
                            .catch(err => {
                                return res
                                    .status(500)
                                    .send(
                                        `Failed to update employee data! ${err}`
                                    )
                            })
                    }
                })
                .catch(err => {
                    return res
                        .status(502)
                        .send(`Failed to get employee! ${err}`)
                })
        }
        return res.status(400).send(`Bad Request!`)
    })
}
