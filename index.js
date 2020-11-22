const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./db/config');

// Create Express Server
const app = express();

// DB 
dbConnection();

// CORS
app.use(cors());

// Public Directory
app.use(express.static('public'));

// Reading and parse from body
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));

// listen to requests
app.listen(process.env.PORT, () => {
  console.log(`Server On! Port ${ process.env.PORT }`);
})