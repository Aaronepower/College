'use strict';


var	StringyClass = require('./Stringy')
,		Stringy      = new StringyClass()

module.exports = function (doc, query, index, endPoint, data) {
	endPoint = (typeof endPoint === 'undefined') ? index : endPoint
	data     = (typeof data     === 'undefined') ? null  : data

	doc.findOne(query, function (err, doc) {

		if (err) {
			console.error.bind(console, err)
		}

		if (data === null) {
			doc.contents = Stringy.removeSel(doc.contents, index, endPoint)
		}
		else {
			doc.contents = Stringy.insertText(doc.contents, index, data)
		}
		doc.save()
	})
}