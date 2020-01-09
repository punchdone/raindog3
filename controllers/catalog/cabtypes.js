const Cabtype = require('../../models/catalog/cabtype');

module.exports = {
	//Cabtypes Index
	async getCabtypes(req, res, next) {
		let cabtypes = await Cabtype.find({});
		res.render('catalog/cabtypes', { cabtypes, title: 'Cabinet Type Index' });
	},
	//Cabtypes Create
	async createCabtype(req, res, next) {
		//Use req.body to create a new cabtype
		console.log('CREATE = ', req.body);
		let cabtype = await Cabtype.create(req.body);
		req.session.success = 'Cabinet type created successfully!';
		res.redirect('/catalog/cabtypes');
	},
	//Cabtypes Update
	async updateCabtype(req, res, next) {
		console.log(req.params);
		await Cabtype.findByIdAndUpdate(req.params.cabtype_id, req.body);
		req.session.success = "Cabinet type updated successfully!";
		res.redirect('/catalog/cabtypes');
	},
	
	//Cabtypes Destroy
	async deleteCabtype(req, res, next) {
		await Cabtype.findByIdAndRemove(req.params.cabtype_id);
		req.session.success = 'Cabinet type deleted successfully!';
		res.redirect('/catalog/cabtypes');
	}
}