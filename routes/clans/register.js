const express = require('express');
const router = express.Router();
const Gen = require('../../snowflake.js')
const Clan = require('../../clan/clan.js')


router.use(require('../user/middleware.js'))

router.post('/', (req, res) => {

    var members = {}
    members[req.user._id] = {id: req.user._id, name: req.user.name, role: "Owner"}
    var clan = {
        _id: Gen.gen(),
        name: req.body.name,
        nameLower: req.body.name.toLowerCase(),
        description: req.body.description,
        gamemode: req.body.gamemode,
        addedAt: new Date().getTime(),
        members: members,
        owner: {
            id: req.user._id,
            name: req.user.name
        }
    }

    Clan.save(clan)
    res.json({success: true})
})



module.exports = router