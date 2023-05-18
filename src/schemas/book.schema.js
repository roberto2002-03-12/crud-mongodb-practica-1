const Joi = require('joi');

const id = Joi.string();
const title = Joi.string().max(65);
const author = Joi.string().max(65);
const gender = Joi.array().items(Joi.string().max(65));
const summary = Joi.string().max(2000);
const typeOfBook = Joi.string().max(65);
const pages = Joi.number();
const editorial = Joi.string().max(105);
const launchDate = Joi.date();
const price = Joi.number();
const genderToRemove = Joi.array().items(Joi.string().max(65));

const createBookSchema = Joi.object({
  title: title.required(),
  author: author.required(),
  gender: gender.required(),
  summary: summary.required(),
  typeOfBook: typeOfBook.required(),
  pages: pages.required(),
  editorial: editorial.required(),
  launchDate: launchDate.required(),
  price: price.required()
});

const updateBookSchema = Joi.object({
  title: title.optional(),
  author: author.optional(),
  gender: gender.optional(),
  summary: summary.optional(),
  typeOfBook: typeOfBook.optional(),
  pages: pages.optional(),
  editorial: editorial.optional(),
  launchDate: launchDate.optional(),
  price: price.optional(),
  genderToRemove: genderToRemove.optional(),
});

const getOrDeleteSchema = Joi.object({
  id: id.required()
});

module.exports = {
  createBookSchema,
  updateBookSchema,
  getOrDeleteSchema
}