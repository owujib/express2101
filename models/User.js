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

const User = mongoose.model('User', userSchema);

module.exports = User;
