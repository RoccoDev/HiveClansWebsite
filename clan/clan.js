const mongoose = require('mongoose');
const schema = mongoose.Schema;

module.exports = mongoose.model('Clan', new schema({
    name: String,
    description: String,
    gamemode: String,
    owner: {
        id: String,
        name: String
    },
    addedAt: Number,
    members: [
        {
            id: String,
            name: String,
            role: String
        }
    ]

}))