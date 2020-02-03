const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const middlewares = require('./middlewares');
const mongoose = require('mongoose');

const logs = require('./api/logs');

require('dotenv').config();

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true});

const app = express();
const port = process.env.PORT || 1337;

app.use(morgan('common'));
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Hello world!'
  });
});

app.use('/api/logs', logs);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler)

app.listen(port, () => {
  console.log(`Listening at http://localhost:1337`);
});
