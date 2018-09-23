const mongoose = require('mongoose');
const schema = mongoose.Schema;


module.exports = mongoose.model('User', new schema({
    name: String,
    password: String
}))