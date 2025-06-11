const { Tutor } = require('../models/tutor');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Get all tutors (optional)
router.get(`/`, async (req, res) => {
  const tutorList = await Tutor.find().select('-passwordHash');
  if (!tutorList) {
    res.status(500).json({ success: false });
  }
  res.send(tutorList);
});

// Tutor Login API
router.post('/login', async (req, res) => {
  const tutor = await Tutor.findOne({ email: req.body.email });
  const secret = process.env.secret;

  if (!tutor || !tutor.passwordHash) {
    return res.status(400).send('Tutor not found or missing password.');
  }

  const isMatch = bcrypt.compareSync(req.body.password, tutor.passwordHash);
  if (!isMatch) {
    return res.status(400).send('Password is wrong!');
  }

  const token = jwt.sign(
    {
      tutoremail: tutor.email,
      tutorcourse: tutor.course
    },
    secret,
    { expiresIn: '1d' }
  );

  return res.status(200).send({ tutor: tutor.email, course: tutor.course, token });
});

// Create Tutor (optional)
router.post(`/`, async (req, res) => {
  let tutor = new Tutor({
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password, 10),
    course: req.body.course
  });
  tutor = await tutor.save();
  if (!tutor) return res.status(500).send('The Tutor cannot be created');

  res.send(tutor);
});

module.exports = router;
