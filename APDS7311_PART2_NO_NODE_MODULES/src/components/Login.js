import React, { useState } from 'react';
import { login } from '../services/api';
import { useNavigate } from 'react-router-dom';
import './login.css';  

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const loginData = { username, password };
      const response = await login(loginData);
      if (response && response.userCode) {
        localStorage.setItem('userCode', response.userCode);
        navigate('/landingpage');  
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      setErrorMessage('Login failed: Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = () => {
    navigate('/signup'); 
  };

  return (
    <div className="align">
      <div className="grid">
        <form onSubmit={handleSubmit} className="form login">
          <h2 className="text--center">Login</h2>
          <div className="form__field">
            <label>Username</label>
            <input
              autoComplete="username"
              id="login__username"
              type="text"
              className="form__input"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form__field">
            <label>Password</label>
            <input
              id="login__password"
              type={showPassword ? "text" : "password"}
              className="form__input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label className="password-checkbox">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              /> Show Password
            </label>
          </div>

          <div className="form__field">
            <input type="submit" value={loading ? 'Logging in...' : 'Login'} />
          </div>

          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </form>

        <p className="text--center">Not a member? <button onClick={handleSignUp} className="link-button">Sign up now</button>
          <svg className="icon">
            <use xlinkHref="#icon-arrow-right"></use>
          </svg>
        </p>
      </div>
    </div>
  );
};

export default Login;
