const express = require('express');
const router = express.Router();
const { getGender, createGender, deleteGender } = require('../services/gender.service');
const { createGenderSchema, deleteGenderSchema } = require('../schemas/gender.schema');
const validationHandler = require('../middlewares/validator.handler');

router.get('/', 
  async (req, res, next) => {
    try {
      const result = await getGender();
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
);

router.post('/',
  validationHandler(createGenderSchema, 'body'),
  async (req, res, next) => {
    try {
      const result = await createGender(req.body);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }
);

router.delete('/:id',
  validationHandler(deleteGenderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await deleteGender()
    } catch(err) {
      next(err);
    }
  }
);

module.exports = router;