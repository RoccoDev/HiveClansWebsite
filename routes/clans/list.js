const express = require('express');
const router = express.Router();
const Clan = require("../../clan/clan.js")


router.get('/', (req, res) => {
    Clan.list(function(clans) {
        res.json(Object.keys(clans).map(function(key) {
            return clans[key];
        }));
    });
})



module.exports = router