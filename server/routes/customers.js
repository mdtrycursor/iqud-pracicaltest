// Customer routes
const express = require('express');
const Customer = require('../models/Customer');
const { authenticateToken } = require('../middleware/auth');
const { validateCustomer } = require('../middleware/validation');

const router = express.Router();

// Get all customers with pagination
router.get('/', authenticateToken, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const search = req.query.search || '';
    const skip = (page - 1) * limit;

    // Build search query
    let searchQuery = {};
    if (search) {
      searchQuery.$or = [
        { name: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }

    // Get total count for pagination
    const totalCustomers = await Customer.countDocuments(searchQuery);
    
    // Get customers with pagination
    const customers = await Customer.find(searchQuery)
      .select('name address phone createdAt updatedAt')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Calculate pagination info
    const totalPages = Math.ceil(totalCustomers / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    res.json({
      success: true,
      message: 'Customers retrieved successfully',
      data: {
        customers,
        pagination: {
          currentPage: page,
          totalPages,
          totalCustomers,
          hasNextPage,
          hasPrevPage,
          limit
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while retrieving customers'
    });
  }
});

// Get specific customer by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id)
      .select('name address phone createdAt updatedAt');

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found'
      });
    }

    res.json({
      success: true,
      message: 'Customer retrieved successfully',
      data: { customer }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while retrieving customer'
    });
  }
});

// Create new customer
router.post('/', authenticateToken, validateCustomer, async (req, res) => {
  try {
    const { name, address, phone } = req.body;

    // Create new customer
    const customer = new Customer({
      name,
      address,
      phone
    });

    await customer.save();

    res.status(201).json({
      success: true,
      message: 'Customer created successfully',
      data: {
        customer: {
          id: customer._id,
          name: customer.name,
          address: customer.address,
          phone: customer.phone,
          createdAt: customer.createdAt
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while creating customer'
    });
  }
});

// Update existing customer
router.put('/:id', authenticateToken, validateCustomer, async (req, res) => {
  try {
    const { name, address, phone } = req.body;

    // Find and update customer
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      { name, address, phone },
      { new: true, runValidators: true }
    ).select('name address phone createdAt updatedAt');

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found'
      });
    }

    res.json({
      success: true,
      message: 'Customer updated successfully',
      data: { customer }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while updating customer'
    });
  }
});

// Delete customer
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    // Find and delete customer
    const customer = await Customer.findByIdAndDelete(req.params.id);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found'
      });
    }

    res.json({
      success: true,
      message: 'Customer deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while deleting customer'
    });
  }
});

module.exports = router;
