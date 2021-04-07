const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, 'a user must input firstname'],
      trim: true,
    },
    lastname: {
      type: String,
      required: [true, 'a user must input lastname'],
      trim: true,
    },
    profileImg: {
      type: String,
      default: '/profile-img/default.jpg',
    },
    email: {
      type: String,
      required: [true, 'a user must provide a valid email'],
      unique: [true, '😮 oops email already exist'],
    },
    password: {
      type: String,
      max: 20,
      min: 6,
      required: [true, 'a user must input a password'],
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },

    cart: {
      items: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
          },
        },
      ],
    },
  },
  { timestamps: true }
);

//presave middleware
/**
 * mongooose presave middleware
 * this middleware encrpts or hash a user's passoword before saving
 */
userSchema.pre('save', async function (next) {
  try {
    this.password = await bcrypt.hash(this.password, 12);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.correctPassword = async (inputPassword, userPassword) => {
  const validPassword = await bcrypt.compare(inputPassword, userPassword);

  return validPassword;
};

userSchema.methods.addToCart = async function (product) {
  //check if product exist in cart
  const cartItemIndex = this.cart.items.findIndex((cart) => {
    return cart.product._id.toString() === product._id.toString();
  });

  let newQuantity = 1;
  const updatedCartItems = [...this.cart.items];

  if (cartItemIndex >= 0) {
    newQuantity = this.cart.items[cartItemIndex].quantity + 1;

    updatedCartItems[cartItemIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      product,
      quantity: newQuantity,
    });
  }

  const updatedCart = {
    items: updatedCartItems,
  };
  this.cart = updatedCart;

  return await this.save();
};
const User = mongoose.model('User', userSchema);

module.exports = User;
