const express = require('express');
const router = express.Router();
const Clan = require("../../clan/clan.js")



router.use('/:id', (req, res, next) => {

    Clan.find({_id: req.params.id}, function(err, clans) {
        if(err) {
            res.sendStatus(404)
            return;
        }
        var clan = clans[0]
        const jwt = require("jsonwebtoken")
        var token = req.headers['x-access-token'];
        if (token) {
            var decoded = jwt.verify(token, process.env.SECRET)

            if(clan.owner.id === decoded.user._id.toString()) {
                req.currentUserIsOwner = true
            }
        }

        req["clan"] = clan
        next()
    });

})

router.get('/:id', (req, res) => {
    var clan = req.clan.toObject()
    if(req.currentUserIsOwner) {
        clan.currentUserIsOwner = true
    }
    res.json(clan)
})
router.use('/:id/edit', require('./edit/members.js'))
router.use('/:id/edit/general', require('./edit/text.js'))




module.exports = router