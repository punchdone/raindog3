const express = require('express');
const router = express.Router({ mergeParams: true });
const { asyncErrorHandler } = require('../../middleware');
const {
	getFinishes,
	createFinish,
	updateFinish,
	deleteFinish
} = require ('../../controllers/selections/finishes');

/* GET finishes index /finishes */
router.get('/', getFinishes);

/* POST finishes create guide */
router.post('/', asyncErrorHandler(createFinish));

/* PUT finishes/:id update guide */
router.put('/:finish_id', asyncErrorHandler(updateFinish));

/* DELETE guide delete finishes/:id */
router.delete('/:finish_id', asyncErrorHandler(deleteFinish));

module.exports = router;