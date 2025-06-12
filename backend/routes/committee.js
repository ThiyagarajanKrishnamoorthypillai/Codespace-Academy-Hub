const { Committee } = require('../models/committee');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Get all committee (optional)
router.get(`/`, async (req, res) => {
  const committeeList = await Committee.find().select('-passwordHash');
  if (!committeeList) {
    res.status(500).json({ success: false });
  }
  res.send(committeeList);
});


router.get('/:id', async (req, res) => {
  try {
    const committee = await Committee.findById(req.params.id);
    if (!committee) {
      return res.status(404).send('Committee not found');
    }
    res.send(committee);
  } catch (error) {
    res.status(500).send('Error fetching committee');
  }
});


// Committee Login API
router.post('/login', async (req, res) => {
  const committee = await Committee.findOne({ email: req.body.email });
  const secret = process.env.secret;

  if (!committee || !committee.passwordHash) {
    return res.status(400).send('Committee not found or missing password.');
  }

  const isMatch = bcrypt.compareSync(req.body.password, committee.passwordHash);
  if (!isMatch) {
    return res.status(400).send('Password is wrong!');
  }

  const token = jwt.sign(
    {
      committeeemail: committee.email
    },
    secret,
    { expiresIn: '1d' }
  );

  return res.status(200).send({ committee: committee.email, token });
});

// Create Committee (optional)
router.post(`/`, async (req, res) => {
  let committee = new Committee({
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password, 10),
  });
  committee = await committee.save();
  if (!committee) return res.status(500).send('The Committee cannot be created');

  res.send(committee);
});

router.put('/:id', async (req, res) => {
  try {
    const committee = await Committee.findById(req.params.id);
    if (!committee) {
      return res.status(404).send('Committee not found');
    }

    committee.email = req.body.email;

    // ✅ If passwordHash changed → update it
    if (req.body.passwordHash && req.body.passwordHash !== committee.passwordHash) {
      committee.passwordHash = bcrypt.hashSync(req.body.passwordHash, 10);
    }

    const updatedCommittee = await committee.save();
    res.send(updatedCommittee);
  } catch (error) {
    res.status(500).send('Error updating committee');
  }
});


module.exports = router;
