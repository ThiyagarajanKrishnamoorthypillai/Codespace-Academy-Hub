const express = require('express');
const router = express.Router();
const Session = require('../models/session');

// POST: Create session
router.post('/start', async (req, res) => {
  try {
    const { course, batch, user, durationHours } = req.body;

    const startTime = new Date();
    const endTime = new Date(startTime.getTime() + durationHours * 60 * 60 * 1000); // hours to ms

    const newSession = new Session({
      course,
      batch,
      user,
      durationHours,
      startTime,
      endTime,
      isActive: true
    });

    await newSession.save();
    res.json({ message: 'Session started', session: newSession });
  } catch (error) {
    res.status(500).json({ error: 'Failed to start session' });
  }
});

// GET: All sessions
router.get('/', async (req, res) => {
  try {
    const sessions = await Session.find();
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sessions' });
  }
});

// PUT: End session manually
router.put('/end/:id', async (req, res) => {
  try {
    const session = await Session.findByIdAndUpdate(req.params.id, {
      isActive: false,
      endTime: new Date()
    }, { new: true });

    if (!session) return res.status(404).json({ error: 'Session not found' });
    res.json({ message: 'Session ended', session });
  } catch (error) {
    res.status(500).json({ error: 'Failed to end session' });
  }
});


// ✅ PUT: Update session status to "Finished"
router.put('/:id/status', async (req, res) => {
  try {
    const session = await Session.findByIdAndUpdate(req.params.id, {
      status: "Finished",
      isActive: false
    }, { new: true });

    if (!session) return res.status(404).json({ error: 'Session not found' });
    res.json({ message: 'Session marked as finished', session });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update status' });
  }
});

module.exports = router;
