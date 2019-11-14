const Product = require('../models/productModel');
const mongoose = require('mongoose');

exports.getProducts = (req, res) => {
  Product.find()
    .select('name price description productImage _id')
    .exec()
    .then((docs) => {

      const response = {
        count: docs.length,
        products: docs.map(doc => {
          return {  
            name: doc.name,
            price: doc.price,
            productImage: doc.productImage,
            description: doc.description,
            _id: doc._id
          }
        })
      }
      res.status(200).json(response);
    })
    .catch( err => { res.status(500).json({ error: err }) })
}

exports.createProduct = (req, res) => {

  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    productImage: req.file.path
  });

  product.save()
    .then( result => {
      res.status(201).json({
        message: 'Created product successfully',
        createProduct: {
          name: result.name,
          price: result.price,
          description: result.description,
          _id: result._id,
        }
      });
    })
    .catch(err => { res.status(500).json({ error: err })});
}

exports.getProduct = (req, res) => {
  const { productId } = req.params;

  Product.findById(productId)
    .select('name price description productImage _id')
    .exec()
    .then( doc => {

      if (doc) {
        res.status(200).json({
          product: doc
        });
      } else {
          res.status(404).json({message: 'No valid entry found for provided product ID'});
      }
      
    })
    .catch(err => { res.status(500).json({error: err}) })

}

exports.updateProduct = (req, res) => {

  const { productId } = req.params;

  let operations = {};
  
  Object.keys(req.body).map((key) => {
    if (req.body[key] != '') {
      operations[key] = req.body[key]
    }
  })

  Product.update({_id: productId}, { $set: operations })
    .exec()
    .then(() => {
      res.status(200).json({
        message: 'Product updated successfully'
      })
    })
    .catch(err => { res.status(500).json({ error: err }) });
}

exports.deleteProduct = (req, res) => {
  const { id } = req.params;

  Product.deleteOne({_id: id})
    .exec()
    .then(() => {
      res.status(200).json({
        message: 'Product deleted'
      })
    })
    .catch(err => { res.status(500).json({ error: err }) });
}