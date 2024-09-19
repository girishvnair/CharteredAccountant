/*
 * Author: Girish Venugopalan Nair
 * Email: girishvnair@gmail.com
 * Description: Component for calculating payroll based on user input such as hours worked, hourly rate, and tax rate.
 * Date: <Date of creation>
 */
const express = require('express');
const router = express.Router();
const Payroll = require('../models/payroll');

// POST: Calculate tax liabilities and file taxes
router.post('/file-taxes', async (req, res) => {
  const { startDate, endDate } = req.body;

  if (!startDate || !endDate) {
    return res.status(400).json({ message: 'Start and end dates are required' });
  }

  try {
    // Fetch payroll data within the selected date range
    const payrolls = await Payroll.find({
      createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) }
    });

    if (payrolls.length === 0) {
      return res.status(404).json({ message: 'No payroll records found for the selected period' });
    }

    // Calculate total gross pay and tax deducted
    const totalGrossPay = payrolls.reduce((sum, payroll) => sum + payroll.grossPay, 0);
    const totalTaxDeducted = payrolls.reduce((sum, payroll) => sum + payroll.taxDeduction, 0);

    // Simulate filing taxes via a mock API
    const taxFilingResponse = await mockTaxFilingApi(totalGrossPay, totalTaxDeducted);

    // Return the filing result
    res.status(200).json({
      totalGrossPay,
      totalTaxDeducted,
      status: taxFilingResponse.status, // Example: 'Filed Successfully'
    });
  } catch (error) {
    res.status(500).json({ message: 'Error filing taxes', error });
  }
});

// Mock function to simulate tax filing via an external API
async function mockTaxFilingApi(grossPay, taxDeducted) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ status: 'Filed Successfully' });
    }, 1000);
  });
}

module.exports = router;
