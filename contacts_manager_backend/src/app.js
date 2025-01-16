const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const contactRoutes = require('./routes/contactRoutes');

const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use('/api', contactRoutes);

module.exports = app;
