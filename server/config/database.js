// Database connection
const mongoose = require('mongoose');
require('dotenv').config(); // Ensure env vars are loaded first
const config = require('./config');

// Connect to MongoDB
const connectDB = async () => {
  try {
    console.log('🔄 Connecting to MongoDB...');
    const mongoURI = config.mongodb.uri;
    
    // Show loading animation
    const loadingInterval = setInterval(() => {
      process.stdout.write('.');
    }, 500);
    
    const conn = await mongoose.connect(mongoURI, config.mongodb.options);
    
    // Clear loading animation
    clearInterval(loadingInterval);
    console.log('\n✅ MongoDB connected successfully!');
    console.log(`📍 Host: ${conn.connection.host}`);
    console.log(`🗄️  Database: ${conn.connection.name}`);
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('⚠️  MongoDB disconnected');
    });
    
    mongoose.connection.on('reconnected', () => {
      console.log('🔄 MongoDB reconnected');
    });
    
  } catch (error) {
    console.error('\n❌ Database connection failed:', error.message);
    console.log('💡 Make sure your MongoDB Atlas cluster is running and your IP is whitelisted');
    process.exit(1);
  }
};

module.exports = connectDB;
