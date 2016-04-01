'use strict';
module.exports = function (mongoose) {
	var documentSchema = mongoose.Schema({
		name: String,
		contents: String
	})

	var Doc = mongoose.model('Doc', documentSchema)

	return Doc
}