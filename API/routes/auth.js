const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');
const Agency = require('../models/Agency');
const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({ username, email, password: hashedPassword, role });
        await user.save();
        res.status(201).json({ message: 'User registered' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/login', async (req, res) => {
    console.log("/login hit")
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, role: user.role }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/profile', authMiddleware, async (req, res) => {
    console.log("/profile hit")
    try {
      // Fetch user profile data from database using the user ID from token
      const user = await User.findById(req.user.id).select('-password'); // Exclude password field
  
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      // Return user profile data
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server error.' });
    }
  });

  router.get('/tokenVerify', authMiddleware, async (req, res) => {
    // If the token is valid, respond with success
    res.status(200).json({ message: 'Token is valid', user: req.user });
  })

module.exports = router;
