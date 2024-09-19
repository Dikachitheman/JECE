const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const agencyRoutes = require('./routes/agency');
const cors = require('cors');

const app = express();
const PORT = 5000;

mongoose.connect('mongodb+srv://jece:Jambr0ther$@cluster0.ferip.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    // useNewUrlParser: true,
    // useUnifiedTopology: true -> was getting depracated error
});

const corsOptions = {
    origin: 'http://localhost:3000',  // Allow only this domain
    optionsSuccessStatus: 200     // Some legacy browsers choke on 204
  };
  
  app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/agency', agencyRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
