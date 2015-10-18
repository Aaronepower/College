var express = require('express')
var router = express.Router()

router.post('/login', function(req, res, next) {
	console.log(req.body)
})

router.post('/register', function(req, res, next) {
	console.log(req.body)
})

module.exports = router
