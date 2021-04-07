const router = require('express').Router();

const {
  register,
  login,
  authorization,
} = require('../controller/auth.controller');

router.post('/register', register);
router.post('/login', login);

router.get('/profile', authorization, (req, res, next) => {
  console.log(req.user);
  res.send('user profile');
});
module.exports = router;
