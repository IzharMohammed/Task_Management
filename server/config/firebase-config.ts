import admin from "firebase-admin";

const serviceAccount = require("./task-Management.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;