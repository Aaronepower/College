'use strict';
module.exports = function (mongoose) {
	var keywordsSchema = mongoose.Schema({
		keyword: String,
		language: String
	})

	var keywords = mongoose.model('keywords', keywordsSchema)

	return keywords
}