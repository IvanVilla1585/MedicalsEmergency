var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const TokenSchema = new Schema({
  value: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  clientId: {
    type: String,
    required: true
  },
  token_expire: {
    type: Number,
    default: 10
  },
  date_create_token: {
    type: Date,
    default: Date.now
  }
});

const TokenModel = mongoose.model('Token', TokenSchema);
exports.TokenModel = TokenModel;