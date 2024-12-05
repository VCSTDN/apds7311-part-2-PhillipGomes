import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './landing.css';

const Landingpage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    // Optionally force a full reload to reset all in-memory states and caches
    window.location.href = '/';
  };

  return (
    <div className="align">
      <div className="grid">
        <h1 >Welcome to the Payment Portal</h1>
        <div className="form">
          <div className="form__field">
            <Link to="/payment" className="button">Go to Payment Portal</Link>
          </div>
          <div className="form__field">
            <Link to="/history" className="button">View Payment History</Link>
          </div>
          <div className="form__field">
            <button onClick={handleLogout} className="button">Log Out</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landingpage;
