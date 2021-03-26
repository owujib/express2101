const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [
      true,
      'a product must have a name. \n  Error: name can not be empty',
    ],
    trim: true,
  },

  price: {
    type: String,
    required: [
      true,
      'a product must have a price \n  but  not price was included in the case',
    ],
  },
  colour: {
    type: [String],
  },
  size: {
    type: [String],
    required: [true, 'a product must have size'],
  },
  productImg: String,
  description: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
