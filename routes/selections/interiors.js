const express = require('express');
const router = express.Router({ mergeParams: true });
const { asyncErrorHandler } = require('../../middleware');
const {
	getInteriors,
	createInterior,
	updateInterior,
	deleteInterior
} = require ('../../controllers/selections/interiors');

/* GET interiors index /interiors */
router.get('/', getInteriors);

/* POST interiors create interior */
router.post('/', asyncErrorHandler(createInterior));

/* PUT interiors/:id update interior */
router.put('/:interior_id', asyncErrorHandler(updateInterior));

/* DELETE interior delete interiors/:id */
router.delete('/:interior_id', asyncErrorHandler(deleteInterior));

module.exports = router;