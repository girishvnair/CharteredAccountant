const express = require('express');
const router = express.Router();
const LedgerTransaction = require('../models/transaction');
const BankTransaction = require('../models/bank-transaction'); // Mock data or actual bank API integration

// GET: Fetch ledger and bank transactions for reconciliation
router.get('/reconcile-transactions', async (req, res) => {
  try {
    const ledgerTransactions = await LedgerTransaction.find();
    const bankTransactions = await BankTransaction.find(); // Fetch bank transactions

    const transactionMatches = ledgerTransactions.map(ledgerTransaction => {
      const matchingBankTransaction = bankTransactions.find(
        bankTransaction =>
          bankTransaction.amount === ledgerTransaction.amount &&
          bankTransaction.date === ledgerTransaction.date
      );
      return {
        ledgerTransaction,
        bankTransaction: matchingBankTransaction || {},
        reconciled: matchingBankTransaction ? true : false,
      };
    });

    res.status(200).json({ transactionMatches });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reconciliation data', error });
  }
});

// PUT: Mark ledger transaction as reconciled
router.put('/mark-reconciled/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const ledgerTransaction = await LedgerTransaction.findById(id);
    if (!ledgerTransaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    ledgerTransaction.reconciled = true;
    await ledgerTransaction.save();

    res.status(200).json({ message: 'Transaction marked as reconciled', transaction: ledgerTransaction });
  } catch (error) {
    res.status(500).json({ message: 'Error marking transaction as reconciled', error });
  }
});

module.exports = router;
