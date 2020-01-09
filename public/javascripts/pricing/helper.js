const Product = require('../../../models/catalog/product');
const Cabtype = require('../../../models/catalog/cabtype');

module.exports = {
	// Calculate panel cube count (use 16" x 16" parts of a sheet);
	cubeCount(dim1, dim2) {
		let dim1Cube = Math.ceil(dim1 / 16);
		let dim2Cube = Math.ceil(dim2 / 16);
		return cubeCount = dim1Cube * dim2Cube;
	},

	//minimum SF set at 2.5sf
	sfMin(dim1, dim2) {
		if (typeof dim1 == 'number') {
			console.log('sfMin dimenions are numbers!');
		};
		// console.log('sfMin dim 1 = ', dim1 , ' and dim2 = ', dim2);
		sf = (dim1 * dim2) / 144;
		if (sf < 2.5 ) {
			return sf = 2.5;
		} else {
			return sf;
		};
	},
	
	//lookup catalog configuration
	async lookupConfig(line) {
		let cabtype = await Cabtype.find({ 'code': line.cab_type });
		let cabdetails = await Product.find({ 'cabtype': cabtype[0]._id, 'configuration': line.configuration })
		//console.log('lookup configuration = ', cabdetails);
		return cabdetails;
	}
};