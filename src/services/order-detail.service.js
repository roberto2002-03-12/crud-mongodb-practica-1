const boom = require('@hapi/boom');
const OrderDetail = require('../db/models/order-detail.model');
const { findBook } = require('../services/book.service');
const { findOrder } = require('../services/order.service');

const createOrderDetail = async (obj) => {
  const book = await findBook(obj.book);

  obj.total = obj.amount * book.price;

  const order = await findOrder(obj.order);

  if (!order.total) order.total = 0;

  const orderDetailCreated = await OrderDetail.create(obj);

  await order.updateOne({
    $addToSet: {
      orderDetail: orderDetailCreated.id
    },
    total: order.total + orderDetailCreated.total
  });

  return orderDetailCreated;
};

const getOrderDetail = async () => {
  const orderDetails = await OrderDetail.find().populate(['book', 'order']);

  return orderDetails;
};

const findOrderDetail = async (id) => {
  const orderDetail = await OrderDetail.findById(id);

  if (!orderDetail) throw boom.notFound('Order detail not found');

  return orderDetail;
};

const deleteOrderDetail = async (id) => {
  const orderDetail = await OrderDetail.findById(id);

  if (!orderDetail) throw boom.notFound(`Cannot delete something that doesn't exist.`);

  await orderDetail.deleteOne();

  return 'Order detail deleted';
};

module.exports = {
  createOrderDetail,
  getOrderDetail,
  findOrderDetail,
  deleteOrderDetail
};