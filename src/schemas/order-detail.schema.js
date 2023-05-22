const Joi = require('joi');

const id = Joi.string();
const book = Joi.string();
const order = Joi.string();
const amount = Joi.number().max(9999).min(1);

const createOrderDetailSchema = Joi.object({
  book: book.required(),
  order: order.required(),
  amount: amount.required()
});

const findOrDeleteOrderDetailSchema = Joi.object({
  id: id.required()
});

module.exports = {
  createOrderDetailSchema,
  findOrDeleteOrderDetailSchema
};