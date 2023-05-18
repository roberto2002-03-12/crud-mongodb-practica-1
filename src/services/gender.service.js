const boom = require('@hapi/boom');
const gender = require('../db/models/gender.model');

const getGender = async () => {
  const genders = await gender.find();

  return genders;
};

const createGender = async (obj) => {
  const genderCreated = await gender.create(obj);

  return genderCreated;
};

const deleteGender = async (id) => {
  const genderFound = await gender.findById(id);

  if (!genderFound) throw boom.notFound(`Can't delete something that doesn't exist`);

  await genderFound.deleteOne();

  return 'Gender deleted';
};

module.exports = {
  getGender,
  createGender,
  deleteGender
};