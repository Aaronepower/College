var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/login', function(req, res, next) {
  res.render('form', { login: true });
});

router.get('/register', function(req, res, next) {
  res.render('form');
});

router.get('/canvas', function(req, res, next) {
  res.render('canvas');
});

module.exports = router;
