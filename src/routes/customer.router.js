const express = require('express');
const validatorHandler = require('../middlewares/validator.handler');
const { getCustomers, createCustomer, updateCustomer, findCustomer, deleteCustomer } = require('../services/customer.service');
const { createCustomerSchema, updateCustomerSchema, findOrDeleteCustomerSchema } = require('../schemas/customer.schema');

const router = express.Router();

router.get('/',
  async (req, res, next) => {
    try {
      const result = await getCustomers();
      res.status(200).json(result);
    } catch(err) {
      next(err);
    }
  }
);

router.post('/',
  validatorHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const result = await createCustomer(req.body);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }
);

router.get('/:id',
  validatorHandler(findOrDeleteCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await findCustomer(id);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
);

router.put('/:id',
  validatorHandler(findOrDeleteCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await updateCustomer(id, req.body);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }
);

router.delete('/:id',
  validatorHandler(findOrDeleteCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await deleteCustomer(id);
      res.status(201).json(result);
    } catch (err) {
      next(err);;
    }
  }
);

module.exports = router;