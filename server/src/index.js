const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const middlewares = require('./middlewares');

const app = express();
const port = process.env.PORT || 1337;

app.use(morgan());
app.use(helmet());
app.use(cors());

app.get('/', (req, res) => {
  res.json({
    message: 'Hello world!'
  });
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler)

app.listen(port, () => {
  console.log(`Listening at http://localhost:1337`);
});
