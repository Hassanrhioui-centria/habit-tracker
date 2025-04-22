const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const habitRoutes = require('./routes/habits');
const categoryRoutes = require('./routes/categories');
const connectDB = require("./db");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration - more permissive for development
app.use(cors());

// Body parser middleware - increase limit for larger payloads
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Debug middleware to log requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log('Request Headers:', req.headers);
  if (req.body) console.log('Request Body:', req.body);
  next();
});

// Routes
app.use('/api/habits', habitRoutes);
app.use('/api/categories', categoryRoutes);

// Connect to MongoDB
connectDB();

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({ 
    message: 'Internal server error', 
    error: process.env.NODE_ENV === 'development' ? err.message : undefined 
  });
});

// Root route
app.get('/', (req, res) => {
  res.send('HabitTracker API is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
