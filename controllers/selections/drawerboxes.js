const Drawerbox = require('../../models/selections/drawerbox');

module.exports = {
	//Drawerbox Index
	async getDrawerboxes(req, res, next) {
		let drawerboxes = await Drawerbox.find({});
		res.render('selections/drawerboxes', {drawerboxes, title: 'Drawerbox Index' });
	},
	//Drawerbox Create
	async createDrawerbox(req, res, next) {
		// Use req.body to create a new drawerbox material
		let drawerbox = await Drawerbox.create(req.body);
		req.session.success = 'Drawerbox created successfully!';
		res.redirect('/drawerboxes');
	},
	//Drawerbox Update
	async updateDrawerbox(req, res, next) {
		console.log(req.params);
		console.log(req.body);
		await Drawerbox.findByIdAndUpdate(req.params.drawerbox_id, req.body);
		req.session.success = "Drawerbox updated successfully!";
		res.redirect('/drawerboxes');
	},
	
	//Drawerbox Destroy
	async deleteDrawerbox(req, res, next) {
		await Drawerbox.findByIdAndRemove(req.params.drawerbox_id);
		req.session.success = 'Drawerbox deleted successfully!';
		res.redirect('/drawerboxes');
	}
}