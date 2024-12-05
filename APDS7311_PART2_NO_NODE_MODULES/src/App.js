import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Landingpage from './components/Landingpage';
import PaymentPortal from './components/PaymentPortal';
import PaymentHistory from './components/PaymentHistory';
import OpeningPage from './components/OpeningPage';  // Import OpeningPage

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OpeningPage />} />  {/* Set OpeningPage as the default */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Landingpage" element={<Landingpage />} />
        <Route path="/payment" element={<PaymentPortal />} />
        <Route path="/history" element={<PaymentHistory userCode={localStorage.getItem('userCode')} />} />
      </Routes>
    </Router>
  );
}

export default App;
