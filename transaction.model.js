const transactionSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, required: true, enum: ['income', 'expense'] },
  category: { type: String, required: true },
  reconciled: { type: Boolean, default: false },  // New field for reconciliation status
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);
