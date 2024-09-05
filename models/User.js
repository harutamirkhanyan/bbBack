const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  name: { type: String },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  isBlocked: { type: Boolean, default: false },
  lastLogin: { type: Date },
  registered: { type: Date },
  resetPasswordToken: { type: String },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
