const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LineSchema = new Schema({
	//room_number: Number,
	product: {
		type: Schema.Types.ObjectId,
		ref: 'Product'
	},
	quantity: Number,
	hinging: String,
	fin_right: String,
	fin_left: String,
	width:  Number,
	height: Number,
	depth: Number,
	price: Number,
	notes: String,
	sublines: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Subline'
		}
	]
});

module.exports = mongoose.model('Line', LineSchema);