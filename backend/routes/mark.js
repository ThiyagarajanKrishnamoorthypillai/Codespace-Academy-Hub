const express = require('express');
const router = express.Router();
const { Mark } = require('../models/mark');
const { Answer } = require('../models/answer');
const multer = require('multer');
const streamifier = require('streamifier');
const cloudinary = require('../helpers/cloudinary');

const upload = multer({ storage: multer.memoryStorage() });

router.post('/post', upload.single('imageMark'), async (req, res) => {
  try {
    const { answerId, adminemail } = req.body;

    const answer = await Answer.findById(answerId);
    if (!answer) return res.status(404).json({ error: 'Answer not found' });

    let imageMarkUrl = '';
    if (req.file) {
      imageMarkUrl = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({ folder: 'marks' }, (err, result) => {
          if (result) resolve(result.secure_url);
          else reject(err);
        });
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    }

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
      imageMark: imageMarkUrl,
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

module.exports = router;
