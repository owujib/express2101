const express = require('express');
const multer = require('multer');
const path = require('path');

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

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    return callback(null, 'uploads/student-img/');
  },
  filename: (req, file, callback) => {
    return callback(null, `${Date.now()}-${file.originalname}`);
  },
  fileFilter: (req, file, callback) => {
    const ext = path.extname(file.originalname);
    if (ext !== '.jpg' || ext !== '.png' || ext !== '.jfif') {
      return callback(
        res.status(400).end('only jpg, png and jfif are allowed'),
        false
      );
    }
    return callback(null, true);
  },
});
const upload = multer({ storage });

router.post('/message', upload.single('contactImg'), (req, res, next) => {
  console.log(req.body);
  console.log(req.file);
  res.send({ ...req.body, ...req.file });
});

module.exports = router;
