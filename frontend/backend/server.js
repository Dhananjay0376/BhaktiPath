const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const templeRoutes = require('./routes/templeRoutes');
app.use('/api/temples', templeRoutes);

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/bhaktipath')
    .then(() => console.log('MongoDB Connected: BhaktiPath DB'))
    .catch(err => console.error('MongoDB Connection Error:', err));

// Routes (Placeholder)
app.get('/', (req, res) => {
    res.send('BhaktiPath API is running...');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
