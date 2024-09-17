/*
 * Author: Girish Venugopalan Nair
 * Email: girishvnair@gmail.com
 * Description: Component for calculating payroll based on user input such as hours worked, hourly rate, and tax rate.
 * Date: <Date of creation>
 */
const express = require('express');
const router = express.Router();
const Client = require('../models/client');

// POST: Add New Client
router.post('/add-client', async (req, res) => {
  const { name, email, phone, address } = req.body;

  // Basic validation
  if (!name || !email || !phone || !address) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newClient = new Client({ name, email, phone, address });
    await newClient.save();
    res.status(201).json({ message: 'Client added successfully', client: newClient });
  } catch (error) {
    res.status(500).json({ message: 'Error adding client', error });
  }
});

// GET: Search for a client with advanced filters
router.get('/search-client', async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: 'Search query is required' });
  }

  try {
    // Advanced filtering options: search by name, email, or phone
    const clients = await Client.find({
      $or: [
        { name: new RegExp(query, 'i') },  // Case-insensitive search by name
        { email: new RegExp(query, 'i') }, // Case-insensitive search by email
        { phone: new RegExp(query, 'i') }, // Search by phone
      ],
    });

    if (!clients || clients.length === 0) {
      return res.status(404).json({ message: 'No clients found' });
    }

    res.status(200).json({ clients });
  } catch (error) {
    res.status(500).json({ message: 'Error searching clients', error });
  }
});

// PUT: Update client details
router.put('/update-client/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, address } = req.body;

  // Basic validation
  if (!name || !email || !phone || !address) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const client = await Client.findById(id);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    // Update client details
    client.name = name;
    client.email = email;
    client.phone = phone;
    client.address = address;
    await client.save();

    res.status(200).json({ message: 'Client updated successfully', client });
  } catch (error) {
    res.status(500).json({ message: 'Error updating client', error });
  }
});

module.exports = router;
