const { Schema, model } = require('mongoose');

const productSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: {type: String, required: true},
  price: {type: Number, required: true},
  description: {type: String, default: 'Doesn\'t have description ' },
  productImage: {type: String, required: true }
});

module.exports = model('Product', productSchema);
