const boom = require('@hapi/boom');
const Order = require('../db/models/order.model');

const createOrder = async (obj) => {
  const order = await Order.create(obj);

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

const updateOrder = async (id, obj) => {
  const order = await findOrder(id);

  await order.updateOne(obj);

  return 'Order updated';
};

const deleteOrder = async (id) => {
  await Order.findOneAndDelete(id);

  return 'Order deleted';
};

module.exports = {
  createOrder,
  getOrders,
  findOrder,
  updateOrder,
  deleteOrder
};