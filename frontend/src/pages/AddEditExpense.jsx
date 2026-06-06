import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

const CATEGORIES = ['Food', 'Travel', 'Shopping', 'Bills', 'Entertainment', 'Health', 'Other'];
const PAYMENT_MODES = ['Cash', 'UPI', 'Credit Card', 'Debit Card'];

const AddEditExpense = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: 'Food',
    paymentMode: 'Cash',
    description: '',
    expenseDate: new Date().toISOString().split('T')[0],
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(isEditMode);

  useEffect(() => {
    if (isEditMode) {
      fetchExpense();
    }
  }, [id]);

  const fetchExpense = async () => {
    try {
      const res = await api.get(`/expenses/${id}`);
      if (res.data.success) {
        const exp = res.data.data;
        setFormData({
          title: exp.title,
          amount: exp.amount,
          category: exp.category,
          paymentMode: exp.paymentMode || 'Cash',
          description: exp.description || '',
          expenseDate: new Date(exp.expenseDate).toISOString().split('T')[0],
        });
      }
    } catch (err) {
      setError('Failed to fetch expense details');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isEditMode) {
        await api.put(`/expenses/${id}`, formData);
      } else {
        await api.post('/expenses', formData);
      }
      navigate('/expenses');
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="form-container" style={{ maxWidth: '600px' }}>
      <h2>{isEditMode ? 'Edit Expense' : 'Add New Expense'}</h2>
      {error && <div className="error-msg">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title *</label>
          <input 
            type="text" 
            name="title"
            className="form-control" 
            value={formData.title} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Amount (₹) *</label>
            <input 
              type="number" 
              name="amount"
              step="0.01"
              min="0.01"
              className="form-control" 
              value={formData.amount} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label>Date *</label>
            <input 
              type="date" 
              name="expenseDate"
              className="form-control" 
              value={formData.expenseDate} 
              onChange={handleChange} 
              required 
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Category *</label>
            <select 
              name="category"
              className="form-control" 
              value={formData.category} 
              onChange={handleChange} 
              required
            >
              {CATEGORIES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Payment Mode *</label>
            <select 
              name="paymentMode"
              className="form-control" 
              value={formData.paymentMode} 
              onChange={handleChange} 
              required
            >
              {PAYMENT_MODES.map(mode => (
                <option key={mode} value={mode}>{mode}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea 
            name="description"
            className="form-control" 
            rows="3"
            value={formData.description} 
            onChange={handleChange} 
          ></textarea>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
          <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
            {isEditMode ? 'Update Expense' : 'Save Expense'}
          </button>
          <button type="button" className="btn" onClick={() => navigate('/expenses')} style={{ flex: 1, background: 'var(--border)', color: 'var(--text-color)' }}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEditExpense;
