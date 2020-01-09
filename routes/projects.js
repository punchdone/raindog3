const express = require('express');
const router = express.Router();
const multer = require('multer');
const { cloudinary, storage } = require('../cloudinary');
const upload = multer({ storage });
const { asyncErrorHandler } = require('../middleware');
const { 	projectIndex, 
	  		projectNew,
	  		projectCreate,
	   		projectShow,
	   		projectEdit,
	   		projectUpdate,
	   		projectDestroy
	  } = require('../controllers/projects');

/* GET projects index /projects */
router.get('/', asyncErrorHandler(projectIndex));

/* GET projects new /projects/new */
router.get('/new', projectNew);

/* POST projects create /projects */
router.post('/', upload.array('images', 4), asyncErrorHandler(projectCreate));

/* GET projects index /projects/:id */
router.get('/:id', asyncErrorHandler(projectShow));

/* GET projects edit /projects/:id/edit */
router.get('/:id/edit', asyncErrorHandler(projectEdit));

/* PUT projects update /projects/:id */
router.put('/:id', upload.array('images', 4), asyncErrorHandler(projectUpdate));

/* DELETE projects destroy /projects/:id */
router.delete('/:id', asyncErrorHandler(projectDestroy));

module.exports = router;

/*
GET index		/projects
GET new			/projects/new
POST create		/projects
GET show		/projects/:id
GET edit		/projects/:id/edit
PUT	update		/projects/:id
DELETE destroy	/projects/:id
*/