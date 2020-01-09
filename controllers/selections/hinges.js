const Hinge = require('../../models/selections/hinge');

module.exports = {
	//Hinges Index
	async getHinges(req, res, next) {
		let hinges = await Hinge.find({});
		res.render('selections/hinges', {hinges, title: 'Hinges Index' });
	},
	//Hinges Create
	async createHinge(req, res, next) {
		// Use req.body to create a new hingesmaterial
		let hinge = await Hinge.create(req.body);
		req.session.success = 'Hinge created successfully!';
		res.redirect('/hinges');
	},
	//Hinges Update
	async updateHinge(req, res, next) {
		console.log(req.params);
		await Hinge.findByIdAndUpdate(req.params.hinge_id, req.body);
		req.session.success = "Hinge updated successfully!";
		res.redirect('/hinges');
	},
	
	//Hinges Destroy
	async deleteHinge(req, res, next) {
		await Hinge.findByIdAndRemove(req.params.hinge_id);
		req.session.success = 'Hinge deleted successfully!';
		res.redirect('/hinges');
	}
}