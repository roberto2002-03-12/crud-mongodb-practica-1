const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderDetailModel = new mongoose.Schema({
  book: {
    type: Schema.Types.ObjectId,
    ref: 'book',
    required: true
  },
  order: {
    type: Schema.Types.ObjectId,
    ref: 'order',
    required: true
  },
  amount: {
    type: Number,
    required: true,
    default: 1,
  },
  total: {
    type: Number,
    required: true
  }
});

//recuerda que con arrow function no se puede referencia a dicho objeto con "this"
//esto sirve para definir y calcular el precio
/* //no sirve pero igual no es necesario
orderDetailModel.pre('save', function(next) {
  this.total = this.amount * this.book.price;
  next();
});
*/

const orderDetail = mongoose.model('order_detail', orderDetailModel);
module.exports = orderDetail;