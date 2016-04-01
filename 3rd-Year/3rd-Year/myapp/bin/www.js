'use strict';
var app = require('../app')

app.set('port', process.env.PORT || 80)

var server       = app.listen(app.get('port'))
,   io           = require('socket.io').listen(server, {secure: true})
,   mongoose     = require('mongoose')
,		doc          = require('./document')(mongoose)
,		keywords 		 = require('./keywords')(mongoose)
,		docUpdate		 = require('./findAndUpdate')
,		query 			 = {name: 'file'}

mongoose.connect('mongodb://localhost/data')

var db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))

io.on('connection', function (socket) {

	var docStream = doc.find(query).stream()

	var keywordStream = keywords.find({language: /js/}).stream()
	// var numOfKeywords = keywords.count()

	docStream.on('data', function (doc) {
		console.log(doc);
		socket.emit('file', doc)
	})

	keywordStream.on('data', function (word) {
		socket.emit('keyword', word)
	})

	socket.on('change', function (caret, msg) {
		docUpdate(doc, query, caret, null, msg)
		socket.broadcast.emit('change', caret, msg)
	})

	socket.on('tabspace', function (caret) {
		docUpdate(doc, query, caret, null, '\t')
		socket.broadcast.emit('tabspace', caret)
	})

	socket.on('return', function (caret) {
		docUpdate(doc, query, caret, null, '\n')
		socket.broadcast.emit('return', caret)
	})

	socket.on('backspace', function (caret, endPoint) {
		docUpdate(doc, query, caret, endPoint)
		socket.broadcast.emit('backspace', caret, endPoint)
	})

	socket.on('disconnect', function () {
		console.log('User disconnected')
	})
})