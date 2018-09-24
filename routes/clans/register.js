const express = require('express');
const router = express.Router();
const Clan = require("../../clan/clan.js")


router.use(require('../user/middleware.js'))

router.post('/', (req, res) => {
    var clan = new Clan({
        name: req.body.name,
        description: req.body.description,
        gamemode: req.body.gamemode,
        addedAt: new Date().getTime(),
        owner: {
            id: req.user._id,
            name: req.user.name
        }
    })

    clan.save((err) => {
        if(err) throw err
        console.log("Clan saved")
        res.json({success: true})
    })
})



module.exports = router