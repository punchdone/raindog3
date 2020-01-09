const Project = require('../models/project');
const Room = require('../models/room');
const Order = require('../models/order');
const Line = require('../models/line');
const Subline = require('../models/subline');
const Wood = require('../models/selections/wood');
const Interior = require('../models/selections/interior');
const Hinge = require('../models/selections/hinge');
const Guide = require('../models/selections/guide');
const Finish = require('../models/selections/finish');
const Drawerbox = require('../models/selections/drawerbox');
const Door = require('../models/selections/door');
const Construction = require('../models/selections/construction');
const Product = require('../models/catalog/product');
const Cabtype = require('../models/catalog/cabtype');


module.exports = {
	// Order New
	async newOrder(req, res, next) {
		console.log('REQ.PARAMS = ', req.params);
		console.log('REQ.BODY =', req.body);
		// let project = await Project.findById(req.params.id);
		// console.log(project);
		//let room = await Room.findById(req.params.room_id);
		let woods = await Wood.find({});
		let interiors = await Interior.find({});
		let hinges = await Hinge.find({});
		let guides = await Guide.find({});
		let finishes = await Finish.find({});
		let drawerboxes = await Drawerbox.find({});
		let doors = await Door.find({});
		let constructions = await Construction.find({});
		//need to eventually add project & room to the res.render object
		res.render('orders/new', { woods, interiors, hinges, guides, finishes, drawerboxes, 				doors, constructions });
	},
	
	// Order New Multi-step Header Form
	async newOrderMulti(req, res, next) {
		let project = await Project.find({ '_id': req.params.id });
		let room = await Room.find({ '_id': req.params.room_id });
		let doors = await Door.find({});
		let woods = await Wood.find({});
		let finishes = await Finish.find({});	
		let interiors = await Interior.find({});
		let hinges = await Hinge.find({});
		console.log('Multi project = ', project[0]._id);
		console.log('Multi room = ', room[0]._id);
		res.render('orders/multistep/header', { project, room, doors, woods, finishes, interiors, hinges });
	},
	
	// Order Multi-step Create
	async createOrderMulti(req, res, next) {
		console.log('createOrderMulti req.body = ', req.body);
		let projectId = req.params.id;
		let roomId = req.params.room_id;
		//console.log('room #:', roomId);
		let project = await Project.find({ '_id': projectId });
		let room = await Room.find({ '_id': roomId });
		//.populate('orders').exec();
		let roomDetails = room.shift().orders;
		if(req.body.hardware == 'blum') {
			req.body.hinge = '5d93dfb8059bba2859b81f43';
			req.body.guide = '5d93e1deb3e3182b2d0a1c12';
		} else {
			req.body.hinge = '5d93dfaf059bba2859b81f42';
			req.body.guide = '5d93e1f4b3e3182b2d0a1c14';
		};
		req.body.drawerbox = '5d94d3c5ec4ef502533509d9';
		req.body.construction = '5d94fe9df79730035e8c5fd6';
		console.log('createOrder req.body = ', req.body);
		//console.log('Project #', projectId, ' Room #', roomId);
		//console.log('CREATE room =', room.id);
		let order = await Order.create(req.body);
		let orderId = order._id;
		req.session.projectId = projectId;
		req.session.roomId = roomId;
		req.session.orderId = orderId;
		req.session.save();
		await Order.findByIdAndUpdate(order._id, { 'project': projectId, 'room': roomId });
		//console.log('CREATE order =', order._id);
		//console.log('CREATE room orders =', roomDetails);
		await roomDetails.push(order._id);
		//console.log('CREATE roomDetails = ', roomDetails);
		let updatedRoom = await Room.findByIdAndUpdate(roomId, { 'orders' : roomDetails });
		console.log('createOrder Mutli updatedRoom = ', updatedRoom);
		console.log('createOrder req.session = ', req.session);
		req.session.success = `Order #${order.orderId} created successfully!`;
		console.log('this should go directly to the root path now. . .')
		res.redirect('/catalog/products');
	},
	
	// Order Create
	async createOrder(req, res, next){
		//console.log('CREATE req.params =', req.params);
		console.log('createOrder req.params = ', req.params);
		console.log('createOrder req.body = ', req.body);
		let projectId = req.params.id;
		let roomId = req.params.room_id;
		//console.log('room #:', roomId);
		let project = await Project.find({ '_id': projectId });
		let room = await Room.find({ '_id': roomId });
		//.populate('orders').exec();
		let roomDetails = room.shift().orders;
		console.log('createOrder req.body = ', req.body);
		//console.log('Project #', projectId, ' Room #', roomId);
		//console.log('CREATE room =', room.id);
		let order = await Order.create(req.body);
		await Order.findByIdAndUpdate(order._id, { 'project': projectId, 'room': roomId });
		//console.log('CREATE order =', order._id);
		//console.log('CREATE room orders =', roomDetails);
		roomDetails.push(order._id);
		//console.log('CREATE roomDetails = ', roomDetails);
		let updatedRoom = await Room.findByIdAndUpdate(roomId, { 'orders' : roomDetails });
		//console.log('CREATE updatedRoom = ', updatedRoom);
		req.session.success = `Order #${order.orderId} created successfully!`;
		res.redirect(`orders/${order._id}`);
	},
	
	//Order Show
	async showOrder(req, res, next) {
		//console.log('showOrder req.params = ', req.params);
		req.session.projectId = req.params.id;
		req.session.roomId = req.params.room_id;
		req.session.orderId = req.params.order_id;
		projectId = req.params._id;
		roomId = req.params.room_id;
		orderId = req.params.order_id;
		let order = await Order.findById(req.params.order_id).populate({
				path: 'lines',
				options: { sort: { '_id': 1 } },
				populate: [{
					path: 'sublines',
					options: { sort: { '_id': 1 } },
					model: 'Subline',
					populate: {
						path: 'product',
						model: 'Product',
						populate: {
							path: 'cabtype',
							model: 'Cabtype'
						}
					}
				},
				{
					path: 'product',
					model: 'Product',
					populate: [{
						path: 'cabtype',
						model: 'Cabtype'
					},
					{
						path: 'mods',
						model: 'Product',
						populate: {
							path: 'cabtype',
							model: 'Cabtype'
						}
					}]
				}]		   
			});
		let projectDetails = await Project.find({ '_id': req.params.id });
		let roomDetails = await Room.find({ '_id': req.params.room_id });
		// console.log('showOrder projectDetails = ', projectDetails);
		// console.log('showOrder roomDetails = ', roomDetails);
		// console.log('showOrder order = ', order);
		let woods = await Wood.find({});
		let interiors = await Interior.find({});
		let hinges = await Hinge.find({});
		let guides = await Guide.find({});
		let finishes = await Finish.find({});
		let drawerboxes = await Drawerbox.find({});
		let doors = await Door.find({});
		let constructions = await Construction.find({});
		let products = await Product.find({}).populate('cabtype').exec();
		console.log('showOrder req.session = ', req.session);
		res.render('orders/show', { order, projectId, roomId, orderId, projectDetails, roomDetails, products, woods, interiors, hinges, guides, finishes, drawerboxes, doors, constructions});
	},
	
	// Orders Update
	async updateOrder(req, res, next) {
		//console.log('Update = req.params', req.params);
		console.log('Update req.body = ', req.body);
		let order = await Order.findByIdAndUpdate(req.params.order_id, req.body);
		req.session.projectId = req.params.id;
		req.session.roomId = req.params.room_id;
		req.session.orderId = req.params.order_id;
		//console.log('Order: ', order);
		req.session.success = 'Order updated successfully!';
		//res.send('POST orders/:id');
		res.redirect(`/projects/${req.params.id}/rooms/${req.params.room_id}/orders/${req.params.order_id}`);
	},
	
	// // Rooms Destroy
	// async roomDestroy(req, res, next) {
	// 	await Project.findByIdAndUpdate(req.params.id, {
	// 		$pull: { rooms: req.params.room_id }
	// 	});
	// 	await Room.findByIdAndRemove(req.params.room_id);
	// 	req.session.success = 'Room deleted successfully!';
	// 	res.redirect(`/projects/${req.params.id}`);
	// }
}