const express = require('express');
const router = express.Router({ mergeParams: true });
const { asyncErrorHandler } = require('../middleware');
const {
//	indexOrders,
	newOrder,
	newOrderMulti,
	createOrder,
	createOrderMulti,
	showOrder,
	updateOrder,
//	deleteOrders
} = require('../controllers/orders');

/* GET orders new /new */
router.get('/new', asyncErrorHandler(newOrder));

/* GET orders create multi-step header projects/:id/rooms/:id/orders/multi */
router.get('/multi', asyncErrorHandler(newOrderMulti));

/* POST orders create projects/:id/rooms/:id/orders */
router.post('/', asyncErrorHandler(createOrder));

/* POST order create multi projects/:id/rooms/:id/orders/multi */
router.post('/multi', asyncErrorHandler(createOrderMulti));

/* GET orders project/:id/rooms/:id/orders/:id */
router.get('/:order_id', asyncErrorHandler(showOrder));

/* POST rooms create projects/:id/rooms */
//router.post('/', asyncErrorHandler(roomCreate));

// /* GET rooms index projects/:id/rooms/:room_id */
// router.get('/:room_id', (req, res, next) => {
//   res.send('SHOW /projects/:id/rooms/:id');
// });

// /* GET rooms edit projects/:id/rooms/:room_id/edit */
// router.get('/:room_id/edit', (req, res, next) => {
//   res.send('EDIT /projects/:id/rooms/:room_id/edit');
// });

/* PUT orders update orders/:id */
router.put('/:order_id', asyncErrorHandler(updateOrder));

/* DELETE rooms destroy projects/:id/rooms/:room_id */
//router.delete('/:room_id', isRoomAuthor, asyncErrorHandler(roomDestroy));

module.exports = router;