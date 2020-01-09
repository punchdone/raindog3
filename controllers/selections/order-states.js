const OrderStates = require('../../models/selections/order-state');

module.exports = {
	//OrderStates Index
	async getOrderStates(req, res, next) {
		let orderStates = await OrderStates.find({});
		res.render('selections/order-states', { orderStates, title: 'Order States Index' });
	},
	//OrderStates Create
	async createOrderState(req, res, next) {
		// Use req.body to create a new order_state material
		console.log(req.body);
		let orderState = await OrderStates.create(req.body);
		req.session.success = 'Order State created successfully!';
		res.redirect('/order-states');
	},
	//OrderStates Update
	async updateOrderState(req, res, next) {
		await OrderStates.findByIdAndUpdate(req.params.order_state_id, req.body);
		req.session.success = "Order State updated successfully!";
		res.redirect('/order-states');
	},
	
	//OrderStates Destroy
	async deleteOrderState(req, res, next) {
		await OrderStates.findByIdAndRemove(req.params.order_state_id);
		req.session.success = 'Order State deleted successfully!';
		res.redirect('/order-states');
	}
}