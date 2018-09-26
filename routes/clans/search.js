const express = require('express');
const router = express.Router();
const Clan = require("../../clan/clan.js")




router.get('/', (req, res) => {
    var query = req.query
    var name = query.name
    Clan.findStarts({key: "nameLower", value: name.toLowerCase()}, function(clans) {
        if(clans == null) {
            res.json([])
            return;
        }
        res.status(200).json(Object.values(clans))
    })

})




module.exports = router