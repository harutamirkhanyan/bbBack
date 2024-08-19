const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  src: {
    type: String,
    required: false
  },
  geo: {
    type: String,
    required: false
  },
  title: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  text: {
    type: String,
    required: false
  },
  image: {
    type: String,
    required: false
  }
}, { _id: false });

const storeItemSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: false
  },
  text: {
    type: String,
    required: false
  },
  geo: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  image: {
    type: String,
    required: false
  }
}, { _id: false });

const homeDataSchema = new mongoose.Schema({
  project: [projectSchema],
  storeItems: [storeItemSchema]
}, { versionKey: false });

homeDataSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

homeDataSchema.set('toObject', {
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

const HomeData = mongoose.model('HomeData', homeDataSchema);

module.exports = HomeData;
