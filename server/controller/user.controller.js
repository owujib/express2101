const Product = require('../models/Product');

exports.addToCart = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById({ _id: productId });
    const user = req.user;
    let cartItem = await user.addToCart(product);

    let { cart } = cartItem;

    res.status(201).json({
      status: 'success',
      message: cart,
      cartNumber: cart.length,
    });
  } catch (error) {
    next(error);
  }
};
