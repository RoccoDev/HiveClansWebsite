const express = require('express');
const router = express.Router();
const Clan = require("../../clan/clan.js")
const functions = require('firebase-functions');



router.use('/:id', (req, res, next) => {

    Clan.get(req.params.id, function(clan) {
        if(clan == null) {
            res.sendStatus(404)
            return;
        }

        const jwt = require("jsonwebtoken")
        var token = req.headers['x-access-token'];
        if (token) {
            try {
                var decoded = jwt.verify(token, functions.config().someservice.secret)
                if (clan.owner.id === decoded.user._id) {
                    req.currentUserIsOwner = true
                }
            } catch(err) {}
        }

        req["clan"] = clan
        next()
    });

})

router.get('/:id', (req, res) => {
    var clan = req.clan
    if(req.currentUserIsOwner) {
        clan.currentUserIsOwner = true
    }
    res.json(clan)
})
router.use('/:id/edit', require('./edit/members.js'))
router.use('/:id/edit/general', require('./edit/text.js'))
router.use('/:id/edit/image', require('./edit/image.js'))




module.exports = router