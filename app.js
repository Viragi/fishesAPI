const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const fishesRoute = require('./routes/fishes');

const app = express();

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use('/fishes', fishesRoute);

app.use('/', async (req, res, next) => {
  var error = new Error('Page not found');
  error.status = 404;
  return next(error);
});

app.use((err, req, res, next) => {
  console.log('from final error', err);
  if (err.status) {
    return res.status(err.status).send(err);
  }
  return res.status(500).send('Internal Server Error');
});

app.listen(3000, () => {
  console.log('app listening at port 3000');
});
