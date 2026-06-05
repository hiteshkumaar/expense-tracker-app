const Expense = require('../models/Expense');

// @desc    Get dashboard stats
// @route   GET /api/dashboard
// @access  Private
const getDashboardData = async (req, res) => {
  try {
    const userId = req.user._id;

    const expenses = await Expense.find({ userId }).sort({ expenseDate: -1 });

    const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const monthlyExpenses = expenses
      .filter((expense) => {
        const d = new Date(expense.expenseDate);
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
      })
      .reduce((acc, curr) => acc + curr.amount, 0);

    const recentTransactions = expenses.slice(0, 5);

    res.json({
      success: true,
      data: {
        totalExpenses,
        monthlyExpenses,
        recentTransactions,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

module.exports = { getDashboardData };
