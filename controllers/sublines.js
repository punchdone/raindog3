const Line = require('../models/line');
const Subline = require('../models/subline');


module.exports = {
	// Line Create
	async createSubline(req, res, next) {
		
		console.log('createSubline req.params = ', req.params);
		console.log('createSubline req.session = ', req.session);
		console.log('createSubline req.body = ', req.body);
		
		let addSubline = await Subline.create(req.body);
		let newSubline = await Subline.findById(addSubline._id).populate({
			path: 'product',
			model: 'Product',
			populate: {
				path: 'cabtype',
				model: 'Cabtype'
			}
		});
		
		req.session.lineId = req.params.line_id;
		req.session.sublineId = addSubline._id;
		
		console.log('addSubline = ', addSubline);
		console.log('LineId = ', req.params.line_id);
		
		let line = await Line.findById(req.params.line_id).populate('sublines').exec();
		
		console.log('line = ', line);
		
		line.sublines.push(addSubline);
		line.save();
		
		console.log('createSubline req.sessions = ', req.session);
		console.log('createSubline newSubline = ', newSubline);
		
		res.json(newSubline);
		
		req.session.success = "Subline created successfully!";
		
		// let order = await Order.findById(req.session.orderId).populate('lines').exec();
		// let addLine = await Line.create(req.body);
		// let newLine = await Line.findById(addLine._id).populate({
		// 	path: 'product',
		// 	model: 'Product',
		// 	populate: {
		// 		path: 'cabtype',
		// 		model: 'Cabtype'
		// 	}
		// })
		// let product = await Product.findById(addLine.product);
		// let cabtype = await Cabtype.findById(product.cabtype);
		// var code = cabtype.code + product.configuration;
		// var title = product.title;
		// req.session.lineId = addLine._id;
		// console.log('createLine req.session update = ', req.session);
		// Object.assign(addLine, {'code': code, 'title': title});
		// console.log('Scott is struggling to modify this object = ', newLine);
		// console.log('createLine addLine.code = ', addLine.code);
		// console.log('createLine addLine.title = ', addLine.title);
		// console.log('createLine addLine = ', addLine);
		// res.json(newLine);
		// order.lines.push(addLine);
		// order.save();
		// req.session.success = "Order line created successfully!";
		
		// let line = await Line.findById(req.params.line_id).populate('sublines').exec();
		// console.log('CREATE subline line = ', line)
		// console.log('CREATE subline = ', req.body);
		// let subline = await Subline.create(req.body);
		// console.log('CREATE post subline = ', subline);
		// line.sublines.push(subline._id);
		// line.save();
		// req.session.success = "Order subline created successfully!";
		// //res.send('POST create new subline!');
		// res.redirect(`/projects/${req.params.id}/rooms/${req.params.room_id}/orders/${req.params.order_id}`);
	},
	
	async createSelectSubline(req, res, next) {
	
		console.log('CREATE select subline req.params = ', req.params);
		let line = await Line.findById(req.params.line_id).populate('sublines').exec();
		console.log('CREATE subline line = ', line)
		console.log('CREATE subline = ', req.body);
		let subline = await Subline.create(req.body);
		console.log('CREATE post subline = ', subline);
		line.sublines.push(subline._id);
		line.save();
		req.session.success = "Order subline created successfully!";
		res.redirect(`/catalog/products/${req.session.productId}/subadd`);
	},
	
	// Update subline
	async updateSubline(req, res, next) {
		console.log('updateSubline req.params = ', req.params);
		console.log('updateSubline req.body = ', req.body);
		
		let currentSubline = await Subline.findByIdAndUpdate(req.params.subline_id, req.body);
		let newSubline = await Subline.findById(req.params.subline_id).populate({
			path: 'product',
			model: 'Product',
			populate: {
				path: 'cabtype',
				model: 'Cabtype'
			}
		});
		console.log('updateSubline line = ', newSubline);
		res.json(newSubline);
		req.session.success = 'Order subline updated successfully!';
	},
	
	// Delete subline
	async deleteSubline(req, res, next) {
		//console.log('deleteLine req.params = ', req.params);
		// console.log('deleteLine req.body = ', req.body);
		Subline.findByIdAndRemove(req.params.subline_id, function(err, line) {
			if(err){
				console.log(err);
			} else {
				req.session.success = 'Subline deleted successfully!';
				// console.log('deleteLine req.session = ', req.session);
				res.json(line);
			}
		});
	}
}