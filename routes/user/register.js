const express = require('express');
const router = express.Router();
const User = require("../../user/user.js")
const bcrypt = require('bcrypt');

router.post('/', (req, res) => {
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



module.exports = router