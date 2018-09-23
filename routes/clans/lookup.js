const express = require('express');
const router = express.Router();
const Clan = require("../../clan/clan.js")



router.use('/:id', (req, res, next) => {

    Clan.find({_id: req.params.id}, function(err, clans) {
        req["clan"] = clans[0]
        next()
    });

})

router.get('/:id', (req, res) => {

        res.json(req.clan)
})
router.use('/:id/edit', require('./edit/members.js'))
router.use('/:id/edit/general', require('./edit/text.js'))




module.exports = router