const boom = require('@hapi/boom');

function validatorHandler(joiSchema, property) {
  return (req, res, next) => {
    //property: It's where the data comes from, it can be body or params.
    const data = req[property];
    const { error } = joiSchema.validate(data, { abortEarly: false });
    if (error) boom.badRequest(error);
    next();
  };
};

module.exports = validatorHandler;