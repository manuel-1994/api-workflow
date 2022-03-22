const {mongoose} = require('../config/database/mongo');
const {Schema} = mongoose;

const teamsSchema = new Schema({
  name: String,
  description: String,
  idLeader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  members: [{
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    },
    role:{
      type: String,
      enum: ['normal','validator','editor','leader'],
      default: 'normal'
    }
  }
  ],
  boards:[
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'boards'
      }
    }
  ]
})

const TeamsModel = mongoose.model('teams', teamsSchema);

module.exports = TeamsModel;