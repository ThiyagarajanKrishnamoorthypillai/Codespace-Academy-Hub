// ✅ UPDATED FILE: routes/answer.js
const express = require('express');
const router = express.Router();
const { Answer } = require('../models/answer');
const auth = require('../helpers/jwt');
const multer = require('multer');
const path = require('path');

// Local image upload config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/uploads'));
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Create answer
router.post('/', auth, upload.array('images'), async (req, res) => {
  try {
    const images = req.files.map(file => file.filename);
 const {
  useremail, name, stdid, dpt, college, course, status, dateCreated,
  questionDateCreated, questionCourse, questionImages
} = req.body;

    const answer = new Answer({
  useremail,
  name,
  stdid,
  dpt,
  college,
  course,
  status,
  dateCreated,
  questionDateCreated,
  questionCourse,
  questionImages: JSON.parse(questionImages || '[]'),
  image: images
});

    const saved = await answer.save();
    res.status(200).send(saved);
  } catch (err) {
    console.error('Error saving answer:', err);
    res.status(500).send({ message: 'Error saving answer', error: err });
  }
});

// Get all answers
router.get('/', async (req, res) => {
  const answerList = await Answer.find();
  if (!answerList) return res.status(500).json({ success: false });
  res.status(200).send(answerList);
});

// Get answer by ID
router.get('/:id', async (req, res) => {
  const answer = await Answer.findById(req.params.id);
  if (!answer) return res.status(500).json({ success: false });
  res.send(answer);
});

module.exports = router;
