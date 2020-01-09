const express = require('express');
const router = express.Router({ mergeParams: true });
const { asyncErrorHandler } = require('../../middleware');
const {
	getDoors,
	createDoor,
	updateDoor,
	deleteDoor
} = require ('../../controllers/selections/doors');

/* GET doors index /doors */
router.get('/', getDoors);

/* POST doors create door */
router.post('/', asyncErrorHandler(createDoor));

/* PUT doors/:id update door */
router.put('/:door_id', asyncErrorHandler(updateDoor));

/* DELETE door delete doors/:id */
router.delete('/:door_id', asyncErrorHandler(deleteDoor));

module.exports = router;