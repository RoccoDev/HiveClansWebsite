const express = require('express');
const app = express();
const functions = require('firebase-functions');
var cors = require('cors')

var bodyParser  = require('body-parser');



app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({type: "*/*"}));

app.get('/', (req, res) => {
    res.status(200).send("Hi")
})

app.use('/api', require('./routes/api/index.js'))
app.use('/user', require('./routes/user/index.js'))
app.use('/clan', require('./routes/clans/index.js'))

app.listen(process.env.PORT || 8080, () => {
    console.log("Server started.")
})

exports.api = functions.https.onRequest(app);
