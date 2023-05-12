const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderModel = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'customer',
    required: true
  },
  orderDetail: [{
    type: Schema.Types.ObjectId,
    ref: 'order_detail',
    required: false
  }],
  total: {
    type: Number,
    required: false,
  }
});

const order = mongoose.model('order', orderModel);
module.exports = order;