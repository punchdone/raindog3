const express = require('express');
const router = express.Router({ mergeParams: true });
const { asyncErrorHandler } = require('../../middleware');
const {
	getWoods,
	createWood,
	updateWood,
	addWoodFinish,
	deleteWoodFinish,
	deleteWood
} = require ('../../controllers/selections/woods');

/* GET woods index /woods */
router.get('/', getWoods);

/* POST woods create wood */
router.post('/', asyncErrorHandler(createWood));

/* PUT woods/:id update wood */
router.put('/:wood_id', asyncErrorHandler(updateWood));

/* PUT add wood finishes update woods/:id/finishes */
router.put('/:wood_id/finishes', asyncErrorHandler(addWoodFinish));

/* PUT delete wood finishes update woods/:id/finished:id */
router.put('/:wood_id/finishes/:finish_id', asyncErrorHandler(deleteWoodFinish));

/* DELETE wood delete woods/:id */
router.delete('/:wood_id', asyncErrorHandler(deleteWood));

module.exports = router;