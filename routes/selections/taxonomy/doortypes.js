const express = require('express');
const router = express.Router({ mergeParams: true });
const { asyncErrorHandler } = require('../../../middleware');
const {
	getDoorTypes,
	createDoorType,
	updateDoorType,
	deleteDoorType
} = require ('../../../controllers/selections/taxonomy/doortypes');

/* GET finishes index /finishes */
router.get('/', getDoorTypes);

/* POST finishes create guide */
router.post('/', asyncErrorHandler(createDoorType));

/* PUT finishes/:id update guide */
router.put('/:doortype_id', asyncErrorHandler(updateDoorType));

/* DELETE guide delete finishes/:id */
router.delete('/:doortype_id', asyncErrorHandler(deleteDoorType));

module.exports = router;