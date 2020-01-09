const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CabtypeSchema = new Schema({
	code: String,
	title: String
});

module.exports = mongoose.model('Cabtype', CabtypeSchema);