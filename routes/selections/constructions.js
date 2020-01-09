const express = require('express');
const router = express.Router({ mergeParams: true });
const { asyncErrorHandler } = require('../../middleware');
const {
	getConstruction,
	createConstruction,
	updateConstruction,
	deleteConstruction
} = require ('../../controllers/selections/constructions');

/* GET construction index /constructions */
router.get('/', getConstruction);

/* POST construction create construction */
router.post('/', asyncErrorHandler(createConstruction));

/* PUT construction/:id update construction */
router.put('/:construction_id', asyncErrorHandler(updateConstruction));

/* DELETE construction delete construction/:id */
router.delete('/:construction_id', asyncErrorHandler(deleteConstruction));

module.exports = router;