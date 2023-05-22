const Joi = require('joi');

const id = Joi.string();
const customer = Joi.string();

const createOrderSchema = Joi.object({
  customer: customer.required()
});

const findOrDeleteOrderSchema = Joi.object({
  id: id.required()
});

module.exports = {
  createOrderSchema,
  findOrDeleteOrderSchema
}