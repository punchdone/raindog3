const express = require('express');
const router = express.Router({ mergeParams: true });
const { asyncErrorHandler } = require('../../middleware');
const {
	getHinges,
	createHinge,
	updateHinge,
	deleteHinge
} = require ('../../controllers/selections/hinges');

/* GET hinges index /hinges */
router.get('/', getHinges);

/* POST hinges create interior */
router.post('/', asyncErrorHandler(createHinge));

/* PUT hinges/:id update interior */
router.put('/:hinge_id', asyncErrorHandler(updateHinge));

/* DELETE interior delete hinges/:id */
router.delete('/:hinge_id', asyncErrorHandler(deleteHinge));

module.exports = router;