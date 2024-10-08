import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import openImage from 'C:/Users/Phillip/Videos/my-app/src/components/open_image.jpg'; // Adjust the path as necessary

const OpeningPage = () => {
    const navigate = useNavigate();

    // Function to navigate to signup
    const handleSignup = () => {
        navigate('/signup');
    };

    // Function to navigate to login
    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <div className="align">
            
            <img src={openImage} alt="Easy Pay Logo" className="logo" />
            <div className="grid">
            <h1 className=" text--center">Welcome to Easy Pay</h1>  
            <div className="buttonContainer grid">  
                <button className="button" onClick={handleSignup}>Sign Up</button>  
                <button className="button" onClick={handleLogin}>Log In</button>  
            </div>
            </div>
        </div>
    );
};

export default OpeningPage;
