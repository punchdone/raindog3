
const Parts = require('./part');


// Accessory switch function
exports.accessoryCost =	function(line, order) {
		let completeCode = line.cab_type + line.configuration;
		if (completeCode === 'ADOOR') {
			let price = Parts.doorCost(order.door, order.wood, order.finish, line.width, line.height, line.depth);
			return price;
		} else if (completeCode === 'ADBOX') {
			let price = Parts.drawerboxCost(order.drawerbox, line.width, line.height, line.depth);
			return price;
		};
};



