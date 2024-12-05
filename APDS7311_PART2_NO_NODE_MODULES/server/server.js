const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const fs = require('fs');
const https = require('https');
const rateLimit = require('express-rate-limit');

// Initialize app
const app = express();

// Configure helmet with custom security policies
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            objectSrc: ["'none'"],
            upgradeInsecureRequests: [],
        }
    },
    dnsPrefetchControl: {
        allow: false
    }
}));

// Define the rate limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after a pause'
});

// Connect to MongoDB
const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb://localhost:27017/apds2');
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1);  // Exit process with failure
    }
};

// Call the connectDB function to establish a connection to MongoDB
connectDB();

// Apply the rate limiter to all requests
app.use(limiter);

// Middleware
app.use(cors()); // Enabling CORS to allow requests from different origins
app.use(express.json()); // Parsing incoming JSON data

// Routes
app.use('/api/auth', require('./routes/auth'));  // Authentication routes
app.use('/api/payment', require('./routes/payment'));  // Payment-related routes

// Root route to handle '/'
app.get('/', (req, res) => {
    res.send('Welcome to the Secure Server');
});

// SSL Certificate and Key
const options = {
    key: fs.readFileSync('./Keys/privatekey.pem'),
    cert: fs.readFileSync('./Keys/certificate.pem')
};

// Define Port
const PORT = process.env.PORT || 5001;  // Ensure the server listens on port 5001

// Start the server with HTTPS
https.createServer(options, app).listen(PORT, () => {
    console.log(`HTTPS Server running on port ${PORT}`);
});
