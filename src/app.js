const express = require('express');
const cookie = require('cookie-parser');
const { connection } = require('./config/database/mongo');
const app = express();

/* middleware */
app.use(express.json());
app.use(cookie());
//TODO: configurar cors

/*  Database */
connection();

/* Routes */
app.get('/', (req, res)=>{
  res.send('<h1>Workflow</h1>')
})

module.exports = app;
