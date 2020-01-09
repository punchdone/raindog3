const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DrawerboxSchema = new Schema({
	title: String,
	fixedRate: Number,
	variableRate: Number,
	bottomRate: Number
});

module.exports = mongoose.model('Drawerbox', DrawerboxSchema);