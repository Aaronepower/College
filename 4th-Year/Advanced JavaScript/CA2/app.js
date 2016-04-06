"use strict"

const express = require('express')
    , path = require('path')
    , logger = require('morgan')
    , cookieParser = require('cookie-parser')
    , bodyParser = require('body-parser')
    , routes = require('./routes/index')
    , users = require('./routes/users')
    , app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views/jade'))
app.set('view engine', 'jade')
app.use(logger('dev'))
app.use(bodyParser.json({ limit: '50mb'}))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')))


app.use('/', routes)
app.use('/users', users)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})


module.exports = app
