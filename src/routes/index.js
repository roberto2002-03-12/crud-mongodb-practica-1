const express = require('express');
const customerRouter = require('./customer.router');

const router = express.Router();

function routerApi(app) {
  app.use('/api/mongo-crud/v1', router);

  router.use('/customer', customerRouter);
};

module.exports = routerApi;