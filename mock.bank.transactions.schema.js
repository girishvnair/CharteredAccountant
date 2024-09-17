const bankTransactionSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
  });
  
  module.exports = mongoose.model('BankTransaction', bankTransactionSchema);
  