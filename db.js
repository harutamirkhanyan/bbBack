const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/database', {
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB');
});

module.exports = db;
