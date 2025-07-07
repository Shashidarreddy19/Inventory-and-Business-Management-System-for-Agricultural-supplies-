const express = require('express');
const router = express.Router();
const CustomerController = require('../controllers/customerController');

// Middleware to check for userId
const checkUserId = (req, res, next) => {
    const userId = req.headers.userid || req.body.userId || req.query.userId;
    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }
    req.userId = userId;
    next();
};

// Apply userId check middleware
router.use(checkUserId);

// Get all customers
router.get('/', CustomerController.getAllCustomers);

// Get a single customer
router.get('/:id', CustomerController.getCustomerById);

// Get customer's purchase history
router.get('/:id/purchases', CustomerController.getCustomerPurchases);

// Create a new customer
router.post('/', CustomerController.createCustomer);

// Update a customer
router.put('/:id', CustomerController.updateCustomer);

// Delete a customer
router.delete('/:id', CustomerController.deleteCustomer);

module.exports = router;