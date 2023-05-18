const Joi = require('joi');

const id = Joi.number();
const name = Joi.string().max(65);

const createGenderSchema = Joi.object({
  name: name.required()
});

const deleteGenderSchema = Joi.object({
  id: id.required()
});

module.exports = {
  createGenderSchema,
  deleteGenderSchema
};