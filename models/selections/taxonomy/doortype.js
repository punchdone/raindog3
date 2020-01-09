const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DoorTypeSchema = new Schema({
	title: String,
	rate: Number
});

module.exports = mongoose.model('DoorType', DoorTypeSchema);