import React, { useState } from 'react';
import { signup } from '../services/api';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);  // State to toggle password visibility
  const navigate = useNavigate();

  // Regex to validate the password
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?.&])[A-Za-z\d@$!%*?.&]{8,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Testing password:', password);
    if (!passwordRegex.test(password)) {
      console.log('Password does not meet requirements');
      alert('Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, one number, and one special character.');
      return;
    }


    // Check if the password meets the required pattern
    if (!passwordRegex.test(password)) {
      alert('Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, one number, and one special character.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const userData = { username, password, confirmPassword };
      const response = await signup(userData);
      console.log('User registered:', response);
      navigate('/login');
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <div className="align">
      <div className="grid">
        <form onSubmit={handleSubmit} className="form login">
          <h2 className="text--center">Signup</h2>
          <div className="form__field">
            <label>Username</label>
            <input type="text"
              className="form__input"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required />
          </div>
          <div className="form__field">
            <label>Password</label>
            <input type={showPassword ? "text" : "password"}
              className="form__input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required />
          </div>
          <div className="form__field">
            <label>Confirm Password</label>
            <input type={showPassword ? "text" : "password"}
              className="form__input"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required />
          </div>
          <div className="form__field">
            <label>
              <input type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)} />
               Show Password
            </label>
          </div>
          <div className="form__field">
            <input type="submit" value="Signup" />
          </div>
          <div className="form__field">
            <button type="button" onClick={() => navigate('/login')} className="link-button">Back to Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
