const Product = require('../../../models/catalog/product');
const Cabtype = require('../../../models/catalog/cabtype');
const Wood = require('../../../models/selections/wood');
const Finish = require('../../../models/selections/finish');
const Door = require('../../../models/selections/door');
const Drawerbox = require('../../../models/selections/drawerbox');
const FinishType = require('../../../models/selections/taxonomy/finishtype');
const DoorType = require('../../../models/selections/taxonomy/doortype');
const CabinetCost = require('./cabinet');
const AccessoryCost = require('./accessory');


module.exports = {
	async rwPrice(line, order) {
		if (line.cab_type === "A") {
			return price = AccessoryCost.accessoryCost(line, order);
		} else if (line.cab_type === "B" || "W" || "T" || "V") {
			return price = await CabinetCost.cabinetCost(line, order);
		} else if (line.cab_type === "M") {
			millworkCost(line, order);
		}
	}
};


	
	function millworkCost(line, order) {
		console.log('Calculate millwork cost!');

	};

	