const express = require('express');
const router = express.Router();
const Clan = require("../../clan/clan.js")



router.use(require("../user/middleware.js"))
router.get('/', (req, res) => {

    Clan.findForUser(req.user._id, function(clans) {
        if(clans == null) {
            res.sendStatus(404)
            return;
        }
        res.status(200).json(Object.keys(clans).map(function(key) {
            return clans[key];
        }))
    });

})





module.exports = router