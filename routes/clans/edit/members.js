const express = require('express');
const router = express.Router();
const User = require("../../../user/user.js")
const Clan = require("../../../clan/clan.js")
const Gen = require("../../../snowflake.js")


router.use(require('../../user/middleware.js'))


router.post('/addMember', (req, res) => {
    var clan = req.clan
    var user = req.user
    if(clan.owner.id !== user._id) {
        res.sendStatus(403)
        return;
    }
    clan.members[req.body.id] = {
        id: req.body.id,
        name: req.body.name,
        role: req.body.role
    }

        Clan.save(clan)
        res.json({success: true})


})

router.post('/removeMember', (req, res) => {
    var clan = req.clan
    var user = req.user
    if(clan.owner.id !== user._id) {
        res.sendStatus(403)
        return;
    }


    delete clan.members[req.body.id]
    Clan.removeMember(clan._id, req.body.id)
    res.json({success: true})

})


router.post('/addMemberNoId', (req, res) => {
    var clan = req.clan
    var user = req.user
    if(clan.owner.id !== user._id) {
        res.sendStatus(403)
        return;
    }

    User.find({key: "nameLower", value: req.body.name.toLowerCase()}, function(users) {
        var id = Gen.gen();
        var name = req.body.name;
        if(users != null) {
            id = users[0]._id;
        }
        clan.members[id] = {
            id: id,
            name: name,
            role: req.body.role
        }

        Clan.save(clan)
        res.json({success: true})
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
    const arr = req.body.adding;

    var promises = []

    for (var j in arr) {
        if (!arr.hasOwnProperty(j)) continue;
        var obj = arr[j];
        var promise = User.get_promise({key: "nameLower", value: obj.name.toLowerCase()})
        promises.push(promise)
    }

    Promise.all(promises).then(data => {

        for(var k in data) {
            if (!data.hasOwnProperty(k)) continue;
            var objk = data[k].val()
            var objOriginal = arr[k]
            var id = Gen.gen()
            if(objk != null) {
                id = objk._id
            }
            clan.members[id] = {
                id: id,
                name: objOriginal.name,
                role: objOriginal.role
            }
        }
        Clan.save(clan)

    })

})




module.exports = router