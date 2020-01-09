const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderStatesSchema = new Schema({
	title: String
});

module.exports = mongoose.model('OrderStates', OrderStatesSchema);