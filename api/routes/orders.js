const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');

const isAuth = require('../middlewares/isAuth');


router.get('/', isAuth, orderController.getOrders )

router.post('/', isAuth, orderController.createOrder)

router.get('/:orderId', isAuth, orderController.getOrder )

router.delete('/:orderId', orderController.deleteOrder)


module.exports = router;