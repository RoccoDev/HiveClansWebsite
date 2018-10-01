const express = require('express');
const router = express.Router();
const Gen = require('../../snowflake.js')
const Clan = require('../../clan/clan.js')
const Gamemode = require('../../clan/gamemodes.js')


router.use(require('../user/middleware.js'))

router.post('/', (req, res) => {

    var members = {}
    var id = Gen.gen()
    members[req.user._id] = {id: req.user._id, name: req.user.name, role: "Owner", ignore: true}

    var consider = req.body.gamemode.replace(/\s/g, '').replace('/', '')
    if(!Gamemode.hasOwnProperty(consider)) {
        res.status(400).json({success: false})
        return
    }
    var gm = Gamemode[consider]

    var clan = {
        _id: id,
        name: req.body.name,
        nameLower: req.body.name.toLowerCase(),
        description: req.body.description,
        gamemode: gm.display,
        color: gm.color,
        addedAt: new Date().getTime(),
        members: members,
        owner: {
            id: req.user._id,
            name: req.user.name
        }
    }

    Clan.save(clan)
    res.json({success: true, id: id})
})



module.exports = router