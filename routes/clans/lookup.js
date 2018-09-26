const express = require('express');
const router = express.Router();
const Clan = require("../../clan/clan.js")



router.use('/:id', (req, res, next) => {

    Clan.get(req.params.id, function(clan) {
        if(clan == null) {
            res.sendStatus(404)
            return;
        }

        const jwt = require("jsonwebtoken")
        var token = req.headers['x-access-token'];
        if (token) {
            var decoded = jwt.verify(token, process.env.SECRET)
            if(clan.owner.id === decoded.user._id) {
                clan["currentUserIsOwner"] = true
            }
        }

        req["clan"] = clan
        next()
    });

})

router.get('/:id', (req, res) => {
    res.json(req.clan)
})
router.use('/:id/edit', require('./edit/members.js'))
router.use('/:id/edit/general', require('./edit/text.js'))




module.exports = router