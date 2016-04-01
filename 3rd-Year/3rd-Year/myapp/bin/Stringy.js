'use strict';
var Stringy = function () {
	var start = 0
	,	  end   = 0
}

Stringy.prototype.removeSel = function(str, start, end) {
	if (start === 0 && end === 0) {
		return str
	}
	var firstPart
	if (start === end) {
		firstPart = str.slice(0, start-1)
	}
	else {
		firstPart = str.slice(0,start)
	}
	var secondPart = str.slice(end)
	,		newStr = firstPart+secondPart
	return newStr
}

Stringy.prototype.insertText = function(str, index, text) {
	var firstPart = str.slice(0, index)
	var secondPart = str.slice(index)
	return firstPart+text+secondPart
}

module.exports = Stringy