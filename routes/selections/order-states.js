const express = require('express');
const router = express.Router({ mergeParams: true });
const { asyncErrorHandler } = require('../../middleware');
const {
	getOrderStates,
	createOrderState,
	updateOrderState,
	deleteOrderState
} = require ('../../controllers/selections/order-states');

/* GET order_state index /order_states */
router.get('/', getOrderStates);

/* POST order_state create order_state */
router.post('/', asyncErrorHandler(createOrderState));

/* PUT order_state/:id update order_state */
router.put('/:order_state_id', asyncErrorHandler(updateOrderState));

/* DELETE order_state delete order_state/:id */
router.delete('/:order_state_id', asyncErrorHandler(deleteOrderState));

module.exports = router;