const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Room = require('./room');
const mongoosePaginate = require('mongoose-paginate');
const autoIncrement = require('mongoose-auto-increment');

const connection = mongoose.createConnection('mongodb+srv://sreader:rudy4joy@cluster0-xk1cv.mongodb.net/test?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
});

autoIncrement.initialize(connection);

const ProjectSchema = new Schema({
	title: String,
	channel: String,
	project_number: String,
	description: String,
	images: [ { url: String, public_id: String } ],
	location: String,
	coordinates: Array,
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	rooms: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Room'
		}
	],
	project_states: {
			type: Schema.Types.ObjectId,
			ref: 'ProjectStates'
	},
	email: String,
	phone: String,
	address1: String,
	address2: String,
	state: String,
	zip: String,
	terms: Boolean
});

ProjectSchema.pre('remove', async function() {
	await Room.remove({
		_id: {
			$in: this.rooms
		}
	});
});

// ProjectSchema.methods.calculateAvgRating = function() {
// 	let ratingsTotal = 0;
// 	if(this.rooms.length) {
// 		this.rooms.forEach(review => {
// 			ratingsTotal += review.rating;
// 		});
// 		this.avgRating = Math.round((ratingsTotal / this.rooms.length) * 10) / 10;
// 	} else {
// 		this.avgRating = ratingsTotal;
// 	}
// 	const floorRating = Math.floor(this.avgRating);
// 	this.save();
// 	return floorRating;
// };

ProjectSchema.plugin(autoIncrement.plugin, {
    model: 'Project',
    field: 'projectId',
    startAt: 4000,
    incrementBy: 1
});
	
ProjectSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Project', ProjectSchema);