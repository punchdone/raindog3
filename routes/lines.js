const express = require('express');
const router = express.Router({ mergeParams: true });
const { 
	asyncErrorHandler
} = require('../middleware');
const {
	createLine,
	createLinePro,
	createLineSub,
	updateLine,
	deleteLine
} = require('../controllers/lines');

/* POST lines create projects/:id/rooms/:room_id/orders/:order_id/lines */
router.post('/', asyncErrorHandler(createLine));

/* POST lines and move to sublines create projects/:id/rooms/:room_id/orders/:order_id/lines/subadd */
router.post('/subadd', asyncErrorHandler(createLineSub));

/* POST PRO lines create projects/:id/rooms/:room_id/orders/:order_id/lines/pro */
router.post('/pro', asyncErrorHandler(createLinePro));

// /* GET rooms index projects/:id/rooms/:room_id */
// router.get('/:room_id', (req, res, next) => {
//   res.send('SHOW /projects/:id/rooms/:id');
// });

// /* GET rooms edit projects/:id/rooms/:room_id/edit */
// router.get('/:room_id/edit', (req, res, next) => {
//   res.send('EDIT /projects/:id/rooms/:room_id/edit');
// });

/* PUT orders update projects/:id/rooms/:room_id/orders/:order_id/lines/:line_id */
router.put('/:line_id', asyncErrorHandler(updateLine));

/* DELETE lines project/:id/rooms/:room_id/orders/:order_id/lines/:line_id */
router.delete('/:line_id', asyncErrorHandler(deleteLine));

/* DELETE rooms destroy projects/:id/rooms/:room_id */
//router.delete('/:room_id', isRoomAuthor, asyncErrorHandler(roomDestroy));

module.exports = router;