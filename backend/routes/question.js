const express = require('express');
const router = express.Router();
const { Question } = require('../models/question');
const multer = require('multer');
const streamifier = require('streamifier');
const cloudinary = require('../helpers/cloudinary');
const auth = require('../helpers/jwt');

const upload = multer({ storage: multer.memoryStorage() });

// POST question with image upload to Cloudinary
router.post('/', auth, upload.array('image'), async (req, res) => {
  try {
    const uploadPromises = req.files.map((file) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({ folder: 'questions' }, (err, result) => {
          if (result) resolve(result.secure_url);
          else reject(err);
        });
        streamifier.createReadStream(file.buffer).pipe(stream);
      });
    });

    const uploadedImages = await Promise.all(uploadPromises);

    const question = new Question({
      course: req.body.course,
      image: uploadedImages,
      dateCreated: req.body.dateCreated,
      status: req.body.status,
      adminemail: req.body.adminemail,
    });

    const saved = await question.save();
    res.status(200).send(saved);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Question post failed' });
  }
});

// PUT question update with optional new images
router.put('/:id', auth, upload.array('newImages'), async (req, res) => {
  try {
    const existingImages = req.body.existingImages ? JSON.parse(req.body.existingImages) : [];

    let uploadedImages = [];
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map((file) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream({ folder: 'questions' }, (err, result) => {
            if (result) resolve(result.secure_url);
            else reject(err);
          });
          streamifier.createReadStream(file.buffer).pipe(stream);
        });
      });
      uploadedImages = await Promise.all(uploadPromises);
    }

    const updatedImages = [...existingImages, ...uploadedImages];

    const updated = await Question.findByIdAndUpdate(
      req.params.id,
      {
        course: req.body.course,
        image: updatedImages,
        dateCreated: req.body.dateCreated,
        status: req.body.status,
        adminemail: req.body.adminemail,
      },
      { new: true }
    );

    if (!updated) return res.status(404).send('Question not found');
    res.send(updated);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Update failed' });
  }
});

module.exports = router;
