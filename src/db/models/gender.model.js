const mongoose = require('mongoose');

const genderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now()
  }
});

const gender = mongoose.model('Gender', genderSchema);
module.exports = gender;