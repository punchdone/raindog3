const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DoorSchema = new Schema({
	title: String,
	type: {
		type: Schema.Types.ObjectId,
		ref: 'DoorType'
	}
});

module.exports = mongoose.model('Door', DoorSchema);