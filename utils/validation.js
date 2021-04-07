const JOI = require('joi');

exports.createProductValidation = (data) => {
  const schema = JOI.object({
    name: JOI.string().required().trim().max(100),
    colour: JOI.string().required().trim().max(100),
    description: JOI.string().required().trim().max(1234),
    price: JOI.string().required().trim(),
    productImg: JOI.string().required().trim(),
    size: JOI.string().required().trim().max(100),
  });

  return schema.validate(data);
};

exports.updateProductValidation = (data) => {
  const schema = JOI.object({
    name: JOI.string().trim().max(100),
    colour: JOI.string().trim().max(100),
    description: JOI.string().trim().max(1234),
    price: JOI.string().trim(),
    productImg: JOI.string().trim(),
    size: JOI.string().trim().max(100),
  });

  return schema.validate(data);
};
