const FinishType = require('../../../models/selections/taxonomy/finishtype');

module.exports = {
	//Finish Type Index
	async getFinishTypes(req, res, next) {
		let finishtypes = await FinishType.find({});
		res.render('selections/taxonomy/finishtypes', {finishtypes, title: 'Finish Type Index' });
	},
	//Finishes Create
	async createFinishType(req, res, next) {
		// Use req.body to create a new finish material
		let finishtypes = await FinishType.create(req.body);
		req.session.success = 'Finish type created successfully!';
		res.redirect('/finishtypes');
	},
	//Finishes Update
	async updateFinishType(req, res, next) {
		console.log(req.params);
		await FinishType.findByIdAndUpdate(req.params.finishtype_id, req.body);
		req.session.success = "Finish type updated successfully!";
		res.redirect('/finishtypes');
	},
	
	//Finishes Destroy
	async deleteFinishType(req, res, next) {
		await FinishType.findByIdAndRemove(req.params.finishtype_id);
		req.session.success = 'Finish type deleted successfully!';
		res.redirect('/finishtypes');
	}
}