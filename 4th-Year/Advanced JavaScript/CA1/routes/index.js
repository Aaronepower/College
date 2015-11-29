var express = require('express')
var router  = express.Router()
  , User    = require('../bin/User')
/* GET home page. */
router.get('/', function(req, res, next) {
    User.find({}, function (err, users) {
        var images = []
        users.forEach(function (user){
            user.images.forEach(function (image){
                images.push(image)
            });
        });
        res.render('index', { images: images })
    })
  
})
router.get('/login', function (req, res, next) {
    res.render('form', { login: true })
})

router.get('/register', function (req, res, next) {
    res.render('form')
})

router.get('/canvas', function (req, res, next) {
    res.render('canvas')
})

router.get('/tags/:tag', function (req, res, next) {
    User.find({}, function (err, users) {
        var images = []
        users.forEach(function (user){
            user.images.forEach(function (image) {
                image.tags.forEach(function (tag) {
                    if (tag == req.params.tag) {
                        images.push(image)
                    }
                });
            });
        });
        res.render('index', { images: images })
    })
})

module.exports = router
