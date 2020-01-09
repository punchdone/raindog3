const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FinishTypeSchema = new Schema({
	title: String,
	rate: Number
});

module.exports = mongoose.model('FinishType', FinishTypeSchema);