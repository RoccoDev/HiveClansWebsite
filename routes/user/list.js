const express = require('express');
const router = express.Router();
const User = require("../../user/user.js")


router.get('/', (req, res) => {
    User.find({}, function(err, users) {
        res.json(users);
    });
})



module.exports = router