require('dotenv').config();

const Product = require('../../models/catalog/product');
const Cabtype = require('../../models/catalog/cabtype');
const Line = require('../../models/line');
const Subline = require('../../models/subline');

const { cloudinary } = require('../../cloudinary');

module.exports = {
	//Products Index
	async indexProducts(req, res, next) {
		let products = await Product.find({}).populate({
				path: 'cabtype',
				model: 'Cabtype'
		});
		console.log('At the index req.session = ', req.session);
		res.render('catalog/products/index', { products, title: 'Product Listing' });
	},
	
	//Product New
	async newProduct(req, res, next) {
		cabtypes = await Cabtype.find({});
		res.render('catalog/products/new', { cabtypes });
	},
	
	//Product Create
	async createProduct(req, res, next) {
		console.log('You are creating a product!');
		console.log('req.body = ', req.body.product);
		console.log('req.files = ', req.files);
		req.body.product.images = [];
		req.body.product.docs =[];
		for(const file of req.files) {
			req.body.product.images.push({
				url: file.secure_url,
				public_id: file.public_id
			});
		};		
		let product = await Product.create(req.body.product);
		req.session.success = 'Product created successfully!';
		res.redirect('/catalog/products');
		//res.redirect(`/products/${product.id}`);
	},
	
	//Product Show
	async showProduct(req, res, next) {
		let product = await Product.findById(req.params.id).populate([
			{
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
			}
		]);
		res.render('catalog/products/show', { product });
	},
	
	//Product Show Select
	async showProductSelect(req, res, next) {
		let product = await Product.findById(req.params.id).populate({
			path: 'cabtype',
			model: 'Cabtype'
		});
		console.log('Product select = ', req.session);
		req.session.success = 'The project ID is ', req.session.projectId;
		projectId = req.session.projectId;
		roomId = req.session.roomId;
		orderId = req.session.orderId;
		req.session.productId = product._id;
		let accessories = await Product.find({}).populate({
			path: 'cabtype',
			model: 'Cabtype'
		});
		req.session.save();
		res.render('catalog/products/select', { product, projectId, roomId, orderId, accessories });
	},
	
	//Product Show Sub Select (i.e., accessories and modifications)
	async showProductSubSelect(req, res, next) {
		let product = await Product.findById(req.params.id).populate({
			path: 'cabtype',
			model: 'Cabtype'
		});
		req.session.success = 'The project ID is ', req.session.projectId;
		projectId = req.session.projectId;
		roomId = req.session.roomId;
		orderId = req.session.orderId;
		lineId = req.session.lineId;
		let line = await Line.findById(req.session.lineId).populate({ 
			path: 'sublines',
			model: 'Subline',
			populate: {
				path: 'product',
				model: 'Product',
				populate: {
					path: 'cabtype',
					model: 'Cabtype'
				}
			}
		});
		console.log('showProductSubSelect line = ', line);
		let accessories = await Product.find({}).populate({
			path: 'cabtype',
			model: 'Cabtype'
		});
		req.session.save();
		res.render('catalog/products/selectsub', { product, projectId, roomId, orderId, line, accessories });
	},
	
	//Product Edit
	async editProduct(req, res, next) {
		let product = await Product.findById(req.params.id).populate([
			{
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
			}
		]);
		let accessories = await Product.find({ 'cabtype': '5d9f754af9cdac224066afbe'}).populate('cabtype').exec();
		res.render('catalog/products/edit', { product, accessories });
	},
	
	//Product Update
	async updateProduct(req, res, next) {
		// Find Product by ID
		console.log('updateProduct req.params.id = ', req.params.id);
		console.log('updateProduct req.body = ', req.body);
		let product = await Product.findById(req.params.id);
		// Update the pics
		//console.log('updateProduct product = ', product);
		console.log('updateProduct req.files = ', req.files);
		console.log('updateProduct req.body.deleteImages = ', req.body.deleteImages);
		if(req.body.deleteImages && req.body.deleteImages.length) {
			//assign deleteImages from req.body to its own variable
			let deleteImages = req.body.deleteImages;
			//loop over deleteImages
			for(const public_id of deleteImages) {
				//delete images from cloudinary
				await cloudinary.v2.uploader.destroy(public_id);
				//delete image from product.images array
				for(const image of product.images) {
					if(image.public_id === public_id) {
						let index = product.images.indexOf(image);
						product.images.splice(index, 1);
						console.log('updateProduct remaining images = ', product.images);
					}
				}
			}
		};
		//check if there are any new images for upload
		console.log('updateProduct req.files = ', req.files, ' or ', req.body.images);
		if(req.files) {
			//upload images
			for(const file of req.files) {
				//add images to product.images array
				product.images.push({
					url: file.secure_url,
					public_id: file.public_id
				});
			}
			console.log('updateProduct with new images = ', product.images);
		};
		// Update the docs
		
		let cabtype = await Cabtype.find({ 'code': req.body.config_code.slice(0,1) });
		req.body.cabtype = cabtype[0]._id;
		req.body.configuration = req.body.config_code.slice(1);
		req.body.images = product.images;
		// Hinging checkbox
		if (req.body.hinging === 'on') {
			req.body.hinging = true;
		} else {
			req.body.hinging = false;
		};
		// Width checkbox
		if (req.body.widthfix === 'on') {
			req.body.widthfix = true;
		} else {
			req.body.widthfix = false;
		};
		// Height checkbox
		if (req.body.heightfix === 'on') {
			req.body.heightfix = true;
		} else {
			req.body.heightfix = false;
		};
		// Depth checkbox
		if (req.body.depthfix === 'on') {
			req.body.depthfix = true;
		} else {
			req.body.depthfix = false;
		};
		// Finished interior checkbox
		if (req.body.finint === 'on') {
			req.body.finint = true;
		} else {
			req.body.finint = false;
		};
		// Faceframe checkbox
		if (req.body.faceframe === 'on') {
			req.body.faceframe = true;
		} else {
			req.body.faceframe = false;
		};
		console.log('Product Update req.body = ', req.body);
		await Product.findByIdAndUpdate(req.params.id, req.body);
		req.session.success = 'Product updated successfully!';
		res.redirect(`/catalog/products/${product.id}`);
	},
	
	// Add available mod to product
	async addProductMod(req, res, next) {
		console.log('addProductMod req.params = ', req.params);
		console.log('addProductMod req.body = ', req.body);
		let product = await Product.findById(req.params.id);
		let mods = product.mods;
		console.log('addProductMod mods = ', mods);
		mods.push(req.body.mods);
		console.log('addProductMod mods after push= ', mods);
		let updateProduct = await Product.findByIdAndUpdate(req.params.id, { 'mods': mods });
		req.session.success = "Added a new available mod or accessory to this product!";
		res.redirect(`/catalog/products/${product.id}`);
	},
	// Delete available mod from product
	async deleteProductMod(req, res, next) {
		console.log('deleteProductMod req.params = ', req.params);
		let product = await Product.findById(req.params.id);
		let mods = product.mods;
		for (var i = 0; i < mods.length; i++) {
			if (mods[i] == req.params.mod_id) {
					mods.splice(i, 1);
				};
		};
		let updateProduct = await Product.findByIdAndUpdate(req.params.id, { 'mods': mods });
		res.redirect(`/catalog/products/${product.id}`);
	},
	
	//Product Destroy
	async deleteProduct(req, res, next) {
		let product = await Product.findById(req.params.id);
		for(const image of product.images) {
			await cloudinary.v2.uploader.destroy(image.public_id);
		}
		await product.remove();
		req.session.success = 'Product was successfully deleted!';
		res.redirect('/catalog/products');
	}
}

