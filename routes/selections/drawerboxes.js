const express = require('express');
const router = express.Router({ mergeParams: true });
const { asyncErrorHandler } = require('../../middleware');
const {
	getDrawerboxes,
	createDrawerbox,
	updateDrawerbox,
	deleteDrawerbox
} = require ('../../controllers/selections/drawerboxes');

/* GET drawerboxes index /drawerboxes */
router.get('/', getDrawerboxes);

/* POST drawerboxes create guide */
router.post('/', asyncErrorHandler(createDrawerbox));

/* PUT drawerboxes/:id update guide */
router.put('/:drawerbox_id', asyncErrorHandler(updateDrawerbox));

/* DELETE guide delete drawerboxes/:id */
router.delete('/:drawerbox_id', asyncErrorHandler(deleteDrawerbox));

module.exports = router;