const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GuideSchema = new Schema({
	title: String,
	rate: Number
});

module.exports = mongoose.model('Guide', GuideSchema);