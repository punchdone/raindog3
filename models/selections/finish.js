const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FinishSchema = new Schema({
	title: String,
	type: {
		type: Schema.Types.ObjectId,
		ref: 'FinishType'
	}
});

module.exports = mongoose.model('Finish', FinishSchema);