var admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp({
    credential: admin.credential.cert({
        projectId: 'hiveclans-1470f',
        clientEmail: 'firebase-adminsdk-21igf@hiveclans-1470f.iam.gserviceaccount.com',
        privateKey:functions.config().someservice.key.replace(/\\n/g, '\n')
    }),
    databaseURL: "https://hiveclans-1470f.firebaseio.com",
    storageBucket: "hiveclans-1470f.appspot.com"

});

module.exports = admin
