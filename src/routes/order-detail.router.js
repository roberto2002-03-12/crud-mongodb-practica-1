const express = require('express');
const router = express.Router();
const { getOrderDetail, findOrderDetail, updateOrderDetail, createOrderDetail, deleteOrderDetail } = require('../services/order-detail.service');

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

router.put('/:id',
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await updateOrderDetail(id, req.body);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    };
  }
);

router.post('/',
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