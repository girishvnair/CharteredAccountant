const mongoose = require('mongoose');

const engagementSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  title: { type: String, required: true },
  status: { type: String, required: true, enum: ['active', 'pending', 'completed'], default: 'active' },
}, { timestamps: true });

module.exports = mongoose.model('Engagement', engagementSchema);
