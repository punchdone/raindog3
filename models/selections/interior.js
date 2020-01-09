const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InteriorSchema = new Schema({
	title: String,
	tpanel: Number,
	qpanel: Number
});

module.exports = mongoose.model('Interior', InteriorSchema);