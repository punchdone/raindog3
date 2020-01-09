const Finish = require('../../models/selections/finish');
const FinishType = require('../../models/selections/taxonomy/finishtype');

module.exports = {
	//Finishes Index
	async getFinishes(req, res, next) {
		let finishes = await Finish.find({}).populate('type').exec();
		let finishtypes = await FinishType.find({});
		res.render('selections/finishes', { finishes, finishtypes, title: 'Finish Type Index' });
	},
	//Finishes Create
	async createFinish(req, res, next) {
		// Use req.body to create a new finish material
		let finish = await Finish.create(req.body);
		req.session.success = 'Finish created successfully!';
		res.redirect('/finishes');
	},
	//Finishes Update
	async updateFinish(req, res, next) {
		console.log(req.params);
		console.log(req.body);
		await Finish.findByIdAndUpdate(req.params.finish_id, req.body);
		req.session.success = "Finish updated successfully!";
		res.redirect('/finishes');
	},
	
	//Finishes Destroy
	async deleteFinish(req, res, next) {
		await Finish.findByIdAndRemove(req.params.finish_id);
		req.session.success = 'Finish deleted successfully!';
		res.redirect('/finishes');
	}
}