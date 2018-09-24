const express = require('express');
const router = express.Router();
const Clan = require("../../clan/clan.js")



router.use(require("../user/middleware.js"))
router.get('/', (req, res) => {
    console.log(req.user._id)

    Clan.find({$or: [{'owner.id': req.user._id.toString()}, {'members': {"$elemMatch": {'id': req.user._id.toString()}}}]}, function(err, clans) {
        if(err) {
            res.sendStatus(404)
            return;
        }
        res.status(200).json(clans)
    });

})





module.exports = router