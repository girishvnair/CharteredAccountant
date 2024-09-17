const mockBankTransactions = [
  { date: '2024-09-01', description: 'ATM Withdrawal', amount: -100 },
  { date: '2024-09-02', description: 'Salary Credit', amount: 3000 },
  { date: '2024-09-03', description: 'Grocery Store', amount: -150 },
];

router.get('/transactions', (req, res) => {
  res.json(mockBankTransactions);
});
