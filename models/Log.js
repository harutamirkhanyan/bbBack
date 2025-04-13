import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
  action: { type: String, required: true },
  user: { type: String },
  timestamp: { type: Date, default: Date.now },
  details: { type: Object },
}, { versionKey: false });

const Log = mongoose.model('Log', logSchema);
export default Log;