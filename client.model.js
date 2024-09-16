const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  email: { type: String, required: true, unique: true, index: true },
  phone: { type: String, required: true, index: true },
  address: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Client', clientSchema);

