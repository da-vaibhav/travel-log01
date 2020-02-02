const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

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

app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

app.use((error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? '🙃' : error.stack
  });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:1337`);
});
