const express = require('express');
const router = express.Router();
const { getOrderDetail, findOrderDetail, createOrderDetail, deleteOrderDetail } = require('../services/order-detail.service');
const { findOrDeleteOrderDetailSchema, createOrderDetailSchema } = require('../schemas/order-detail.schema');
const validationHandler = require('../middlewares/validator.handler');

router.get('/',
  async (req, res, next) => {
    try {
      const result = await getOrderDetail();
      res.status(200).json(result);
    } catch (err) {
      next(err);
    };
  }
);

router.get('/:id',
  validationHandler(findOrDeleteOrderDetailSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await findOrderDetail(id);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    };
  }
);

router.post('/',
  validationHandler(createOrderDetailSchema, 'body'),
  async (req, res, next) => {
    try {
      const result = await createOrderDetail(req.body);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    };
  }
);

router.delete('/:id',
  validationHandler(findOrDeleteOrderDetailSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await deleteOrderDetail(id);
      res.status(201).json(result); 
    } catch (err) {
      next(err);
    };
  }
);

module.exports = router;