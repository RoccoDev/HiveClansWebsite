const express = require('express');
const router = express.Router();
const Clan = require('../../../clan/clan.js')
const stg = require('../../../storagemgr.js')


router.use(require('../../user/middleware.js'))

function escapeHtml(text) {
    var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };

    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}
router.post('/', (req, res) => {
    var clan = req.clan
    var user = req.user
    if(clan.owner.id !== user._id) {
        res.sendStatus(403)
        return;
    }
    if(req.body.description) {
        clan.description = escapeHtml(req.body.description)
    }
    if(req.body.name) {
        clan.name = escapeHtml(req.body.name)
    }
    if(req.body.gamemode) {
        clan.gamemode = escapeHtml(req.body.gamemode)
    }
    if(req.body.color) {
        clan.color = escapeHtml(req.body.color)
    }
    if(req.body.applicationUrl) {
        if(req.body.applicationUrl === "null") {
            delete clan.applicationUrl
        }
        else {
            clan.applicationUrl = escapeHtml(req.body.applicationUrl)
        }
    }
    if(req.body.forumUrl) {

        if(req.body.forumUrl === "null") {
            delete clan.forumUrl
        }
        if(req.body.forumUrl.startsWith("https://forum.hivemc.com/") || req.body.forumUrl.startsWith("http://forum.hivemc.com/")) {
            clan.forumUrl = escapeHtml(req.body.forumUrl)
        }
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
    stg.bucket().deleteFiles({prefix: 'clan/' + clan._id})
    Clan.remove(clan._id)
    res.json({success: true})
})

module.exports = router