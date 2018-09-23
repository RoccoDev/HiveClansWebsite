const express = require('express');
const app = express();

const config = require('./db.js');
var bodyParser  = require('body-parser');

var mongoose    = require('mongoose');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200).send("Hi")
})

app.use('/api', require('./routes/api/index.js'))
app.use('/user', require('./routes/user/index.js'))
app.use('/clan', require('./routes/clans/index.js'))

app.listen(process.env.PORT || 8080, () => {
    console.log("Server started.")
})

mongoose.connect(config.database)
app.set('dbSecret', config.secret)
