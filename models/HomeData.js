const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  id: Number,
  src: String,
  geo: String,
  title: String,
  more: String
});

const storeItemSchema = new mongoose.Schema({
  id: Number,
  title: String,
  text: String,
  src: String
});

const homeDataSchema = new mongoose.Schema({
  project: [projectSchema],
  storeItems: [storeItemSchema]
});

const HomeData = mongoose.model('HomeData', homeDataSchema);

module.exports = HomeData;
