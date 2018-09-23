const express = require('express');
const router = express.Router();
const User = require("../../user/user.js")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

router.get('/', (req, res) => {
    User.findOne({
        name: req.query.name
    }, function(err, user) {


        if (err) throw err;

        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {


            if (!bcrypt.compareSync(req.query.password, user.password)) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {


                const payload = {
                    user: {
                        _id: user._id,
                        name: user.name
                    }
                };
                var token = jwt.sign(payload, process.env.SECRET, {
                    expiresIn: '24h'
                });


                res.json({
                    success: true,
                    token: token
                });
            }

        }

    });
});




module.exports = router