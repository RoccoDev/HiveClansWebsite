const express = require('express');
const router = express.Router();

router.use('/register', require("./register.js"))
router.use('/authenticate', require("./authenticate.js"))

module.exports = router