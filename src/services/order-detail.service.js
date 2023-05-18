const boom = require('@hapi/boom');
const OrderDetail = require('../db/models/order-detail.model');
const Order = require('../db/models/order.model');

const createOrderDetail = async (obj) => {
  const orderDetailCreated = await OrderDetail.create(obj);

  const order = await Order.findById(obj.orderId);

  if (!order) throw boom.notFound(`Order doesn't exist`);

  await order.updateOne({
    $addToSet: {
      orderDetail: orderDetailCreated.id
    },
    total: order.total + orderDetailCreated.total
  });

  return orderDetailCreated;
};

const getOrderDetail = async () => {
  const orderDetails = await OrderDetail.find();

  return orderDetails;
};

const findOrderDetail = async (id) => {
  const orderDetail = await OrderDetail.findById(id);

  if (!orderDetail) throw boom.notFound('Order detail not found');

  return orderDetail;
};

const updateOrderDetail = async (id, obj) => {
  const orderDetail = await findOrderDetail(id);

  await orderDetail.updateOne(obj);

  return 'Order detail updated';
};

const deleteOrderDetail = async (id) => {
  const orderDetail = await findOrderDetail(id);

  await orderDetail.deleteOne();

  return 'Order detail deleted';
};

module.exports = {
  createOrderDetail,
  getOrderDetail,
  findOrderDetail,
  updateOrderDetail,
  deleteOrderDetail
};