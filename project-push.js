const express = require('express');
const router = express.Router();

const Project = require('./models/project');
const Room = require('./models/room');

async projectIndex(req, res, next) {
		let projects = await Project.find({});
		res.render('projects/index', { projects, title: 'Project Listing' });
	};