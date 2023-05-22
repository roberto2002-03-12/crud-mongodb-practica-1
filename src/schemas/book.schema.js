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

//filtros
const price_high = Joi.number();
const price_low = Joi.number();
const launchDate_high = Joi.date();
const launchDate_low = Joi.date();
const order_price = Joi.string().valid('desc', 'asce');
const order_launchDate = Joi.string().valid('desc', 'asce');
const book_gender = Joi.string();

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

const filterBooksSchema = Joi.object({
  title: title.optional(),
  author: author.optional(),
  editorial: editorial.optional(),
  price_high: price_high.optional(),
  price_low: price_low.optional(),
  launchDate_high: launchDate_high.optional(),
  launchDate_low: launchDate_low.optional(),
  order_price: order_price.optional(),
  order_launchDate: order_launchDate.optional(),
  book_gender: book_gender.optional()
});

module.exports = {
  createBookSchema,
  updateBookSchema,
  getOrDeleteSchema,
  filterBooksSchema
}