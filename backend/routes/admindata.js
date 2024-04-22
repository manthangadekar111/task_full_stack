
const express = require('express');
const router = express.Router();
const Admin = require('../model/admin');

router.post('/', async (req, res) => {
    try {
      const { email, password } = req.body;
      const newAdmin = new Admin({ email, password }); // Use a different variable name for the instance
      await newAdmin.save();
      res.status(201).json({ message: 'Admin added successfully' }); // Updated response message
    } catch (error) {
      console.error('Error adding admin:', error); // Adjusted error message
      res.status(500).json({ error: 'Internal server error' });
    }
  });

router.get('/', async (req, res) => {
  try {
    const newAdmin = await Admin.find();
    res.json(newAdmin);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




// Endpoint to reset the password based on a token

module.exports = router;
