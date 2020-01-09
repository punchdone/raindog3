const express = require('express');
const router = express.Router({ mergeParams: true });
const { 
	asyncErrorHandler
} = require('../middleware');
const {
	createSubline,
	createSelectSubline,
	updateSubline,
	deleteSubline
} = require('../controllers/sublines');

/* POST rooms create orders/:id/lines */
router.post('/', asyncErrorHandler(createSubline));

/* POST subline from the select form */
router.post('/select', asyncErrorHandler(createSelectSubline));

/* PUT subline orders/:order_id/lines/:line_id/sublines/:subline_id */
router.put('/:subline_id', asyncErrorHandler(updateSubline));

/* DELETE subline */
router.delete('/:subline_id', asyncErrorHandler(deleteSubline));

// /* GET rooms index projects/:id/rooms/:room_id */
// router.get('/:room_id', (req, res, next) => {
//   res.send('SHOW /projects/:id/rooms/:id');
// });

// /* GET rooms edit projects/:id/rooms/:room_id/edit */
// router.get('/:room_id/edit', (req, res, next) => {
//   res.send('EDIT /projects/:id/rooms/:room_id/edit');
// });

/* PUT rooms update projects/:id/rooms/:room_id */
//router.put('/:room_id', isRoomAuthor, asyncErrorHandler(roomUpdate));

/* DELETE rooms destroy projects/:id/rooms/:room_id */
//router.delete('/:room_id', isRoomAuthor, asyncErrorHandler(roomDestroy));

module.exports = router;