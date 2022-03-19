const express = require('express');
const cookie = require('cookie-parser');
const config = require('./config/environments');
const app = express();

/* middleware */
app.use(express.json());
app.use(cookie());

/*  Database */

/* Routes */
app.get('/', (req, res)=>{
  res.send('<h1>Workflow</h1>')
})

/* Server */
app.listen(config.PORT,()=>{
  console.log(`Application running on: http://localhost:${config.PORT}`);
})
