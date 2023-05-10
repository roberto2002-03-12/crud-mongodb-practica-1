const express = require('express');
const { getCustomers, createCustomer, updateCustomer, findCustomer, deleteCustomer } = require('../services/customer.service');

const router = express.Router();

router.get('/', 
  async (req, res, next) => {
    try {
      const result = await getCustomers();
      res.status(200).json(result);
    } catch(err) {
      console.error(err);
    }
  }
);

router.post('/',
  async (req, res, next) => {
    try {
      const result = await 
    } catch (err) {
      console.error(err);
    }
  }
);

module.exports = router;