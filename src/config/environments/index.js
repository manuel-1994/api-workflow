const path = require('path');
require('dotenv').config({
  path: path.resolve(process.cwd(), `.env${process.env.NODE_ENV==='dev'?'':'.'+process.env.NODE_ENV}`)
})

//imports enviroments
const development = require('./development')

const {NODE_ENV} = process.env
let currentConfig = development

switch (NODE_ENV) {
  default:
    currentConfig = development
    break;
}

module.exports = currentConfig;