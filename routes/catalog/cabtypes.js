const express = require('express');
const router = express.Router({ mergeParams: true });
const { asyncErrorHandler } = require('../../middleware');
const {
	getCabtypes,
	createCabtype,
	updateCabtype,
	deleteCabtype
} = require ('../../controllers/catalog/cabtypes');

/* GET cabtypes index /catalog/cabtypes */
router.get('/', getCabtypes);

/* POST cabtypes create cabtype */
router.post('/', asyncErrorHandler(createCabtype));

/* PUT cabtypes/:id update cabtype */
router.put('/:cabtype_id', asyncErrorHandler(updateCabtype));

/* DELETE cabtype delete cabtypes/:id */
router.delete('/:cabtype_id', asyncErrorHandler(deleteCabtype));

module.exports = router;