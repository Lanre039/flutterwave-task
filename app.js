require('dotenv').config();
const express = require('express');
const BaseRoute = require('./routes/BasicRoute');

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Accept, X-Requested-With, Authorization, Content-Type, x-custom-header'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,PUT,POST,PATCH,DELETE,OPTIONS'
  );
  next();
});

// ROUTES
require('./routes/BasicRoute')(app);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
