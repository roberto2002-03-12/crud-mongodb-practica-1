const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const customerModel = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  birth: {
    type: Date,
    required: true
  },
  order: [{
    type: Schema.Types.ObjectId,
    ref: 'order',
    required: false
  }]
});

const customer = mongoose.model('customer', customerModel);
module.exports = customer;