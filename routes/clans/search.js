const express = require('express');
const router = express.Router();
const Clan = require("../../clan/clan.js")




router.get('/', (req, res) => {
    var query = req.query
    var name = query.name
    Clan.find({name: {"$regex": name, "$options": "i"}}, function(err, clans) {
        if(err) {
            res.json([])
            return;
        }
        res.status(200).json(clans)
    })

})




module.exports = router