const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConstructionSchema = new Schema({
	//room_number: Number,
	title: String
});

module.exports = mongoose.model('Construction', ConstructionSchema);