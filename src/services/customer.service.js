const boom = require('@hapi/boom');
const Customer = require('../db/models/customer.model');

const getCustomers = async() => {
  //populate muestra las relaciones que tiene customers
  const customers = await Customer.find().populate();
  return customers;
};

const createCustomer = async(obj) => {
  const customer = new Customer(obj);

  const customerSaved = await customer.save();

  return customerSaved;
};

const findCustomer = async(id) => {
  const customer = await Customer.findById(id);

  if (!customer) throw boom.notFound('Customer not found');

  return customer;
};

const updateCustomer = async(id, obj) => {
  const customer = await Customer.findById(id);

  if (!customer) throw boom.notFound('Customer not found');

  if (obj.order) {
    obj.$addToSet = {
      order: obj.order
    };
    delete obj.order;
  };

  if (obj.orderToRemove) {
    obj.$pull = {
      order: { $in: obj.orderToRemove }
    };
    delete obj.orderToRemove;
  };

  await customer.updateOne(obj);

  return 'Customer updated';
};

const deleteCustomer = async(id) => {
  await Customer.findOneAndDelete({_id: id});

  return 'Customer deleted'
};

module.exports = {
  getCustomers,
  createCustomer,
  findCustomer,
  updateCustomer,
  deleteCustomer,
};