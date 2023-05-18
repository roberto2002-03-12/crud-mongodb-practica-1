const Joi = require('joi');

const id = Joi.string();
const firstName = Joi.string();
const lastName = Joi.string();
const phoneNumber = Joi.number();
const email = Joi.string().email();
const birth = Joi.date();
const orders = Joi.array().items(Joi.string().max(65));

const createCustomerSchema = Joi.object({
  firstName: firstName.required(),
  lastName: lastName.required(),
  phoneNumber: phoneNumber.required(),
  email: email.required(),
  birth: birth.required(),
  orders: orders.optional()
});

const updateCustomerSchema = Joi.object({
  firstName: firstName.optional(),
  lastName: lastName.optional(),
  phoneNumber: phoneNumber.optional(),
  email: email.optional(),
  birth: birth.optional(),
  orders: orders.optional()
});

const findOrDeleteCustomerSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createCustomerSchema,
  updateCustomerSchema,
  findOrDeleteCustomerSchema
};