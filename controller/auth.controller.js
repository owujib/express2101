const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/User');
const ApiError = require('../utils/apiError');

console.log(process.env.JWT_SECRET);

/**
 **** creates jwt tokens for authorization
 * @param {MongoosObjectId} userId from mongodb
 * @returns {String} jwt signed token with the user information and expiration
 */
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.register = async (req, res, next) => {
  try {
    //find if user already exist
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) {
      return next(
        new ApiError(
          `${req.body.email} has already been taken try a different email`,
          400
        )
      );
    }

    const user = await User.create(req.body);

    res.status(201).json({
      status: 'success',
      message: user,
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    console.log(user);

    //check if user record does not exist in db
    if (!user) {
      return next(new ApiError('user does not exist', 404));
    }

    // //check for correct password
    // // bcrypt compares between the req body password and user password

    const correctPassword = await user.correctPassword(
      req.body.password,
      user.password
    ); //return true // false

    if (!correctPassword) next(new ApiError('invalid details', 400));

    // //creating token
    let token = signToken(user._id);

    res.status(200).json({
      status: 'success',
      message: user,
      token,
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
 *
 * checks for a logged in user
 */
exports.authorization = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new ApiError('please login to get access', 401));
    }

    let decode = await jwt.verify(token, process.env.JWT_SECRET);
    console.log(decode);

    let currentUser = await User.findById({ _id: decode.id });

    if (!currentUser) {
      return next(new ApiError('unauthorized user', 401));
    }

    req.user = currentUser;
    next();
  } catch (error) {
    next(error);
  }
};

exports.updatePassword = async (req, res, next) => {
  try {
    const user = req.user;

    const correctPassword = await user.correctPassword(
      req.body.currentPassword,
      user.password
    );
    if (!correctPassword) {
      return next(new ApiError('incorrect credentials', 400));
    }

    user.password = req.body.newPassword;

    await user.save();
    res.status(201).json({
      status: 'success',
      message: user,
    });
  } catch (error) {
    next(error);
  }
};

exports.roles = (...roles) => {
  // role [admin, marketer]
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ApiError('unathorized access', 403));
    }
    next();
  };
};
