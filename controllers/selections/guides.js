const Guide = require('../../models/selections/guide');

module.exports = {
	//Guides Index
	async getGuides(req, res, next) {
		let guides = await Guide.find({});
		res.render('selections/guides', {guides, title: 'Guides Index' });
	},
	//Guides Create
	async createGuide(req, res, next) {
		// Use req.body to create a new guide material
		let guide = await Guide.create(req.body);
		req.session.success = 'Guide created successfully!';
		res.redirect('/guides');
	},
	//Guides Update
	async updateGuide(req, res, next) {
		console.log(req.params);
		await Guide.findByIdAndUpdate(req.params.guide_id, req.body);
		req.session.success = "Guide updated successfully!";
		res.redirect('/guides');
	},
	
	//Guides Destroy
	async deleteGuide(req, res, next) {
		await Guide.findByIdAndRemove(req.params.guide_id);
		req.session.success = 'Guide deleted successfully!';
		res.redirect('/guides');
	}
}