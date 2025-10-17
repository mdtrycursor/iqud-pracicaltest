// Configuration file for environment variables
require('dotenv').config();

const config = {
  // Database configuration
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/customer_management',
    options: {
      // Modern MongoDB driver options (removed deprecated ones)
    }
  },
  
  // JWT configuration
  jwt: {
    secret: process.env.JWT_SECRET || 'fallback-secret-key-change-in-production',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  },
  
  // Server configuration
  server: {
    port: process.env.PORT || 5000
  },
  
  // CORS configuration
  cors: {
    origins: process.env.CORS_ORIGINS ? 
      process.env.CORS_ORIGINS.split(',') : 
      ['http://localhost:5173', 'http://localhost:3000']
  }
};

module.exports = config;
