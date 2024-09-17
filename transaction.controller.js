const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction');

// POST: Record a new transaction
router.post('/transactions', async (req, res) => {
  const { date, description, amount, type, category } = req.body;

  // Basic validation
  if (!date || !description || !amount || !type || !category) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newTransaction = new Transaction({ date, description, amount, type, category });
    await newTransaction.save();
    res.status(201).json({ message: 'Transaction recorded successfully', transaction: newTransaction });
  } catch (error) {
    res.status(500).json({ message: 'Error recording transaction', error });
  }
});

module.exports = router;

