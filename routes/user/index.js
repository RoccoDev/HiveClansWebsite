const express = require('express');
const router = express.Router();

router.use('/register', require("./register.js"))
router.use('/authenticate', require("./authenticate.js"))
router.use('/list', require("./list.js"))

module.exports = router