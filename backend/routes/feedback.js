// ✅ Cloudinary-integrated feedback.js
const { Feedback } = require('../models/feedback');
const express = require('express');
const router = express.Router();
const auth = require('../helpers/jwt');
const multer = require('multer');
const streamifier = require('streamifier');
const cloudinary = require('../helpers/cloudinary');

const upload = multer({ storage: multer.memoryStorage() });

// GET all feedback
router.get(`/`, async (req, res) => {
  try {
    const feedbackList = await Feedback.find();
    res.status(200).send(feedbackList);
  } catch {
    res.status(500).json({ success: false });
  }
});

// GET feedback by ID
router.get(`/:id`, async (req, res) => {
  try {
    const feedbackItem = await Feedback.findById(req.params.id);
    res.send(feedbackItem);
  } catch {
    res.status(500).json({ success: false });
  }
});

// POST new feedback with Cloudinary image upload
router.post('/', auth, upload.array('image'), async (req, res) => {
  try {
    const uploadPromises = req.files.map((file) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({ folder: 'feedback' }, (err, result) => {
          if (result) resolve(result.secure_url);
          else reject(err);
        });
        streamifier.createReadStream(file.buffer).pipe(stream);
      });
    });

    const uploadedImages = await Promise.all(uploadPromises);

    const feedback = new Feedback({
      useremail: req.body.useremail,
      name: req.body.name,
      feedback: req.body.feedback,
      image: uploadedImages,
      course: req.body.course,
      dateCreated: req.body.dateCreated || new Date().toISOString(),
      userFeedbackdateCreated: req.body.userFeedbackdateCreated || new Date().toISOString(),
      status: req.body.status || "Pending",
    });

    const saved = await feedback.save();
    res.status(200).send(saved);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Feedback not saved' });
  }
});

// PUT: Add explanation by admin
router.put('/:id', auth, async (req, res) => {
  try {
    const updated = await Feedback.findByIdAndUpdate(
      req.params.id,
      {
        explanation: req.body.explanation,
        adminFeedbackdateCreated: req.body.adminFeedbackdateCreated,
      },
      { new: true }
    );
    if (!updated) return res.status(404).send('Feedback not found');
    res.send(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update feedback' });
  }
});

// PUT: Update feedback status by user
router.put('/update-status/:id', async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!feedback) return res.status(404).json({ message: 'Feedback not found' });
    res.status(200).json(feedback);
  } catch (error) {
    console.error('Update status error:', error.message);
    res.status(500).json({ message: 'Failed to update status' });
  }
});

module.exports = router;
