const express = require('express');
const router = express.Router();
const Clan = require("../../clan/clan.js")


router.get('/', (req, res) => {
    Clan.list(function(clans) {
        res.json(Object.values(clans));
    });
})



module.exports = router