const boom = require('@hapi/boom');
const Order = require('../db/models/order.model');
const Customer = require('../db/models/customer.model');

const createOrder = async (obj) => {
  const customer = await Customer.findById(obj.customer);

  if (!customer) throw boom.notFound(`Can't create an order if customer doesn't exist.`);

  const order = await Order.create(obj);

  await customer.updateOne({
    $addToSet: {
      orders: order._id
    }
  });

  return order;
};

const getOrders = async () => {
  const orders = await Order.find().populate(['customer', 'orderDetail']);

  return orders;
};

const findOrder = async (id) => {
  const order = await Order.findById(id);

  if (!order) throw boom.notFound('Order not found');

  return order;
};

const deleteOrder = async (id) => {
  await Order.findOneAndDelete(id);

  return 'Order deleted';
};

module.exports = {
  createOrder,
  getOrders,
  findOrder,
  deleteOrder
};