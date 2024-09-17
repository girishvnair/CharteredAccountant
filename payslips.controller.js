const express = require('express');
const router = express.Router();
const Payroll = require('../models/payroll');
const nodemailer = require('nodemailer');

// POST: Issue payslips for a payroll date
router.post('/issue-payslips', async (req, res) => {
  const { payrollDate } = req.body;

  if (!payrollDate) {
    return res.status(400).json({ message: 'Payroll date is required' });
  }

  try {
    // Fetch payroll records for the specified date
    const payrolls = await Payroll.find({
      createdAt: { $gte: new Date(payrollDate), $lte: new Date(payrollDate).setHours(23, 59, 59) }
    });

    if (payrolls.length === 0) {
      return res.status(404).json({ message: 'No payroll records found for the selected date' });
    }

    // Setup email transport (use real SMTP service in production)
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Replace with your email provider
      auth: {
        user: 'youremail@gmail.com',
        pass: 'yourpassword',
      },
    });

    // Loop through payrolls and send payslips
    for (const payroll of payrolls) {
      const mailOptions = {
        from: 'youremail@gmail.com',
        to: payroll.employeeEmail, // Make sure to store employee email in payroll model
        subject: 'Your Payslip',
        text: `Dear ${payroll.employeeName},\n\nHere is your payslip for ${payrollDate}.\nGross Pay: ${payroll.grossPay}\nTax Deduction: ${payroll.taxDeduction}\nNet Pay: ${payroll.netPay}\n\nBest regards,\nPayroll Department`,
      };

      await transporter.sendMail(mailOptions);
    }

    res.status(200).json({ message: 'Payslips issued successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error issuing payslips', error });
  }
});

module.exports = router;
