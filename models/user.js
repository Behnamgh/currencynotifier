var mongoose = require('mongoose');

var userSchema = mongoose.Schema({

  nickname: String,
  randomkey: Number,
  telegramID: String,
  chatID : Number,
  registered: { type: Boolean, default: false }

});

module.exports = mongoose.model('User', userSchema);
