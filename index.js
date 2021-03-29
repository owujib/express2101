const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const homeRoute = require('./routes/app.routes');
const studentRoute = require('./routes/student.routes');
const productRoute = require('./routes/products.routes');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// app.use('/static', express.static('./public'));
app.use('/', express.static(path.join(__dirname, '/public'))); // default  to "/"

//static dir for uploads
app.use('/', express.static(path.join(__dirname, '/uploads')));

//ROUTES
app.use('/', homeRoute);
app.use('/students', studentRoute);

//api route
app.use('/api/product', productRoute);

//handle all https 404 error
app.all('*', (req, res, next) => {
  res.send('<h1>404 page not found 😢😢</h1>');
});

const PORT = 3000;

//database connection
mongoose
  .connect('mongodb://127.0.0.1:27017/esales', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('database connection is successful.....');
  })
  .catch((err) => {
    console.log(err);
  });

//server running

app.listen(PORT, () => {
  console.log('server is running on port ' + PORT);
});
