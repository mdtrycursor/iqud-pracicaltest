// Customer model
const mongoose = require('mongoose');

// Customer schema
const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Customer name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  address: {
    type: String,
    required: [true, 'Customer address is required'],
    trim: true,
    maxlength: [500, 'Address cannot exceed 500 characters']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number']
  }
}, {
  timestamps: true // Add createdAt and updatedAt
});

// Index for better performance
customerSchema.index({ name: 1 });

module.exports = mongoose.model('Customer', customerSchema);
