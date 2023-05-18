const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderModel = new mongoose.Schema({
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'customer',
    required: true
  },
  orderDetail: [{
    type: Schema.Types.ObjectId,
    ref: 'order_detail',
    required: false
  }],
  total: { //el total se va obtener cuando se agregue un orderDetailModel
    type: Number,
    required: false,
  }
});

const order = mongoose.model('order', orderModel);
module.exports = order;