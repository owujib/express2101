const Product = require('../models/Product');

//CREATE PRODUCT
exports.createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({
      status: 'success',
      message: product,
    });
  } catch (error) {
    next(error);
  }
};

//GET ALL PRODUCTS
exports.getAllProduct = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      status: 'success',
      message: products,
      result: products.length,
    });
  } catch (error) {
    next(error);
  }
};

//GET SINGLE PRODUCT
exports.getSingleProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await Product.findById({ _id: id });
    res.status(200).json({
      status: 'success',
      message: product,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    res.status(201).json({
      status: 'success',
      message: product,
    });
  } catch (error) {
    next(error);
  }
};
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete({ _id: req.params.id });

    res.status(200).json({
      status: 'success',
      message: 'product deleted',
    });
  } catch (error) {
    next(error);
  }
};
