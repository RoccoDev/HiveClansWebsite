const express = require('express');
const router = express.Router();

router.use('/register', require("./register.js"))
router.use('/list', require("./list.js"))
router.use('/me', require("./me.js"))
router.use('/search', require("./search.js"))
router.use('/', require("./lookup.js"))

module.exports = router

