const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const homeRoute = require('./routes/app.routes');
const studentRoute = require('./routes/student.routes');
const productRoute = require('./routes/products.routes');
const userRoute = require('./routes/user.routes');
const ApiError = require('./utils/apiError');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// app.use('/static', express.static('./public'));
app.use('/', express.static(path.join(__dirname, '/public'))); // default  to "/"

//static dir for uploads
app.use('/', express.static('uploads'));

//ROUTES
app.use('/', homeRoute);
app.use('/students', studentRoute);

//api route
app.use('/api/product', productRoute);
app.use('/api/user', userRoute);

//handle all https 404 error
app.all('*', (req, res, next) => {
  next(new ApiError('oops page not found', 404));
});

//global error handler
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
});

console.log({ NODE_ENV: process.env.NODE_ENV });

const PORT = process.env.PORT || 4000;

let dbString;
process.env.NODE_ENV !== 'production'
  ? (dbString = process.env.MONGO_LOCAL)
  : (dbString = process.env.MONGO_URI);

//database connection
mongoose
  .connect(dbString, {
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
