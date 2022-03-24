const {mongoose} = require('../config/database/mongo');
const {Schema} = mongoose

const boardsSchema = new Schema({
  title: String,
  description: String,
  background: String,
  lists:[{
    _id:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'lists'
    }
  }]
})

const BoardsModel = mongoose.model('boards', boardsSchema);

module.exports = BoardsModel;