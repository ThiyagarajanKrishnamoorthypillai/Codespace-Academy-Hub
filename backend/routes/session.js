const express = require('express');
const router = express.Router();
const Session = require('../models/session');

// Create Session API
router.post('/create', async (req, res) => {
  try {
    const { course, batch, users, fromDate, toDate, durationHours } = req.body;

    const newSession = new Session({
      course,
      batch,
      users: users, // already array of { name, email }
      fromDate: new Date(fromDate),
      toDate: new Date(toDate),
      durationHours
    });

    await newSession.save();
    res.json({ message: 'Session created successfully', session: newSession });
  } catch (error) {
    console.error('Create session error:', error);
    res.status(500).json({ error: 'Failed to create session' });
  }
});

// Fetch all sessions
router.get('/', async (req, res) => {
  try {
    const sessions = await Session.find().sort({ createdAt: -1 });
    res.json(sessions);
  } catch (error) {
    console.error('Fetch sessions error:', error);
    res.status(500).json({ error: 'Failed to fetch sessions' });
  }
});


// PATCH: Update session daily progress
router.patch('/daily-update/:id', async (req, res) => {
  try {
    const { todayHoursMinutes, selectedDate } = req.body;
    const session = await Session.findById(req.params.id);

    if (!session) return res.status(404).json({ error: 'Session not found' });

    const totalPlannedMinutes = session.durationHours * 60;
    const totalLoggedMinutes = session.datewise.reduce((sum, entry) => sum + entry.todayHour, 0);
    const remainingMinutes = totalPlannedMinutes - totalLoggedMinutes;

    if (todayHoursMinutes > remainingMinutes) {
      return res.status(400).json({ error: "Today's minutes exceed remaining minutes." });
    }

    // append datewise
    session.datewise.push({
      date: new Date(selectedDate),
      todayHour: todayHoursMinutes
    });

    // recheck after push
    const newTotalLogged = totalLoggedMinutes + todayHoursMinutes;
    session.status = (newTotalLogged >= totalPlannedMinutes) ? 'Completed' : 'On-Going';

    await session.save();
    res.json({ message: 'Session updated successfully', session });
  } catch (error) {
    console.error('Daily update error:', error);
    res.status(500).json({ error: 'Failed to update session' });
  }
});




module.exports = router;
