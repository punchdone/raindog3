require('dotenv').config();

const Project = require('../models/project');

const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mbxGeocoding({ accessToken: process.env.MAPBOX_TOKEN });

const { cloudinary } = require('../cloudinary');

module.exports = {
	//Projects Index
	async projectIndex(req, res, next) {
		let projects = await Project.paginate({}, {
			page: req.query.page || 1,
			limit: 10
		});
		projects.page = Number(projects.page);
		res.render('projects/index', { projects, title: 'Project Listing' });
	},
	//Projects New
	projectNew(req, res, next) {
		res.render('projects/new');
	},
	//Projects Create
	async projectCreate(req, res, next) {
		console.log('Project req.files = ', req.files);
		req.body.project.images = [];
		for(const file of req.files) {
			req.body.project.images.push({
				url: file.secure_url,
				public_id: file.public_id
			});
		};
		let response = await geocodingClient
			.forwardGeocode({
				query: req.body.project.location,
				limit: 1
			})
			.send();
		// Terms checkbox
		if (req.body.project.terms === 'on') {
			req.body.project.terms = true;
		} else {
			req.body.project.terms = false;
		};
		req.body.project.coordinates = response.body.features[0].geometry.coordinates;
		let project = await Project.create(req.body.project);
		req.session.success = 'Project created successfully!';
		res.redirect(`/projects/${project.id}`);
	},
	//Projects Show
	async projectShow(req, res, next) {
		let project = await Project.findById(req.params.id).populate({
			path: 'rooms',
			options: { sort: { '_id': 1 } },
			model: 'Room',
			populate: {
				path: 'orders',
				options: { sort: { 'orderId': -1 } },
				model: 'Order',
				populate: [{
					path: 'wood',
					model: 'Wood'
					},
					{
					path: 'interior',
					model: 'Interior'
					},
					{
					path: 'hinge',
					model: 'Hinge'
					},
					{
					path: 'guide',
					model: 'Guide'
					},
					{
					path: 'drawerbox',
					model: 'Drawerbox'
					},
					{
					path: 'construction',
					model: 'Construction'
					},
					{
					path: 'door',
					model: 'Door'
					},
					{
					path: 'finish',
					model: 'Finish'
				}]
			}
		});
		res.render('projects/show', { project });
	},
	//Project Edit
	async projectEdit(req, res, next) {
		let project = await Project.findById(req.params.id);
		res.render('projects/edit', { project });
	},
	//Project Update
	async projectUpdate(req, res, next) {
		//find project by id
		let project = await Project.findById(req.params.id);
		//checkif there's any images for deletion
		if(req.body.deleteImages && req.body.deleteImages.length) {
			//assign deleteImages from req.body to its own variable
			let deleteImages = req.body.deleteImages;
			//loop over deleteImages
			for(const public_id of deleteImages) {
				//delete images from cloudinary
				await cloudinary.v2.uploader.destroy(public_id);
				//delete image from project.images array
				for(const image of project.images) {
					if(image.public_id === public_id) {
						let index = project.images.indexOf(image);
						project.images.splice(index, 1);
					}
				}
			}
		};
		//check if there are any new images for upload
		if(req.files) {
			//upload images
			for(const file of req.files) {
				//add images to project.images array
				project.images.push({
					url: file.secure_url,
					public_id: file.public_id
				});
			}
		};
		//check to see if location changes
		if(req.body.project.location !== project.location) {
			let response = await geocodingClient
				.forwardGeocode({
					query: req.body.project.location,
					limit: 1
				})
				.send();
			project.coordinates = response.body.features[0].geometry.coordinates;
			project.location = req.body.project.location;
		}
		//update the project with any new properties
		project.title = req.body.project.title;
		project.description = req.body.project.description;
		project.channel = req.body.project.channel;
		//save the upated project into the database
		await project.save();
		//redirect to the show page
		res.redirect(`/projects/${project.id}`);
	},
	//Project Destroy
	async projectDestroy(req, res, next) {
		let project = await Project.findById(req.params.id);
		for(const image of project.images) {
			await cloudinary.v2.uploader.destroy(image.public_id);
		}
		await project.remove();
		req.session.success = 'Project was successfully deleted!';
		res.redirect('/projects');
	}
}