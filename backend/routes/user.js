const User = require('../models/user'); // ✅ Adjust path if needed
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');


// ✅ GET all user
router.get('/', async (req, res) => {
  try {
    const user = await User.find().sort({ name: 1 }); // or sort by createdAt
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});
// GET user by ID
router.get('/:id', async (req, res) => {
  const userId = req.params.id;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid user ID format' });
  }

  try {
    const user = await User.findById(userId).select('-password'); // exclude sensitive fields if needed

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET user profile by email
router.get('/profile/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ POST /google-login – create user if not exists
router.post('/google-login', async (req, res) => {
  const { email, name } = req.body;
  if (!email) return res.status(400).json({ message: "Missing email" });

  // Check in DB if user exists
  let user = await User.findOne({ email });
  if (!user) {
    // Optional: auto-register
    user = new User({ email, name });
    await user.save();
  }

return res.status(200).json({ user, firstTime: !user.course });
});

// ✅ PUT /update-course – MUST BE ABOVE `/:id`
router.put('/update-course', async (req, res) => {
  const { email, course } = req.body;

  if (!email || !course) {
    return res.status(400).json({ message: 'Email and course required' });
  }

  try {
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { course },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user: updatedUser });
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ message: 'Error updating course' });
  }
});

// ⛔️ This MUST COME LAST
router.put('/:id', async (req, res) => {
  const userId = req.params.id;
  const updateData = req.body;

  try {
    const user = await User.findByIdAndUpdate(userId, updateData, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error('Error updating user by ID:', error);
    res.status(500).json({ message: 'Update failed' });
  }
});

// PUT /api/v1/user/update-by-email/:email
router.put('/update-by-email/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({ user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error.message);
    res.status(500).json({ message: "Failed to update user" });
  }
});


// DELETE: Remove user by ID
router.delete('/user/:id', async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
});


module.exports =router;