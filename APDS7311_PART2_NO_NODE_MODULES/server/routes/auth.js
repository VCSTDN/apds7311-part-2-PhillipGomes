const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

// @route   POST /api/auth/signup
// @desc    Register a new user
router.post('/signup', async (req, res) => {
  const { username, password, confirmPassword } = req.body;

  // Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ msg: 'Passwords do not match' });
  }

  try {
    // Check if the user already exists
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    user = new User({
      username,
      password: hashedPassword,  // Store hashed password in the DB
    });

    await user.save();
    res.json({ msg: 'User registered successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST /api/auth/login
// @desc    Login user
router.post('/login', async (req, res) => {
  
  const { username, password } = req.body;

  try {
      // Find the user by username
      let user = await User.findOne({ username });
      if (!user) {
          return res.status(400).json({ msg: 'Invalid credentials' });
      }

      // Compare the given password with the hashed password in the DB
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(400).json({ msg: 'Invalid credentials' });
      }

      // Login success response
      //return res.json({ msg: 'Logged in successfully', username: user.username });
      return res.json({ msg: 'Logged in successfully', userCode: user.userCode });
  } catch (err) {
      console.error(err.message);
      return res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
