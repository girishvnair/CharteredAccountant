const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, required: true, enum: ['income', 'expense'] },
  category: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);
