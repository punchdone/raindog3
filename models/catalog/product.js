const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Cabtype = require('./cabtype');
const User = require('../user');
const mongoosePaginate = require('mongoose-paginate');

const ProductSchema = new Schema({
	cabtype: {
		type: Schema.Types.ObjectId,
		ref: 'Cabtype'
	},
	configuration: String,
	title: String,
	images: [ { url: String, public_id: String } ],
	docs: [ { url: String, public_id: String }],
	mods: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Product'
		}
	],
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	widthmin: Number,
	widthmax: Number,
	widthstd: Number,
	widthfix: Boolean,
	heightmin: Number,
	heightmax: Number,
	heightstd: Number,
	heightfix: Boolean,
	depthmin: Number,
	depthmax: Number,
	depthstd: Number,
	depthfix: Boolean,
	topdrawer: Number,
	lowerdrawer: Number,
	hinging: Boolean,
	door: Number,
	shelves: Number,
	partitions: Number,
	finint: Boolean,
	faceframe: Boolean,
	faces: Number,
	angles: Number,
	price: Number,
	notes: String,
	Created: Date
});

ProductSchema.pre('remove', async function() {
	await Variation.remove({
		_id: {
			$in: this.variations
		}
	});
});

module.exports = mongoose.model('Product', ProductSchema);