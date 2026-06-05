import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { Moon, Sun, LogOut } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        ExpenseTracker
      </Link>
      
      {user ? (
        <div className="navbar-links">
          <Link to="/">Dashboard</Link>
          <Link to="/expenses">History</Link>
          <Link to="/add-expense">Add Expense</Link>
          
          <div className="nav-actions">
            <button onClick={toggleTheme} className="btn" style={{ background: 'transparent', color: 'var(--navbar-text)' }}>
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <span style={{ fontWeight: 'bold' }}>{user.name}</span>
            <button onClick={handleLogout} className="btn btn-danger" title="Logout">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      ) : (
        <div className="nav-actions">
           <button onClick={toggleTheme} className="btn" style={{ background: 'transparent', color: 'var(--navbar-text)' }}>
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
           </button>
           <Link to="/login" className="btn btn-primary">Login</Link>
           <Link to="/register" className="btn btn-primary">Register</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
