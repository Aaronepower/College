const express = require('express')
    , router  = express.Router()
    , User    = require('../bin/User')
router.post('/login', function(req, res, next) {
	User.findOne({username: req.body.username, password: req.body.password}, function (err, user) {
        if (err) {
            res.status(400)
        } else if (!user) {
            res.status(404)
        } else {
            res.send(user._id)
        }
    })
    res.sendStatus(200)
})

router.post('/register', function(req, res, next) {
    User.find({username: req.body.username}, function (err, users) {
        if (users.length) {
            res.sendStatus(403)
        } else {
            let user = new User()
            user.username = req.body.username
            user.password = req.body.password
            user.save()
            res.status(200).send(user._id)
        }
    })
})

router.get('/:id', function(req, res, next) {
    User.findOne({_id: req.params.id}, function (err, user) {
        if (err) {
            res.redirect('/')
        } else if (!user) {
            res.redirect('/')
        } else {
            res.render('index', {images: user.images})
        }
    })
})

router.post('/validate', function(req, res, next) {
    User.findOne({_id: req.body.id}, function (err, user) {
        if (!user) {
            res.sendStatus(403)
        } else {
            res.sendStatus(200)
        }
    })
})

router.post('/:id', function(req, res, next) {
    User.findOne({_id: req.params.id}, function (err, user) {
        if (err) {
            console.error(err)
            res.sendStatus(400)
        } else if (!user) {
            res.sendStatus(404)
        } else {
            user.images.push({data: req.body.image, tags: req.body['tags[]']})
            user.save()
            res.sendStatus(200)
        }
    })
})

module.exports = router