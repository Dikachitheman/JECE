const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

// Models
const AgencySchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String },
  address: { type: String, required: true },
  contactInfo: {
    phone: { type: String, required: true },
    email: { type: String, required: true },
    website: { type: String }
  },
  businessHours: { type: String },
  stats: {
    projectsManaged: { type: Number, default: 0 },
    clientSatisfactionRating: { type: Number, default: 0 },
    ongoingProjects: { type: Number, default: 0 },
    completedProjects: { type: Number, default: 0 },
    pendingRequests: { type: Number, default: 0 },
    revenue: { type: Number, default: 0 }
  },
  password: { type: String, required: true }
});

const Agency = mongoose.model('Agency', AgencySchema);

// JWT Authentication Middleware
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Access Denied' });

  try {
    const verified = jwt.verify(token, 'secretkey');
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid Token' });
  }
};

// File Upload Middleware
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Register Route
app.post('/api/register', async (req, res) => {
  const { name, address, contactInfo, businessHours, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const agency = new Agency({
    name,
    address,
    contactInfo,
    businessHours,
    password: hashedPassword
  });

  try {
    await agency.save();
    res.status(201).json({ message: 'Agency registered successfully' });
  } catch (error) {
    res.status(400).json({ error });
  }
});

// Login Route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const agency = await Agency.findOne({ 'contactInfo.email': email });
  if (!agency) return res.status(400).json({ message: 'Email not found' });

  const validPass = await bcrypt.compare(password, agency.password);
  if (!validPass) return res.status(400).json({ message: 'Invalid password' });

  const token = jwt.sign({ _id: agency._id }, 'secretkey');
  res.header('Authorization', token).json({ token });
});

// Update Profile Route
app.put('/api/profile', authenticateJWT, upload.single('logo'), async (req, res) => {
  const { name, address, contactInfo, businessHours } = req.body;
  const logo = req.file ? req.file.path : undefined;

  try {
    const updatedData = {
      name,
      address,
      contactInfo,
      businessHours
    };
    if (logo) updatedData.logo = logo;

    const updatedAgency = await Agency.findByIdAndUpdate(req.user._id, updatedData, { new: true });
    res.json(updatedAgency);
  } catch (error) {
    res.status(400).json({ error });
  }
});

// Get Agency Stats
app.get('/api/stats', authenticateJWT, async (req, res) => {
  try {
    const agency = await Agency.findById(req.user._id).select('stats');
    res.json(agency.stats);
  } catch (error) {
    res.status(400).json({ error });
  }
});

// Job/Project Management
app.put('/api/projects', authenticateJWT, async (req, res) => {
  const { projectsManaged, ongoingProjects, completedProjects, pendingRequests, revenue } = req.body;

  try {
    const updatedStats = await Agency.findByIdAndUpdate(req.user._id, {
      $set: {
        'stats.projectsManaged': projectsManaged,
        'stats.ongoingProjects': ongoingProjects,
        'stats.completedProjects': completedProjects,
        'stats.pendingRequests': pendingRequests,
        'stats.revenue': revenue
      }
    }, { new: true });
    res.json(updatedStats.stats);
  } catch (error) {
    res.status(400).json({ error });
  }
});

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
