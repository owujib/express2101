/**
 *
 * this function return to console the route that the current server visits
 * @param {Object} req Expressjs Request object
 * @param {Object} res Expressjs Response object
 * @param {Function} next Expressjs middleware function
 */

exports.myRequestMiddleWare = (req, res, next) => {
  console.log(req);
  return next();
};

//install jsdoc
