const express = require('express');
const router = express.Router();



router.use(require('../../user/middleware.js'))

Array.prototype.removeIf = function(callback) {
    var i = 0;
    while (i < this.length) {
        if (callback(this[i], i)) {
            this.splice(i, 1);
        }
        else {
            ++i;
        }
    }
};


router.post('/addMember', (req, res) => {
    var clan = req.clan
    var user = req.user
    if(clan.owner.id !== user._id) {
        res.sendStatus(403)
        return;
    }
    clan.members.push({
        id: req.body.id,
        name: req.body.name,
        role: req.body.role
    })

    clan.save((err) => {
        if(err) throw err
        res.json({success: true})
    })

})

router.post('/removeMember', (req, res) => {
    var clan = req.clan
    var user = req.user
    if(clan.owner.id !== user._id) {
        res.sendStatus(403)
        return;
    }


    clan.members.removeIf((item) => {
        return item._id === req.body.id
    })

    clan.save((err) => {
        if(err) throw err
        res.json({success: true})
    })

})



module.exports = router