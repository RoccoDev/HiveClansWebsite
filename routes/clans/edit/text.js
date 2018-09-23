const express = require('express');
const router = express.Router();



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

    clan.save((err) => {
        if(err) throw err
        res.json({success: true})
    })

})

module.exports = router