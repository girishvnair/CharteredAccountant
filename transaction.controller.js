/*
 * Author: Girish Venugopalan Nair
 * Email: girishvnair@gmail.com
 * Description: Component for calculating payroll based on user input such as hours worked, hourly rate, and tax rate.
 * Date: <Date of creation>
 */
const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction');

// GET: Fetch all transactions
router.get('/transactions', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json({ transactions });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transactions', error });
  }
});

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

// PUT: Update transaction category
router.put('/update-transaction/:id', async (req, res) => {
  const { id } = req.params;
  const { category } = req.body;

  // Basic validation
  if (!category) {
    return res.status(400).json({ message: 'Category is required' });
  }

  try {
    const transaction = await Transaction.findById(id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    transaction.category = category;
    await transaction.save();

    res.status(200).json({ message: 'Transaction category updated successfully', transaction });
  } catch (error) {
    res.status(500).json({ message: 'Error updating transaction category', error });
  }
});

module.exports = router;
