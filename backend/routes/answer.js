const express = require('express');
const router = express.Router();
const { Answer } = require('../models/answer');
const multer = require('multer');
const streamifier = require('streamifier');
const cloudinary = require('../helpers/cloudinary');
const auth = require('../helpers/jwt');

const upload = multer({ storage: multer.memoryStorage() });

// POST new answer with Cloudinary image uploads
router.post('/', auth, upload.array('image'), async (req, res) => {
  try {
    const uploadPromises = req.files.map((file) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({ folder: 'answers' }, (err, result) => {
          if (result) resolve(result.secure_url);
          else reject(err);
        });
        streamifier.createReadStream(file.buffer).pipe(stream);
      });
    });

    const uploadedImages = await Promise.all(uploadPromises);

    const answer = new Answer({
      useremail: req.body.useremail,
      name: req.body.name,
      stdid: req.body.stdid,
      dpt: req.body.dpt,
      college: req.body.college,
      course: req.body.course,
      questionCourse: req.body.questionCourse,
      questionDateCreated: req.body.questionDateCreated,
      questionImages: req.body.questionImages ? JSON.parse(req.body.questionImages) : [],
      image: uploadedImages,
      status: req.body.status || 'Pending',
      dateCreated: req.body.dateCreated || new Date().toISOString(),
    });

    const saved = await answer.save();
    res.status(200).send(saved);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Answer post failed' });
  }
});

module.exports = router;
