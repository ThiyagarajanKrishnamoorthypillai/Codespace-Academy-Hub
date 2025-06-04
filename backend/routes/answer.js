const express = require('express');
const router = express.Router();
const { Answer } = require('../models/answer');
const auth = require('../helpers/jwt');
const multer = require('multer');
const cloudinary = require('../helpers/cloudinary');
const streamifier = require('streamifier');

// Use multer memory storage for buffer upload to Cloudinary
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST: Submit an answer with Cloudinary upload
router.post('/', auth, upload.array('images'), async (req, res) => {
  try {
    const {
      useremail, name, stdid, dpt, college, course, status,
      dateCreated, questionDateCreated, questionCourse, questionImages
    } = req.body;

    // Upload images to Cloudinary
    const uploadedImageUrls = [];

    for (const file of req.files) {
      const streamUpload = () => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: 'answers' },
            (error, result) => {
              if (result) resolve(result.secure_url);
              else reject(error);
            }
          );
          streamifier.createReadStream(file.buffer).pipe(stream);
        });
      };

      const imageUrl = await streamUpload();
      uploadedImageUrls.push(imageUrl);
    }

    // Parse questionImages safely
    let parsedImages = [];
    try {
      parsedImages = JSON.parse(questionImages || '[]');
    } catch (err) {
      console.warn('Invalid JSON for questionImages:', err.message);
    }

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
      questionImages: parsedImages,
      image: uploadedImageUrls
    });

    const saved = await answer.save();
    res.status(200).json(saved);
  } catch (err) {
    console.error('❌ Error saving answer:', err);
    res.status(500).json({ message: 'Error saving answer', error: err.message });
  }
});

// GET: All answers
router.get('/', auth, async (req, res) => {
  try {
    const answers = await Answer.find().sort({ dateCreated: -1 });
    res.status(200).json(answers);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch answers', error: err.message });
  }
});

// GET: Answers by email (optional)
router.get('/user/:email', auth, async (req, res) => {
  try {
    const email = req.params.email;
    const answers = await Answer.find({ useremail: email });
    res.status(200).json(answers);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch user answers', error: err.message });
  }
});

module.exports = router;
