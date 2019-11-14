const Order = require('../models/orderModel');
const Product = require('../models/productModel');

const mongoose = require('mongoose');

exports.getOrders = (req, res) => {
  Order.find()
    .select('product quantity _id')
    .populate('product', 'name price')
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        orders: docs.map(doc => {
          return {
            _id: doc._id,
            product: doc.product,
            quantity: doc.quantity
          }
        })
      })
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    });
}

exports.createOrder = (req, res) => {

  Product.findById(req.body.productId)
    .then( product => {
      console.log(product)
      if (!product) {
        res.status(404).json({
          message: 'Product Not found'
        })
        return;
      } 

      const order = new Order({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId
      })
    
      order.save()
      .then( result => {
        res.status(201).json({
          message: 'Order stored',
          order: {
            _id: result._id,
            product: result.product,
            quantity: result.quantity
          }
        })
      })
      .catch(err => {
        res.status(500).json({
          error: err
        })
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
  
}

exports.getOrder = (req, res) => {
  
  Order.findById(req.params.orderId)
    .select('quantity product _id')
    .populate('product', 'name price')
    .exec()
    .then( order => {

      if (order) {
        res.status(200).json({
          order: order
        })
      } else {
        res.status(404).json({message: 'No valid entry found for provided order ID'})
      }

      
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    });
}

exports.deleteOrder = (req, res) => {

  const { orderId } = req.params

  Order.deleteOne({_id: orderId})
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Order deleted'
      })
    } )
    .catch(err => {
      res.status(500).json({
        error: err
      })
    });
}