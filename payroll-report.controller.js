/*
 * Author: Girish Venugopalan Nair
 * Email: girishvnair@gmail.com
 * Description: Component for calculating payroll based on user input such as hours worked, hourly rate, and tax rate.
 * Date: <Date of creation>
 */
const express = require('express');
const router = express.Router();
const Payroll = require('../models/payroll');

// POST: Generate payroll report
router.post('/payroll-report', async (req, res) => {
  const { startDate, endDate } = req.body;

  // Basic validation
  if (!startDate || !endDate) {
    return res.status(400).json({ message: 'Start and end dates are required' });
  }

  try {
    // Fetch payroll records within the date range
    const payrollReport = await Payroll.find({
      createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) }
    });

    res.status(200).json({ payrollReport });
  } catch (error) {
    res.status(500).json({ message: 'Error generating payroll report', error });
  }
});

module.exports = router;
