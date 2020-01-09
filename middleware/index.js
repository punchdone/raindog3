const Room = require('../models/room');

module.exports = {
	asyncErrorHandler: (fn) =>
		(req, res, next) => {
			Promise.resolve(fn(req, res, next))
						 .catch(next);
		},
	isRoomAuthor: async (req, res, next) => {
		let room = await Room.findById(req.params.room_id);
		if(room.author.equals(req.user._id)) {
			return next();
		}
		req.session.error = 'Bye bye';
		return res.redirect('/');
	}
}