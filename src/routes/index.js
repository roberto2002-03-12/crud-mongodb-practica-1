const express = require('express');
const customerRouter = require('./customer.router');
const bookRouter = require('./book.router');
const genderRouter = require('./gender.router');
const orderRouter = require('./order.router');
const orderDetailRouter = require('./order-detail.router');
const router = express.Router();

function routerApi(app) {
  app.use('/api/mongo-crud/v1', router);

  router.use('/gender', genderRouter);
  router.use('/customer', customerRouter);
  router.use('/book', bookRouter);
  router.use('/order', orderRouter);
  router.use('/order-detail', orderDetailRouter);
};

module.exports = routerApi;