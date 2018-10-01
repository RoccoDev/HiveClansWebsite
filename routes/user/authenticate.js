const express = require('express');
const router = express.Router();
const User = require("../../user/user.js")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const functions = require('firebase-functions');

router.post('/', (req, res) => {
    User.find({
        key: "nameLower",
        value: req.body.name.toLowerCase()
    }, function(users) {
        var user = users[Object.keys(users)[0]];




        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {


            if (!bcrypt.compareSync(req.body.password, user.password)) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {


                const payload = {
                    user: {
                        _id: user._id,
                        name: user.name
                    }
                };
                var token = jwt.sign(payload, functions.config().someservice.secret, {
                    expiresIn: '24h'
                });


                res.json({
                    success: true,
                    token: token,
                    user: {
                        id: user._id,
                        name: user.name
                    }
                });
            }

        }

    });
});




module.exports = router