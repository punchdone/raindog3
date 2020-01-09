const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HingeSchema = new Schema({
	title: String,
	rate: Number
});

module.exports = mongoose.model('Hinge', HingeSchema);