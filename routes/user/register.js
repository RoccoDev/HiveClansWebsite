const express = require('express');
const router = express.Router();
const User = require("../../user/user.js")
const bcrypt = require('bcrypt');

router.post('/', (req, res) => {

    User.find({name: req.body.name}, function(err, users) {
        if(!err && users.length != 0) {
            res.status(409).json({success: false})
            return;
        }
        var user = new User({
            name: req.body.name,
            password: bcrypt.hashSync(req.body.password, 10)
        })

        user.save((err) => {
            if(err) throw err
            console.log("User saved")
            res.json({success: true})
        })
    })


})



module.exports = router