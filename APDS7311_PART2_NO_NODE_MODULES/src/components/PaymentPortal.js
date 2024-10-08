import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles.css'; 

const PaymentPortal = () => {
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [receiverAccount, setReceiverAccount] = useState('');
  const [confirm, setConfirm] = useState(false);
  const [userCode, setUserCode] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const goToLanding = () => navigate('/landingpage');

  useEffect(() => {
    const storedUserCode = localStorage.getItem('userCode');
    setUserCode(storedUserCode || console.error('No userCode found'));
  }, []);

  const validateInput = () => {
    if (!accountNumber || !amount || !receiverAccount) {
      setError('All fields must be filled out.');
      return false;
    }
    if (isNaN(amount) || isNaN(accountNumber) || isNaN(receiverAccount)) {
      setError('Please enter valid numbers only.');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateInput()) {
      return;
    }
    setError('');
    setConfirm(true);
  };

  const confirmPayment = async () => {
    if (!validateInput()) {
      return;
    }
    try {
      const paymentData = {
        userCode,
        senderAccount: accountNumber,
        receiverAccount,
        amount: parseFloat(amount).toFixed(2),
      };
      const response = await axios.post('https://localhost:5001/api/payment', paymentData);
      alert('Payment processed successfully');
      navigate('/landingpage'); // Optional: navigate away after successful payment
    } catch (error) {
      console.error('Error processing payment:', error);
      setError('Failed to process payment, please try again.');
    } finally {
      setConfirm(false);
    }
  };

  if (confirm) {
    return (
      <div className="payment-confirmation">
        <h3>Confirm Payment</h3>
        <p>Account Number: {accountNumber}</p>
        <p>Amount: R{amount}</p>
        <p>Receiver's Account: {receiverAccount}</p>
        <button onClick={confirmPayment} className="confirm-button">Confirm</button>
        <button onClick={() => setConfirm(false)} className="cancel-button">Cancel</button>
      </div>
    );
  }

  return (
    <div className="payment-portal">
      <h2>Payment Portal</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="payment-form">
        <label htmlFor="accountNumber">Account Number
          <input id="accountNumber" type="text" value={accountNumber} onChange={e => setAccountNumber(e.target.value.replace(/[^0-9]/g, ''))} required />
        </label>
        <label htmlFor="amount">Amount in Rands
          <input id="amount" type="text" value={amount} onChange={e => setAmount(e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1'))} required />
        </label>
        <label htmlFor="receiverAccount">Receiver's Account Number
          <input id="receiverAccount" type="text" value={receiverAccount} onChange={e => setReceiverAccount(e.target.value.replace(/[^0-9]/g, ''))} required />
        </label>
        <button className="button" type="submit">Submit</button>
        <div className="buttonContainer">
            <button className="button" onClick={goToLanding}>Back to Home</button>
        </div>
      </form>
    </div>
  );
};

export default PaymentPortal;
