const Wood = require('../../../models/selections/wood');
const Finish = require('../../../models/selections/finish');
const FinishType = require('../../../models/selections/taxonomy/finishtype');
const Door = require('../../../models/selections/door');
const DoorType = require('../../../models/selections/taxonomy/doortype');
const Drawerbox = require('../../../models/selections/drawerbox');
const Interior = require('../../../models/selections/interior');
const Hinge = require('../../../models/selections/hinge');
const Guide = require('../../../models/selections/guide');

module.exports = {
	// Pull material rates (as an object of 3/4 ply, 3/4 ipb, 1/4 panel, lumber and veneer)
	async finMaterialRates(wood) {
		let finMaterialRates = await Wood.findById(wood);
		return finMaterialRates;
	},

	// Pull finish rate
	async finishRate(type) {
		let finish = await Finish.findById(type);
		let finishType = await FinishType.findById(finish.type);
		return finishType.rate;
	},

	// Pull door type rate (SF labor rate)
	async doorTypeRate(type) {
		// console.log('Type from door = ', type);
		let door = await Door.findById(type);
		// console.log('Door = ', door);
		let doorType = await DoorType.findById(door.type);
		// console.log('Door type = ', doorType);
		return doorType.rate;
	},
	
	// Pull drawerbox rates
	async dboxRates(drawerbox) {
		let drawerboxRates = await Drawerbox.findById(drawerbox);
		return drawerboxRates;
	},
	
	// Pull interior rates
	async interiorRates(interior) {
		let interiorRates = await Interior.findById(interior);
		return interiorRates;
	},
	
	// Pull guide rates
	async guideRate(guide) {
		let guideRate = await Guide.findById(guide);
		console.log('guideRate = ', guideRate.rate);
		return guideRate.rate;
	},
	
	// Pull hinge rates
	async hingeRate(hinge) {
		let hingeRate = await Hinge.findById(hinge);
		console.log('hingeRate = ', hingeRate.rate);
		return hingeRate.rate;
	}
};