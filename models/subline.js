const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SublineSchema = new Schema({
	//room_number: Number,
	product: {
		type: Schema.Types.ObjectId,
		ref: 'Product'
	},
	quantity: Number,
	width:  Number,
	height: Number,
	depth: Number,
	notes: String
});

module.exports = mongoose.model('Subline', SublineSchema);