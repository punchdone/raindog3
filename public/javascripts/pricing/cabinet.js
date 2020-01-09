const Helper = require('./helper');
const Materials = require('./material');
const Parts = require('./part');

module.exports = {
	//Standard Cabinet Cost
	async cabinetCost (line, order) {
		console.log('This is the formula: Calculate cabinet cost!');
		// console.log('Door #1 is ', order.door);
		config = await Helper.lookupConfig(line);
		//console.log('Helper with the config = ', config);
		interior = await interiorCost(order.wood, order.finish, order.interior, line.width, line.height, line.depth, config[0].partitions, config[0].shelves, config[0].finit);
		console.log('Cabinet interior cost = ', interior);
		// console.log('Order door #2 =', order.door);
		doors = await cabDoorCost(order.door, order.wood, order.finish, line.width, line.height, line.depth, config[0].topdrawer, config[0].lowerdrawer, config[0].door, config[0].faces);
		console.log('Cabinet door cost = ', doors);
		lend = await finendCost(order.door, order.wood, order.finish, line.width, line.height, line.depth, line.fin_left);
		console.log('Cabinet LE = ', lend);
		rend = await finendCost(order.door, order.wood, order.finish, line.width, line.height, line.depth, line.fin_right);
		console.log('Cabinet RE = ', rend);
		ff = await faceframeCost(config[0].faceframe, order.wood, order.finish, line.width, line.height, line.depth, config[0].faces);
		console.log('Cabinet face frame cost = ', ff);
		drawers = await cabDrawerCost(order.drawerbox, line.width, line.height, line.depth, config[0].topdrawer, config[0].lowerdrawer);
		console.log('Cabinet drawer cost = ', drawers)
		hinges = await hingeCost(order.hinge, line.width, line.height, line.depth, config[0].topdrawer, config[0].lowerdrawer, config[0].door, config[0].faces);
		console.log('Cabinet hinge cost = ', hinges);
		guides = await guideCost(order.guide, line.width, line.height, line.depth, config[0].topdrawer, config[0].lowerdrawer, config[0].door, config[0].faces);
		console.log('Cabinet guide cost = ', guides);
		cabinetCost = interior + doors + rend + lend + ff + drawers + hinges + guides;
		console.log('Cabinet cost = ', cabinetCost);
		return cabinetCost;
	}
};

async function interiorCost(wood, finish, interior, width, height, depth, partitions, shelves, finint) {
	exteriorRates = await Materials.finMaterialRates(wood);
	finishRate = await Materials.finishRate(finish);
	// console.log('interior is ', interior);
	if (finint === true) {
		if (interior === '5d93dbc8b0e6d62492f63f4f') {
			tpanel = exteriorRates.ply + finishRate;
			qpanel = exteriorRates.qpnl + finishRate;
		} else {
			tpanel = exteriorRates.ipb + finishRate;
			qpanel = exteriorRates.qpnl + finishRate;
		};
	} else {
		interiorRates = await Materials.interiorRates(interior);
		// console.log('interiorRates = ', interiorRates);
		tpanel = interiorRates.tpanel;
		qpanel = interiorRates.qpanel;
	}
	// console.log('Cubbies = ', Helper.cubeCount(height, depth));
	// console.log('Partitions = ', partitions);
	cubeSides = Helper.cubeCount(height, depth) * (2 + partitions);
	// console.log('Interior Cubes = ', cubeSides);
	cubeBottom = await Helper.cubeCount(width, depth) * (2 + shelves);
	cubeCase = (cubeSides + cubeBottom) * (tpanel / 18);
	cubeBack = await Helper.cubeCount(width, height) * (qpanel / 18);
	interiorCost = cubeCase + cubeBack;
	// console.log('interiorCost = ', interiorCost);
	return interiorCost;
};

async function cabDoorCost(door, wood, finish, width, height, depth, topdrawer, lowerdrawer, config_door, faces) {
	// console.log('#3 door is ', door);
	topDrawerCost = await Parts.doorCost(door, wood, finish, width, 6.5, 0.75) * topdrawer;
	// console.log('cabDoorCost topDrawerCost = ', topDrawerCost);
	if (lowerdrawer > 0) {
		lowerDrawerHeight = (height - (6.5 * topdrawer)) / lowerdrawer;
	} else {
		lowerDrawerHeight = 0;
	};
	// console.log('cabDoorCost lowerDrawerHeight = ', lowerDrawerHeight);
	lowerDrawerCost = await Parts.doorCost(door, wood, finish, width, lowerDrawerHeight, 0.75) * lowerdrawer;
	doorHeight = (height - (6.5 * topdrawer));
	if (config_door > 0) {
		doorDollars = await Parts.doorCost(door, wood, finish, (width / config_door), doorHeight, 0.75) * config_door;
	} else {
		doorDollars = 0;
	};
	totalDoorCost = (topDrawerCost + lowerDrawerCost + doorDollars) * faces;
	// console.log('Door costs are ', totalDoorCost);
	return totalDoorCost;
};

async function cabDrawerCost(drawerbox, width, height, depth, topdrawer, lowerdrawer) {
	cabTopdrawerCost = topdrawer * await Parts.drawerboxCost(drawerbox, width, 6.5, depth);
	// console.log('cabDrawerCost Topdrawer = ', cabTopdrawerCost);
	if (lowerdrawer > 0) {
		lowerDrawerHeight = (height - (topdrawer * 6.5)) / lowerdrawer;
	} else {
		lowerDrawerHeight = 0;
	};
	cabLowerdrawerCost = lowerdrawer * await Parts.drawerboxCost(drawerbox, width, lowerDrawerHeight, depth);
	cabDrawerCost = cabTopdrawerCost + cabLowerdrawerCost;
	// console.log('cabDrawerCost Total = ', cabDrawerCost);
	return cabDrawerCost;
}

async function finendCost(door, wood, finish, width, height, depth, cabend) {
	console.log('Finish End = ', cabend)
	exteriorRates = await Materials.finMaterialRates(wood);
	finishRate = await Materials.finishRate(finish);
	if (cabend == 'FE') {
		endCost = ((width * depth)/144) * ((finishRate * 0.5) + (exteriorRates.veneer / 24)) + 25;
	} else if (cabend == 'AP') {
		endCost = ((width * depth)/144) * ((finishRate * 0.5) + (exteriorRates.ply / 24)) + 25;
	} else if (cabend == 'AD') {
		endCost = await Parts.doorCost(door, wood, finish, depth, height, 0.75) + 25;
	} else if (cabend == 'PL') {
		endCost = await Parts.doorCost(door, wood, finish, depth, height, 0.75) + 300;
	} else if (cabend == 'UN') {
		endCost = 3;
	} else {
		endCost = 15;
	};
	return endCost;
};

async function faceframeCost(faceframe, wood, finish, width, height, depth, faces) {
	console.log('Faceframe = ', faceframe );
	if (faceframe === true) {
		exteriorRates = await Materials.finMaterialRates(wood);
		finishRate = await Materials.finishRate(finish);
		console.log('Dims = ', (width + height)/12);
		console.log('Lumber = ', exteriorRates.lumber);
		console.log('Finish Rate = ', finishRate);
		faceframeCost = ((width + height)/12) * (exteriorRates.lumber + finishRate) + 55;
		return faceframeCost;
	} else {
		// console.log('This cabinet does not have a face frame!');
		return faceframeCost = 0;
	};
};

async function hingeCost(hinge, width, height, depth, topdrawer, lowerdrawer, config_door, faces) {
	hingeRate = await Materials.hingeRate(hinge);
	doorHeight = height - (6.5 * topdrawer)-(11.75 * lowerdrawer);
	if (doorHeight < 36 ) {
		hingeQuantity = 2;
	} else {
		hingeQuantity = Math.ceil(doorHeight / 12) - 1;
	};
	hingeCost = hingeRate * hingeQuantity * faces * config_door;
	return hingeCost;
};

async function guideCost(guide, width, height, depth, topdrawer, lowerdrawer, config_door, faces) {
	guideRate = await Materials.guideRate(guide);
	guideQuantity = topdrawer + lowerdrawer;
	guideCost = guideRate * guideQuantity * faces;
	return guideCost;
};