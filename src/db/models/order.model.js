const mongoose = require('mongoose');
const OrderDetail = require('./order-detail.model');
const boom = require('@hapi/boom')

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

// esto no es necesario, en servicios delete order puede hacer lo mismo, solo lo coloco para tenerlo en cuenta
// corrección, lo que esta haciendo en realidad es modificar el metodo del propio modelo findOneAndDelete
// de esta manera en posibles casos nos podemos ahorrar código porque habría menos repetición.

// pre: sirve para realizar funciones antes de realizar la función principal
// post: sirve para realizar funciones después de realizar la función principal
orderModel.pre('findOneAndDelete', async function(next) {
  const order = await this.model.findOne(this.getFilter());

  if (!order) next(boom.notFound('Order not found'));

  await OrderDetail.deleteMany({ order: order._id });

  next();
});

const order = mongoose.model('order', orderModel);
module.exports = order;