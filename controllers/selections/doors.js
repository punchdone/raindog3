const Door = require('../../models/selections/door');
const DoorTypes = require('../../models/selections/taxonomy/doortype');

module.exports = {
	//Door Index
	async getDoors(req, res, next) {
		let doors = await Door.find({}).populate('type').exec();
		let doortypes = await DoorTypes.find({});
		res.render('selections/doors', { doors, doortypes, title: 'Door Index' });
	},
	//Door Create
	async createDoor(req, res, next) {
		// Use req.body to create a new door material
		let door = await Door.create(req.body);
		req.session.success = 'Door created successfully!';
		res.redirect('/doors');
	},
	//Door Update
	async updateDoor(req, res, next) {
		console.log(req.params);
		console.log(req.body);
		await Door.findByIdAndUpdate(req.params.door_id, req.body);
		req.session.success = "Door updated successfully!";
		res.redirect('/doors');
	},
	
	//Door Destroy
	async deleteDoor(req, res, next) {
		await Door.findByIdAndRemove(req.params.door_id);
		req.session.success = 'Door deleted successfully!';
		res.redirect('/doors');
	}
}