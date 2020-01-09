const Construction = require('../../models/selections/construction');

module.exports = {
	//Construction Index
	async getConstruction(req, res, next) {
		let construction = await Construction.find({});
		res.render('selections/construction', {construction, title: 'Construction Index' });
	},
	//Construction Create
	async createConstruction(req, res, next) {
		// Use req.body to create a new construction material
		let construction = await Construction.create(req.body);
		req.session.success = 'Construction method created successfully!';
		res.redirect('/construction');
	},
	//Construction Update
	async updateConstruction(req, res, next) {
		console.log(req.params);
		await Construction.findByIdAndUpdate(req.params.construction_id, req.body);
		req.session.success = "Construction method updated successfully!";
		res.redirect('/construction');
	},
	
	//Construction Destroy
	async deleteConstruction(req, res, next) {
		await Construction.findByIdAndRemove(req.params.construction_id);
		req.session.success = 'Construction method deleted successfully!';
		res.redirect('/construction');
	}
}