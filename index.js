const express = require('express');

const homeRoute = require('./routes/app.routes');
const studentRoute = require('./routes/student.routes');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', './views');

// app.use('/static', express.static('./public'));
app.use('/', express.static('./public')); // default  to "/"

//ROUTES
app.use('/', homeRoute);
app.use('/students', studentRoute);

//handle all https 404 error
app.all('*', (req, res, next) => {
  res.send('<h1>404 page not found 😢😢</h1>');
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log('server is running on port ' + PORT);
});
