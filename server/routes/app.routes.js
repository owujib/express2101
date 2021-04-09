const express = require('express');
const multer = require('multer');
const path = require('path');

const { myRequestMiddleWare } = require('../controller/example');

const router = express.Router();

router.use(myRequestMiddleWare);

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

///handle file uploads

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/student-img/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);

    if (ext == '.jpg' || ext == '.png' || ext == '.jfif') {
      return cb(new Error('only jpg, png and jfif are allowed'), true);
    } else {
    }

    cb(null, true);
  },
});

router.post('/message', upload.single('contactImg'), (req, res, next) => {
  res.send({ ...req.body, ...req.file });
});

module.exports = router;
