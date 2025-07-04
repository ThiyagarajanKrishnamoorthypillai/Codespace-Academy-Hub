const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('../helpers/cloudinary');
const streamifier = require('streamifier');
const Mark = require('../models/mark');
const adminAuth = require('../helpers/adminAuth');
const { Answer } = require('../models/answer');
// Multer config for memory storage (for stream upload to Cloudinary)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST: Upload imageMark(s) and save mark entry
router.post('/post', adminAuth, upload.array('imageMark'), async (req, res) => {
  try {
    const { answerId, adminemail, mark } = req.body;

if (!answerId || !adminemail) {
  return res.status(400).json({ message: "Missing fields" });
}

const answer = await Answer.findById(answerId);
if (!answer) return res.status(404).json({ message: "Answer not found" });

let imageMarkUrls = [];
if (req.files && req.files.length > 0) {
  imageMarkUrls = await Promise.all(
    req.files.map(file => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'marks' },
          (error, result) => {
            if (result) resolve(result.secure_url);
            else reject(error);
          }
        );
        streamifier.createReadStream(file.buffer).pipe(stream);
      });
    })
  );
}

const markRecord = new Mark({
  useremail: answer.useremail,
  name: answer.name,
  stdid: answer.stdid,
  dpt: answer.dpt,
  college: answer.college,
  course: answer.course,
  questionCourse: answer.questionCourse,
  questionDateCreated: answer.questionDateCreated,
  dateCreated: answer.dateCreated,
  questionImages: answer.questionImages,
  answerImages: answer.image,
  pdf: answer.pdf,
  imageMark: imageMarkUrls,
  mark,   // ✅ finally passing your marks
  adminemail
});

const saved = await markRecord.save();
res.status(200).json(saved);


  } catch (error) {
    console.error("Error in /mark/post:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
});


router.post('/post-tutor', upload.array('imageMark'), async (req, res) => {
  try {
    const { answerId, tutoremail, mark } = req.body;

    if (!answerId || !tutoremail) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const answer = await Answer.findById(answerId);
    if (!answer) return res.status(404).json({ message: "Answer not found" });

    let imageMarkUrls = [];

    if (req.files && req.files.length > 0) {
      imageMarkUrls = await Promise.all(
        req.files.map(file => {
          return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              { folder: 'marks' },
              (error, result) => {
                if (result) resolve(result.secure_url);
                else reject(error);
              }
            );
            streamifier.createReadStream(file.buffer).pipe(stream);
          });
        })
      );
    }

    const markRecord = new Mark({
      useremail: answer.useremail,
      name: answer.name,
      stdid: answer.stdid,
      dpt: answer.dpt,
      college: answer.college,
      course: answer.course,
      questionCourse: answer.questionCourse,
      questionDateCreated: answer.questionDateCreated,
      dateCreated: answer.dateCreated,
      questionImages: answer.questionImages,
      answerImages: answer.image,
      pdf: answer.pdf,
      imageMark: imageMarkUrls,
      mark,
      tutoremail
    });

    const saved = await markRecord.save();
    res.status(200).json(saved);

  } catch (error) {
    console.error("Error in /mark/post-tutor:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
});



// ✅ GET all marks
router.get('/', async (req, res) => {
  try {
    const marks = await Mark.find().sort({ createdAt: -1 });
    res.status(200).json(marks);
  } catch (error) {
    console.error("Error fetching marks:", error);
    res.status(500).json({ message: "Failed to fetch marks", error });
  }
});

module.exports = router;
