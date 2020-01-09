const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Cabtype = require('./cabtype');
const User = require('../user');
const mongoosePaginate = require('mongoose-paginate');

const VariationSchema = new Schema({
	cabtype: {
		type: Schema.Types.ObjectId,
		ref: 'Cabtype'
	},
	configuration: String,
	title: String,
	images: [ { url: String, public_id: String } ],
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	topdrawer: Number,
	lowerdrawer: Number,
	door: Number,
	shelves: Number,
	partition: Number,
	finint: Boolean,
	faceframe: Boolean,
	faces: Number,
	angles: Number,
	price: Number,
	Notes: String,
	Created: Date
});

module.exports = mongoose.model('Variation', VariationSchema);