const DoorType = require('../../../models/selections/taxonomy/doortype');

module.exports = {
	//Door Type Index
	async getDoorTypes(req, res, next) {
		let doortypes = await DoorType.find({});
		res.render('selections/taxonomy/doortypes', {doortypes, title: 'Door Type Index' });
	},
	//Doores Create
	async createDoorType(req, res, next) {
		// Use req.body to create a new finish material
		let doortypes = await DoorType.create(req.body);
		req.session.success = 'Door type created successfully!';
		res.redirect('/doortypes');
	},
	//Doores Update
	async updateDoorType(req, res, next) {
		console.log(req.params);
		await DoorType.findByIdAndUpdate(req.params.doortype_id, req.body);
		req.session.success = "Door type updated successfully!";
		res.redirect('/doortypes');
	},
	
	//Doores Destroy
	async deleteDoorType(req, res, next) {
		await DoorType.findByIdAndRemove(req.params.doortype_id);
		req.session.success = 'Door type deleted successfully!';
		res.redirect('/doortypes');
	}
}