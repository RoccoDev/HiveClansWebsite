const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
      version: 1
  })
})

router.use(require('../user/middleware.js'))
router.use('/clan', require("./clan/index.js"))

module.exports = router