const boom = require('@hapi/boom');
const Book = require('../db/models/book.model');

const getBooks = async (query) => {
  const { 
    title, author, editorial, price_high, price_low,
    launchDate_high, launchDate_low, order_price, order_launchDate,
    book_gender
  } = query || {};

  const options = {};
  //en mongodb se utiliza "regex" como si fuera "like" de mysql
  //utilizamos options: "i" para configurar de que la consulta se insensible a mayusculas o minusculas
  //sin embargo por alguna razón igualmente aunque usaba mayusculas no funcionaba, debe tener un mayor significado
  if (title) options.title = { $regex: '.*' + title + '.*', $options: 'i' };
  
  if (author) options.author = { $regex: '.*' + author + '.*', $options: 'i' };
  
  if (editorial) options.editorial = { $regex: '.*' + editorial + '.*', $options: 'i' };

  //filtros precios
  if (price_high) options.price = { $gte: price_high };
  
  if (price_low && options.price) options.price.$lte = price_low;
  if (price_low && !options.price) options.price = { $lte: price_low };

  //filtros fechas
  if (launchDate_high) options.launchDate = { $gte: new Date(launchDate_high) };

  if (launchDate_low && options.launchDate) options.launchDate.$lte = new Date(launchDate_low);
  if (launchDate_low && !options.launchDate) options.launchDate = { $lte: new Date(launchDate_low) };
  //---------------
  if (book_gender) {
    let genders = book_gender.split(',');
    /*
    En este caso
    $all: sirve para poder filtrar multiples filtros que cumplan los criterios
    $in: también permite multiples filtros, pero este va aceptar el obj si cumple con al menos
    un criterio
    */
    options.gender = { $all: genders }
  };

  const options_sort = {};

  if (order_price === 'desc') options_sort.price = -1;
  if (order_price === 'asce') options_sort.price = 1;

  if (order_launchDate === 'desc') options_sort.launchDate = -1;
  if (order_launchDate === 'asce') options_sort.launchDate = 1;

  const books = await Book.find(options).populate('gender').sort(options_sort);

  return books;
};

const createBook = async (obj) => {
  const book = new Book(obj);

  const bookSaved = await book.save();

  return bookSaved;
};

const findBook = async (id) => {
  const book = await Book.findById(id).populate('gender');

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