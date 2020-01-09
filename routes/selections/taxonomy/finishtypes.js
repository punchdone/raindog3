const express = require('express');
const router = express.Router({ mergeParams: true });
const { asyncErrorHandler } = require('../../../middleware');
const {
	getFinishTypes,
	createFinishType,
	updateFinishType,
	deleteFinishType
} = require ('../../../controllers/selections/taxonomy/finishtypes');

/* GET finishes index /finishes */
router.get('/', getFinishTypes);

/* POST finishes create guide */
router.post('/', asyncErrorHandler(createFinishType));

/* PUT finishes/:id update guide */
router.put('/:finishtype_id', asyncErrorHandler(updateFinishType));

/* DELETE guide delete finishes/:id */
router.delete('/:finishtype_id', asyncErrorHandler(deleteFinishType));

module.exports = router;