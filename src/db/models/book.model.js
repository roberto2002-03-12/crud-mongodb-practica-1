const mongoose = require('mongoose');

const bookModel = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  typeOfBook: {
    type: String,
    required: true
  },
  pages: {
    type: Number,
    required: true
  },
  editorial: {
    type: String,
    required: true
  },
  launchDate: {
    type: Date,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

const book = mongoose.model('book', bookModel);
module.exports = book;