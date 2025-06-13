const { Question } = require('../models/question');
const express = require('express');
const router = express.Router();
const auth = require('../helpers/jwt');
const multer = require('multer');
const streamifier = require('streamifier');
const cloudinary = require('../helpers/cloudinary');

const storage = multer.memoryStorage(); // 👈 use memory for cloudinary
const upload = multer({ storage: storage });

// Upload to Cloudinary
const uploadToCloudinary = (fileBuffer, fileType = 'auto') => {
  return new Promise((resolve, reject) => {
    let stream = cloudinary.uploader.upload_stream(
      { folder: 'questions', resource_type: fileType },
      (error, result) => {
        if (result) resolve(result.secure_url);
        else reject(error);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};


// POST question with images
router.post('/', upload.fields([
  { name: 'images', maxCount: 10 },
  { name: 'pdfs', maxCount: 10 }
]), async (req, res) => {
  try {
    const imageUrls = req.files['images']
      ? await Promise.all(req.files['images'].map(file => uploadToCloudinary(file.buffer)))
      : [];

    const pdfUrls = req.files['pdfs']
      ? await Promise.all(req.files['pdfs'].map(file => uploadToCloudinary(file.buffer, 'application/pdf')))
      : [];

    const data = {
      course: req.body.course,
      image: imageUrls,
      pdf: pdfUrls,
      status: req.body.status || 'pending'
    };

    if (req.body.adminemail) {
      data.adminemail = req.body.adminemail;
      data.dateCreated = Date.now();
    }
    if (req.body.committeeemail) {
      data.committeeemail = req.body.committeeemail;
      data.committedate = Date.now();
    }

    const question = new Question(data);
    const saved = await question.save();
    res.status(200).send(saved);
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).send({ message: 'Upload failed', error: err });
  }
});



// GET all
router.get('/', async (req, res) => {
  const list = await Question.find();
  if (!list) return res.status(500).json({ success: false });
  res.status(200).send(list);
});

// GET by ID
router.get('/:id', async (req, res) => {
  const item = await Question.findById(req.params.id);
  if (!item) return res.status(404).json({ success: false });
  res.send(item);
});

// GET by course
router.get('/course/:course', async (req, res) => {
  try {
    const data = await Question.find({ course: req.params.course });
    if (!data) return res.status(404).send({ message: 'No data found' });
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ message: 'Server error', error });
  }
});

// PUT (update question images)
router.put('/:id', upload.array('newImages'), async (req, res) => {
  try {
    const { course, adminemail } = req.body;
    const keepImages = JSON.parse(req.body.existingImages || '[]');
    const newUrls = await Promise.all(req.files.map(file => uploadToCloudinary(file.buffer)));

    const updated = await Question.findByIdAndUpdate(
      req.params.id,
      {
        course,
        adminemail,
        image: [...keepImages, ...newUrls],
      },
      { new: true }
    );

    if (!updated) return res.status(400).send('Update failed');
    res.status(200).send(updated);
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).send({ message: 'Update failed', error: err });
  }
});

// DELETE
router.delete('/:id', auth, async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ success: false, message: 'Question not found!' });

    await Question.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Question deleted!' });
  } catch (err) {
    console.error('Error deleting question:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
