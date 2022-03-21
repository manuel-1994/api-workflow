const mongoose = require('mongoose');
const {db} = require('../environments');

const connection = async () =>{
  try {
    const connect = await mongoose.connect(`mongodb+srv://${db.user}:${db.password}@${db.host}/${db.database}
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
