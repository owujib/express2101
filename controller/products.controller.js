const Product = require('../models/Product');
const ApiError = require('../utils/apiError');
const { createProductValidation } = require('../utils/validation');

//CREATE PRODUCT
/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.createProduct = async (req, res, next) => {
  try {
    const newProduct = {
      ...req.body,
      productImg: `/product-img/${req.file.filename}`,
    };
    const { error } = createProductValidation(newProduct);
    if (error) {
      return next(new ApiError(error, 401));
    }
    const product = await Product.create(newProduct);
    res.status(201).json({
      status: 'success',
      message: product,
    });
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
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

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
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

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */

exports.updateProduct = async (req, res, next) => {
  try {
    const updatedProduct = {
      ...req.body,
      productImg: `/product-img/${req.file.filename}`,
    };
    const product = await Product.findByIdAndUpdate(
      { _id: req.params.id },
      updatedProduct,
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

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
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
