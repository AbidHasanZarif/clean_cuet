const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
const path = require('path');

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Request logging
app.use((req, res, next) => {
  console.log(`Incoming ${req.method} request to ${req.url}`);
  next();
});

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/reports', require('./routes/reports'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('public'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server started on port ${PORT}`);
  
  // Verify server is actually listening
  server.on('listening', () => {
    const addr = server.address();
    console.log(`Server listening on ${addr.address}:${addr.port}`);
  });
  
  server.on('error', (err) => {
    console.error('Server error:', err);
  });
});