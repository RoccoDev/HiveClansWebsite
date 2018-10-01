const functions = require('firebase-functions');

module.exports = {
    secret: functions.config().someservice.secret,
    database: process.env.MONGO_URL
}