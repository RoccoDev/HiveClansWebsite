const express = require('express');
const router = express.Router();
const Clan = require('../../../clan/clan.js')


router.use(require('../../user/middleware.js'))


router.post('/', (req, res) => {
    var clan = req.clan
    var user = req.user
    if(clan.owner.id !== user._id) {
        res.sendStatus(403)
        return;
    }
    if(req.body.description) {
        clan.description = req.body.description
    }
    if(req.body.name) {
        clan.name = req.body.name
    }
    if(req.body.gamemode) {
        clan.gamemode = req.body.gamemode
    }
    if(req.body.applicationUrl) {
        clan.applicationUrl = req.body.applicationUrl
    }
    if(req.body.forumUrl) {
        clan.forumUrl = req.body.forumUrl
    }

    Clan.save(clan)
    res.json({success: true})
})

router.post('/delete', (req, res) => {
    var clan = req.clan
    var user = req.user
    if(clan.owner.id !== user._id) {
        res.sendStatus(403)
        return;
    }
    Clan.remove(clan._id)
    res.json({success: true})
})

module.exports = router