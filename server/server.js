// Main server file
const express = require('express');
const cors = require('cors');

// Import configuration, database and routes
const config = require('./config/config');
const connectDB = require('./config/database');
const authRoutes = require('./routes/auth');
const customerRoutes = require('./routes/customers');

const app = express();

console.log('🔄 Starting server...');

// Connect to database
connectDB();

// Setup middleware
app.use(cors({
  origin: config.cors.origins,
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);

// Serve static files (for production deployment)
// app.use(express.static(path.join(__dirname, '../client/dist')));

// Handle 404 errors
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});

// Handle errors
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    success: false,
    message: error.message || 'Internal server error'
  });
});

// Start server
const PORT = config.server.port;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API endpoints available at http://localhost:${PORT}/api`);
});

// Handle shutdown
process.on('SIGTERM', () => {
  server.close(() => {
    // Server stopped silently
  });
});

module.exports = app;
