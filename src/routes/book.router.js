const express = require('express');
const router = express.Router();
const { getBooks, findBook, createBook, deleteBook, updateBook } = require('../services/book.service');
const { getOrDeleteSchema, createBookSchema, updateBookSchema } = require('../schemas/book.schema');
const validationHandler = require('../middlewares/validator.handler');

router.get('/',
  async (req, res, next) => {
    try {
      const result = await getBooks();
      res.status(200).json(result);
    } catch (err) {
      next(err);
    };
  }
);

router.post('/',
  validationHandler(createBookSchema, 'body'),
  async (req, res, next) => {
    try {
      const result = await createBook(req.body);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    };
  }
);

router.get('/:id',
  validationHandler(getOrDeleteSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await findBook(id);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    };
  }
);

router.put('/:id',
  validationHandler(getOrDeleteSchema, 'params'),
  validationHandler(updateBookSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await updateBook(id, req.body);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    };
  }
);

router.delete('/:id',
  validationHandler(getOrDeleteSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await deleteBook(id);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;