const Order = require('../models/order');
const Line = require('../models/line');
const Product = require('../models/catalog/product');
const Cabtype = require('../models/catalog/cabtype');
const rwCalc = require('../public/javascripts/pricing/rwCalc');


module.exports = {
	// Line Create
	async createLine(req, res, next) {
		console.log('createLine req.session = ', req.session);
		console.log('createLine req.body = ', req.body);
		let order = await Order.findById(req.session.orderId).populate('lines').exec();
		let addLine = await Line.create(req.body);
		let newLine = await Line.findById(addLine._id).populate({
			path: 'product',
			model: 'Product',
			populate: [{
				path: 'cabtype',
				model: 'Cabtype'
			},
			{	path: 'mods',
				model: 'Product',
				populate: {
					path: 'cabtype',
					model: 'Cabtype'
				}
			}]
		})
		let product = await Product.findById(addLine.product);
		let cabtype = await Cabtype.findById(product.cabtype);
		var code = cabtype.code + product.configuration;
		var title = product.title;
		req.session.lineId = addLine._id;
		console.log('createLine req.session update = ', req.session);
		Object.assign(addLine, {'code': code, 'title': title});
		console.log('Scott is struggling to modify this object = ', newLine);
		console.log('createLine addLine.code = ', addLine.code);
		console.log('createLine addLine.title = ', addLine.title);
		console.log('createLine addLine = ', addLine);
		res.json(newLine);
		order.lines.push(addLine);
		order.save();
		req.session.success = "Order line created successfully!";
		
		//res.redirect(req.get('referer'));
	},
		
	async createLineSub(req, res, next) {
		// find the order by its id
		let order = await Order.findById(req.session.orderId).populate('lines').exec();
		let product = await Product.findById(req.session.productId);
		req.body.product = product._id;
		let line = await Line.create(req.body);
		order.lines.push(line);
		order.save();
		req.session.lineId = line._id;
		req.session.save();
		req.session.success = "Order line created successfully!";
		res.redirect(`/catalog/products/${req.session.productId}/subadd`);
	},
	
	// Pro Line Create
	async createLinePro(req, res, next) {
		let order = await Order.findById(req.params.order_id).populate('lines').exec();
		console.log('CREATElinePro order= ', order)
		let price = await rwCalc.rwPrice(req.body.line, order);
		console.log('CREATE price = ', price);
		req.body.line.price = price;
		console.log('CREATElinePro line = ', req.body.line);
		let line = await Line.create(req.body.line);
		order.lines.push(line);
		order.save();
		req.session.success = "Order line created successfully!";
		res.redirect(`/projects/${req.params.id}/rooms/${req.params.room_id}/orders/${order.id}`);	
	},
	
	// Line Update
	async updateLine(req, res, next) {
		console.log('updateLine req.params = ', req.params);
		delete req.body['undefined'];
		console.log('updateLine req.body = ', req.body);
		console.log('updateLine req.body.notes = ', req.body.notes);
		
		let currentLine = await Line.findByIdAndUpdate(req.params.line_id, req.body);
		let newLine = await Line.findById(req.params.line_id).populate({
			path: 'product',
			model: 'Product',
			populate: {
				path: 'cabtype',
				model: 'Cabtype'
			}
		});
		console.log('updateLine line = ', newLine);
		res.json(newLine);
		// let line = await Line.findByIdAndUpdate(req.params.line_id, req.body, {new: true}, function(err, line) {
		// 	if(err){
		// 		console.log(err);
		// 	} else {
		// 		let newLine = Line.findById(line._id).populate({
		// 			path: 'product',
		// 			model: 'Product',
		// 			populate: {
		// 				path: 'cabtype',
		// 				model: 'Cabtype'
		// 			}
		// 		});
		// 		console.log('updateLine line = ', newLine);
		// 		res.json(newLine);
		// 	}
		// });
		req.session.success = 'Order line updated successfully!';
		//res.redirect(req.get('referer'));
		//res.redirect(`/projects/${req.params.id}/rooms/${req.params.room_id}/orders/${req.params.order_id}`);
	},
	
	async deleteLine(req, res, next) {
		console.log('deleteLine req.params = ', req.params);
		console.log('deleteLine req.body = ', req.body);
		Line.findByIdAndRemove(req.params.line_id, function(err, line) {
			if(err){
				console.log(err);
			} else {
				req.session.success = 'Line deleted successfully!';
				console.log('deleteLine req.session = ', req.session);
				res.json(line);
			}
		});
	}
};



