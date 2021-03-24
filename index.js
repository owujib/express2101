const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const homeRoute = require('./routes/app.routes');
const studentRoute = require('./routes/student.routes');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// app.use('/static', express.static('./public'));
app.use('/', express.static(path.join(__dirname, '/public'))); // default  to "/"

//ROUTES
app.use('/', homeRoute);
app.use('/students', studentRoute);

//handle all https 404 error
app.all('*', (req, res, next) => {
  res.send('<h1>404 page not found 😢😢</h1>');
});

const PORT = 3000;

mongoose
  .connect('mongodb://127.0.0.1:27017/students', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('database connection is successful.....');
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log('server is running on port ' + PORT);
});
