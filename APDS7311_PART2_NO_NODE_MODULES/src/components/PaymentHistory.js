import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchPaymentHistory } from '../services/api';
import './history.css';

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userCode = localStorage.getItem('userCode');
    if (!userCode) {
      navigate('/login');
      return;
    }

    const fetchPayments = async () => {
      setLoading(true);
      try {
        const response = await fetchPaymentHistory(userCode);
        setPayments(response);
        setError('');
      } catch (error) {
        console.error('Error fetching payments:', error);
        setError('Failed to fetch payments.');
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [navigate]);

  const formatCurrency = (amount) => `R${parseFloat(amount).toFixed(2)}`;

  return (
    <div className="align">
      <h2>Payment History</h2>
      {error && <p className="error text--center">{error}</p>}
      {loading ? (
        <p className="text--center">Loading...</p>
      ) : (
        <div className="grid">
          {payments.map((payment) => (
            <div key={payment.id} className="payment-entry">
              <div className="form__field">
                <span className="icon">Amount:</span>
                <span className="form__input">{formatCurrency(payment.amount)}</span>
              </div>
              <div className="form__field">
                <span className="icon">Sender Account:</span>
                <span className="form__input">{payment.senderAccount}</span>
              </div>
              <div className="form__field">
                <span className="icon">Receiver Account:</span>
                <span className="form__input">{payment.receiverAccount}</span>
              </div>
              <div className="form__field">
                <span className="icon">Date:</span>
                <span className="form__input">{new Date(payment.date).toLocaleString()}</span>
              </div>
            </div>
          ))}
          <div className="buttonContainer">
            <button className="button" onClick={() => navigate('/landingpage')}>Back to Home</button>
            <button className="button" onClick={() => navigate('/payment')}>Go to Payment Portal</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
