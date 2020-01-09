const Wood = require('../../models/selections/wood');
const Finish = require('../../models/selections/finish');

module.exports = {
	//Woods Index
	async getWoods(req, res, next) {
		let woods = await Wood.find({}).populate('finishes').exec();
		let finishes = await Finish.find({});
		res.render('selections/wood', {woods, finishes, title: 'Woods Index' });
	},
	//Woods Create
	async createWood(req, res, next) {
		// Use req.body to create a new wood/material
		let wood = await Wood.create(req.body);
		req.session.success = 'Wood/material created successfully!';
		res.redirect('/woods');
	},
	//Woods Update
	async updateWood(req, res, next) {
		console.log(req.params);
		await Wood.findByIdAndUpdate(req.params.wood_id, req.body);
		req.session.success = "Wood/material updated successfully!";
		res.redirect('/woods');
	},
	
	async addWoodFinish(req, res, next) {
		let wood = await Wood.findById(req.params.wood_id);
		let finishes = wood.finishes;
		finishes.push(req.body.finishes);
		console.log('Controller finishes = ', finishes);
		let updateWood = await Wood.findByIdAndUpdate(req.params.wood_id, { 'finishes': finishes });
		req.session.success = "Add new finish to wood/material!";
		res.redirect('/woods');
	},
	
	async deleteWoodFinish(req, res, next) {
		console.log('Controller deleteWoodFinish', req.params);
		let wood = await Wood.findById(req.params.wood_id);
		let finishes = wood.finishes;
		for (var i = 0; i < finishes.length; i++) {
			if (finishes[i] == req.params.finish_id) {
					finishes.splice(i, 1);
				};
		};
		let updateWood = await Wood.findByIdAndUpdate(req.params.wood_id, { 'finishes': finishes });
		res.redirect('/woods');
	},
	
	//Woods Destroy
	async deleteWood(req, res, next) {
		await Wood.findByIdAndRemove(req.params.wood_id);
		req.session.success = 'Wood deleted successfully!';
		res.redirect('/woods');
	}
// 	// Rooms Create
// 	async roomCreate(req, res, next) {
// 		// find the project by its id
// 		let project = await Project.findById(req.params.id).populate('rooms').exec();
// 		let haveRoom = project.rooms.filter(room => {
// 			return room.author.equals(req.user._id);
// 		}).length;
// 		if(haveRoom) {
// 			req.session.error = 'Sorry, you can only create one room per project.';
// 			return res.redirect(`/projects/${project.id}`);
// 		}
// 		// create the room
// 		req.body.room.author = req.user._id;
// 		let room = await Room.create(req.body.room);
// 		// assign room to project
// 		project.rooms.push(room);
// 		// save the project
// 		project.save();
// 		// redirect to the project
// 		req.session.success = 'Room created successfully!';
// 		res.redirect(`/projects/${project.id}`);
// 	},
// 	// Rooms Update
// 	async roomUpdate(req, res, next) {
// 		await Room.findByIdAndUpdate(req.params.room_id, req.body.room);
// 		req.session.success = 'Room updated successfully!';
// 		res.redirect(`/projects/${req.params.id}`);
// 	},
// 	// Rooms Destroy
// 	async roomDestroy(req, res, next) {
// 		await Project.findByIdAndUpdate(req.params.id, {
// 			$pull: { rooms: req.params.room_id }
// 		});
// 		await Room.findByIdAndRemove(req.params.room_id);
// 		req.session.success = 'Room deleted successfully!';
// 		res.redirect(`/projects/${req.params.id}`);
// 	}
}