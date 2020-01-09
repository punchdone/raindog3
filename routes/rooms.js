const express = require('express');
const router = express.Router({ mergeParams: true });
const { 
	asyncErrorHandler,
	isRoomAuthor
} = require('../middleware');
const {
	roomCreate,
	roomUpdate,
	roomDestroy
} = require('../controllers/rooms');

/* POST rooms create projects/:id/rooms */
router.post('/', asyncErrorHandler(roomCreate));

// /* GET rooms index projects/:id/rooms/:room_id */
// router.get('/:room_id', (req, res, next) => {
//   res.send('SHOW /projects/:id/rooms/:id');
// });

// /* GET rooms edit projects/:id/rooms/:room_id/edit */
// router.get('/:room_id/edit', (req, res, next) => {
//   res.send('EDIT /projects/:id/rooms/:room_id/edit');
// });

/* PUT rooms update projects/:id/rooms/:room_id */
router.put('/:room_id', isRoomAuthor, asyncErrorHandler(roomUpdate));

/* DELETE rooms destroy projects/:id/rooms/:room_id */
router.delete('/:room_id', isRoomAuthor, asyncErrorHandler(roomDestroy));

module.exports = router;