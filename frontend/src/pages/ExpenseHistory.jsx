import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2 } from 'lucide-react';
import api from '../services/api';

const CATEGORIES = ['All', 'Food', 'Travel', 'Shopping', 'Bills', 'Entertainment', 'Health', 'Other'];

const ExpenseHistory = () => {
  const [expenses, setExpenses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExpenses();
  }, [searchTerm, category]);

  const fetchExpenses = async () => {
    try {
      let query = `/expenses?`;
      if (searchTerm) query += `search=${searchTerm}&`;
      if (category && category !== 'All') query += `category=${category}`;
      
      const res = await api.get(query);
      if (res.data.success) {
        setExpenses(res.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        await api.delete(`/expenses/${id}`);
        fetchExpenses();
      } catch (err) {
        console.error(err);
        alert('Failed to delete expense');
      }
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Expense History</h2>
        <Link to="/add-expense" className="btn btn-primary">Add Expense</Link>
      </div>

      <div className="filters">
        <input 
          type="text" 
          placeholder="Search by title..." 
          className="form-control"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ maxWidth: '300px' }}
        />
        
        <select 
          className="form-control" 
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
          style={{ maxWidth: '200px' }}
        >
          {CATEGORIES.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <p>Loading expenses...</p>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map(expense => (
                <tr key={expense._id}>
                  <td>{expense.title}</td>
                  <td>
                    <span style={{ 
                      padding: '4px 8px', 
                      borderRadius: '12px', 
                      backgroundColor: 'rgba(0,0,0,0.05)',
                      fontSize: '0.85rem'
                    }}>
                      {expense.category}
                    </span>
                  </td>
                  <td style={{ fontWeight: 'bold' }}>₹{expense.amount.toFixed(2)}</td>
                  <td>{new Date(expense.expenseDate).toLocaleDateString()}</td>
                  <td style={{ display: 'flex', gap: '0.5rem' }}>
                    <Link to={`/edit-expense/${expense._id}`} className="btn" style={{ background: 'var(--primary)', color: 'white', padding: '0.4rem' }}>
                      <Edit size={16} />
                    </Link>
                    <button onClick={() => handleDelete(expense._id)} className="btn btn-danger" style={{ padding: '0.4rem' }}>
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {expenses.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>
                    No expenses found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ExpenseHistory;
