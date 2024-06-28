const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  username: { type: String, unique: true },
  phone: Number,
  email: String,
  password: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
