const express = require('express');
const cookies= require('cookie-parser');
const { connection } = require('./config/database/mongo');
const router = require('./router');
const app = express();

/* middleware */
app.use(express.json());
app.use(cookies());
//TODO: configurar cors

/*  Database */
connection();

/* Routes */
app.use('/api', router)

module.exports = app;
