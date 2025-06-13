const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Answer } = require('../models/answer');
const auth = require('../helpers/jwt');
const cloudinary = require('../helpers/cloudinary');
const path = require('path');
const fs = require('fs');

// Use multer memory storage to directly access file buffer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST /api/v1/answer — Create new answer with Cloudinary upload
router.post('/', auth, upload.array('images'), async (req, res) => {
  try {
    const {
      useremail,
      name,
      stdid,
      dpt,
      college,
      course,
      status = 'Pending',
      dateCreated,
      questionDateCreated,
      questionCourse,
      questionImages,
      questionPdfs
    } = req.body;

    // Upload each image to Cloudinary
 const uploadedImages = await Promise.all(
  req.files.map(file =>
    new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'answers' },
        (error, result) => {
          if (error) return reject(error);
          resolve(result.secure_url);
        }
      );
      stream.end(file.buffer);
    })
  )
);


    // Parse questionImages JSON safely
    const parsedQuestionImages = questionImages ? JSON.parse(questionImages) : [];
const parsedQuestionPdfs = questionPdfs ? JSON.parse(questionPdfs) : [];

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
      questionImages: parsedQuestionImages,
      image: uploadedImages,
      pdf: parsedQuestionPdfs  // ✅ add pdf here
    });

    const savedAnswer = await answer.save();
    res.status(200).json(savedAnswer);
  } catch (err) {
    console.error('❌ Error saving answer:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

// GET /api/v1/answer — View all answers
router.get('/', async (req, res) => {
  try {
    const answers = await Answer.find().sort({ dateCreated: -1 });
    res.status(200).json(answers);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/v1/answer/email/:email — Filter answers by email
router.get('/email/:email', async (req, res) => {
  try {
    const userAnswers = await Answer.find({ useremail: req.params.email }).sort({ dateCreated: -1 });
    res.status(200).json(userAnswers);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});
router.get('/email/:useremail', auth, async (req, res) => {
  const answerList = await Answer.find({ useremail: req.params.useremail });
  if (!answerList) return res.status(500).json({ success: false });
  res.status(200).send(answerList);
});

// GET /api/v1/answer/:id — View one answer
router.get('/:id', async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.id);
    if (!answer) return res.status(404).json({ success: false, message: 'Answer not found' });
    res.status(200).json(answer);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
