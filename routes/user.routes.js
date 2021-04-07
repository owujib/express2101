const router = require('express').Router();

const {
  register,
  login,
  authorization,
  updatePassword,
} = require('../controller/auth.controller');

const { addToCart } = require('../controller/user.controller');

router.post('/register', register);
router.post('/login', login);

router.patch('/update/password', authorization, updatePassword);

router.get('/profile', authorization, (req, res, next) => {
  console.log(req.user);
  res.status(200).json({
    status: 'success',
    message: req.user,
  });
});

router.get('/add/cart/:id', authorization, addToCart);
module.exports = router;
