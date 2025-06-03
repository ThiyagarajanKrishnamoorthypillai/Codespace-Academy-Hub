const {Question} = require('../models/question');
const express = require('express');
const router = express.Router();
const auth = require('../helpers/jwt');
const multer = require('multer');
const path = require('path');
const fs = require('fs');



// Setup local storage for images
const storage = multer.diskStorage({
 destination: function (req, file, cb) {
  cb(null, path.join(__dirname, '../public/uploads')); // ✅ absolute path to backend/public/uploads
},
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

router.post('/', upload.array('images'), async (req, res) => {
  const imagePaths = req.files.map(file => file.filename);

  const question = new Question({
    adminemail: req.body.adminemail,
    course: req.body.course,
    image: imagePaths, // store as array
    status: req.body.status || 'pending' // ✅ handled safely
  });

  const saved = await question.save();
  if (!saved) {
    return res.status(400).send('Failed to save question');
  }

  res.status(200).send(saved);
});

router.get('/course/:course', async (req, res) => {
  const course = req.params.course;

  try {
    const data = await Question.find({ course });

    if (!data) {
      return res.status(404).send({ message: 'No data found for course: ' + course });
    }

    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ message: 'Server error', error });
  }
});


router.get(`/`,  async (req, res) =>{
    const questionList = await Question.find();

    if(!questionList) {
        res.status(500).json({success: false})
    } 
    res.status(200).send(questionList);
})



router.get(`/:id`, async (req, res) =>{
    const questionList = await Question.findById(req.params.id);

    if(!questionList) {
        res.status(500).json({success: false})
    } 
    res.send(questionList);
})


router.post('/',  async (req,res)=>{
    let question = new Question({
        
        adminemail: req.body.adminemail,
        course: req.body.course,
        image:req.body.image
        
    })
    question = await question.save();

    if(!question)
    return res.status(400).send('the question cannot be created!')
    res.send(question);
    
})




router.put('/:id', upload.array('newImages'), async (req, res) => {
  try {
    const id = req.params.id;
    const { course, adminemail } = req.body;
    const keepImages = JSON.parse(req.body.existingImages || '[]');
    const newImageFiles = req.files.map(file => file.filename);

    // Get original document
    const original = await Question.findById(id);
    const oldImages = original.image;

    // Determine which images to delete
    const deletedImages = oldImages.filter(img => !keepImages.includes(img));

    // Delete from filesystem
    deletedImages.forEach(img => {
      const imgPath = path.join(__dirname, '../public/uploads', img);
      if (fs.existsSync(imgPath)) {
        fs.unlinkSync(imgPath);
      }
    });

    // Update MongoDB
    const updated = await Question.findByIdAndUpdate(
      id,
      {
        course,
        adminemail,
        image: [...keepImages, ...newImageFiles],
      },
      { new: true }
    );

    if (!updated) return res.status(400).send("Update failed");

    res.status(200).send(updated);
  } catch (err) {
    console.error('Error updating question:', err);
    res.status(500).send({ message: 'Update failed', error: err });
  }
});



router.delete('/:id', auth, async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({ success: false, message: 'Question not found!' });
    }

    // Delete each image from the file system
    question.image.forEach((img) => {
      const imagePath = path.join(__dirname, '../public/uploads', img);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    });

    // Remove question from DB
    await Question.findByIdAndRemove(req.params.id);

    res.status(200).json({ success: true, message: 'Question and images deleted!' });
  } catch (err) {
    console.error('Error deleting question:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});







module.exports =router;