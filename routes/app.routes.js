const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index.ejs', {
    title: 'Home 😊😊',
  });
});

router.get('/about-us', (req, res, next) => {
  res.render('about.ejs', {
    title: 'About -us',
  });
});

router.get('/contact-us', (req, res, next) => {
  res.render('contact-us.ejs', {
    title: 'Contact us',
  });
});

router.post('/message', (req, res, next) => {
  console.log(req.body);
  res.send(req.body);
});

module.exports = router;
