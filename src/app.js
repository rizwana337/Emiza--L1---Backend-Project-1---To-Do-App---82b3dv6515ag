const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/userRoutes');

app.use(bodyParser.json());

app.use('/api/v1/user', userRoutes);

module.exports = app;


// const express = require('express');
// const app = express();
// const router = require('../routes/index'); 

// //Router Middlewares
// app.use(express.json());

// app.use('/api/v1', router);

// module.exports = app;

