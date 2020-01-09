const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WoodSchema = new Schema({
	//room_number: Number,
	title: String,
	stock: String,
	lumber: Number,
	ply: Number,
	ipb: Number,
	qpnl: Number,
	veneer: Number,
	finishes: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Finish'
		}
	]
});

module.exports = mongoose.model('Wood', WoodSchema);