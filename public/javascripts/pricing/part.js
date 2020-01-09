
const Helper = require('./helper');
const Materials = require('./material');


	
module.exports ={
	// Calculate individual door cost
	async doorCost(door, wood, finish, width, height, depth) {
		// console.log('doorCost detailios = ', door, ' ', wood, ' ', finish, ' ', width, ' ', height, ' ', depth);
		doorTypeRate = await Materials.doorTypeRate(door);
		// console.log('doorCost doorTypeRate = ', doorTypeRate);
		finishRate = await Materials.finishRate(finish);
		// console.log('doorCost finishRate = ', finishRate);
		dmRate = await doorMaterialRate(door, wood);
		// console.log('doorCost doorMaterialRate = ', dmRate);
		doorRate = doorTypeRate + finishRate + dmRate;
		// console.log('doorCost Overall doorRate = ', doorRate);
		// console.log('doorCost width = ', width);
		// console.log('doorCost height = ', height);
		doorSize = Helper.sfMin(width, height);
		// console.log('doorCost doorSize = ', doorSize);
		doorCost = doorSize * doorRate;
		// console.log('doorCost = ', doorCost);
		return doorCost;
	},
	
	// Calculate drawerbox cost
	async drawerboxCost(drawerbox, width, height, depth) {
		drawerboxRates = await Materials.dboxRates(drawerbox);
		// console.log('drawerboxCost drawerboxRates = ', drawerboxRates);
		sidewallSF = (((width * height) * 2) + ((depth * height) * 2))/144;
		// $2.50 represents the natural finish rate for drawer boxes
		sidewallCost = sidewallSF * (drawerboxRates.variableRate + 2.50);
		bottomSF = (width * depth) / 144;
		bottomCost = bottomSF * (drawerboxRates.bottomRate + 2.50);
		drawerboxCost = sidewallCost + bottomCost + drawerboxRates.fixedRate;
		// console.log('drawerboxCost = ', drawerboxCost);
		return drawerboxCost;
	}
};

// Calculate door material cost by type
async function doorMaterialRate(door, wood) {
	// console.log('doorMaterialRate door = ', door);
	// console.log('doorMaterialRate wood = ', wood);
	finMaterialRates = await Materials.finMaterialRates(wood);
	lumberRate = finMaterialRates.lumber;
	panelRate = finMaterialRates.qpnl / 32;
	// console.log('doorMaterialRate finMaterialRates = ', finMaterialRates);
	if (door.title = "Recessed") {
		let doorMaterialRate = lumberRate + panelRate;
		// console.log ('doorMaterialRate Recessed doorMaterialRate = ', doorMaterialRate);
		return doorMaterialRate;
	} else if (door.title = "Raised" || "Reversed Raised") { 
		let doorMaterialRate = lumberRate * 2;
		// console.log('Raised doorMaterialRate = ', doorMaterialRate);
		return doorMaterialRate;
	}
};