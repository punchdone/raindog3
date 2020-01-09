const Interior = require('../../models/selections/interior');

module.exports = {
	//Interiors Index
	async getInteriors(req, res, next) {
		let interiors = await Interior.find({});
		res.render('selections/interiors', {interiors, title: 'Interiors Index' });
	},
	//Interiors Create
	async createInterior(req, res, next) {
		// Use req.body to create a new interiorsmaterial
		let interior = await Interior.create(req.body);
		req.session.success = 'Interior created successfully!';
		res.redirect('/interiors');
	},
	//Interiors Update
	async updateInterior(req, res, next) {
		console.log(req.params);
		await Interior.findByIdAndUpdate(req.params.interior_id, req.body);
		req.session.success = "Interior updated successfully!";
		res.redirect('/interiors');
	},
	
	//Interiors Destroy
	async deleteInterior(req, res, next) {
		await Interior.findByIdAndRemove(req.params.interior_id);
		req.session.success = 'Interior deleted successfully!';
		res.redirect('/interiors');
	}
}