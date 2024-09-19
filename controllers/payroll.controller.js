/*
 * Author: Girish Venugopalan Nair
 * Email: girishvnair@gmail.com
 * Description: Component for calculating payroll based on user input such as hours worked, hourly rate, and tax rate.
 * Date: <Date of creation>
 */
const express = require('express');
const router = express.Router();

// POST: Calculate payroll
router.post('/calculate-payroll', (req, res) => {
  const { employeeName, hoursWorked, hourlyRate, taxRate } = req.body;

  // Basic validation
  if (!employeeName || !hoursWorked || !hourlyRate || !taxRate) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Calculate payroll
  const grossPay = hoursWorked * hourlyRate;
  const taxDeduction = (grossPay * taxRate) / 100;
  const netPay = grossPay - taxDeduction;

  const payrollData = {
    employeeName,
    grossPay,
    taxDeduction,
    netPay,
  };

  res.status(200).json(payrollData);
});

module.exports = router;
