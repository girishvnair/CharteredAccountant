const express = require('express');
const router = express.Router();
const axios = require('axios');
const Transaction = require('../models/transaction');

// POST: Sync bank transactions
router.post('/sync-bank-feeds', async (req, res) => {
  try {
    // Mock bank API call - replace with actual bank API
    const bankResponse = await axios.get('https://mock-bank-api.com/transactions');
    const bankTransactions = bankResponse.data;

    // Process and save bank transactions
    const savedTransactions = [];
    for (const transaction of bankTransactions) {
      const newTransaction = new Transaction({
        date: transaction.date,
        description: transaction.description,
        amount: transaction.amount,
        type: transaction.amount >= 0 ? 'income' : 'expense',
        category: 'others', // Default category, can be updated later
      });
      await newTransaction.save();
      savedTransactions.push(newTransaction);
    }

    res.status(201).json({ message: 'Bank transactions synced successfully', transactions: savedTransactions });
  } catch (error) {
    res.status(500).json({ message: 'Error syncing bank transactions', error });
  }
});

module.exports = router;
