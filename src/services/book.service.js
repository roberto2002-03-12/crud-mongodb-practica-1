const boom = require('@hapi/boom');
const Book = require('../db/models/book.model');

const getBooks = async () => {
  const books = await Book.find().populate('gender');
  return books;
};

const createBook = async (obj) => {
  const book = new Book(obj);

  const bookSaved = await book.save();

  return bookSaved;
};

const findBook = async (id) => {
  const book = await Book.findById(id);

  if (!book) throw boom.notFound('Book not found');

  return book;
};

const updateBook = async (id, obj) => {
  const book = await findBook(id);

  if (obj.gender) {
    obj.$addToSet = {
      gender: obj.gender
    };
    delete obj.gender;
  };

  if (obj.genderToRemove) {
    obj.$pull = {
      //el $in sirve para buscar los objetos que tengan ese valor
      //en este caso buscar valores que tengan ese Id.
      gender: { $in: obj.genderToRemove }
    };
    delete obj.genderToRemove;
  };

  await book.updateOne(obj);

  return 'Book updated';
};

const deleteBook = async (id) => {
  const book = await findBook(id);

  await book.deleteOne();

  return 'Book deleted';
};

module.exports = {
  getBooks,
  createBook,
  findBook,
  updateBook,
  deleteBook
};