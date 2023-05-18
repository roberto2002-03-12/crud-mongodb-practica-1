const express = require('express');
const router = express.Router();
const { createOrder, getOrders, findOrder, updateOrder, deleteOrder } = require('../services/order.service');
const validationHandler = require('../middlewares/validator.handler');

router.get('/',
  async (req, res, next) => {
    try {
      const result = await getOrders();
      res.status(200).json(result);
    } catch (err) {
      next(err);
    };
  }
);

router.post('/',
  async (req, res, next) => {
    try {
      const result = await createOrder(req.body);
      res.status(201).json(result);  
    } catch (err) {
      next(err);
    };
  }
);

router.get('/:id',
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await findOrder(id);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
);

router.put('/:id',
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await updateOrder(id, req.body);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    };
  }
);

router.delete('/:id',
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await deleteOrder(id);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    };
  }
);

module.exports = router;