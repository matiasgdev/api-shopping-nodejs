const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
  _id: Schema.Types.ObjectId,
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, default: 1}
});

module.exports = model('Order', orderSchema);
