const mongoose = require('mongoose');
const {DB} = require('../environments');

const connection = async () =>{
  try {
    const connect = await mongoose.connect(`mongodb+srv://${DB.user}:${DB.password}@${DB.host}/${DB.database}
    `)
    console.log('Mongo db connected', connect.connection.host);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  mongoose,
  connection
}
