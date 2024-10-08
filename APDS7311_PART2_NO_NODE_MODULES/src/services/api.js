import axios from 'axios';

// Environment specific API URL
const API_URL = process.env.REACT_APP_API_URL || 'https://localhost:5001/api/auth';
// Update the API URL for payments
const PAYMENT_API_URL = 'https://localhost:5001/api/payment';

// Creating an axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000, // Set timeout to 10 seconds
  headers: { 'Content-Type': 'application/json' }
});

// Signup service
export const signup = async (userData) => {
  try {
    const response = await axiosInstance.post('/signup', userData);
    return response.data;
  } catch (error) {
    console.error('Signup error:', error);
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};

// Login service
export const login = async (loginData) => {
  try {
    const response = await axiosInstance.post('/login', loginData);
    console.log("Logged in");
    return response.data;
  } catch (error) {
    if (error.response) {
      // Server responded with a status other than 2xx
    
      console.log('Login pass:', loginData);
      console.error('Login failed:', error.response.data);
      throw new Error(error.response.data.message || "Login failed");
    } else if (error.request) {
      // Request was made but no response received
      console.error('No response received:', error.request);
      throw new Error("No response from server");
    } else {
      // Something else happened
      console.error('Error:', error.message);
      throw new Error(error.message);
    }
  }
};


// Fetch payment history
export const fetchPaymentHistory = async (userCode) => {
  try {
    const response = await axios.get(`${PAYMENT_API_URL}/history/${userCode}`);
    return response.data; 
  } catch (error) {
    console.error('Error fetching payment history:', error);
    throw error;
  }
};
