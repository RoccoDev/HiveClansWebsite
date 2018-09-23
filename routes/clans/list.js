const express = require('express');
const router = express.Router();
const Clan = require("../../clan/clan.js")


router.get('/', (req, res) => {
    Clan.find({}, function(err, users) {
        res.json(users);
    });
})



module.exports = router