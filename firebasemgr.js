var admin = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.cert({
        projectId: 'hiveclans-1470f',
        clientEmail: 'firebase-adminsdk-21igf@hiveclans-1470f.iam.gserviceaccount.com',
        privateKey: process.env.FIREBASE_KEY.replace(/\\n/g, '\n')
    }),
    databaseURL: "https://hiveclans-1470f.firebaseio.com"

});

module.exports = admin