const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

const upload = require('../middlewares/uploadImage');

const isAuth = require('../middlewares/isAuth');

router.get('/', productController.getProducts);

router.post('/', isAuth, upload.single('productImage'), productController.createProduct);

router.get('/:productId', productController.getProduct)

router.patch('/:productId', isAuth, productController.updateProduct);

router.delete('/:productId', isAuth, productController.deleteProduct);

module.exports = router;


