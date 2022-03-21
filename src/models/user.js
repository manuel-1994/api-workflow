const {mongoose} = require('../config/database/mongo');
const {Schema} = mongoose

const usersSchema = new Schema ({
  name: String,
  birthday: Date,
  email: String,
  password: String,
  repeatPassword: String,
  role: {
    type: Number,
    default: 0
  },
  provider: String,
  idProvider: String
});

const UsersModel = mongoose.model('users', usersSchema);

module.exports = UsersModel;