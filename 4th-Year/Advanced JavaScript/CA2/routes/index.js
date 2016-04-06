const express = require('express')
const router  = express.Router()
    , User    = require('../bin/User')

router.get('/', function(req, res, next) {
    res.render('index')
})

router.get('/partials/:partial', function (req, res) {
    res.render('partials/'+req.params.partial)
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

router.get('/images', function(req, res, next) {
    User.find({}, function(err, users) {
        let images = []

        for (user of users) {
            for (image of user.images) {
                images.push(image)
            }
        }

        res.send({ images: images })
    })
})

router.get('/tags/:tag', function (req, res, next) {
    let filterTag = req.params.tag
    User.find({}, function (err, users) {
        let images = []
        for (user of users) {
            for (image of user.images) {
                for (tag of image.tags) {
                    if (tag === filterTag) {
                        images.push(image)
                    }
                }
            }
        }
        
        res.send({ images: images })
    })
})

module.exports = router
