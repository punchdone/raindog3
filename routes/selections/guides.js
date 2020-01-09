const express = require('express');
const router = express.Router({ mergeParams: true });
const { asyncErrorHandler } = require('../../middleware');
const {
	getGuides,
	createGuide,
	updateGuide,
	deleteGuide
} = require ('../../controllers/selections/guides');

/* GET guides index /guides */
router.get('/', getGuides);

/* POST guides create guide */
router.post('/', asyncErrorHandler(createGuide));

/* PUT guides/:id update guide */
router.put('/:guide_id', asyncErrorHandler(updateGuide));

/* DELETE guide delete guides/:id */
router.delete('/:guide_id', asyncErrorHandler(deleteGuide));

module.exports = router;