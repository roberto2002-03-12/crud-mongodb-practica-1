const mongoose = require('mongoose');
const Order = require('./order.model');

const Schema = mongoose.Schema;

const customerModel = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  birth: {
    type: Date,
    required: true
  },
  orders: [{
    type: Schema.Types.ObjectId,
    ref: 'Order',
    required: false
  }]
});

customerModel.pre('findOneAndDelete', async function(next) {
  const customer = await this.model.findOne(this.getFilter());

  if (!customer) next(new Error('Customer not found'));

  if (customer.length == 0) next();
  //los customers no se deberían eliminar,
  //pero estoy practicando con mongoose así que, 
  //lo voy a eliminar al customer y todos sus ordenes.
  for(let i = 0; i < customer.orders.length; i++) {
    await Order.findOneAndDelete({ _id: customer.orders[i] });
  };

  /*
  afortunadamente por crear el middleware lo puedo usar en todas partes
  y encima me acabo de ahorrar un codigo largo y complejo, ahora simplemente
  use findOneAndDelete
  */

  next();
});

const customer = mongoose.model('Customer', customerModel);
module.exports = customer;