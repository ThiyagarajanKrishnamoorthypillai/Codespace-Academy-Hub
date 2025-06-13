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
      users,
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
    const { todayHoursMinutes } = req.body;
    const session = await Session.findById(req.params.id);

    if (!session) return res.status(404).json({ error: 'Session not found' });

    // calculate total minutes already stored
    const totalMinutesLogged = session.datewise.reduce((sum, entry) => sum + entry.todayHour, 0);
    const totalMinutesPlanned = session.durationHours * 60;
    const remainingMinutes = totalMinutesPlanned - totalMinutesLogged;

    if (todayHoursMinutes > remainingMinutes) {
      return res.status(400).json({ error: "Today's minutes exceed remaining minutes." });
    }

    // append new datewise entry
    session.datewise.push({
      date: new Date(),  // store today's date
      todayHour: todayHoursMinutes
    });

    // recalculate after adding today's entry
    const newTotalLogged = totalMinutesLogged + todayHoursMinutes;
    const updatedStatus = (newTotalLogged >= totalMinutesPlanned) ? 'Completed' : 'On-Going';
    session.status = updatedStatus;

    await session.save();

    res.json({ message: 'Session updated successfully', session });
  } catch (error) {
    console.error('Daily update error:', error);
    res.status(500).json({ error: 'Failed to update session' });
  }
});



module.exports = router;
