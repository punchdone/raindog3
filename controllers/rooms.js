const Project = require('../models/project');
const Room = require('../models/room');


module.exports = {
	// Rooms Create
	async roomCreate(req, res, next) {
		// find the project by its id
		let project = await Project.findById(req.params.id).populate('rooms').exec();
		
		console.log('roomCreate req.body = ', req.body.room);
		// let haveRoom = project.rooms.filter(room => {
		// 	return room.author.equals(req.user._id);
		// }).length;
		// if(haveRoom) {
		// 	req.session.error = 'Sorry, you can only create one room per project.';
		// 	return res.redirect(`/projects/${project.id}`);
		// }
		// figure the room number
		console.log('Number of rooms: ', project.rooms.length);
		req.body.room.room_number = project.rooms.length;
		// create the room
		req.body.room.author = req.user._id;
		let room = await Room.create(req.body.room);
		// assign room to project
		project.rooms.push(room);
		// save the project
		project.save();
		// redirect to the project
		req.session.success = 'Room created successfully!';
		res.redirect(`/projects/${project.id}`);
	},
	// Rooms Update
	async roomUpdate(req, res, next) {
		await Room.findByIdAndUpdate(req.params.room_id, req.body.room);
		req.session.success = 'Room updated successfully!';
		res.redirect(`/projects/${req.params.id}`);
	},
	// Rooms Destroy
	async roomDestroy(req, res, next) {
		await Project.findByIdAndUpdate(req.params.id, {
			$pull: { rooms: req.params.room_id }
		});
		await Room.findByIdAndRemove(req.params.room_id);
		req.session.success = 'Room deleted successfully!';
		res.redirect(`/projects/${req.params.id}`);
	}
}