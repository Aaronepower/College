var express = require('express')
  , router  = express.Router()
  , User    = require('../bin/User')
router.post('/login', function(req, res, next) {
	console.log(req.body)
})

router.post('/register', function(req, res, next) {
	console.log(req.body)
})

module.exports = router
