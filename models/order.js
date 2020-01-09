const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Line = require('./line');
const Wood = require('./selections/wood');
const Construction = require('./selections/construction');
const Interior = require('./selections/interior');
const Drawerbox = require('./selections/drawerbox');
const Hinge = require('./selections/hinge');
const Guide = require('./selections/guide');
const Door = require('./selections/door');
const Finish = require('./selections/finish');
const mongoosePaginate = require('mongoose-paginate');
const autoIncrement = require('mongoose-auto-increment');

const OrderSchema = new Schema({
	project: {
		type: Schema.Types.ObjectId,
		ref: 'Project'
	},
	room: {
		type: Schema.Types.ObjectId,
		ref: 'Room'
	},
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	product_line: String,
	wood: {
			type: Schema.Types.ObjectId,
			ref: 'Wood'
	},
	construction: {
		type: Schema.Types.ObjectId,
		ref: 'Construction'
	},
	interior: {
		type: Schema.Types.ObjectId,
		ref: 'Interior'
	},
	drawerbox: {
		type: Schema.Types.ObjectId,
		ref: 'Drawerbox'
	},
	hinge: {
		type: Schema.Types.ObjectId,
		ref: 'Hinge'
	},
	guide: {
		type: Schema.Types.ObjectId,
		ref: 'Guide'
	},
	door: {
		type: Schema.Types.ObjectId,
		ref: 'Door'
	},
	topdrawer: String,
	finish: {
		type: Schema.Types.ObjectId,
		ref: 'Finish'
	},
	lines: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Line'
		}
	],
	orderTotal: { type: Number, default: 0 }
});

OrderSchema.pre('remove', async function() {
	await Line.remove({
		_id: {
			$in: this.lines
		}
	});
});

OrderSchema.plugin(autoIncrement.plugin, {
    model: 'Order',
    field: 'orderId',
    startAt: 8000,
    incrementBy: 1
});

OrderSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Order', OrderSchema);