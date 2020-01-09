const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
	room_number: Number,
	room_name: String,
	order_type: String,
	order_state: String,
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	orders:  [
		{
			type: Schema.Types.ObjectId,
			ref: 'Order'
		}
	]
});

module.exports = mongoose.model('Room', RoomSchema);