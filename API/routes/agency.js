const express = require('express');
const Agency = require('../models/Agency');
const User = require('../models/User')
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.get('/user/:id', authMiddleware, async (req, res) => {
    try {
      const userId = req.params.id;
      
      // Fetch the user by ID from the database
      const user = await User.findById(userId).select('-password'); // Exclude password field
  
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      // Return the user data
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server error.' });
    }
});

router.get('/users', authMiddleware, async (req, res) => {
    try {
        // Fetch all users, excluding passwords
        const users = await User.find().select('-password');
        
        if (!users) {
            return res.status(404).json({ message: 'No users found.' });
        }

        // Return the list of users
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
});
  
// Create or Update agency profile
router.post('/create', authMiddleware, async (req, res) => {
    const { name, address, contact, industry } = req.body;
    console.log(req.body)
    console.log(name, address, contact)
    const owner = req.user.id;
    console.log("owner")
    console.log(owner)

    try {
        let agency = await Agency.findOne({ owner });
        if (agency) {
            agency.name = name;
            agency.address = address;
            agency.contact = contact;
            await agency.save();
        } else {
            agency = new Agency({ name, address, contact, owner, industry });
            await agency.save();
        }
        res.status(200).json(agency);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Get agency profile
router.get('/profile', authMiddleware, async (req, res) => {
    try {
        const agency = await Agency.findOne({ owner: req.user.id });
        if (!agency) return res.status(404).json({ message: 'Agency not found' });
        res.status(200).json(agency);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Admin routes to manage agencies
router.get('/all', authMiddleware, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

    try {
        const agencies = await Agency.find();
        res.json(agencies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/update/:id', authMiddleware, async (req, res) => {
    // if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });
    console.log(req.params.id)
    console.log(req.body)
    try {
        const { name, address, contact, industry } = req.body;
        const agency = await Agency.findByIdAndUpdate(req.params.id, { name, address, contact, industry }, { new: true });
        if (!agency) {
            return res.status(404).json({ message: 'Agency not found.' });
        } else {
            console.log("agency found")
        }
        res.json(agency);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id/project', authMiddleware, async (req, res) => {
    // if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });
    
    try {
        const { title, description } = req.body;

        // Validate that the project data exists in the request body
        // if (!newProject) {
        //     return res.status(400).json({ message: 'New project data is required.' });
        // }

        // Find the agency by ID and update its 'project' field
        const agency = await Agency.findByIdAndUpdate(
            req.params.id,
            { $push: { projects: {title, description} } },  // $set to update the project field
            { new: true, runValidators: true }  // Return the updated document and enforce schema validation
        );

        // If the agency is not found, return an error
        if (!agency) {
            return res.status(404).json({ message: 'Agency not found.' });
        }

        // Return the updated agency data
        res.json(agency);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id/:title/project', authMiddleware, async (req, res) => {
    try {
        const title = req.params.title
        // Find the agency by ID and remove the project with the matching title
        const agency = await Agency.findByIdAndUpdate(
            req.params.id,
            { $pull: { projects: { title } } },  // $pull to remove the project based on the title
            { new: true }  // Return the updated document
        );

        // If the agency is not found, return an error
        if (!agency) {
            return res.status(404).json({ message: 'Agency not found.' });
        }

        // Return the updated agency data after deletion
        res.json(agency);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.delete('/:id', authMiddleware, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });
    console.log(req.params.id)
    try {
        const agency = await Agency.findByIdAndDelete(req.params.id);
        if (!agency) {
            return res.status(404).json({ message: 'Agency not found.' });
        }
        res.json({ message: 'Agency deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/stats', authMiddleware, async (req, res) => {
    try {
      const agency = await Agency.findById(req.user._id).select('stats');
      res.json(agency.stats);
    } catch (error) {
      res.status(400).json({ error });
    }
  });

module.exports = router;
