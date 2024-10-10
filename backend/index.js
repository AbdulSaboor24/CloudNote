const ConnectToMongo = require('./db');
const express = require('express');
const cors = require('cors');

ConnectToMongo();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.get('/', (req, res) => {
  res.send('Welcome to the CloudNote API!');
});

module.exports = app;