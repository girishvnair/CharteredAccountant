const mongoose = require('mongoose');

const payrollSchema = new mongoose.Schema({
  employeeName: { type: String, required: true },
  employeeEmail: { type: String, required: true }, // Add email field to send payslips
  hoursWorked: { type: Number, required: true },
  hourlyRate: { type: Number, required: true },
  grossPay: { type: Number, required: true },
  taxDeduction: { type: Number, required: true },
  netPay: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Payroll', payrollSchema);
