const express = require('express');
const router = express.Router();
const User = require("../../../user/user.js")


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


router.post('/addMemberNoId', (req, res) => {
    var clan = req.clan
    var user = req.user
    if(clan.owner.id !== user._id) {
        res.sendStatus(403)
        return;
    }

    User.find({name: req.body.name}, function(err, users) {
        var id = -1;
        var name = req.body.name;
        if(!err && users.length != 0) {
            id = users[0]._id;
        }
        clan.members.push({
            id: id,
            name: name,
            role: req.body.role
        })

        clan.save((err) => {
            if(err) throw err
            res.json({success: true})
        })
    })


})


router.post('/addMembersSerialize', (req, res) => {
    var clan = req.clan
    var user = req.user
    if (clan.owner.id !== user._id) {
        res.sendStatus(403)
        return;
    }
    res.sendStatus(200)
    const qs = require('qs')
    var rawbody = ''
    var body = req.body
    console.log("Body: " + body)
    for (var i in body) {

        rawbody += (i + '=' + body[i] + '&')
    }
    console.log("Raw: " + rawbody)
    const parsed = qs.parse(rawbody)
    const arr = parsed.adding;

    var promises = []

    for (var j in arr) {
        if (!arr.hasOwnProperty(j)) continue;
        var obj = arr[j];
        promises.push(User.findOne({name: {"$regex": "^" + obj.name, "$options": "i"}}).exec())
    }

    Promise.all(promises).then(data => {
        for(var k in data) {
            if (!data.hasOwnProperty(k)) continue;
            var objk = data[k]
            var objOriginal = arr[k]
            var id = -1
            if(objk != null) {
                id = objk._id
            }
            clan.members.push({
                id: id,
                name: objOriginal.name,
                role: objOriginal.role
            })
        }
        clan.save(err => {
            if(err) return
        })
    })

})




module.exports = router