const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
	//room_number: Number,
	title: String
});

module.exports = mongoose.model('ProjectStates', ProjectSchema);