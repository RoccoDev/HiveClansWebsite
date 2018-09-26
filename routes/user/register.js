const express = require('express');
const router = express.Router();
const User = require("../../user/user.js")
const bcrypt = require('bcrypt');
const Gen = require('../../snowflake.js')

router.post('/', (req, res) => {

    User.find({key: "nameLower", value: req.body.name.toLowerCase()}, function(json) {
        console.log(json)
        if(json != null) {
            res.status(409).json({success: false})
            return;
        }

        var user = {
            _id: Gen.gen(),
            name: req.body.name,
            nameLower: req.body.name.toLowerCase(),
            password: bcrypt.hashSync(req.body.password, 10)
        }

        User.save(user)
        res.json({success: true})
    })


})



module.exports = router