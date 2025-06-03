const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { Answer } = require('../models/answer');
const Mark = require('../models/mark');

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './public/uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

router.post('/post', upload.single('imageMark'), async (req, res) => {
  try {
    const { answerId } = req.body;
    const imageMark = req.file?.path || '';
const adminemail = req.body.adminemail;

    const answer = await Answer.findById(answerId);
    if (!answer) return res.status(404).json({ error: 'Answer not found' });

    const newMark = new Mark({
      useremail: answer.useremail,
      name: answer.name,
      stdid: answer.stdid,
      dpt: answer.dpt,
      college: answer.college,
      course: answer.course,
      questionCourse: answer.questionCourse,
      questionDateCreated: answer.questionDateCreated,
      questionImages: answer.questionImages,
      answerImages: answer.image,
      status: answer.status,
      imageMark,
      adminemail,
      dateMark: new Date().toISOString()
    });

    await newMark.save();
    res.json({ message: 'Mark posted successfully', data: newMark });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




// ✅ GET all marks
router.get('/', async (req, res) => {
  try {
    const marks = await Mark.find().sort({ dateMark: -1 });
    res.json(marks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch marks' });
  }
});


// ✅ GET mark by ID
router.get('/:id', async (req, res) => {
  try {
    const mark = await Mark.findById(req.params.id);
    if (!mark) return res.status(404).json({ error: 'Mark not found' });
    res.json(mark);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching mark' });
  }
});


// ✅ PUT update mark by ID (e.g., status, imageMark)
router.put('/:id', upload.single('imageMark'), async (req, res) => {
  try {
    const updatedData = { ...req.body };

    // If new image is uploaded, update the imageMark
    if (req.file) {
      updatedData.imageMark = req.file.path;
    }

    const updatedMark = await Mark.findByIdAndUpdate(req.params.id, updatedData, {
      new: true
    });

    if (!updatedMark) return res.status(404).json({ error: 'Mark not found' });
    res.json({ message: 'Mark updated', data: updatedMark });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update mark' });
  }
});

module.exports = router;
