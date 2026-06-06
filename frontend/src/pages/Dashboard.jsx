import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import api from '../services/api';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#a28bfe', '#fd79a8', '#ffeaa7'];

const Dashboard = () => {
  const [stats, setStats] = useState({ totalExpenses: 0, monthlyExpenses: 0, recentTransactions: [] });
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
    fetchChartData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const res = await api.get('/dashboard');
      if (res.data.success) {
        setStats(res.data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchChartData = async () => {
    try {
      const res = await api.get('/expenses');
      if (res.data.success) {
        // Aggregate by category for Pie Chart
        const expenses = res.data.data;
        const categoryMap = {};
        expenses.forEach(exp => {
          categoryMap[exp.category] = (categoryMap[exp.category] || 0) + exp.amount;
        });
        
        const formattedData = Object.keys(categoryMap).map(key => ({
          name: key,
          value: categoryMap[key]
        }));
        
        setChartData(formattedData);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Dashboard</h2>
        <Link to="/add-expense" className="btn btn-primary">Add Expense</Link>
      </div>

      <div className="dashboard-cards">
        <div className="card">
          <h3>Total Expenses</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>₹{stats.totalExpenses.toFixed(2)}</p>
        </div>
        <div className="card">
          <h3>This Month</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>₹{stats.monthlyExpenses.toFixed(2)}</p>
        </div>
        <div className="card">
          <h3>Recent Transactions</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.recentTransactions.length}</p>
        </div>
      </div>

      <div className="charts-grid">
        <div className="card" style={{ height: '400px' }}>
          <h3 style={{ marginBottom: '1rem' }}>Category Distribution</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="card" style={{ height: '400px', display: 'flex', flexDirection: 'column' }}>
           <h3 style={{ marginBottom: '1rem' }}>Expense by Category (Bar)</h3>
           <div style={{ flex: 1, minHeight: 0 }}>
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
                 <CartesianGrid strokeDasharray="3 3" />
                 <XAxis dataKey="name" />
                 <YAxis />
                 <Tooltip />
                 <Legend wrapperStyle={{ paddingTop: '20px' }} />
                 <Bar dataKey="value" fill="var(--primary)" />
               </BarChart>
             </ResponsiveContainer>
           </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: '2rem' }}>
        <h3>Recent Transactions</h3>
        <div className="table-container" style={{ marginTop: '1rem' }}>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Mode</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentTransactions.map(t => (
                <tr key={t._id}>
                  <td>{t.title}</td>
                  <td>{t.category}</td>
                  <td>₹{t.amount.toFixed(2)}</td>
                  <td>{t.paymentMode || 'Cash'}</td>
                  <td>{new Date(t.expenseDate).toLocaleDateString()}</td>
                </tr>
              ))}
              {stats.recentTransactions.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center' }}>No recent transactions</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
