const express = require('express');
const router = express.Router();
const multer = require('multer');
const { cloudinary, storage } = require('../../cloudinary');
const upload = multer({ storage });
const { asyncErrorHandler } = require('../../middleware');
const { 	indexProducts, 
	  		newProduct,
	  		createProduct,
	   		showProduct,
	   		showProductSelect,
	   		showProductSubSelect,
	   		editProduct,
	   		addProductMod,
	   		deleteProductMod,
	   		updateProduct,
	   		deleteProduct
	  } = require('../../controllers/catalog/products');

/* GET products index /products */
router.get('/', asyncErrorHandler(indexProducts));

/* GET products new /products/new */
router.get('/new', asyncErrorHandler(newProduct));

/* POST products create /products */
router.post('/', upload.array('images', 4), asyncErrorHandler(createProduct));

/* GET products index /products/:id */
router.get('/:id', asyncErrorHandler(showProduct));

/* GET products for selection /products/:id/select */
router.get('/:id/select', asyncErrorHandler(showProductSelect));

/* GET specific product for mod/accessory selection /products/catalog/:id/subselect */
router.get('/:id/subadd', asyncErrorHandler(showProductSubSelect));

/* GET products edit /products/:id/edit */
router.get('/:id/edit', asyncErrorHandler(editProduct));

/* PUT products update /products/:id */
router.put('/:id', upload.array('images', 4), asyncErrorHandler(updateProduct));

/* PUT add mods to product /products/:id/mods */
router.put('/:id/mods', asyncErrorHandler(addProductMod));

/* DELETE mod from product /product/:id/mods/:mod_id */
router.put('/:id/mods/:mod_id', asyncErrorHandler(deleteProductMod));

/* DELETE products destroy /products/:id */
router.delete('/:id', asyncErrorHandler(deleteProduct));

module.exports = router;

/*
GET index		/products
GET new			/products/new
POST create		/products
GET show		/products/:id
GET edit		/products/:id/edit
PUT	update		/products/:id
DELETE destroy	/products/:id
*/